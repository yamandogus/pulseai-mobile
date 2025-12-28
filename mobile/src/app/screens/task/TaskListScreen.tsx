import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TasksStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId?: string };
};

type NavigationProp = NativeStackNavigationProp<TasksStackParamList>;

export default function TaskListScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleTaskPress = (taskId: string) => {
    navigation.navigate('TaskDetail', { taskId });
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold text-gray-900">Tasks</Text>
      <TouchableOpacity 
        onPress={() => handleTaskPress('123')}
        className="mt-4 px-4 py-2 bg-blue-500 rounded"
      >
        <Text className="text-white">Task Detayına Git</Text>
      </TouchableOpacity>
    </View>
  );
}