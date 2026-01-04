import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme, useColors } from '../../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const MOCK_CHAT = [
  { id: '1', role: 'ai', text: 'Merhaba Doğuş! Bugün sana nasıl yardımcı olabilirim? Programını düzenleyebilirim veya yeni fikirler üretebilirim.' },
  { id: '2', role: 'user', text: 'Bugünkü toplantılarımı özetler misin?' },
  { id: '3', role: 'ai', text: 'Bugün 3 toplantın var:\n\n1. 10:00 - Q4 Bütçe (Finans)\n2. 14:00 - Tasarım Sync (Online)\n3. 16:30 - Müşteri Geri Bildirimi\n\nHazırlık yapmamı ister misin?' },
];

const SUGGESTIONS = [
  "📧 E-posta taslağı oluştur",
  "📅 Toplantı ayarla",
  "📝 Raporu özetle",
  "💡 Fikir üret",
];

export default function PulseAiScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(MOCK_CHAT);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    // Auto scroll to bottom
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);

    // Mock AI Response
    setTimeout(() => {
      const aiMsg = { 
        id: (Date.now() + 1).toString(), 
        role: 'ai', 
        text: 'Anlaşıldı, bu konuda sana yardımcı olabilirim. Başka bir isteğin var mı?' 
      };
      setMessages(prev => [...prev, aiMsg]);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* HEADER */}
      <View
        style={{ paddingTop: insets.top + 10, paddingBottom: 16, backgroundColor: colors.background }}
        className="px-5 border-b border-gray-100 dark:border-gray-800"
      >
        <View className="flex-row items-center justify-between">
          <View>
            <Text style={{ color: colors.text }} className="text-2xl font-bold">Pulse Asistan</Text>
            <View className="flex-row items-center mt-1">
              <View className="w-2 h-2 rounded-full bg-green-500 mr-2" />
              <Text style={{ color: colors.textSecondary }} className="text-xs font-medium">Çevrimiçi</Text>
            </View>
          </View>
          <View className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 items-center justify-center">
            <Ionicons name="sparkles" size={20} color={colors.primary} />
          </View>
        </View>
      </View>

      {/* CHAT AREA */}
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {MOCK_CHAT.map((msg) => (
          <View
            key={msg.id}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: msg.role === 'user' ? colors.primary : colors.card,
              maxWidth: '80%',
              borderBottomRightRadius: msg.role === 'user' ? 4 : 20,
              borderBottomLeftRadius: msg.role === 'ai' ? 4 : 20,
            }}
            className="p-4 rounded-2xl mb-4 shadow-sm"
          >
            <Text
              style={{
                color: msg.role === 'user' ? 'white' : colors.text,
                lineHeight: 22
              }}
              className="text-base"
            >
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* INPUT AREA */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={{ backgroundColor: colors.background }}
      >
        {/* Suggestions */}
        <View className="mb-3">
          <FlatList
            horizontal
            data={SUGGESTIONS}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1 }}
                className="px-4 py-2 rounded-full"
              >
                <Text style={{ color: colors.textSecondary }} className="text-sm font-medium">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        <View
          style={{
            paddingBottom: insets.bottom + 10,
            paddingHorizontal: 16,
            paddingTop: 8,
            borderTopWidth: 1,
            borderColor: colors.border
          }}
          className="flex-row items-center gap-3"
        >
          <View
            className="flex-1 flex-row items-center rounded-3xl px-4 py-3 border border-gray-200 dark:border-gray-700"
            style={{ backgroundColor: colors.card }}
          >
            <TextInput
              placeholder="Bir şeyler yaz..."
              placeholderTextColor={colors.textSecondary}
              style={{ color: colors.text, maxHeight: 100, flex: 1, fontSize: 16 }}
              multiline
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity className="ml-2">
              <Ionicons name="mic" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={sendMessage}
            style={{ backgroundColor: colors.primary }}
            className="w-12 h-12 rounded-full items-center justify-center shadow-md"
          >
            <Ionicons name="send" size={20} color="white" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
