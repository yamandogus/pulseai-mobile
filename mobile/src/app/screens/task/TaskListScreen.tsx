import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme, useColors } from '../../../context/ThemeContext';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { dummyTasks, getPriorityColor, getStatusColor, getCategoryIcon } from './task';


export default function TaskListScreen() {
  const searchOpen = useSharedValue(0);
  const { isDark } = useTheme();
  const colors = useColors();
  const [tasks, setTasks] = useState(dummyTasks);
  const [filter, setFilter] = useState<'Tümü' | 'Aktif' | 'Tamamlandı'>('Tümü');

  const animatedHeight = useDerivedValue(() =>
    withTiming(searchOpen.value ? 60 : 0, { duration: 300 })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: searchOpen.value ? 1 : 0,
  }));

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, checked: !task.checked, status: !task.checked ? 'Tamamlandı' : 'Beklemede' } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'Aktif') return !task.checked;
    if (filter === 'Tamamlandı') return task.checked;
    return true;
  });

  const completedCount = tasks.filter(t => t.checked).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingHorizontal: 16, paddingTop: 50 }}>
      {/* HEADER */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text style={{ color: colors.text }} className="text-2xl font-bold">Görevler</Text>
          <Text style={{ color: colors.textSecondary }} className="text-sm mt-1">
            {completedCount}/{tasks.length} tamamlandı
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => { searchOpen.value = searchOpen.value ? 0 : 1; }}
          style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }}
          className="flex-row items-center gap-2 rounded-full px-3 py-2">
          <Ionicons name="search" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* FILTER TABS */}
      <View className="flex-row gap-2 mt-4">
        {(['Tümü', 'Aktif', 'Tamamlandı'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setFilter(tab)}
            style={{
              backgroundColor: filter === tab ? colors.primary : colors.card,
              borderColor: filter === tab ? colors.primary : colors.border,
              borderWidth: 1,
            }}
            className="px-4 py-2 rounded-full"
          >
            <Text style={{ color: filter === tab ? '#FFFFFF' : colors.text }} className="text-sm font-medium">
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* SEARCH ACCORDION */}
      <Animated.View style={animatedStyle} className="mt-3 overflow-hidden">
        <View className="h-[60px] justify-center rounded-xl">
          <TextInput
            placeholder="Görev ara..."
            placeholderTextColor={colors.textSecondary}
            style={{ backgroundColor: colors.card, color: colors.text, borderColor: colors.border, borderWidth: 1, paddingHorizontal: 16, borderRadius: 16 }}
            className="text-base h-full"
          />
        </View>
      </Animated.View>

      {/* TASK LIST */}
      <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
        {filteredTasks.map((task) => {
          const priorityColors = getPriorityColor(task.priority, isDark);
          const statusColors = getStatusColor(task.status, isDark);
          const completedSubtasks = task.subtasks?.filter(s => s.checked).length || 0;
          const totalSubtasks = task.subtasks?.length || 0;

          return (
            <View
              key={task.id}
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                opacity: task.checked ? 0.7 : 1,
              }}
              className="mb-3 rounded-xl p-4"
            >
              {/* Header Row */}
              <View className="flex-row items-start justify-between">
                <View className="flex-row items-start gap-3 flex-1">
                  <Checkbox
                    value={task.checked}
                    onValueChange={() => toggleTask(task.id)}
                    color={task.checked ? '#6366F1' : undefined}
                    style={{ marginTop: 2 }}
                  />
                  <View className="flex-1">
                    {/* Category & Title */}
                    <View className="flex-row items-center gap-2 mb-1">
                      <Ionicons name={getCategoryIcon(task.category)} size={14} color={colors.primary} />
                      <Text style={{ color: colors.textSecondary }} className="text-xs">{task.category}</Text>
                    </View>

                    <Text
                      style={{
                        color: colors.text,
                        textDecorationLine: task.checked ? 'line-through' : 'none',
                      }}
                      className="text-base font-semibold"
                    >
                      {task.title}
                    </Text>

                    {/* Description */}
                    {task.description && !task.checked && (
                      <Text style={{ color: colors.textSecondary }} className="text-sm mt-1" numberOfLines={2}>
                        {task.description}
                      </Text>
                    )}

                    {/* Meta Info */}
                    <View className="flex-row items-center gap-3 mt-2 flex-wrap">
                      <View className="flex-row items-center gap-1">
                        <Ionicons name="calendar-outline" size={12} color={colors.textSecondary} />
                        <Text style={{ color: colors.textSecondary }} className="text-xs">{task.dueDate}</Text>
                      </View>
                      {task.time && (
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
                          <Text style={{ color: colors.textSecondary }} className="text-xs">{task.time}</Text>
                        </View>
                      )}
                      {task.location && (
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="location-outline" size={12} color={colors.textSecondary} />
                          <Text style={{ color: colors.textSecondary }} className="text-xs">{task.location}</Text>
                        </View>
                      )}
                    </View>

                    {/* Subtasks Progress */}
                    {task.subtasks && task.subtasks.length > 0 && !task.checked && (
                      <View className="mt-3">
                        <View className="flex-row items-center justify-between mb-1">
                          <Text style={{ color: colors.textSecondary }} className="text-xs">
                            Alt görevler: {completedSubtasks}/{totalSubtasks}
                          </Text>
                        </View>
                        <View style={{ backgroundColor: colors.border, height: 4, borderRadius: 2 }}>
                          <View
                            style={{
                              backgroundColor: colors.primary,
                              width: `${(completedSubtasks / totalSubtasks) * 100}%`,
                              height: 4,
                              borderRadius: 2,
                            }}
                          />
                        </View>
                      </View>
                    )}

                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && !task.checked && (
                      <View className="flex-row gap-1 mt-2 flex-wrap">
                        {task.tags.slice(0, 3).map((tag, index) => (
                          <View
                            key={index}
                            style={{ backgroundColor: isDark ? '#374151' : '#F3F4F6' }}
                            className="px-2 py-0.5 rounded"
                          >
                            <Text style={{ color: colors.textSecondary }} className="text-xs">#{tag}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    {/* AI Suggestion */}
                    {task.aiSuggestion && !task.checked && (
                      <View
                        style={{ backgroundColor: isDark ? '#1E3A5F' : '#EFF6FF', borderColor: isDark ? '#334155' : '#DBEAFE', borderWidth: 1 }}
                        className="mt-3 p-2 rounded-lg flex-row items-center gap-2"
                      >
                        <Ionicons name="sparkles" size={14} color={isDark ? '#60A5FA' : '#3B82F6'} />
                        <Text style={{ color: isDark ? '#93C5FD' : '#1D4ED8' }} className="text-xs flex-1">
                          AI: {task.aiSuggestion}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Badges */}
                <View className="items-end gap-1">
                  <View style={{ backgroundColor: priorityColors.bg }} className="px-2 py-1 rounded-full">
                    <Text style={{ color: priorityColors.text }} className="text-xs font-medium">{task.priority}</Text>
                  </View>
                  <View style={{ backgroundColor: statusColors.bg }} className="px-2 py-1 rounded-full">
                    <Text style={{ color: statusColors.text }} className="text-xs">{task.status}</Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}


