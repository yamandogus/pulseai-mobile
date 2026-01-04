import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme, useColors } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

export default function PrivacyPolicyScreen() {
  const { isDark } = useTheme();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

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
        <Text style={{ color: colors.text }} className="text-lg font-bold">Gizlilik Politikası</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={{ color: colors.textSecondary }} className="mb-6 italic">Son güncelleme: 4 Ocak 2026</Text>

        <Section title="1. Veri Toplama" colors={colors}>
          PulseAI olarak, hizmetlerimizi sunmak ve geliştirmek amacıyla belirli kişisel verilerinizi (ad, e-posta, kullanım istatistikleri vb.) topluyoruz. Bu veriler güvenli sunucularda saklanmaktadır.
        </Section>

        <Section title="2. Veri Kullanımı" colors={colors}>
          Toplanan veriler, size kişiselleştirilmiş öneriler sunmak, uygulama performansını artırmak ve güvenliği sağlamak için kullanılır. Verileriniz izniniz olmadan üçüncü taraflarla paylaşılmaz.
        </Section>

        <Section title="3. Çerezler ve İzleme" colors={colors}>
          Uygulama deneyimini iyileştirmek için çerezler ve benzeri teknolojiler kullanabiliriz. Bu teknolojiler, tercihlerinizi hatırlamamıza yardımcı olur.
        </Section>

        <Section title="4. Güvenlik" colors={colors}>
          Verilerinizin güvenliği bizim için önceliklidir. Endüstri standardı şifreleme yöntemleri ve güvenlik protokolleri kullanarak bilgilerinizi koruyoruz.
        </Section>

        <Section title="5. İletişim" colors={colors}>
          Gizlilik politikamızla ilgili sorularınız için privacy@pulseai.com adresinden bize ulaşabilirsiniz.
        </Section>
        
        <View className="h-10" />
      </ScrollView>
    </View>
  );
}

const Section = ({ title, children, colors }: { title: string, children: React.ReactNode, colors: any }) => (
  <View className="mb-6">
    <Text style={{ color: colors.text }} className="text-base font-bold mb-2">{title}</Text>
    <Text style={{ color: colors.textSecondary }} className="leading-6 text-sm">{children}</Text>
  </View>
);
