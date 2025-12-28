import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Tab Navigator Param List
type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  pulseAi: undefined;
  Insights: undefined;
  Profile: undefined;
};

// Stack Navigator Param List
type RootStackParamList = {
  MainTabs: undefined;
  Notifications: undefined;
};

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  title: string;
  subtitle?: string;
  onRightPress?: () => void;
};

export default function AppHeader({subtitle}: Props) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();

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
      className="flex-row items-center justify-between bg-[#f5f5f5]">
      {/* SOL */}
      <View className="flex-col">
        <Text className="text-sm capitalize text-gray-500">{today}</Text>

        {subtitle && <Text className="text-xl font-bold text-black">Merhaba Doğuş 👋</Text>}
      </View>

      {/* SAĞ */}
      <View className="flex-row items-center gap-4">
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Ionicons name="notifications-outline" size={28} color="#111" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg' }}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
