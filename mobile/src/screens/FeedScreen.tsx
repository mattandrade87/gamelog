import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import EventoCard from '../components/EventoCard';
import CarregandoIndicador from '../components/CarregandoIndicador';
import { useEventos } from '../hooks/useEventos';
import { Evento } from '../types';
import { CORES } from '../theme/cores';
import { MainTabParamList, RootStackParamList } from '../navigation/types';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Feed'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function FeedScreen({ navigation }: Props) {
  const { data: eventos, isLoading, error, refetch } = useEventos();

  if (isLoading) {
    return <CarregandoIndicador mensagem="Carregando eventos..." />;
  }

  if (error) {
    return (
      <View style={estilos.estadoVazio}>
        <Text style={estilos.erroTexto}>Erro ao carregar eventos</Text>
        <Text style={estilos.erroSubtexto}>Tente novamente mais tarde</Text>
      </View>
    );
  }

  if (!eventos || eventos.length === 0) {
    return (
      <View style={estilos.estadoVazio}>
        <Text style={estilos.vazioTexto}>Nenhum evento encontrado</Text>
        <Text style={estilos.vazioSubtexto}>
          Crie o primeiro evento da comunidade!
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Evento }) => (
    <EventoCard
      evento={item}
      onPress={() =>
        navigation.navigate('DetalhesEvento', { eventoId: item.id })
      }
    />
  );

  return (
    <View style={estilos.container}>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={estilos.lista}
        onRefresh={refetch}
        refreshing={isLoading}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CORES.fundo,
  },
  lista: {
    padding: 16,
  },
  estadoVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: CORES.fundo,
    padding: 24,
  },
  erroTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: CORES.perigo,
  },
  erroSubtexto: {
    fontSize: 14,
    color: CORES.textoSecundario,
    marginTop: 8,
  },
  vazioTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: CORES.texto,
  },
  vazioSubtexto: {
    fontSize: 14,
    color: CORES.textoSecundario,
    marginTop: 8,
  },
});
