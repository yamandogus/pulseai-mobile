import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }: { navigation: any }) {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ paddingTop: insets.top + 40, paddingBottom: 40 }}>
          {/* Brand / Logo Area */}
          <View className="items-center mb-10">
            <View className="w-20 h-20 bg-indigo-500 rounded-3xl items-center justify-center shadow-lg shadow-indigo-500/30 mb-6">
              <Ionicons name="pulse" size={40} color="white" />
            </View>
            <Text style={{ color: colors.text }} className="text-3xl font-bold tracking-tight text-center">
              Welcome Back
            </Text>
            <Text style={{ color: colors.textSecondary }} className="text-center mt-2 text-base">
              Sign in to continue to PulseAI
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-5">
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
                  placeholderTextColor={colors.textSecondary} // Using textSecondary for placeholder
                  style={{ color: colors.text, flex: 1, marginLeft: 12 }}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* Password Input */}
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

            {/* Forgot Password */}
            <TouchableOpacity className="items-end">
              <Text className="text-indigo-500 font-medium text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Sign In Button */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-indigo-600 h-14 rounded-2xl items-center justify-center shadow-lg shadow-indigo-500/30 mt-4"
              onPress={() => {
                // TODO: Implement Auth Logic
                // For now navigation to MainTabs is handled by the root navigator if not authenticated, 
                // but assuming this is part of the flow:
                console.log("Sign In Pressed");
              }}
            >
              <Text className="text-white font-bold text-lg">
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          {/* Social Login Divider */}
          <View className="flex-row items-center my-8">
            <View style={{ backgroundColor: colors.border }} className="flex-1 h-[1px]" />
            <Text style={{ color: colors.textSecondary }} className="mx-4 text-xs font-medium uppercase">
              Or continue with
            </Text>
            <View style={{ backgroundColor: colors.border }} className="flex-1 h-[1px]" />
          </View>

          {/* Social Buttons */}
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

          {/* Register Link */}
          <View className="flex-row justify-center">
            <Text style={{ color: colors.textSecondary }} className="text-base">
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-indigo-500 font-bold text-base">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}