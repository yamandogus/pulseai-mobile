import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressBar } from '../ui/Propgress';

export default function HomeHeader() {
  return (
    <View className="mt-10 flex flex-col gap-4 rounded-xl bg-[#5daee6] p-4">
      <View>
        <Text className="text-lg font-bold text-white">Bugünün özeti</Text>
      </View>
      <View className="flex flex-row items-center justify-between">
        <View>
          <Text className="text-4xl font-bold text-white">8 Görev</Text>
        </View>
        <View>
          <View className="rounded-lg bg-[#87b9d9] p-2">
            <Ionicons name="checkmark-circle" size={40} color={'white'} />
          </View>
        </View>
      </View>
      <View className="flex flex-row justify-between">
        <Text className="text-lg font-bold text-white">%45 Tamamlandı</Text>
        <Text className="text-lg font-bold text-white">3/8 bitti</Text>
      </View>
      <View>
        <ProgressBar value={11} />
      </View>
    </View>
  );
}
