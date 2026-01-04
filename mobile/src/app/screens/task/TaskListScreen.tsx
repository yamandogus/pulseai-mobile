import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  FadeInDown
} from 'react-native-reanimated';
import { useTheme, useColors } from '../../../context/ThemeContext';
import { useState } from 'react';
import { getPriorityColor, getCategoryIcon } from './task';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { useTaskStore } from '@/store/task/task.store';

export default function TaskListScreen() {
  const searchOpen = useSharedValue(0);
  const { isDark } = useTheme();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  
  const [filter, setFilter] = useState<'Tümü' | 'Aktif' | 'Tamamlandı'>('Tümü');
  const navigation = useNavigation();

  const animatedHeight = useDerivedValue(() =>
    withTiming(searchOpen.value ? 60 : 0, { duration: 300 })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: searchOpen.value ? 1 : 0,
    marginBottom: searchOpen.value ? 16 : 0,
  }));

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Aktif') return !task.checked;
    if (filter === 'Tamamlandı') return task.checked;
    return true;
  });

  const completedCount = tasks.filter(t => t.checked).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          paddingTop: insets.top + 10,
          paddingHorizontal: 20,
          paddingBottom: 16,
          backgroundColor: colors.background,
        }}
        className="z-10"
      >
        {/* HEADER */}
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text style={{ color: colors.text }} className="text-3xl font-bold tracking-tight">Görevler</Text>
            <View className="flex-row items-center mt-1">
              <View className="bg-green-500/10 px-2 py-0.5 rounded-md mr-2">
                <Text className="text-green-500 text-xs font-bold">{completedCount} TAMAMLANDI</Text>
              </View>
              <Text style={{ color: colors.textSecondary }} className="text-sm font-medium">
                {tasks.length - completedCount} bekleyen
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => { searchOpen.value = searchOpen.value ? 0 : 1; }}
            style={{ backgroundColor: colors.card }}
            className="w-12 h-12 rounded-full items-center justify-center shadow-sm border border-gray-100 dark:border-gray-800">
            <Ionicons name="search" size={22} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* SEARCH ACCORDION */}
        <Animated.View style={animatedStyle} className="overflow-hidden">
          <View className="h-[60px] justify-center">
            <View
              style={{ backgroundColor: colors.card }}
              className="flex-row items-center px-4 h-12 rounded-2xl border border-gray-200 dark:border-gray-700"
            >
              <Ionicons name="search-outline" size={20} color={colors.textSecondary} style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Görevlerde ara..."
                placeholderTextColor={colors.textSecondary}
                style={{ color: colors.text, flex: 1, height: '100%' }}
              />
            </View>
          </View>
        </Animated.View>

        {/* FILTER TABS */}
        <View className="flex-row">
          {(['Tümü', 'Aktif', 'Tamamlandı'] as const).map((tab) => {
            const isActive = filter === tab;
            return (
              <TouchableOpacity
                key={tab}
                onPress={() => setFilter(tab)}
                style={{
                  backgroundColor: isActive ? colors.primary : 'transparent',
                }}
                className={`px-5 py-2 rounded-full mr-2 ${!isActive && 'border border-gray-200 dark:border-gray-700'}`}
              >
                <Text
                  style={{
                    color: isActive ? '#FFFFFF' : colors.textSecondary,
                    fontWeight: isActive ? '600' : '500'
                  }}
                  className="text-sm"
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* TASK LIST */}
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredTasks.map((task, index) => {
          const priorityColors = getPriorityColor(task.priority, isDark);
          const completedSubtasks = task.subtasks?.filter(s => s.checked).length || 0;
          const totalSubtasks = task.subtasks?.length || 0;

          return (
            <Animated.View
              entering={FadeInDown.delay(index * 100).springify()}
              key={task.id}
              style={{
                backgroundColor: colors.card,
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 12,
                elevation: 3,
                opacity: task.checked ? 0.6 : 1,
              }}
              className="mb-4 rounded-3xl p-5 border border-gray-100 dark:border-gray-800"
            >
              {/* Header Row */}
              <View className="flex-row items-start justify-between">
                <View className="flex-row items-start gap-4 flex-1">
                  <Checkbox
                    value={task.checked}
                    onValueChange={() => toggleTask(task.id)}
                    color={task.checked ? colors.primary : undefined}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: 8,
                      borderColor: colors.border,
                      marginTop: 2
                    }}
                  />
                  <View className="flex-1">
                    {/* Category & Date Row */}
                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md">
                        <Ionicons name={getCategoryIcon(task.category)} size={12} color={colors.textSecondary} />
                        {/* <Text style={{ color: colors.textSecondary }} className="text-[10px] ml-1 font-medium uppercase tracking-wider">{task.category}</Text> */}
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons name="calendar-clear-outline" size={12} color={colors.textSecondary} />
                        <Text style={{ color: colors.textSecondary }} className="text-xs ml-1">{task.dueDate}</Text>
                      </View>
                    </View>

                    <Text
                      style={{
                        color: colors.text,
                        textDecorationLine: task.checked ? 'line-through' : 'none',
                      }}
                      className="text-lg font-bold leading-6 mb-1"
                    >
                      {task.title}
                    </Text>

                    {/* Description */}
                    {task.description && !task.checked && (
                      <Text style={{ color: colors.textSecondary }} className="text-sm leading-5 mb-3" numberOfLines={2}>
                        {task.description}
                      </Text>
                    )}

                    {/* Subtasks Bar */}
                    {task.subtasks && task.subtasks.length > 0 && !task.checked && (
                      <View className="mt-2 mb-3">
                        <View className="flex-row justify-between mb-1">
                          <Text style={{ color: colors.textSecondary }} className="text-[10px] uppercase font-bold tracking-wider">İlerleme</Text>
                          <Text style={{ color: colors.textSecondary }} className="text-[10px] font-bold">{Math.round((completedSubtasks / totalSubtasks) * 100)}%</Text>
                        </View>
                        <View style={{ backgroundColor: colors.border, height: 6, borderRadius: 3, overflow: 'hidden' }}>
                          <View
                            style={{
                              backgroundColor: colors.primary,
                              width: `${(completedSubtasks / totalSubtasks) * 100}%`,
                              height: 6,
                              borderRadius: 3,
                            }}
                          />
                        </View>
                      </View>
                    )}

                    {/* Footer Row: Tags and AI */}
                    <View className="flex-row items-center justify-between mt-1">
                      <View className="flex-row gap-2">
                        {task.tags?.slice(0, 2).map((tag, i) => (
                          <Text key={i} style={{ color: colors.primary }} className="text-xs font-medium">#{tag}</Text>
                        ))}
                      </View>

                      {task.aiSuggestion && !task.checked && (
                        <View className="flex-row items-center bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full border border-indigo-100 dark:border-indigo-800">
                          <Ionicons name="sparkles" size={10} color={colors.primary} />
                          <Text style={{ color: colors.primary }} className="text-[10px] ml-1 font-bold">AI İPUCU</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>

                {/* Priority Badge */}
                <View style={{ backgroundColor: priorityColors.bg }} className="w-2 h-2 rounded-full mt-2 ml-2" />
              </View>
            </Animated.View>
          );
        })}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CreateTask' as never)}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 20,
          backgroundColor: colors.primary,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 8,
          width: 64,
          height: 64,
          borderRadius: 32,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}
