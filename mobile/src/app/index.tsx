import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/home/HomeScreen';
import TaskListScreen from './screens/task/TaskListScreen';
import InsightsScreen from './screens/insights/InsightsScreen';
import NotificationsScreen from './screens/notifications/NotificationsScreen';
import ProfileScreen from './screens/profile/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import AppHeader from '@/components/app/AppHeader';

const Tab = createBottomTabNavigator();

// screenOptions={{
//           headerShown: true,
//           tabBarShowLabel: false,
//         }}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          headerShown: true, // default açık
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
          component={TaskListScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'checkmark-done' : 'checkmark-done-outline'}
                size={size}
                color={color}
              />
            ),
            headerShown: true,
            tabBarShowLabel: true,
          }}
        />
        <Tab.Screen
          name="Insights"
          component={InsightsScreen}
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
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? 'notifications' : 'notifications-outline'}
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
    </NavigationContainer>
  );
}
