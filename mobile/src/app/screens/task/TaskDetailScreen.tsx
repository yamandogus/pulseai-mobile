import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useTheme, useColors } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { dummyTasks, getCategoryIcon, getPriorityColor } from './task';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTaskStore } from "@/store/task/task.store";

type TasksStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId?: string };
};

type TaskDetailRouteProp = RouteProp<TasksStackParamList, 'TaskDetail'>;

export default function TaskDetailScreen() {
  const route = useRoute<TaskDetailRouteProp>();
  const navigation = useNavigation();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { isDark } = useTheme();
  
  const { taskId } = route.params || {};
  const task = useTaskStore((state) => state.tasks.find(t => t.id === taskId));

  if (!task) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: colors.textSecondary }}>Görev bulunamadı.</Text>
      </View>
    );
  }

  const priorityColors = getPriorityColor(task.priority, isDark);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View 
        style={{ paddingTop: insets.top, backgroundColor: colors.card }} 
        className="px-4 pb-4 border-b border-gray-100 dark:border-gray-800 flex-row items-center justify-between"
      >
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full"
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ color: colors.text }} className="text-lg font-bold">Görev Detayı</Text>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full">
          <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Title & Status */}
        <View className="mb-6">
          <View className="flex-row items-center gap-2 mb-3">
             <View 
               style={{ backgroundColor: priorityColors.bg }}
               className="px-3 py-1 rounded-full"
             >
                <Text style={{ color: priorityColors.text }} className="text-xs font-bold">{task.priority}</Text>
             </View>
             <View 
               style={{ backgroundColor: colors.card, borderColor: colors.border }}
               className="px-3 py-1 rounded-full border flex-row items-center"
             >
                <Ionicons name={getCategoryIcon(task.category)} size={12} color={colors.textSecondary} style={{ marginRight: 4 }} />
                <Text style={{ color: colors.textSecondary }} className="text-xs font-bold">{task.category}</Text>
             </View>
          </View>
          
          <Text style={{ color: colors.text }} className="text-2xl font-bold leading-8 mb-2">
            {task.title}
          </Text>

          {task.description && (
             <Text style={{ color: colors.textSecondary }} className="text-base leading-6">
               {task.description}
             </Text>
          )}
        </View>

        {/* Details Card */}
        <View 
          style={{ backgroundColor: colors.card, borderColor: colors.border }}
          className="rounded-2xl p-4 mb-6 border"
        >
           <View className="flex-row items-center mb-4">
              <View className="w-8 items-center"><Ionicons name="calendar-outline" size={20} color={colors.textSecondary} /></View>
              <View className="ml-2">
                 <Text style={{ color: colors.textSecondary }} className="text-xs">Bitiş Tarihi</Text>
                 <Text style={{ color: colors.text }} className="text-sm font-semibold">{task.dueDate}</Text>
              </View>
           </View>
           
           {task.time && (
             <View className="flex-row items-center mb-4">
                <View className="w-8 items-center"><Ionicons name="time-outline" size={20} color={colors.textSecondary} /></View>
                <View className="ml-2">
                   <Text style={{ color: colors.textSecondary }} className="text-xs">Saat</Text>
                   <Text style={{ color: colors.text }} className="text-sm font-semibold">{task.time}</Text>
                </View>
             </View>
           )}

           {task.location && (
             <View className="flex-row items-center mb-4">
                <View className="w-8 items-center"><Ionicons name="location-outline" size={20} color={colors.textSecondary} /></View>
                <View className="ml-2">
                   <Text style={{ color: colors.textSecondary }} className="text-xs">Konum</Text>
                   <Text style={{ color: colors.text }} className="text-sm font-semibold">{task.location}</Text>
                </View>
             </View>
           )}

           {task.assignee && (
             <View className="flex-row items-center">
                <View className="w-8 items-center"><Ionicons name="person-outline" size={20} color={colors.textSecondary} /></View>
                <View className="ml-2">
                   <Text style={{ color: colors.textSecondary }} className="text-xs">Atanan</Text>
                   <Text style={{ color: colors.text }} className="text-sm font-semibold">{task.assignee}</Text>
                </View>
             </View>
           )}
        </View>

        {/* AI Suggestion */}
        {task.aiSuggestion && (
          <View 
            className="rounded-2xl p-4 mb-6 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800"
          >
             <View className="flex-row items-center mb-2">
                <Ionicons name="sparkles" size={16} color="#6366F1" />
                <Text className="text-indigo-600 dark:text-indigo-400 font-bold ml-2 text-sm">Pulse AI Önerisi</Text>
             </View>
             <Text className="text-indigo-900 dark:text-indigo-200 text-sm leading-5">
               {task.aiSuggestion}
             </Text>
          </View>
        )}

        {/* Subtasks */}
        {task.subtasks && task.subtasks.length > 0 && (
          <View>
             <Text style={{ color: colors.text }} className="text-lg font-bold mb-3">Alt Görevler</Text>
             {task.subtasks.map((sub) => (
               <View 
                 key={sub.id}
                 style={{ backgroundColor: colors.card, borderColor: colors.border }}
                 className="flex-row items-center p-3 rounded-xl mb-2 border"
               >
                  <Ionicons 
                    name={sub.checked ? "checkbox" : "square-outline"} 
                    size={24} 
                    color={sub.checked ? colors.primary : colors.textSecondary} 
                  />
                  <Text 
                    style={{ 
                      color: sub.checked ? colors.textSecondary : colors.text,
                      textDecorationLine: sub.checked ? 'line-through' : 'none'
                    }} 
                    className="ml-3 text-base"
                  >
                    {sub.title}
                  </Text>
               </View>
             ))}
          </View>
        )}

      </ScrollView>
      
      {/* Footer Action */}
      <View 
        style={{ paddingBottom: insets.bottom + 20, backgroundColor: colors.background, borderColor: colors.border }}
        className="px-5 pt-4 border-t"
      >
         <TouchableOpacity 
           className="bg-indigo-600 h-14 rounded-2xl items-center justify-center shadow-lg shadow-indigo-500/30"
           activeOpacity={0.8}
         >
            <Text className="text-white font-bold text-lg">Görevi Tamamla</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}
