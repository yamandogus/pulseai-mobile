import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/store/auth/auth.store';

import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import NotificationsScreen from '@/app/screens/notifications/NotificationsScreen';
import OperationsScreen from '@/app/screens/operations/OperationsScreen';
import HelpCenterScreen from '@/app/screens/profile/HelpCenterScreen';
import PrivacyPolicyScreen from '@/app/screens/profile/PrivacyPolicyScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        // Auth Stack
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        // Main App Stack
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              headerShown: true,
              title: 'Bildirimler'
            }}
          />
          <Stack.Screen
            name="Operations"
            component={OperationsScreen}
            options={{
              headerShown: true,
              title: 'İşlemler'
            }}
          />
          <Stack.Screen
            name="HelpCenter"
            component={HelpCenterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicyScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
