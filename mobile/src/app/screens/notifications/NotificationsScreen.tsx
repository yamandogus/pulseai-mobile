import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, useColors } from '../../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    title: 'Yeni Görev Atandı',
    message: 'Proje planlaması için yeni bir görev atandı.',
    time: '2 saat önce',
    read: false,
    icon: 'clipboard',
    color: '#6366F1'
  },
  {
    id: '2',
    title: 'Toplantı Hatırlatması',
    message: 'Yarın sabah 10:00\'da haftalık ekip toplantısı var.',
    time: '5 saat önce',
    read: true,
    icon: 'alarm',
    color: '#F59E0B'
  },
  {
    id: '3',
    title: 'Sistem Güncellemesi',
    message: 'PulseAI v2.0 güncellemesi başarıyla tamamlandı.',
    time: '1 gün önce',
    read: true,
    icon: 'cloud-done',
    color: '#10B981'
  },
  {
    id: '4',
    title: 'Güvenlik Uyarısı',
    message: 'Hesabınıza yeni bir cihazdan giriş yapıldı.',
    time: '2 gün önce',
    read: true,
    icon: 'shield-checkmark',
    color: '#EF4444'
  }
];

export default function NotificationsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top, // Header is usually handled by stack navigator but we can add padding if needed
          paddingHorizontal: 20,
          paddingBottom: 40
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* If header is shown by Stack Navigator, we might not need a custom header here. 
            But let's add a list container. */}
        <View className="mt-4">
          {MOCK_NOTIFICATIONS.map((notif) => (
            <TouchableOpacity
              key={notif.id}
              activeOpacity={0.7}
              style={{
                backgroundColor: notif.read ? 'transparent' : colors.card,
                borderColor: colors.border,
                borderBottomWidth: 1,
              }}
              className={`flex-row items-start p-4 rounded-2xl mb-3 ${!notif.read ? 'border border-gray-100 dark:border-gray-800 shadow-sm' : 'border-b border-gray-100 dark:border-gray-800'}`}
            >
              <View
                style={{ backgroundColor: `${notif.color}15` }}
                className="w-10 h-10 rounded-full items-center justify-center mr-4"
              >
                <Ionicons name={notif.icon as any} size={20} color={notif.color} />
              </View>
              
              <View className="flex-1">
                <View className="flex-row justify-between items-start">
                  <Text style={{ color: colors.text }} className={`text-base mb-1 ${!notif.read ? 'font-bold' : 'font-semibold'}`}>
                    {notif.title}
                  </Text>
                  <Text style={{ color: colors.textSecondary }} className="text-xs">
                    {notif.time}
                  </Text>
                </View>
                <Text style={{ color: colors.textSecondary }} className="text-sm leading-5">
                  {notif.message}
                </Text>
              </View>
              
              {!notif.read && (
                <View className="w-2 h-2 rounded-full bg-red-500 mt-2 ml-2" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {MOCK_NOTIFICATIONS.length === 0 && (
          <View className="items-center justify-center mt-20">
            <Ionicons name="notifications-off-outline" size={64} color={colors.textSecondary} style={{ opacity: 0.5 }} />
            <Text style={{ color: colors.textSecondary }} className="mt-4 text-lg font-medium">Bildirim yok</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
