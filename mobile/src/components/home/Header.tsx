import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeHeader() {
  return (
    <View className="mt-10 flex flex-col gap-4 rounded-md bg-[#5daee6] p-4">
      <View>
        <Text className="text-white">Bugünün özeti</Text>
      </View>
      <View className="flex flex-row justify-between">
        <View>
          <Text className="text-4xl font-bold text-white">8 Görev</Text>
        </View>
        <View>
          <View className="rounded-md bg-[#87b9d9]">
            <Ionicons name="checkmark" size={40} color={'white'} />
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-between">
        <Text className="text-white">%45 Tamamlandı</Text>
        <Text className="text-white">3/8 bitti</Text>
      </View>
      <View>
      </View>
    </View>
  );
}
