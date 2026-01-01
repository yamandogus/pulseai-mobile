import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/context/ThemeContext';

const PRIORITY_TASKS = [
  { id: 1, title: 'Q4 Bütçe Revizyonu', time: '10:00', tag: 'Finans' },
  { id: 2, title: 'Tasarım Ekibi Toplantısı', time: '14:00', tag: 'Toplantı' },
];

export default function PriorityTasks() {
  const colors = useColors();

  return (
    <View className="mb-24">
      <View className="flex-row items-center justify-between mb-4 px-2">
        <Text style={{ color: colors.text }} className="text-lg font-bold">Öncelikli Görevler</Text>
        <TouchableOpacity>
          <Text style={{ color: colors.primary }} className="text-sm font-semibold">Tümünü Gör</Text>
        </TouchableOpacity>
      </View>

      <View className="gap-3">
        {PRIORITY_TASKS.map((task, index) => (
          <View
            key={task.id}
            style={{
              backgroundColor: colors.card,
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 8,
              elevation: 2,
            }}
            className="p-4 rounded-2xl flex-row items-center border border-gray-100 dark:border-gray-800"
          >
            {/* Checkbox Placeholder */}
            <View
              style={{ borderColor: colors.primary }}
              className="w-5 h-5 rounded-md border-2 mr-4"
            />

            <View className="flex-1">
              <Text style={{ color: colors.text }} className="text-base font-bold">{task.title}</Text>
              <View className="flex-row items-center mt-1">
                <Ionicons name="time-outline" size={12} color={colors.textSecondary} />
                <Text style={{ color: colors.textSecondary }} className="text-xs ml-1 mr-3">{task.time}</Text>
                <Text style={{ color: colors.primary }} className="text-xs font-medium bg-indigo-50 dark:bg-indigo-900/40 px-2 py-0.5 rounded text-overflow-ellipses">
                  {task.tag}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={{ backgroundColor: colors.background }}
              className="w-8 h-8 rounded-full items-center justify-center ml-2"
            >
              <Ionicons name="arrow-forward" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}
