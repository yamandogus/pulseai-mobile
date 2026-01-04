import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/auth/auth.store';

export default function RegisterScreen({ navigation }: { navigation: any }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError('Tüm alanlar zorunlu');
      return;
    }

    setError(null);
    login('demo-auth-token');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingTop: insets.top + 20, paddingBottom: 40 }}>
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="w-10 h-10 items-center justify-center rounded-full mb-6"
            style={{ backgroundColor: colors.card }}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          {/* Header */}
          <View className="mb-8">
            <Text style={{ color: colors.text }} className="text-3xl font-bold tracking-tight">
              Create Account
            </Text>
            <Text style={{ color: colors.textSecondary }} className="mt-2 text-base">
              Join PulseAI and start your journey
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-5">
            {/* Name Input */}
            <View>
              <Text style={{ color: colors.text }} className="text-sm font-medium mb-2 ml-1">
                Full Name
              </Text>
              <View
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
                className="flex-row items-center border rounded-2xl h-14 px-4"
              >
                <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
                <TextInput
                  placeholder="John Doe"
                  placeholderTextColor={colors.textSecondary}
                  style={{ color: colors.text, flex: 1, marginLeft: 12 }}
                  value={name}
                  onChangeText={setName}
                />
              </View>
            </View>

            {/* Email Input */}
            <View>
              <Text style={{ color: colors.text }} className="text-sm font-medium mb-2 ml-1">
                Email Address
              </Text>
              <View
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
                className="flex-row items-center border rounded-2xl h-14 px-4"
              >
                <Ionicons name="mail-outline" size={20} color={colors.textSecondary} />
                <TextInput
                  placeholder="hello@example.com"
                  placeholderTextColor={colors.textSecondary}
                  style={{ color: colors.text, flex: 1, marginLeft: 12 }}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View>
              <Text style={{ color: colors.text }} className="text-sm font-medium mb-2 ml-1">
                Password
              </Text>
              <View
                style={{ backgroundColor: colors.card, borderColor: colors.border }}
                className="flex-row items-center border rounded-2xl h-14 px-4"
              >
                <Ionicons name="lock-closed-outline" size={20} color={colors.textSecondary} />
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor={colors.textSecondary}
                  style={{ color: colors.text, flex: 1, marginLeft: 12 }}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={secureTextEntry}
                />
                <TouchableOpacity onPress={() => setSecureTextEntry(!secureTextEntry)}>
                  <Ionicons
                    name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {error && (
              <Text style={{ color: '#EF4444' }} className="text-sm mt-1 ml-1">
                {error}
              </Text>
            )}

            {/* Sign Up Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-indigo-600 h-14 rounded-2xl items-center justify-center shadow-lg shadow-indigo-500/30 mt-4"
              onPress={handleRegister}
            >
              <Text className="text-white font-bold text-lg">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Login Divider */}
          <View className="flex-row items-center my-8">
            <View style={{ backgroundColor: colors.border }} className="flex-1 h-[1px]" />
            <Text style={{ color: colors.textSecondary }} className="mx-4 text-xs font-medium uppercase">
              Or sign up with
            </Text>
            <View style={{ backgroundColor: colors.border }} className="flex-1 h-[1px]" />
          </View>

          <View className="flex-row gap-4 mb-8">
            <TouchableOpacity
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
              className="flex-1 h-14 border rounded-2xl items-center justify-center flex-row"
            >
              <Ionicons name="logo-google" size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
              className="flex-1 h-14 border rounded-2xl items-center justify-center flex-row"
            >
              <Ionicons name="logo-apple" size={20} color={colors.text} />
            </TouchableOpacity>
          </View>

          {/* Login Link */}
          <View className="flex-row justify-center">
            <Text style={{ color: colors.textSecondary }} className="text-base">
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-indigo-500 font-bold text-base">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
