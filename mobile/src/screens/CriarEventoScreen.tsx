import React, { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import CampoTexto from '../components/CampoTexto';
import BotaoCustomizado from '../components/BotaoCustomizado';
import { useCriarEvento } from '../hooks/useEventos';
import { useAuthStore } from '../stores/useAuthStore';
import { CategoriaEvento, CATEGORIAS_LABELS } from '../types';
import { CORES } from '../theme/cores';

const CATEGORIAS: CategoriaEvento[] = [
  'MUSICA',
  'ESPORTE',
  'TECNOLOGIA',
  'GASTRONOMIA',
  'ARTE',
  'EDUCACAO',
  'OUTRO',
];

export default function CriarEventoScreen() {
  const sessao = useAuthStore((estado) => estado.sessao);
  const criarEventoMutacao = useCriarEvento();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');
  const [categoria, setCategoria] = useState<CategoriaEvento>('OUTRO');

  const limparFormulario = () => {
    setTitulo('');
    setDescricao('');
    setData('');
    setLocalizacao('');
    setImagemUrl('');
    setCategoria('OUTRO');
  };

  const aoCriar = () => {
    if (!titulo.trim() || !descricao.trim() || !data.trim() || !localizacao.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatorios.');
      return;
    }

    const criadorId = sessao?.usuario.id ?? '';

    criarEventoMutacao.mutate(
      {
        dados: {
          titulo: titulo.trim(),
          descricao: descricao.trim(),
          data: data.trim(),
          localizacao: localizacao.trim(),
          imagemUrl: imagemUrl.trim(),
          categoria,
        },
        criadorId,
      },
      {
        onSuccess: () => {
          Alert.alert('Sucesso', 'Evento criado com sucesso!');
          limparFormulario();
        },
        onError: (erro: any) => {
          Alert.alert('Erro', erro.message);
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={estilos.scrollConteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <CampoTexto
          rotulo="Titulo *"
          valor={titulo}
          aoMudar={setTitulo}
          placeholder="Titulo do evento"
        />

        <CampoTexto
          rotulo="Descricao *"
          valor={descricao}
          aoMudar={setDescricao}
          placeholder="Descreva o evento..."
          multiline
          numberOfLines={4}
        />

        <CampoTexto
          rotulo="Data *"
          valor={data}
          aoMudar={setData}
          placeholder="Ex: 2026-05-20T19:00:00"
        />

        <CampoTexto
          rotulo="Localizacao *"
          valor={localizacao}
          aoMudar={setLocalizacao}
          placeholder="Local do evento"
        />

        <CampoTexto
          rotulo="URL da Imagem"
          valor={imagemUrl}
          aoMudar={setImagemUrl}
          placeholder="https://exemplo.com/imagem.jpg"
        />

        {imagemUrl.trim().length > 0 && (
          <View style={estilos.previewContainer}>
            <Text style={estilos.previewRotulo}>Preview da imagem:</Text>
            <Image
              source={{ uri: imagemUrl }}
              style={estilos.previewImagem}
              resizeMode="cover"
            />
          </View>
        )}

        <Text style={estilos.categoriaRotulo}>Categoria</Text>
        <View style={estilos.categoriasContainer}>
          {CATEGORIAS.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setCategoria(cat)}
              style={[
                estilos.categoriaChip,
                categoria === cat && estilos.categoriaChipSelecionado,
              ]}
            >
              <Text
                style={[
                  estilos.categoriaChipTexto,
                  categoria === cat && estilos.categoriaChipTextoSelecionado,
                ]}
              >
                {CATEGORIAS_LABELS[cat]}
              </Text>
            </Pressable>
          ))}
        </View>

        <BotaoCustomizado
          titulo="Criar Evento"
          onPress={aoCriar}
          carregando={criarEventoMutacao.isPending}
          estiloExtra={{ marginTop: 8 }}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  scrollConteudo: {
    padding: 20,
    paddingBottom: 40,
  },
  previewContainer: {
    marginBottom: 16,
  },
  previewRotulo: {
    color: CORES.textoSecundario,
    fontSize: 13,
    marginBottom: 8,
  },
  previewImagem: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    backgroundColor: CORES.cartao,
  },
  categoriaRotulo: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  categoriaChip: {
    backgroundColor: CORES.superficieElevada,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoriaChipSelecionado: {
    backgroundColor: CORES.primaria,
  },
  categoriaChipTexto: {
    color: CORES.textoSecundario,
    fontSize: 13,
    fontWeight: '500',
  },
  categoriaChipTextoSelecionado: {
    color: CORES.texto,
    fontWeight: '700',
  },
});
