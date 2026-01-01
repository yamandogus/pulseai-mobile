import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useTheme, useColors } from '../../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const OPERATIONS = [
    { id: '1', title: 'Kullanıcı Yönetimi', icon: 'people', color: '#6366F1' },
    { id: '2', title: 'Sistem Durumu', icon: 'server', color: '#10B981' },
    { id: '3', title: 'Analitik', icon: 'bar-chart', color: '#3B82F6' },
    { id: '4', title: 'Faturalandırma', icon: 'card', color: '#F59E0B' },
    { id: '5', title: 'Destek', icon: 'headset', color: '#EC4899' },
    { id: '6', title: 'Ayarlar', icon: 'settings', color: '#8B5CF6' },
];

export default function OperationsScreen() {
    const colors = useColors();
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: insets.top + 20,
                    paddingHorizontal: 20,
                    paddingBottom: 40
                }}
                showsVerticalScrollIndicator={false}
            >
                <Text style={{ color: colors.text }} className="text-3xl font-bold mb-2">İşlemler</Text>
                <Text style={{ color: colors.textSecondary }} className="text-base mb-8">
                    Tüm sistem araçlarını buradan yönetebilirsiniz.
                </Text>

                {/* Hero / Promo Card */}
                <View
                    className="w-full h-40 rounded-3xl mb-8 p-6 justify-between overflow-hidden relative bg-indigo-600"
                    style={{
                        shadowColor: "#6366F1",
                        shadowOffset: { width: 0, height: 10 },
                        shadowOpacity: 0.3,
                        shadowRadius: 20,
                        elevation: 10
                    }}
                >
                    {/* Decorative circles */}
                    <View className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white opacity-10" />
                    <View className="absolute bottom-0 left-10 w-20 h-20 rounded-full bg-white opacity-5" />

                    <View>
                        <View className="flex-row items-center bg-white/20 px-3 py-1 rounded-full self-start backdrop-blur-md mb-2">
                            <Ionicons name="star" size={12} color="white" />
                            <Text className="text-white text-xs font-bold ml-1">PRO</Text>
                        </View>
                        <Text className="text-white text-xl font-bold">Premium'a Yükselt</Text>
                        <Text className="text-indigo-100 text-sm mt-1">Sınırsız analiz ve AI desteği.</Text>
                    </View>

                    <TouchableOpacity className="bg-white px-4 py-2 rounded-xl self-start">
                        <Text className="text-indigo-600 font-bold text-sm">Planları İncele</Text>
                    </TouchableOpacity>
                </View>

                {/* Grid Layout */}
                <View className="flex-row flex-wrap justify-between">
                    {OPERATIONS.map((op) => (
                        <TouchableOpacity
                            key={op.id}
                            activeOpacity={0.8}
                            style={{
                                width: '48%',
                                backgroundColor: colors.card,
                                aspectRatio: 1,
                                marginBottom: 16,
                                shadowColor: colors.shadow,
                                shadowOffset: { width: 0, height: 4 },
                                shadowOpacity: 0.05,
                                shadowRadius: 10,
                                elevation: 3,
                            }}
                            className="rounded-2xl p-5 justify-between border border-gray-100 dark:border-gray-800"
                        >
                            <View
                                style={{ backgroundColor: `${op.color}15` }}
                                className="w-12 h-12 rounded-full items-center justify-center"
                            >
                                <Ionicons name={op.icon as any} size={24} color={op.color} />
                            </View>

                            <View>
                                <Text style={{ color: colors.text }} className="text-base font-bold mb-1">{op.title}</Text>
                                <View className="flex-row items-center">
                                    <Text style={{ color: colors.textSecondary }} className="text-xs font-medium mr-1">Aç</Text>
                                    <Ionicons name="arrow-forward" size={12} color={colors.textSecondary} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
