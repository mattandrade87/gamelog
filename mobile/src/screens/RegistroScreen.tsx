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
import { registrar } from '../services/apiMock';
import { useAuthStore } from '../stores/useAuthStore';
import { CORES } from '../theme/cores';
import { AuthStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<AuthStackParamList, 'Registro'>;

export default function RegistroScreen({ navigation }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const setSessao = useAuthStore((estado) => estado.setSessao);

  const aoCadastrar = async () => {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setCarregando(true);
    try {
      const sessao = await registrar({
        nome: nome.trim(),
        email: email.trim(),
        senha,
      });
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
          <Text style={estilos.tituloTexto}>Criar Conta</Text>
          <Text style={estilos.subtitulo}>
            Junte-se a comunidade de eventos
          </Text>
        </View>

        <View style={estilos.formulario}>
          <CampoTexto
            rotulo="Nome"
            valor={nome}
            aoMudar={setNome}
            placeholder="Seu nome completo"
          />
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
            placeholder="Minimo 6 caracteres"
            secureTextEntry
          />
          <BotaoCustomizado
            titulo="Cadastrar"
            onPress={aoCadastrar}
            carregando={carregando}
          />
        </View>

        <Pressable
          onPress={() => navigation.goBack()}
          style={estilos.linkContainer}
        >
          <Text style={estilos.linkTexto}>
            Ja tem conta? <Text style={estilos.linkDestaque}>Entrar</Text>
          </Text>
        </Pressable>
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
  tituloTexto: {
    fontSize: 28,
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
});
