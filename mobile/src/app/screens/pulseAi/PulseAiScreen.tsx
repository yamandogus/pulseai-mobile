import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useColors } from '../../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SUGGESTIONS = [
  "Summarize my tasks",
  "Create a meeting agenda",
  "Optimize my schedule",
  "Draft an email",
];

const MOCK_MESSAGES = [
  { id: '1', role: 'ai', text: 'Hello! I am PulseAi. How can I boost your productivity today? 🚀' },
  { id: '2', role: 'user', text: 'Show me my critical tasks for the week.' },
  { id: '3', role: 'ai', text: 'You have 3 critical tasks regarding the "Project Alpha" launch. Would you like me to prioritize them?' },
];

export default function PulseAi() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [inputText, setInputText] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <View style={{ flex: 1, paddingTop: insets.top }}>

        {/* Header */}
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            backgroundColor: colors.card
          }}
          className="px-4 py-3 flex-row items-center justify-between"
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-indigo-600 rounded-full items-center justify-center mr-3 shadow-md shadow-indigo-500/40">
              <Ionicons name="sparkles" size={20} color="white" />
            </View>
            <View>
              <Text style={{ color: colors.text }} className="font-bold text-lg">Pulse Assistant</Text>
              <View className="flex-row items-center">
                <View className="w-2 h-2 bg-green-500 rounded-full mr-1.5" />
                <Text style={{ color: colors.textSecondary }} className="text-xs font-medium">Online</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity className="p-2">
            <Ionicons name="ellipsis-horizontal" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Chat Area */}
        <ScrollView
          className="flex-1 px-4 py-4"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {MOCK_MESSAGES.map((msg) => (
            <View
              key={msg.id}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%'
              }}
              className="mb-4"
            >
              <View
                style={{
                  backgroundColor: msg.role === 'user' ? colors.primary : colors.card,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  borderTopLeftRadius: msg.role === 'user' ? 20 : 4,
                  borderTopRightRadius: msg.role === 'user' ? 4 : 20,
                  shadowColor: colors.shadow,
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2
                }}
                className="p-4"
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
              {msg.role === 'ai' && (
                <Text style={{ color: colors.textSecondary }} className="text-[10px] mt-1 ml-1 opacity-70">
                  PulseAi • Just now
                </Text>
              )}
            </View>
          ))}
        </ScrollView>

        {/* Input Area */}
        <View style={{ backgroundColor: colors.background }} className="pb-4">
          {/* Suggestions */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-3 pl-4"
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {SUGGESTIONS.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                  borderWidth: 1
                }}
                className="mr-2 px-4 py-2 rounded-full"
                onPress={() => setInputText(suggestion)}
              >
                <Text style={{ color: colors.primary }} className="text-xs font-medium">
                  {suggestion}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Text Field */}
          <View className="px-4">
            <View
              style={{
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1
              }}
              className="flex-row items-center rounded-3xl px-2 py-2"
            >
              <View className="w-10 h-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 mr-2">
                <Ionicons name="add" size={24} color={colors.textSecondary} />
              </View>

              <TextInput
                placeholder="Ask anything..."
                placeholderTextColor={colors.textSecondary}
                style={{ color: colors.text, flex: 1, maxHeight: 100 }}
                multiline
                value={inputText}
                onChangeText={setInputText}
              />

              {inputText.length > 0 ? (
                <TouchableOpacity
                  style={{ backgroundColor: colors.primary }}
                  className="w-10 h-10 items-center justify-center rounded-full ml-2 shadow-sm"
                >
                  <Ionicons name="arrow-up" size={24} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  className="w-10 h-10 items-center justify-center rounded-full ml-2"
                >
                  <Ionicons name="mic-outline" size={24} color={colors.textSecondary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}
