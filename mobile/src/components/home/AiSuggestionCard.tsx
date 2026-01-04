import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useColors, useTheme } from '@/context/ThemeContext';
import { useState } from 'react';
import UpdateSheet from './UpdateSheet';

export default function PulseAiSuggestions() {
  const colors = useColors();
  const { isDark } = useTheme();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { id: '1h', label: '1 Saat Sonra', emoji: '⏰', time: new Date(Date.now() + 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { id: 'evening', label: 'Bu Akşam', emoji: '🌙', time: '20:00' },
    { id: 'tomorrow', label: 'Yarın Sabah', emoji: '🌅', time: '09:00' },
    { id: 'weekend', label: 'Haftasonu', emoji: '🌴', time: 'Cmt 10:00' },
  ];

  return (
    <View className="mb-6">
      <View
        style={{
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          elevation: 6,
        }}
        className="overflow-hidden rounded-3xl">
        <LinearGradient
          colors={isDark ? ['#4338ca', '#6366F1'] : ['#E0E7FF', '#EEF2FF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 20 }}>
          {/* Decorative Elements - Subtle */}
          <View className="absolute right-0 top-0 h-32 w-32 translate-x-8 translate-y-[-8] rounded-bl-full bg-white/10 dark:bg-white/5" />

          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View
                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : colors.primary }}
                className="h-8 w-8 items-center justify-center rounded-full">
                <Ionicons name="sparkles" size={16} color="white" />
              </View>
              <Text
                style={{ color: isDark ? 'white' : colors.primary }}
                className="ml-2 text-sm font-bold tracking-wide">
                Yapay Zeka Önerisi
              </Text>
            </View>
            <TouchableOpacity>
              <Ionicons
                name="close"
                size={20}
                color={isDark ? 'white' : colors.textSecondary}
                style={{ opacity: 0.6 }}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={{ color: isDark ? 'white' : colors.text }}
            className="mt-1 text-lg font-bold leading-6">
            &quot;Haftalık Rapor&quot; 14:00&apos;te teslim edilmeli.
          </Text>
          <Text
            style={{ color: isDark ? '#E0E7FF' : colors.textSecondary }}
            className="mb-5 mt-1 text-sm leading-5">
            Bugün programın çok yoğun. Bunu yarına ertelememi ister misin?
          </Text>

          <View className="flex-row gap-3">
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setIsSheetOpen(true);
              }}
              style={{ backgroundColor: isDark ? 'white' : colors.primary }}
              className="flex-1 items-center rounded-xl px-5 py-3 shadow-sm">
              <Text
                style={{ color: isDark ? colors.primary : 'white' }}
                className="text-sm font-bold">
                Ertele
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'white',
                borderWidth: 1,
                borderColor: isDark ? 'transparent' : '#E5E7EB',
              }}
              className="flex-1 items-center rounded-xl px-5 py-3">
              <Text
                style={{ color: isDark ? 'white' : colors.text }}
                className="text-sm font-medium">
                Yoksay
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <UpdateSheet
        isOpen={isSheetOpen}
        toggleSheet={() => {
          setIsSheetOpen(!isSheetOpen);
        }}
        headerTitle="Görevi Ertele"
        buttonText="Güncelle"
        onButtonPress={() => {
          setIsSheetOpen(false);
          setSelectedOption(null);
        }}>
        <View className="w-full">
          <Text style={{ color: colors.textSecondary }} className="text-sm mb-4 text-center">
            Ertelemek istediğiniz zamanı seçiniz
          </Text>
          
          <View className="flex-row flex-wrap gap-3 justify-between">
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                onPress={() => setSelectedOption(option.id)}
                style={{
                  backgroundColor: selectedOption === option.id ? colors.primary + '20' : colors.card,
                  borderColor: selectedOption === option.id ? colors.primary : colors.border,
                  borderWidth: 1,
                  width: '48%',
                }}
                className="p-4 rounded-xl items-center justify-center mb-2"
              >
                <Text style={{ fontSize: 24, marginBottom: 8 }}>{option.emoji}</Text>
                <Text 
                  style={{ 
                    color: selectedOption === option.id ? colors.primary : colors.text,
                    fontWeight: selectedOption === option.id ? '700' : '500'
                  }}
                  className="text-sm mb-1"
                >
                  {option.label}
                </Text>
                <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{option.time}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={{ 
              marginTop: 8,
              padding: 16,
              borderRadius: 12,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
             <Ionicons name="calendar" size={20} color={colors.textSecondary} style={{ marginRight: 8 }} />
             <Text style={{ color: colors.text }}>Farklı bir tarih seç...</Text>
          </TouchableOpacity>
        </View>
      </UpdateSheet>
    </View>
  );
}
