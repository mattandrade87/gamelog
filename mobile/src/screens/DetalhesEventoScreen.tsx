import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CarregandoIndicador from '../components/CarregandoIndicador';
import ComentarioItem from '../components/ComentarioItem';
import BotaoCustomizado from '../components/BotaoCustomizado';
import { useEvento, useComentarios, useAdicionarComentario } from '../hooks/useEvento';
import { useCurtirEvento, useParticiparEvento, useSairEvento } from '../hooks/useEventos';
import { useAuthStore } from '../stores/useAuthStore';
import { buscarNomeUsuarioSync } from '../services/apiMock';
import { CATEGORIAS_LABELS } from '../types';
import { CORES } from '../theme/cores';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'DetalhesEvento'>;

function formatarDataCompleta(dataISO: string): string {
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function DetalhesEventoScreen({ route }: Props) {
  const { eventoId } = route.params;
  const sessao = useAuthStore((estado) => estado.sessao);
  const usuarioId = sessao?.usuario.id ?? '';

  const { data: evento, isLoading: carregandoEvento } = useEvento(eventoId);
  const { data: comentariosLista, isLoading: carregandoComentarios } =
    useComentarios(eventoId);

  const curtirMutacao = useCurtirEvento();
  const participarMutacao = useParticiparEvento();
  const sairMutacao = useSairEvento();
  const adicionarComentarioMutacao = useAdicionarComentario();

  const [novoComentario, setNovoComentario] = useState('');

  if (carregandoEvento || !evento) {
    return <CarregandoIndicador mensagem="Carregando evento..." />;
  }

  const estaCurtido = evento.curtidasIds.includes(usuarioId);
  const estaParticipando = evento.participantesIds.includes(usuarioId);

  const aoCurtir = () => {
    curtirMutacao.mutate({ eventoId, usuarioId });
  };

  const aoParticipar = () => {
    if (estaParticipando) {
      sairMutacao.mutate({ eventoId, usuarioId });
    } else {
      participarMutacao.mutate({ eventoId, usuarioId });
    }
  };

  const aoEnviarComentario = () => {
    if (!novoComentario.trim()) {
      Alert.alert('Erro', 'Digite um comentario.');
      return;
    }
    adicionarComentarioMutacao.mutate(
      { eventoId, autorId: usuarioId, texto: novoComentario.trim() },
      {
        onSuccess: () => setNovoComentario(''),
      }
    );
  };

  return (
    <ScrollView style={estilos.container}>
      <Image
        source={{ uri: evento.imagemUrl }}
        style={estilos.imagem}
        resizeMode="cover"
      />

      <View style={estilos.conteudo}>
        <Text style={estilos.titulo}>{evento.titulo}</Text>

        <View style={estilos.tagsLinha}>
          <View style={estilos.tagCategoria}>
            <Text style={estilos.tagTexto}>
              {CATEGORIAS_LABELS[evento.categoria]}
            </Text>
          </View>
        </View>

        <View style={estilos.infoSecao}>
          <View style={estilos.infoLinha}>
            <Ionicons name="calendar" size={18} color={CORES.primaria} />
            <Text style={estilos.infoTexto}>
              {formatarDataCompleta(evento.data)}
            </Text>
          </View>
          <View style={estilos.infoLinha}>
            <Ionicons name="location" size={18} color={CORES.primaria} />
            <Text style={estilos.infoTexto}>{evento.localizacao}</Text>
          </View>
          <View style={estilos.infoLinha}>
            <Ionicons name="people" size={18} color={CORES.primaria} />
            <Text style={estilos.infoTexto}>
              {evento.participantesIds.length} participante
              {evento.participantesIds.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>

        <Text style={estilos.descricao}>{evento.descricao}</Text>

        {/* Botoes de acao */}
        <View style={estilos.acoesLinha}>
          <Pressable
            onPress={aoCurtir}
            style={[estilos.botaoCurtir, estaCurtido && estilos.botaoCurtido]}
          >
            <Ionicons
              name={estaCurtido ? 'heart' : 'heart-outline'}
              size={22}
              color={estaCurtido ? CORES.perigo : CORES.texto}
            />
            <Text
              style={[
                estilos.botaoCurtirTexto,
                estaCurtido && estilos.botaoCurtidoTexto,
              ]}
            >
              {evento.curtidasIds.length} Curtida
              {evento.curtidasIds.length !== 1 ? 's' : ''}
            </Text>
          </Pressable>

          <BotaoCustomizado
            titulo={estaParticipando ? 'Sair do Evento' : 'Participar'}
            onPress={aoParticipar}
            variante={estaParticipando ? 'perigo' : 'primario'}
            carregando={participarMutacao.isPending || sairMutacao.isPending}
            estiloExtra={{ flex: 1 }}
          />
        </View>

        {/* Secao de comentarios */}
        <View style={estilos.comentariosSecao}>
          <Text style={estilos.comentariosTitulo}>
            Comentarios ({comentariosLista?.length ?? 0})
          </Text>

          {carregandoComentarios ? (
            <Text style={estilos.carregandoTexto}>
              Carregando comentarios...
            </Text>
          ) : comentariosLista && comentariosLista.length > 0 ? (
            comentariosLista.map((comentario) => (
              <ComentarioItem
                key={comentario.id}
                comentario={comentario}
                autorNome={buscarNomeUsuarioSync(comentario.autorId)}
              />
            ))
          ) : (
            <Text style={estilos.semComentarios}>
              Nenhum comentario ainda. Seja o primeiro!
            </Text>
          )}

          <View style={estilos.novoComentarioContainer}>
            <TextInput
              style={estilos.novoComentarioInput}
              value={novoComentario}
              onChangeText={setNovoComentario}
              placeholder="Escreva um comentario..."
              placeholderTextColor={CORES.textoInativo}
              multiline
            />
            <Pressable
              onPress={aoEnviarComentario}
              disabled={adicionarComentarioMutacao.isPending}
              style={estilos.enviarBotao}
            >
              <Ionicons name="send" size={22} color={CORES.primaria} />
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  imagem: {
    width: '100%',
    height: 220,
    backgroundColor: CORES.cartao,
  },
  conteudo: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '800',
    color: CORES.texto,
  },
  tagsLinha: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  tagCategoria: {
    backgroundColor: CORES.primaria,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagTexto: {
    fontSize: 13,
    fontWeight: '600',
    color: CORES.texto,
  },
  infoSecao: {
    marginTop: 20,
    gap: 12,
  },
  infoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoTexto: {
    fontSize: 15,
    color: CORES.textoSecundario,
    flex: 1,
  },
  descricao: {
    fontSize: 15,
    lineHeight: 24,
    color: CORES.textoSecundario,
    marginTop: 20,
  },
  acoesLinha: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  botaoCurtir: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: CORES.superficieElevada,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  botaoCurtido: {
    backgroundColor: '#3a1a1a',
  },
  botaoCurtirTexto: {
    fontSize: 14,
    fontWeight: '600',
    color: CORES.texto,
  },
  botaoCurtidoTexto: {
    color: CORES.perigo,
  },
  comentariosSecao: {
    marginTop: 32,
    borderTopWidth: 1,
    borderTopColor: CORES.superficieElevada,
    paddingTop: 20,
  },
  comentariosTitulo: {
    fontSize: 18,
    fontWeight: '700',
    color: CORES.texto,
    marginBottom: 16,
  },
  carregandoTexto: {
    color: CORES.textoInativo,
    fontSize: 14,
  },
  semComentarios: {
    color: CORES.textoInativo,
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
  novoComentarioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    marginTop: 16,
    backgroundColor: CORES.cartao,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CORES.superficieElevada,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  novoComentarioInput: {
    flex: 1,
    color: CORES.texto,
    fontSize: 14,
    maxHeight: 80,
    paddingVertical: 4,
  },
  enviarBotao: {
    padding: 6,
  },
});
