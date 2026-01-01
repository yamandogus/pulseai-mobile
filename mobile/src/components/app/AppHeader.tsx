import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useColors } from '@/context/ThemeContext';

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

export default function AppHeader({ subtitle }: Props) {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const colors = useColors();

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
        backgroundColor: colors.background,
      }}
      className="flex-row items-center justify-between"
    >
      {/* SOL */}
      <View className="flex-col">
        <Text style={{ color: colors.textSecondary }} className="text-sm capitalize font-medium">{today}</Text>

        {subtitle && (
          <View className="flex-row items-baseline">
            <Text style={{ color: colors.text }} className="text-2xl font-bold tracking-tight">Merhaba Doğuş</Text>
            <Text className="text-2xl ml-1">👋</Text>
          </View>
        )}
      </View>

      {/* SAĞ */}
      <View className="flex-row items-center gap-3">
        <TouchableOpacity
          onPress={() => navigation.navigate('Notifications')}
          style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }}
          className="w-10 h-10 rounded-full items-center justify-center relative"
        >
          <Ionicons name="notifications-outline" size={22} color={colors.text} />
          <View
            style={{ backgroundColor: '#EF4444', borderColor: colors.card }}
            className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <View className="w-10 h-10 rounded-full overflow-hidden border-2 border-white dark:border-gray-800 shadow-sm">
            <Image
              source={{ uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg' }}
              style={{ width: '100%', height: '100%' }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

