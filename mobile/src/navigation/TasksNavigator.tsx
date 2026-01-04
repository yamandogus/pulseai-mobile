import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '@/app/screens/task/TaskListScreen';
import CreateTaskScreen from '@/app/screens/task/CreateTaskScreen';
import TaskDetailScreen from '@/app/screens/task/TaskDetailScreen';

const Stack = createNativeStackNavigator();

export default function TasksNavigator() {
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
        component={TaskDetailScreen}
        options={{
          headerShown: true,
          title: 'Görev Detayı',
        }}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTaskScreen}
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_bottom'
        }}
      />
    </Stack.Navigator>
  );
}
