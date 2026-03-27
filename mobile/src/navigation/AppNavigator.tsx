import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import DetalhesEventoScreen from '../screens/DetalhesEventoScreen';
import { useAuthStore } from '../stores/useAuthStore';
import { CORES } from '../theme/cores';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const sessao = useAuthStore((estado) => estado.sessao);

  if (!sessao) {
    return <AuthNavigator />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: CORES.fundo },
        headerTintColor: CORES.texto,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={MainNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetalhesEvento"
        component={DetalhesEventoScreen}
        options={{ title: 'Detalhes do Evento' }}
      />
    </Stack.Navigator>
  );
}
