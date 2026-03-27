import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from './types';
import FeedScreen from '../screens/FeedScreen';
import CriarEventoScreen from '../screens/CriarEventoScreen';
import PerfilScreen from '../screens/PerfilScreen';
import { CORES } from '../theme/cores';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: CORES.primaria,
        tabBarInactiveTintColor: CORES.textoInativo,
        tabBarStyle: {
          backgroundColor: CORES.fundo,
          borderTopColor: CORES.borda,
        },
        headerStyle: { backgroundColor: CORES.fundo },
        headerTintColor: CORES.texto,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CriarEvento"
        component={CriarEventoScreen}
        options={{
          title: 'Criar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
