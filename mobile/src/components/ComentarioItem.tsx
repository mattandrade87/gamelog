import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Comentario } from '../types';
import { CORES } from '../theme/cores';

type Props = {
  comentario: Comentario;
  autorNome: string;
};

function formatarTempoRelativo(dataISO: string): string {
  const agora = new Date().getTime();
  const data = new Date(dataISO).getTime();
  const diffMs = agora - data;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHoras = Math.floor(diffMin / 60);
  const diffDias = Math.floor(diffHoras / 24);

  if (diffMin < 1) return 'agora mesmo';
  if (diffMin < 60) return `${diffMin}min atras`;
  if (diffHoras < 24) return `${diffHoras}h atras`;
  if (diffDias < 30) return `${diffDias}d atras`;
  return new Date(dataISO).toLocaleDateString('pt-BR');
}

export default function ComentarioItem({ comentario, autorNome }: Props) {
  return (
    <View style={estilos.container}>
      <View style={estilos.bordaEsquerda} />
      <View style={estilos.conteudo}>
        <View style={estilos.cabecalho}>
          <Text style={estilos.autorNome}>{autorNome}</Text>
          <Text style={estilos.tempo}>
            {formatarTempoRelativo(comentario.criadoEm)}
          </Text>
        </View>
        <Text style={estilos.texto}>{comentario.texto}</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  bordaEsquerda: {
    width: 3,
    backgroundColor: CORES.primaria,
    borderRadius: 2,
    marginRight: 12,
  },
  conteudo: {
    flex: 1,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  autorNome: {
    fontSize: 14,
    fontWeight: '700',
    color: CORES.primaria,
  },
  tempo: {
    fontSize: 12,
    color: CORES.textoInativo,
  },
  texto: {
    fontSize: 14,
    color: CORES.texto,
    lineHeight: 20,
  },
});
