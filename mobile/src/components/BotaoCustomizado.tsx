import React from 'react';
import {
  Pressable,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { CORES } from '../theme/cores';

type Variante = 'primario' | 'secundario' | 'perigo';

type Props = {
  titulo: string;
  onPress: () => void;
  carregando?: boolean;
  variante?: Variante;
  desabilitado?: boolean;
  estiloExtra?: ViewStyle;
};

const coresFundo: Record<Variante, string> = {
  primario: CORES.primaria,
  secundario: CORES.superficieElevada,
  perigo: CORES.perigo,
};

export default function BotaoCustomizado({
  titulo,
  onPress,
  carregando = false,
  variante = 'primario',
  desabilitado = false,
  estiloExtra,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={carregando || desabilitado}
      style={({ pressed }) => [
        estilos.botao,
        { backgroundColor: coresFundo[variante] },
        pressed && estilos.pressionado,
        (carregando || desabilitado) && estilos.desabilitado,
        estiloExtra,
      ]}
    >
      {carregando ? (
        <ActivityIndicator size="small" color={CORES.texto} />
      ) : (
        <Text style={estilos.texto}>{titulo}</Text>
      )}
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  botao: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: CORES.texto,
    fontSize: 16,
    fontWeight: '600',
  },
  pressionado: {
    opacity: 0.8,
  },
  desabilitado: {
    opacity: 0.5,
  },
});
