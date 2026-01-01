import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useTheme, useColors } from '../../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function InsightsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();

  const MOCK_WEEKLY_DATA = [
    { day: 'Pzt', val: 40 },
    { day: 'Sal', val: 70 },
    { day: 'Çar', val: 50 },
    { day: 'Per', val: 90 },
    { day: 'Cum', val: 60 },
    { day: 'Cmt', val: 30 },
    { day: 'Paz', val: 20 },
  ];

  const maxVal = Math.max(...MOCK_WEEKLY_DATA.map(d => d.val));

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingHorizontal: 20,
          paddingBottom: 40
        }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ color: colors.text }} className="text-3xl font-bold mb-6">İçgörüler</Text>

        {/* Weekly Activity Chart */}
        <View
          style={{ backgroundColor: colors.card }}
          className="p-6 rounded-3xl mb-6 border border-gray-100 dark:border-gray-800"
        >
          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-row items-center gap-2">
              <View className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/40 items-center justify-center">
                <Ionicons name="stats-chart" size={16} color={colors.primary} />
              </View>
              <Text style={{ color: colors.text }} className="text-lg font-bold">Haftalık Aktivite</Text>
            </View>
            <Text style={{ color: colors.textSecondary }} className="text-sm font-medium">%12 Artış</Text>
          </View>

          <View className="flex-row items-end justify-between h-40">
            {MOCK_WEEKLY_DATA.map((item, index) => (
              <View key={index} className="items-center gap-2">
                <View
                  style={{
                    height: (item.val / maxVal) * 120,
                    width: width / 12,
                    backgroundColor: item.val === maxVal ? colors.primary : (isDark ? '#374151' : '#E5E7EB'),
                    borderRadius: 8
                  }}
                />
                <Text style={{ color: colors.textSecondary }} className="text-xs font-medium">{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Main Stats Cards */}
        <View className="flex-row gap-4 mb-6">
          <View
            className="flex-1 p-5 rounded-2xl border border-gray-100 dark:border-gray-800"
            style={{ backgroundColor: colors.card }}
          >
            <View className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 items-center justify-center mb-3">
              <Ionicons name="flash" size={20} color="#10B981" />
            </View>
            <Text style={{ color: colors.textSecondary }} className="text-xs font-bold uppercase tracking-wide mb-1">Verimlilik</Text>
            <Text style={{ color: colors.text }} className="text-2xl font-bold">%94</Text>
          </View>

          <View
            className="flex-1 p-5 rounded-2xl border border-gray-100 dark:border-gray-800"
            style={{ backgroundColor: colors.card }}
          >
            <View className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 items-center justify-center mb-3">
              <Ionicons name="checkbox" size={20} color="#3B82F6" />
            </View>
            <Text style={{ color: colors.textSecondary }} className="text-xs font-bold uppercase tracking-wide mb-1">Tamamlanan</Text>
            <Text style={{ color: colors.text }} className="text-2xl font-bold">128</Text>
          </View>
        </View>

        {/* Detailed Stats List */}
        <View className="mb-4">
          <Text style={{ color: colors.text }} className="text-lg font-bold mb-4">Detaylı İstatistikler</Text>

          {[
            { label: 'Kazanılan Süre', val: '4.5 Saat', icon: 'time', color: '#F59E0B' },
            { label: 'AI Etkileşimleri', val: '286', icon: 'chatbubbles', color: '#8B5CF6' },
            { label: 'Odaklanma Puanı', val: '8.5/10', icon: 'scan-circle', color: '#EC4899' },
          ].map((stat, i) => (
            <View
              key={i}
              style={{ backgroundColor: colors.card }}
              className="flex-row items-center justify-between p-4 rounded-xl mb-3 border border-gray-100 dark:border-gray-800"
            >
              <View className="flex-row items-center gap-4">
                <View style={{ backgroundColor: `${stat.color}15` }} className="w-10 h-10 rounded-full items-center justify-center">
                  <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                </View>
                <Text style={{ color: colors.text }} className="text-base font-medium">{stat.label}</Text>
              </View>
              <Text style={{ color: colors.text }} className="text-lg font-bold">{stat.val}</Text>
            </View>
          ))}
        </View>

      </ScrollView>
    </View>
  );
}

