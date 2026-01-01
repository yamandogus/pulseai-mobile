import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useColors, useTheme } from '@/context/ThemeContext';

export default function PulseAiSuggestions() {
  const colors = useColors();
  const { isDark } = useTheme();

  return (
    <View className="mb-6">
      <View
        style={{
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 6
        }}
        className="rounded-3xl overflow-hidden"
      >
        <LinearGradient
          colors={isDark ? ['#4338ca', '#6366F1'] : ['#E0E7FF', '#EEF2FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 20 }}
        >
          {/* Decorative Elements - Subtle */}
          <View className="absolute top-0 right-0 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-bl-full translate-x-8 translate-y-[-8]" />

          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : colors.primary }} className="w-8 h-8 rounded-full items-center justify-center">
                <Ionicons name="sparkles" size={16} color="white" />
              </View>
              <Text style={{ color: isDark ? 'white' : colors.primary }} className="text-sm font-bold ml-2 tracking-wide">Yapay Zeka Önerisi</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="close" size={20} color={isDark ? 'white' : colors.textSecondary} style={{ opacity: 0.6 }} />
            </TouchableOpacity>
          </View>

          <Text style={{ color: isDark ? 'white' : colors.text }} className="text-lg font-bold leading-6 mt-1">
            "Haftalık Rapor" 14:00'te teslim edilmeli.
          </Text>
          <Text style={{ color: isDark ? '#E0E7FF' : colors.textSecondary }} className="text-sm mt-1 mb-5 leading-5">
            Bugün programın çok yoğun. Bunu yarına ertelememi ister misin?
          </Text>

          <View className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.9}
              style={{ backgroundColor: isDark ? 'white' : colors.primary }}
              className="px-5 py-3 rounded-xl flex-1 items-center shadow-sm"
            >
              <Text style={{ color: isDark ? colors.primary : 'white' }} className="font-bold text-sm">Ertele</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'white', borderWidth: 1, borderColor: isDark ? 'transparent' : '#E5E7EB' }}
              className="px-5 py-3 rounded-xl flex-1 items-center"
            >
              <Text style={{ color: isDark ? 'white' : colors.text }} className="font-medium text-sm">Yoksay</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}
