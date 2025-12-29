import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import NavigateButton from '../ui/NavigateButton';
import { useColors } from '../../context/ThemeContext';

type Tasks = {
  id: string;
  title: string;
  priority: string;
  time: string;
  checked: boolean;
};

export const dummyTasks: Tasks[] = [
  {
    id: '1',
    title: 'Q3 Pazarlama Sunumu',
    priority: 'Yüksek Öncelik',
    time: 'Bugün 14:00',
    checked: true,
  },
  {
    id: '2',
    title: 'Müşteri Geri Bildirim Analizi',
    priority: 'Orta Öncelik',
    time: 'Bugün 16:30',
    checked: false,
  },
  {
    id: '3',
    title: 'Mobil Uygulama UI Revizyonu',
    priority: 'Yüksek Öncelik',
    time: 'Yarın 10:00',
    checked: false,
  },
  {
    id: '4',
    title: 'Haftalık Satış Raporu',
    priority: 'Düşük Öncelik',
    time: 'Yarın 13:00',
    checked: false,
  },
  {
    id: '5',
    title: 'Takım Toplantısı',
    priority: 'Orta Öncelik',
    time: 'Perşembe 11:00',
    checked: false,
  },
  {
    id: '6',
    title: 'CRM Güncelleme Kontrolü',
    priority: 'Düşük Öncelik',
    time: 'Cuma 15:30',
    checked: true,
  },
];

export default function PriorityTasks() {
  const [tasks, setTasks] = useState(dummyTasks);
  const colors = useColors();

  const toggleSelectedTask = (id: string) => {
    console.log('tıklandı');

    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, checked: task.checked } : task))
    );
  };
  return (
    <View className="mt-10">
      <View className="flex-row justify-between">
        <Text style={{ color: colors.text }} className="text-xl font-bold"> Öncelikli Görevler</Text>
        <NavigateButton title='Tümü' nav='Tasks' />
      </View>
      {tasks.map((task) => (
        <View
          key={task.id}
          style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }}
          className="my-2 flex-row items-center justify-between rounded-lg p-4">
          <View className="flex-row items-center gap-4">
            <View>
              <Checkbox
                value={task.checked}
                onValueChange={() => toggleSelectedTask(task.id)}
                color={task.checked ? '#6366F1' : undefined}
              />
            </View>
            <View className="flex-col gap-2">
              <Text style={{ color: colors.text }} className="text-md font-bold">{task.title}</Text>
              <View className="flex-row gap-2">
                <Text style={{ color: colors.textSecondary }} className="text-sm">{task.priority}</Text>
                <Text style={{ color: colors.textSecondary }} className="text-sm">{task.time}</Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}

