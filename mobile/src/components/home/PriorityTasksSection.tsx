import { View, Text, TouchableOpacity } from 'react-native';
import { Checkbox } from '../ui/Checkbox';
import { Ionicons } from '@expo/vector-icons';
export const dummyTasks = [
  {
    id: '1',
    title: 'Q3 Pazarlama Sunumu',
    priority: 'Yüksek Öncelik',
    time: 'Bugün 14:00',
  },
  {
    id: '2',
    title: 'Müşteri Geri Bildirim Analizi',
    priority: 'Orta Öncelik',
    time: 'Bugün 16:30',
  },
  {
    id: '3',
    title: 'Mobil Uygulama UI Revizyonu',
    priority: 'Yüksek Öncelik',
    time: 'Yarın 10:00',
  },
  {
    id: '4',
    title: 'Haftalık Satış Raporu',
    priority: 'Düşük Öncelik',
    time: 'Yarın 13:00',
  },
  {
    id: '5',
    title: 'Takım Toplantısı',
    priority: 'Orta Öncelik',
    time: 'Perşembe 11:00',
  },
  {
    id: '6',
    title: 'CRM Güncelleme Kontrolü',
    priority: 'Düşük Öncelik',
    time: 'Cuma 15:30',
  },
];

export default function PriorityTasks() {
  return (
    <View className="mt-10">
      <View className="flex-row justify-between">
        <Text className="text-xl font-bold"> Öncelikli Görevler</Text>
        <TouchableOpacity>
          <Text className="font-bold text-blue-400">Detaylar</Text>
        </TouchableOpacity>
      </View>
      {dummyTasks.map((task) => (
        <View
          key={task.id}
          className="my-2 flex-row items-center justify-between rounded-lg bg-[#f3f3f3] p-4">
          <View className="flex-row items-center gap-4">
            <View>
              <Checkbox checked={false} onChange={() => {}} />
            </View>
            <View className="flex-col gap-2">
              <Text className="text-md font-bold">{task.title}</Text>
              <View className="flex-row gap-2">
                <Text className="text-sm">{task.priority}</Text>
                <Text className="text-sm">{task.time}</Text>
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <Ionicons name="chevron-forward" size={16} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
}
