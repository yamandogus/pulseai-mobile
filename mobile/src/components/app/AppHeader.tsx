import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
type Props = {
  title: string;
  subtitle?: string;
  onRightPress?: () => void;
};

export default function AppHeader({ title, subtitle, onRightPress }: Props) {
  const insets = useSafeAreaInsets();
  const inDay = new Date();
  const today = inDay.toLocaleDateString('tr-TR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  console.log("day",today);
  

  return (
    <>
      <View
        style={{
          paddingTop: insets.top,
          height: insets.top + 56,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <View>
          <Text>{today}</Text>
          {subtitle && <Text className='font-bold text-lg'>Merhaba Doğuş 👋</Text>}
        </View>

        <View className="flex flex-row gap-4">
          <TouchableOpacity onPress={onRightPress}>
            <Ionicons name={'notifications-outline'} size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onRightPress}>
            <Ionicons name={'person'} size={22} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
