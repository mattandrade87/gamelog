import React from 'react';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { CORES } from '../theme/cores';

type Props = {
  mensagem?: string;
};

export default function CarregandoIndicador({ mensagem }: Props) {
  return (
    <View style={estilos.container}>
      <ActivityIndicator size="large" color={CORES.primaria} />
      {mensagem && <Text style={estilos.mensagem}>{mensagem}</Text>}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CORES.fundo,
  },
  mensagem: {
    color: CORES.textoSecundario,
    fontSize: 14,
    marginTop: 12,
  },
});
