import React, { useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Switch as RNSwitch } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useTheme, useColors } from "../../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Custom Setting Item Component
const SettingItem = ({ icon, title, subtitle, value, onPress, type = "arrow", colors }: any) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={{ borderBottomWidth: 1, borderBottomColor: colors.border }}
    className="flex-row items-center py-4"
  >
    <View
      style={{ backgroundColor: colors.background }}
      className="w-10 h-10 rounded-full items-center justify-center mr-4"
    >
      <Ionicons name={icon} size={22} color={colors.primary} />
    </View>
    <View className="flex-1">
      <Text style={{ color: colors.text }} className="text-base font-semibold">{title}</Text>
      {subtitle && (
        <Text style={{ color: colors.textSecondary }} className="text-xs mt-0.5">{subtitle}</Text>
      )}
    </View>

    {type === "arrow" && (
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    )}
    {type === "value" && (
      <Text style={{ color: colors.textSecondary }} className="font-medium">{value}</Text>
    )}
    {type === "switch" && (
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

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      {/* Header / Profile Card */}
      <View
        style={{
          backgroundColor: colors.card,
          paddingTop: insets.top + 20,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
        className="pb-8 px-6 shadow-sm mb-6"
      >
        <View className="flex-row items-center justify-between mb-6">
          <Text style={{ color: colors.text }} className="text-2xl font-bold">Profil</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center">
          <View className="relative">
            <View className="w-20 h-20 bg-gray-200 rounded-full items-center justify-center overflow-hidden border-2 border-white dark:border-gray-700">
              <Image source={{ uri: 'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg' }} className="w-full h-full" />
            </View>
            <View className="absolute bottom-0 right-0 w-6 h-6 bg-indigo-500 rounded-full items-center justify-center border-2 border-white dark:border-gray-800">
              <Ionicons name="pencil" size={12} color="white" />
            </View>
          </View>
          <View className="ml-5 flex-1">
            <Text style={{ color: colors.text }} className="text-xl font-bold">Doğuş Yaman</Text>
            <Text style={{ color: colors.textSecondary }} className="text-sm">Ücretsiz Üyelik</Text>

            <TouchableOpacity className="bg-indigo-600 px-4 py-2 rounded-lg self-start mt-3">
              <Text className="text-white text-xs font-bold">Premium'a Geç</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Stats */}
        <View className="flex-row justify-between mt-8 px-2">
          <View className="items-center">
            <Text style={{ color: colors.text }} className="text-xl font-bold">128</Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">Görev</Text>
          </View>
          <View style={{ width: 1, height: '100%', backgroundColor: colors.border }} />
          <View className="items-center">
            <Text style={{ color: colors.text }} className="text-xl font-bold">4.8</Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">Puan</Text>
          </View>
          <View style={{ width: 1, height: '100%', backgroundColor: colors.border }} />
          <View className="items-center">
            <Text style={{ color: colors.text }} className="text-xl font-bold">%85</Text>
            <Text style={{ color: colors.textSecondary }} className="text-xs">Başarı</Text>
          </View>
        </View>
      </View>

      {/* Settings Sections */}
      <View className="px-6">
        <Text style={{ color: colors.textSecondary }} className="text-sm font-bold uppercase mb-2 ml-1 opacity-70">
          Tercihler
        </Text>
        <View style={{ backgroundColor: colors.card, borderRadius: 16 }} className="px-4 mb-6">
          <SettingItem
            icon="moon"
            title="Karanlık Mod"
            subtitle="Uygulama görünümü"
            type="switch"
            value={
              <RNSwitch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                thumbColor={'#FFFFFF'}
              />
            }
            colors={colors}
          />
          <SettingItem
            icon="notifications"
            title="Bildirimler"
            subtitle="Uyarıları yönet"
            type="arrow"
            colors={colors}
          />
          <SettingItem
            icon="globe"
            title="Dil"
            value="Türkçe"
            type="value"
            colors={colors}
            onPress={() => { }}
          />
        </View>

        <Text style={{ color: colors.textSecondary }} className="text-sm font-bold uppercase mb-2 ml-1 opacity-70">
          Destek
        </Text>
        <View style={{ backgroundColor: colors.card, borderRadius: 16 }} className="px-4 mb-8">
          <SettingItem
            icon="help-buoy"
            title="Yardım Merkezi"
            colors={colors}
          />
          <SettingItem
            icon="shield-checkmark"
            title="Gizlilik Politikası"
            colors={colors}
          />
          <TouchableOpacity
            className="flex-row items-center py-4"
            onPress={() => console.log('Logout')}
          >
            <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-4">
              <Ionicons name="log-out" size={22} color="#EF4444" />
            </View>
            <Text className="text-red-500 text-base font-semibold">Çıkış Yap</Text>
          </TouchableOpacity>
        </View>

        <Text style={{ color: colors.textSecondary }} className="text-center text-xs mb-8 opacity-50">
          Versiyon 1.0.0 (Derleme 102)
        </Text>

      </View>
    </ScrollView>
  );
}