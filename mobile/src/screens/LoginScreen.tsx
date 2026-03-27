import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CampoTexto from '../components/CampoTexto';
import BotaoCustomizado from '../components/BotaoCustomizado';
import { login } from '../services/apiMock';
import { useAuthStore } from '../stores/useAuthStore';
import { CORES } from '../theme/cores';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const setSessao = useAuthStore((estado) => estado.setSessao);

  const aoEntrar = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setCarregando(true);
    try {
      const sessao = await login({ email: email.trim(), senha });
      setSessao(sessao);
    } catch (erro: any) {
      Alert.alert('Erro', erro.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={estilos.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={estilos.scrollConteudo}
        keyboardShouldPersistTaps="handled"
      >
        <View style={estilos.cabecalho}>
          <Text style={estilos.logoTexto}>Eventos Locais</Text>
          <Text style={estilos.subtitulo}>
            Descubra eventos incriveis perto de voce
          </Text>
        </View>

        <View style={estilos.formulario}>
          <CampoTexto
            rotulo="Email"
            valor={email}
            aoMudar={setEmail}
            placeholder="seu@email.com"
          />
          <CampoTexto
            rotulo="Senha"
            valor={senha}
            aoMudar={setSenha}
            placeholder="Sua senha"
            secureTextEntry
          />
          <BotaoCustomizado
            titulo="Entrar"
            onPress={aoEntrar}
            carregando={carregando}
          />
        </View>

        <Pressable
          onPress={() => navigation.navigate('Registro')}
          style={estilos.linkContainer}
        >
          <Text style={estilos.linkTexto}>
            Nao tem conta?{' '}
            <Text style={estilos.linkDestaque}>Cadastre-se</Text>
          </Text>
        </Pressable>

        <View style={estilos.dicaContainer}>
          <Text style={estilos.dicaTexto}>
            Dica: use lucas@email.com / 123456
          </Text>
        </View>
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  cabecalho: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoTexto: {
    fontSize: 32,
    fontWeight: '800',
    color: CORES.primaria,
  },
  subtitulo: {
    fontSize: 15,
    color: CORES.textoSecundario,
    marginTop: 8,
    textAlign: 'center',
  },
  formulario: {
    marginBottom: 24,
  },
  linkContainer: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  linkTexto: {
    fontSize: 15,
    color: CORES.textoSecundario,
  },
  linkDestaque: {
    color: CORES.primaria,
    fontWeight: '600',
  },
  dicaContainer: {
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    backgroundColor: CORES.cartao,
    borderRadius: 8,
  },
  dicaTexto: {
    fontSize: 13,
    color: CORES.textoInativo,
  },
});
