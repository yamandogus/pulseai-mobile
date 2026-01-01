import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useColors } from '../../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Mock Data for Charts
const WEEKLY_DATA = [
  { day: 'Mon', value: 40, label: '4h' },
  { day: 'Tue', value: 70, label: '7h' },
  { day: 'Wed', value: 50, label: '5h' },
  { day: 'Thu', value: 85, label: '8.5h' },
  { day: 'Fri', value: 60, label: '6h' },
  { day: 'Sat', value: 30, label: '3h' },
  { day: 'Sun', value: 20, label: '2h' },
];

export default function InsightsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: insets.top + 20,
        paddingBottom: 100,
        paddingHorizontal: 20
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="mb-6">
        <Text style={{ color: colors.text }} className="text-3xl font-bold tracking-tight">
          Insights
        </Text>
        <Text style={{ color: colors.textSecondary }} className="text-base mt-2 opacity-80">
          Your productivity overview
        </Text>
      </View>

      {/* Main Stats Cards */}
      <View className="flex-row gap-4 mb-6">
        {/* Efficiency Card */}
        <View
          style={{ backgroundColor: colors.primary, borderRadius: 24 }}
          className="flex-1 p-5 shadow-lg shadow-indigo-500/20"
        >
          <View className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mb-3">
            <Ionicons name="flash" size={20} color="white" />
          </View>
          <Text className="text-white/80 text-sm font-medium">Efficiency</Text>
          <Text className="text-white text-3xl font-bold mt-1">+12%</Text>
          <Text className="text-white/60 text-xs mt-2">vs last week</Text>
        </View>

        {/* Tasks Done Card */}
        <View
          style={{ backgroundColor: colors.card, borderRadius: 24, borderWidth: 1, borderColor: colors.border }}
          className="flex-1 p-5 shadow-sm"
        >
          <View className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full items-center justify-center mb-3">
            <Ionicons name="checkmark-circle" size={20} color="#10B981" />
          </View>
          <Text style={{ color: colors.textSecondary }} className="text-sm font-medium">Tasks Done</Text>
          <Text style={{ color: colors.text }} className="text-3xl font-bold mt-1">42</Text>
          <Text className="text-emerald-500 text-xs mt-2 font-medium">On track</Text>
        </View>
      </View>

      {/* Weekly Activity Chart Area */}
      <View
        style={{ backgroundColor: colors.card, borderRadius: 24 }}
        className="p-5 mb-6 shadow-sm border border-gray-100 dark:border-gray-800"
      >
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text style={{ color: colors.text }} className="text-lg font-bold">Activity</Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">This Week</Text>
          </View>
          <View className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
            <Text style={{ color: colors.textSecondary }} className="text-xs font-medium">Weekly</Text>
          </View>
        </View>

        {/* Bar Chart Visualization */}
        <View className="flex-row items-end justify-between h-40">
          {WEEKLY_DATA.map((item, index) => (
            <View key={index} className="items-center w-8">
              {/* Bar */}
              <View
                style={{
                  height: `${item.value}%`,
                  backgroundColor: item.value > 60 ? colors.primary : colors.border,
                  borderRadius: 8,
                  width: '100%'
                }}
              />
              {/* Label */}
              <Text style={{ color: colors.textSecondary }} className="text-[10px] mt-2 font-medium">
                {item.day}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Detailed Stats Grid */}
      <Text style={{ color: colors.text }} className="text-lg font-bold mb-4">Details</Text>

      <View className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-4 gap-4">
        <StatRow
          icon="time"
          color="#F59E0B"
          label="Time Saved"
          value="12.5 hrs"
          subValue="Automations"
          colors={colors}
        />
        <View style={{ height: 1, backgroundColor: colors.border }} />
        <StatRow
          icon="chatbubbles"
          color="#EC4899"
          label="AI Interactions"
          value="154"
          subValue="12 today"
          colors={colors}
        />
        <View style={{ height: 1, backgroundColor: colors.border }} />
        <StatRow
          icon="trending-up"
          color="#3B82F6"
          label="Focus Score"
          value="8.4"
          subValue="/ 10.0"
          colors={colors}
        />
      </View>

    </ScrollView>
  );
}

function StatRow({ icon, color, label, value, subValue, colors }: any) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <View
          style={{ backgroundColor: color + '20' }}
          className="w-10 h-10 rounded-2xl items-center justify-center mr-4"
        >
          <Ionicons name={icon} size={20} color={color} />
        </View>
        <View>
          <Text style={{ color: colors.text }} className="font-semibold text-base">
            {label}
          </Text>
        </View>
      </View>
      <View className="items-end">
        <Text style={{ color: colors.text }} className="font-bold text-base">
          {value}
        </Text>
        <Text style={{ color: colors.textSecondary }} className="text-xs">
          {subValue}
        </Text>
      </View>
    </View>
  );
}
