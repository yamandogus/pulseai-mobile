import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import HomeScreen from './screens/home/HomeScreen';
import TaskListScreen from './screens/task/TaskListScreen';
import TaksDetailScreen from './screens/task/TaksDetailScreen';
import InsightsScreen from './screens/insights/InsightsScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import NotificationsScreen from './screens/notifications/NotificationsScreen';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import AppHeader from '@/components/app/AppHeader';
import PulseAi from './screens/pulseAi/PulseAiScreen';
import { useTheme, useColors } from '../context/ThemeContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Custom Navigation Themes
const LightNavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1A1A1A',
    border: '#E5E7EB',
    primary: '#6366F1',
  },
};

const DarkNavigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#0F172A',
    card: '#1E293B',
    text: '#F8FAFC',
    border: '#334155',
    primary: '#818CF8',
  },
};

// Tasks için Stack Navigator (TaskList -> TaskDetail)
function TasksStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{
          headerShown: false,
          title: 'Görevler',
        }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaksDetailScreen}
        options={{
          headerShown: true,
          title: 'Görev Detayı',
        }}
      />
    </Stack.Navigator>
  );
}

import LoginScreen from './screens/auth/LoginScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import OperationsScreen from './screens/operations/OperationsScreen';

// ... (previous imports)

// Auth Stack Navigator
function AuthStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Ana Stack Navigator (Tab + diğer sayfalar)
function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 
        NOTE: For production, you would conditionally render Auth vs MainTabs 
        based on authentication state (e.g., user ? MainTabs : Auth).
        For now, allowing navigation to both for UI verification.
      */}
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="Auth" component={AuthStackNavigator} />

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
          title: 'İşlemler' // "Operations" in Turkish to match existing app language
        }}
      />
    </Stack.Navigator>
  );
}

// Tab Navigator
function TabNavigator() {
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
        component={TasksStackNavigator}
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

