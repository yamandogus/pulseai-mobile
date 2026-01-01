import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/context/ThemeContext';

export default function HomeHeader() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: insets.top + 10,
        marginBottom: 16
      }}
      className="flex-row items-center justify-between"
    >
      <View className="flex-row items-center gap-3">
        <View
          style={{
            shadowColor: "black",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2
          }}
        >
          <View className="w-10 h-10 bg-gray-200 rounded-full items-center justify-center overflow-hidden border-2 border-white dark:border-gray-800">
            <Ionicons name="person" size={24} color="#9CA3AF" />
          </View>
        </View>
        <View>
          <Text style={{ color: colors.textSecondary }} className="text-xs font-semibold uppercase tracking-wide opacity-80">
            Thursday, Jan 1
          </Text>
          <View className="flex-row items-baseline">
            <Text style={{ color: colors.text }} className="text-xl font-bold">
              Hello, John
            </Text>
            <Text className="text-xl ml-1">👋</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }}
        className="w-10 h-10 rounded-full items-center justify-center relative"
      >
        <Ionicons name="notifications-outline" size={22} color={colors.text} />
        <View
          // Matching the badge color to primary or a clear alert color
          style={{ backgroundColor: '#EF4444', borderColor: colors.card }}
          className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border-2"
        />
      </TouchableOpacity>
    </View>
  );
}

