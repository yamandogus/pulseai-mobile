import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AndroidView from '@/components/ui/AndroidView';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

type TasksStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId?: string };
};

type NavigationProp = NativeStackNavigationProp<TasksStackParamList>;

export default function TaskListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [searchSelect, setSearchSelect] = useState(false);
  const insets = useSafeAreaInsets();

  const handleTaskPress = (taskId: string) => {
    navigation.navigate('TaskDetail', { taskId });
  };

  return (
    <AndroidView>
      <View className="mt-6 flex-row items-center justify-between gap-2">
        {!searchSelect && <Text className="text-2xl font-bold">Görevler</Text>}

        {searchSelect && (
          <TextInput
            placeholder="Ara..."
            className="flex-1 rounded-lg border-gray-200 bg-white px-3 py-3"
          />
        )}

        <Ionicons
          name="search"
          size={24}
          color="black"
          onPress={() => setSearchSelect((prev) => !prev)}
          style={{
            backgroundColor: 'white',
            padding: 6,
            borderRadius: 999,
          }}
        />
      </View>
    </AndroidView>
  );
}
