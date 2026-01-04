import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useColors } from '@/context/ThemeContext';
import AppHeader from '@/components/app/AppHeader';

import HomeScreen from '@/app/screens/home/HomeScreen';
import TasksNavigator from './TasksNavigator';
import PulseAi from '@/app/screens/pulseAi/PulseAiScreen';
import InsightsScreen from '@/app/screens/insights/InsightsScreen';
import ProfileScreen from '@/app/screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { isDark } = useTheme();
  const colors = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: true,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
          header: () => (
            <AppHeader
              title="Ana Sayfa"
              subtitle="Hoş geldin 👋"
              onRightPress={() => { }}
            />
          ),
          headerShown: true,
          tabBarShowLabel: true,
        }}
      />
      <Tab.Screen
        name="Tasks"
        component={TasksNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'checkmark-done' : 'checkmark-done-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
          tabBarShowLabel: true,
        }}
      />
      <Tab.Screen
        name="pulseAi"
        component={PulseAi}
        options={{
          tabBarLabel: () => null,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#6366F1',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -20,
                shadowColor: '#6366F1',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}>
              <Ionicons
                name="sparkles"
                size={26}
                color="white"
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'stats-chart' : 'stats-chart-outline'}
              size={size}
              color={color}
            />
          ),
          headerShown: false,
          tabBarShowLabel: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
          ),
          headerShown: false,
          tabBarShowLabel: true,
        }}
      />
    </Tab.Navigator>
  );
}
