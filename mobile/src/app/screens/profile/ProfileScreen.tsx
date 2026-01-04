import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme, useColors } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '@/store/auth/auth.store';
import Switch from '@/components/ui/Switch';
import BottomSheet from '@/components/ui/BottomSheet';
import { useSharedValue } from 'react-native-reanimated';

const SettingItem = ({ icon, title, subtitle, value, onPress, type = 'arrow', colors }: any) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
    className="flex-row items-center py-4">
    <View
      style={{ backgroundColor: colors.background }}
      className="mr-4 h-10 w-10 items-center justify-center rounded-full">
      <Ionicons name={icon} size={22} color={colors.primary} />
    </View>
    <View className="flex-1">
      <Text style={{ color: colors.text }} className="text-base font-semibold">
        {title}
      </Text>
      {subtitle && (
        <Text style={{ color: colors.textSecondary }} className="mt-0.5 text-xs">
          {subtitle}
        </Text>
      )}
    </View>

    {type === 'arrow' && <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />}
    {type === 'value' && (
      <Text style={{ color: colors.textSecondary }} className="font-medium">
        {value}
      </Text>
    )}
    {type === 'switch' && (
      <View pointerEvents="none">
        {/* Switch is controlled by parent, this is just visual if needed or passed as children */}
        {value}
      </View>
    )}
  </TouchableOpacity>
);

export default function ProfileScreen() {
  const { isDark, toggleTheme } = useTheme();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const logout = useAuthStore((state) => state.logout);
  const themeSwitch = useSharedValue(isDark);
  const notificationSwitch = useSharedValue(true);
  const languageSheetOpen = useSharedValue(false);
  const [selectedLanguage, setSelectedLanguage] = useState<'tr' | 'en'>('tr');

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 100 }}>
      <View
        style={{
          backgroundColor: colors.card,
          paddingTop: insets.top + 20,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
        className="mb-6 px-6 pb-8 shadow-sm">
        <View className="mb-6 flex-row items-center justify-between">
          <Text style={{ color: colors.text }} className="text-2xl font-bold">
            Profil
          </Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center">
          <View className="relative">
            <View className="h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-gray-200 dark:border-gray-700">
              <Image
                source={{ uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg' }}
                className="h-full w-full"
              />
            </View>
            <View className="absolute bottom-0 right-0 h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-indigo-500 dark:border-gray-800">
              <Ionicons name="pencil" size={12} color="white" />
            </View>
          </View>
          <View className="ml-5 flex-1">
            <Text style={{ color: colors.text }} className="text-xl font-bold">
              Doğuş Yaman
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-sm">
              Ücretsiz Üyelik
            </Text>

            <TouchableOpacity className="mt-3 self-start rounded-lg bg-indigo-600 px-4 py-2">
              <Text className="text-xs font-bold text-white">Premium&apos;a Geç</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Stats */}
        <View className="mt-8 flex-row justify-between px-2">
          <View className="items-center">
            <Text style={{ color: colors.text }} className="text-xl font-bold">
              128
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">
              Görev
            </Text>
          </View>
          <View style={{ width: 1, height: '100%', backgroundColor: colors.border }} />
          <View className="items-center">
            <Text style={{ color: colors.text }} className="text-xl font-bold">
              4.8
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">
              Puan
            </Text>
          </View>
          <View style={{ width: 1, height: '100%', backgroundColor: colors.border }} />
          <View className="items-center">
            <Text style={{ color: colors.text }} className="text-xl font-bold">
              %85
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">
              Başarı
            </Text>
          </View>
        </View>
      </View>

      <View className="px-6">
        <Text
          style={{ color: colors.textSecondary }}
          className="mb-2 ml-1 text-sm font-bold uppercase opacity-70">
          Tercihler
        </Text>
        <View style={{ backgroundColor: colors.card, borderRadius: 16 }} className="mb-6 px-4">
          <SettingItem
            icon="moon"
            title="Karanlık Mod"
            subtitle="Uygulama görünümü"
            type="switch"
            onPress={() => {
              themeSwitch.value = !themeSwitch.value;
              toggleTheme();
            }}
            value={
              <Switch
                value={themeSwitch}
                onPress={() => {
                  themeSwitch.value = !themeSwitch.value;
                  toggleTheme();
                }}
                trackColors={{ on: '#6366F1', off: '#E5E7EB' }}
                style={{ width: 60, height: 30 }}
              />
            }
            colors={colors}
          />
          <SettingItem
            icon="notifications"
            title="Bildirimler"
            subtitle="Uyarıları yönet"
            type="switch"
            onPress={() => {
              notificationSwitch.value = !notificationSwitch.value;
            }}
            value={
              <Switch
                value={notificationSwitch}
                onPress={() => {
                  notificationSwitch.value = !notificationSwitch.value;
                }}
                trackColors={{ on: '#22C55E', off: '#E5E7EB' }}
                style={{ width: 60, height: 30 }}
              />
            }
            colors={colors}
          />
          <SettingItem
            icon="globe"
            title="Dil"
            value={selectedLanguage === 'tr' ? 'Türkçe' : 'English'}
            type="value"
            colors={colors}
            onPress={() => {
              languageSheetOpen.value = true;
            }}
          />
        </View>

        <Text
          style={{ color: colors.textSecondary }}
          className="mb-2 ml-1 text-sm font-bold uppercase opacity-70">
          Destek
        </Text>
        <View style={{ backgroundColor: colors.card, borderRadius: 16 }} className="mb-8 px-4">
          <SettingItem
            icon="help-buoy"
            title="Yardım Merkezi"
            colors={colors}
            onPress={() => navigation.navigate('HelpCenter' as never)}
          />
          <SettingItem
            icon="shield-checkmark"
            title="Gizlilik Politikası"
            colors={colors}
            onPress={() => navigation.navigate('PrivacyPolicy' as never)}
          />
          <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={() => logout()}>
            <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <Ionicons name="log-out" size={22} color="#EF4444" />
            </View>
            <Text className="text-base font-semibold text-red-500">Çıkış Yap</Text>
          </TouchableOpacity>
        </View>

        <Text
          style={{ color: colors.textSecondary }}
          className="mb-8 text-center text-xs opacity-50">
          Versiyon 1.0.0 (Derleme 102)
        </Text>
      </View>

      <BottomSheet
        isOpen={languageSheetOpen}
        toggleSheet={() => {
          languageSheetOpen.value = !languageSheetOpen.value;
        }}
        headerTitle="Dil Seçimi"
        buttonText="Kaydet"
        onButtonPress={() => {
          languageSheetOpen.value = false;
        }}
      >
        <TouchableOpacity
          className="flex-row items-center justify-between py-3"
          onPress={() => setSelectedLanguage('tr')}
        >
          <Text style={{ color: colors.text }} className="text-base">
            Türkçe
          </Text>
          {selectedLanguage === 'tr' && (
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-between py-3"
          onPress={() => setSelectedLanguage('en')}
        >
          <Text style={{ color: colors.text }} className="text-base">
            English
          </Text>
          {selectedLanguage === 'en' && (
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
          )}
        </TouchableOpacity>
      </BottomSheet>
    </ScrollView>
  );
}
