import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
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

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tasks için Stack Navigator (TaskList -> TaskDetail)
function TasksStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="TaskList" 
        component={TaskListScreen}
        options={{
          headerShown: true,
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

// Ana Stack Navigator (Tab + diğer sayfalar)
function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen 
        name="Notifications" 
        component={NotificationsScreen}
        options={{ 
          headerShown: true, 
          title: 'Bildirimler' 
        }}
      />
    </Stack.Navigator>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: true,
        headerShown: true,
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
              onRightPress={() => {}}
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
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#2563eb',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: -20,
              }}>
              <Ionicons
                className="ml-1"
                name="sparkles"
                size={26}
                color={focused ? 'white' : 'dark'}
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
          headerShown: true,
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
          headerShown: true,
          tabBarShowLabel: true,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
