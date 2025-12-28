import { View, Text } from "react-native";
import { useRoute, RouteProp } from '@react-navigation/native';

type TasksStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId?: string };
};

type TaskDetailRouteProp = RouteProp<TasksStackParamList, 'TaskDetail'>;

export default function TaksDetailScreen() {
  const route = useRoute<TaskDetailRouteProp>();
  const { taskId } = route.params || {};

  return (
    <View className="flex-1 p-4">
      <Text className="text-2xl font-bold">Task Detail</Text>
      {taskId && <Text className="mt-2">Task ID: {taskId}</Text>}
    </View>
  );
}