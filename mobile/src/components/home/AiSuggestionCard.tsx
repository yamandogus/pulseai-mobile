import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme, useColors } from '../../context/ThemeContext';
import BottomSheet from '../ui/BottomSheet';
import { useSharedValue } from 'react-native-reanimated';

export default function PulseAiSuggestions() {
  const isOpen = useSharedValue(false);
  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };
  const { isDark } = useTheme();
  const colors = useColors();

  const onButtonPress = () => {
    console.log('Button Pressed');
    toggleSheet(); // Close sheet after action if desired
  };

  return (
    <>
      <View
        style={{
          backgroundColor: isDark ? '#1E3A5F' : '#f0f9ff',
          borderColor: colors.border,
          borderWidth: isDark ? 1 : 0,
        }}
        className="mt-10 flex flex-col gap-4 p-4 rounded-xl"
      >
        <View className="flex flex-row items-center gap-4">
          <View>
            <Ionicons className="ml-1" name="sparkles" color={isDark ? '#60A5FA' : '#5dade8'} size={26} />
          </View>
          <Text style={{ color: isDark ? '#60A5FA' : '#60a5fa' }} className="text-xl font-bold">AI Önerisi</Text>
        </View>
        <View>
          <Text style={{ color: colors.text }} className="text-md">
            Bugün toplantıların yoğun. &quot;Haftalık Rapor&quot; görevini 14.00&apos;e ertelemek
            ister misin?
          </Text>
        </View>
        <View className="flex-row gap-4">
          <TouchableOpacity
            style={{ backgroundColor: isDark ? colors.surface : 'white', borderColor: colors.border, borderWidth: isDark ? 1 : 0 }}
            className="h-12 flex-1 items-center justify-center rounded-md"
          >
            <Text style={{ color: colors.primary }} className="font-bold">Yoksay</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={toggleSheet}
            className="h-12 flex-1 items-center justify-center rounded-md bg-[#0384c6]"
          >
            <Text className="font-bold text-white">Öneriyi Gör</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheet
        isOpen={isOpen}
        toggleSheet={toggleSheet}
        duration={500}
        headerTitle="AI Önerisi"
        buttonText="Uygula"
        onButtonPress={onButtonPress}
      >
        <View className="flex flex-col gap-4">
          <Text className="text-md text-gray-700 text-center">
            Bugün toplantıların yoğun. &quot;Haftalık Rapor&quot; görevini 14.00&apos;e ertelemek
            ister misin?
          </Text>
        </View>
      </BottomSheet>
    </>
  );
}

