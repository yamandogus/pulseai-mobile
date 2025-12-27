import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PulseAiSuggestions() {
  return (
    <View className="mt-10 flex flex-col gap-4 bg-[#f0f9ff] p-4">
      <View className="flex flex-row items-center gap-4">
        <View>
          <Ionicons className="ml-1" name="sparkles" color={'#5dade8'} size={26} />
        </View>
        <Text className="text-xl font-bold text-blue-400">AI Önerisi</Text>
      </View>
      <View>
        <Text className="text-md">
          Bugün toplantıların yoğun. &quot;Haftalık Rapor&quot; görevini 14.00&apos;e ertelemek
          ister misin?
        </Text>
      </View>
      <View className="flex-row gap-4">
        <TouchableOpacity className="h-12 flex-1 items-center justify-center rounded-md bg-white">
          <Text className="font-bold text-blue-400">Yoksay</Text>
        </TouchableOpacity>

        <TouchableOpacity className="h-12 flex-1 items-center justify-center rounded-md bg-[#0384c6]">
          <Text className="font-bold text-white">Uygula</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
