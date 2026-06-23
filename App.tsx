import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import MoonScreen from './src/screens/MoonScreen';
import PlantsScreen from './src/screens/PlantsScreen';
import ChemistryScreen from './src/screens/ChemistryScreen';
import PreparationScreen from './src/screens/PreparationScreen';

const Tab = createBottomTabNavigator();

const C = {
  bg: '#08080f',
  card: '#0f0f20',
  gold: '#c9a84c',
  muted: '#7a7080',
  border: 'rgba(201,168,76,0.18)',
};

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.45 }}>{icon}</Text>;
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: C.bg, borderBottomWidth: 1, borderBottomColor: C.border },
          headerTintColor: C.gold,
          headerTitleStyle: { fontWeight: '700', letterSpacing: 1 },
          tabBarStyle: {
            backgroundColor: C.card,
            borderTopWidth: 1,
            borderTopColor: C.border,
            height: 68,
            paddingBottom: 10,
            paddingTop: 6,
          },
          tabBarActiveTintColor: C.gold,
          tabBarInactiveTintColor: C.muted,
          tabBarLabelStyle: { fontSize: 10, fontWeight: '600', letterSpacing: 0.5 },
        }}
      >
        <Tab.Screen
          name="Moon"
          component={MoonScreen}
          options={{
            title: 'Moon Cycle',
            tabBarLabel: 'Moon',
            tabBarIcon: ({ focused }) => <TabIcon icon="🌙" focused={focused} />,
            headerTitle: '☽ Spagyrica',
          }}
        />
        <Tab.Screen
          name="Plants"
          component={PlantsScreen}
          options={{
            title: 'Plant Compendium',
            tabBarLabel: 'Plants',
            tabBarIcon: ({ focused }) => <TabIcon icon="🌿" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Chemistry"
          component={ChemistryScreen}
          options={{
            title: 'Chemical Formulary',
            tabBarLabel: 'Formulas',
            tabBarIcon: ({ focused }) => <TabIcon icon="⚗️" focused={focused} />,
          }}
        />
        <Tab.Screen
          name="Preparation"
          component={PreparationScreen}
          options={{
            title: 'Preparation Guide',
            tabBarLabel: 'Prepare',
            tabBarIcon: ({ focused }) => <TabIcon icon="📖" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
