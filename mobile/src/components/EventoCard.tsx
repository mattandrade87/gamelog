import React from 'react';
import { Image, Pressable, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Evento, CATEGORIAS_LABELS } from '../types';
import { CORES } from '../theme/cores';

type Props = {
  evento: Evento;
  onPress: () => void;
};

function formatarData(dataISO: string): string {
  const data = new Date(dataISO);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function EventoCard({ evento, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [estilos.card, pressed && estilos.pressionado]}
      onPress={onPress}
    >
      <Image
        source={{ uri: evento.imagemUrl }}
        style={estilos.imagem}
        resizeMode="cover"
      />
      <View style={estilos.conteudo}>
        <View style={estilos.categoriaTag}>
          <Text style={estilos.categoriaTexto}>
            {CATEGORIAS_LABELS[evento.categoria]}
          </Text>
        </View>
        <Text style={estilos.titulo} numberOfLines={2}>
          {evento.titulo}
        </Text>
        <View style={estilos.infoLinha}>
          <Ionicons
            name="location-outline"
            size={14}
            color={CORES.textoSecundario}
          />
          <Text style={estilos.infoTexto} numberOfLines={1}>
            {evento.localizacao}
          </Text>
        </View>
        <View style={estilos.infoLinha}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color={CORES.textoSecundario}
          />
          <Text style={estilos.infoTexto}>{formatarData(evento.data)}</Text>
        </View>
        <View style={estilos.rodape}>
          <View style={estilos.infoLinha}>
            <Ionicons
              name="people-outline"
              size={14}
              color={CORES.primaria}
            />
            <Text style={estilos.participantesTexto}>
              {evento.participantesIds.length} participante
              {evento.participantesIds.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={estilos.infoLinha}>
            <Ionicons name="heart" size={14} color={CORES.perigo} />
            <Text style={estilos.curtidasTexto}>
              {evento.curtidasIds.length}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  card: {
    backgroundColor: CORES.cartao,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  pressionado: {
    opacity: 0.8,
  },
  imagem: {
    width: '100%',
    height: 160,
    backgroundColor: CORES.superficieElevada,
  },
  conteudo: {
    padding: 14,
  },
  categoriaTag: {
    backgroundColor: CORES.primaria,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoriaTexto: {
    color: CORES.texto,
    fontSize: 11,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: CORES.texto,
    marginBottom: 8,
  },
  infoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  infoTexto: {
    fontSize: 13,
    color: CORES.textoSecundario,
    flex: 1,
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: CORES.superficieElevada,
  },
  participantesTexto: {
    fontSize: 13,
    color: CORES.primaria,
    fontWeight: '600',
  },
  curtidasTexto: {
    fontSize: 13,
    color: CORES.perigo,
    fontWeight: '600',
  },
});
