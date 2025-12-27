import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  title: string;
  subtitle?: string;
  onRightPress?: () => void;
};

export default function AppHeader({ title, subtitle, onRightPress }: Props) {
  const insets = useSafeAreaInsets();

  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingHorizontal: 16,
        height: insets.top + 72,
      }}
      className="flex-row items-center justify-between bg-white">
      {/* SOL */}
      <View className="flex-col">
        <Text className="text-sm capitalize text-gray-500">{today}</Text>

        {subtitle && <Text className="text-xl font-bold text-black">Merhaba Doğuş 👋</Text>}
      </View>

      {/* SAĞ */}
      <View className="flex-row items-center gap-4">
        <TouchableOpacity onPress={onRightPress}>
          <Ionicons name="notifications-outline" size={28} color="#111" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onRightPress}>
          <Image
            source={{ uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg' }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
