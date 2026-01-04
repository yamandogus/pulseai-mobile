import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, useColors } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function HelpCenterScreen() {
  const { isDark } = useTheme();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const faqItems = [
    {
      question: 'PulseAI nedir?',
      answer: 'PulseAI, günlük görevlerinizi ve iş akışlarınızı yapay zeka desteğiyle optimize etmenize yardımcı olan bir mobil asistan uygulamasıdır.'
    },
    {
      question: 'Şifremi nasıl değiştirebilirim?',
      answer: 'Profil sayfasından "Ayarlar" menüsüne giderek şifre değiştirme işlemini gerçekleştirebilirsiniz.'
    },
    {
      question: 'Bildirimleri nasıl kapatabilirim?',
      answer: 'Profil sayfasındaki "Tercihler" bölümünden bildirim ayarlarınızı yönetebilirsiniz.'
    },
    {
      question: 'Hesabımı nasıl silebilirim?',
      answer: 'Hesap silme işlemi için lütfen destek ekibimizle iletişime geçin: support@pulseai.com'
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Header */}
      <View 
        style={{ 
          paddingTop: insets.top, 
          backgroundColor: colors.card,
          borderBottomWidth: 1,
          borderBottomColor: colors.border
        }} 
        className="px-4 pb-4 flex-row items-center"
      >
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full mr-2"
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ color: colors.text }} className="text-lg font-bold">Yardım Merkezi</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color: colors.primary }} className="text-sm font-bold uppercase mb-4">Sıkça Sorulan Sorular</Text>
        
        {faqItems.map((item, index) => (
          <View 
            key={index} 
            style={{ backgroundColor: colors.card, borderColor: colors.border }} 
            className="mb-4 p-4 rounded-xl border"
          >
            <Text style={{ color: colors.text }} className="font-bold mb-2 text-base">{item.question}</Text>
            <Text style={{ color: colors.textSecondary }} className="leading-5">{item.answer}</Text>
          </View>
        ))}

        <View className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 items-center">
          <Ionicons name="mail-outline" size={32} color={colors.primary} className="mb-2" />
          <Text style={{ color: colors.text }} className="font-bold text-center mb-1">Hala yardıma mı ihtiyacınız var?</Text>
          <Text style={{ color: colors.textSecondary }} className="text-center text-sm mb-3">Ekibimiz size yardımcı olmaktan mutluluk duyar.</Text>
          <TouchableOpacity 
            style={{ backgroundColor: colors.primary }}
            className="px-6 py-2 rounded-full"
          >
            <Text className="text-white font-bold">Bize Ulaşın</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
