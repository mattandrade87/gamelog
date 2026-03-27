import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { CORES } from '../theme/cores';

type Props = {
  titulo: string;
};

export default function SectionHeader({ titulo }: Props) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>{titulo}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    backgroundColor: CORES.fundo,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: '700',
    color: CORES.primaria,
  },
});
