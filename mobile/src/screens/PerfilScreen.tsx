import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CarregandoIndicador from '../components/CarregandoIndicador';
import BotaoCustomizado from '../components/BotaoCustomizado';
import { useEventosDoUsuario } from '../hooks/useUsuario';
import { useAuthStore } from '../stores/useAuthStore';
import { Evento } from '../types';
import { CORES } from '../theme/cores';
import { MainTabParamList, RootStackParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Perfil'>,
  NativeStackScreenProps<RootStackParamList>
>;

function MiniEventoCard({
  evento,
  onPress,
}: {
  evento: Evento;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        estilos.miniCard,
        pressed && estilos.miniCardPressionado,
      ]}
      onPress={onPress}
    >
      <Image
        source={{ uri: evento.imagemUrl }}
        style={estilos.miniCardImagem}
        resizeMode="cover"
      />
      <Text style={estilos.miniCardTitulo} numberOfLines={2}>
        {evento.titulo}
      </Text>
    </Pressable>
  );
}

export default function PerfilScreen({ navigation }: Props) {
  const sessao = useAuthStore((estado) => estado.sessao);
  const logout = useAuthStore((estado) => estado.logout);
  const usuario = sessao?.usuario;

  const { data: eventosDoUsuario, isLoading } = useEventosDoUsuario(
    usuario?.id ?? ''
  );

  if (!usuario) return null;

  const iniciais = usuario.nome
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <View style={estilos.container}>
      <View style={estilos.cabecalho}>
        <View style={estilos.avatar}>
          <Text style={estilos.avatarTexto}>{iniciais}</Text>
        </View>
        <Text style={estilos.nome}>{usuario.nome}</Text>
        <Text style={estilos.email}>{usuario.email}</Text>
        {usuario.bio ? <Text style={estilos.bio}>{usuario.bio}</Text> : null}
      </View>

      {isLoading ? (
        <CarregandoIndicador mensagem="Carregando seus eventos..." />
      ) : (
        <View style={estilos.eventosContainer}>
          <View style={estilos.statsLinha}>
            <View style={estilos.statCard}>
              <Text style={estilos.statValor}>
                {eventosDoUsuario?.criados.length ?? 0}
              </Text>
              <Text style={estilos.statRotulo}>Eventos Criados</Text>
            </View>
            <View style={estilos.statCard}>
              <Text style={estilos.statValor}>
                {eventosDoUsuario?.participando.length ?? 0}
              </Text>
              <Text style={estilos.statRotulo}>Participando</Text>
            </View>
          </View>

          {eventosDoUsuario &&
            eventosDoUsuario.criados.length > 0 && (
              <View style={estilos.secao}>
                <View style={estilos.secaoCabecalho}>
                  <Ionicons name="create-outline" size={18} color={CORES.primaria} />
                  <Text style={estilos.secaoTitulo}>Meus Eventos</Text>
                </View>
                <FlatList
                  data={eventosDoUsuario.criados}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <MiniEventoCard
                      evento={item}
                      onPress={() =>
                        navigation.navigate('DetalhesEvento', {
                          eventoId: item.id,
                        })
                      }
                    />
                  )}
                  contentContainerStyle={estilos.listaHorizontal}
                />
              </View>
            )}

          {eventosDoUsuario &&
            eventosDoUsuario.participando.length > 0 && (
              <View style={estilos.secao}>
                <View style={estilos.secaoCabecalho}>
                  <Ionicons name="people-outline" size={18} color={CORES.primaria} />
                  <Text style={estilos.secaoTitulo}>Participando</Text>
                </View>
                <FlatList
                  data={eventosDoUsuario.participando}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <MiniEventoCard
                      evento={item}
                      onPress={() =>
                        navigation.navigate('DetalhesEvento', {
                          eventoId: item.id,
                        })
                      }
                    />
                  )}
                  contentContainerStyle={estilos.listaHorizontal}
                />
              </View>
            )}
        </View>
      )}

      <View style={estilos.logoutContainer}>
        <BotaoCustomizado
          titulo="Sair da Conta"
          onPress={logout}
          variante="perigo"
        />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  cabecalho: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: CORES.primaria,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarTexto: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  nome: {
    fontSize: 22,
    fontWeight: '700',
    color: CORES.texto,
    marginTop: 12,
  },
  email: {
    fontSize: 14,
    color: CORES.textoSecundario,
    marginTop: 4,
  },
  bio: {
    fontSize: 14,
    color: CORES.textoInativo,
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  eventosContainer: {
    flex: 1,
  },
  statsLinha: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: CORES.cartao,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  statValor: {
    fontSize: 28,
    fontWeight: '700',
    color: CORES.primaria,
  },
  statRotulo: {
    fontSize: 13,
    color: CORES.textoSecundario,
    marginTop: 4,
  },
  secao: {
    marginBottom: 20,
  },
  secaoCabecalho: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: '700',
    color: CORES.texto,
  },
  listaHorizontal: {
    paddingHorizontal: 16,
    gap: 12,
  },
  miniCard: {
    width: 150,
    backgroundColor: CORES.cartao,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  miniCardPressionado: {
    opacity: 0.8,
  },
  miniCardImagem: {
    width: '100%',
    height: 90,
    backgroundColor: CORES.superficieElevada,
  },
  miniCardTitulo: {
    fontSize: 13,
    fontWeight: '600',
    color: CORES.texto,
    padding: 10,
  },
  logoutContainer: {
    padding: 16,
    paddingBottom: 32,
  },
});
