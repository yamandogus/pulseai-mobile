import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, useColors } from '../context/ThemeContext';
import { LightNavigationTheme, DarkNavigationTheme } from '@/navigation/themes';
import RootNavigator from '@/navigation/RootNavigator';

export default function App() {
  const { isDark } = useTheme();
  const colors = useColors();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <NavigationContainer theme={isDark ? DarkNavigationTheme : LightNavigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}
