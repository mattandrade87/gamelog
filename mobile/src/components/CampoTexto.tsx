import React from 'react';
import { TextInput, Text, StyleSheet, View } from 'react-native';
import { CORES } from '../theme/cores';

type Props = {
  rotulo: string;
  valor: string;
  aoMudar: (texto: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
};

export default function CampoTexto({
  rotulo,
  valor,
  aoMudar,
  placeholder,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
}: Props) {
  return (
    <View style={estilos.container}>
      <Text style={estilos.rotulo}>{rotulo}</Text>
      <TextInput
        style={[estilos.input, multiline && estilos.inputMultiline]}
        value={valor}
        onChangeText={aoMudar}
        placeholder={placeholder}
        placeholderTextColor={CORES.textoInativo}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  rotulo: {
    color: CORES.texto,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: CORES.cartao,
    color: CORES.texto,
    borderWidth: 1,
    borderColor: CORES.superficieElevada,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  inputMultiline: {
    minHeight: 100,
    paddingTop: 12,
  },
});
