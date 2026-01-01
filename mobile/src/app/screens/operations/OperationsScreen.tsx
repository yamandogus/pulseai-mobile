import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const OPERATIONS = [
    {
        id: '1',
        title: 'User Management',
        icon: 'people',
        color: '#6366F1',
        description: 'Manage users and roles',
    },
    {
        id: '2',
        title: 'System Health',
        icon: 'pulse',
        color: '#10B981',
        description: 'Monitor server status',
    },
    {
        id: '3',
        title: 'Analytics',
        icon: 'bar-chart',
        color: '#F59E0B',
        description: 'View detailed reports',
    },
    {
        id: '4',
        title: 'Audit Logs',
        icon: 'clipboard',
        color: '#EF4444',
        description: 'Track system activity',
    },
    {
        id: '5',
        title: 'Settings',
        icon: 'settings',
        color: '#8B5CF6',
        description: 'App configuration',
    },
    {
        id: '6',
        title: 'Support',
        icon: 'headset',
        color: '#EC4899',
        description: 'Contact support team',
    },
];

export default function OperationsScreen({ navigation }: { navigation: any }) {
    const colors = useColors();
    const insets = useSafeAreaInsets();
    const screenWidth = Dimensions.get('window').width;
    const cardWidth = (screenWidth - 48) / 2; // 2 column grid with padding

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: colors.background }}
            contentContainerStyle={{
                paddingTop: insets.top + 20,
                paddingBottom: 100,
                paddingHorizontal: 16
            }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View className="mb-8">
                <Text
                    style={{ color: colors.text }}
                    className="text-3xl font-bold tracking-tight"
                >
                    Operations
                </Text>
                <Text
                    style={{ color: colors.textSecondary }}
                    className="text-base mt-2 opacity-80"
                >
                    Manage your system and preferences
                </Text>
            </View>

            {/* Grid Layout */}
            <View className="flex-row flex-wrap justify-between">
                {OPERATIONS.map((op) => (
                    <TouchableOpacity
                        key={op.id}
                        activeOpacity={0.7}
                        style={{
                            width: cardWidth,
                            backgroundColor: colors.card,
                            shadowColor: colors.shadow,
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 12,
                            elevation: 4,
                        }}
                        className="mb-4 rounded-3xl p-5 border border-gray-100 dark:border-gray-800"
                        onPress={() => {
                            // Navigation placeholder
                            // navigation.navigate(op.route);
                        }}
                    >
                        <View
                            style={{ backgroundColor: op.color + '20' }}
                            className="w-12 h-12 rounded-full items-center justify-center mb-4"
                        >
                            <Ionicons name={op.icon as any} size={24} color={op.color} />
                        </View>
                        <Text
                            style={{ color: colors.text }}
                            className="text-lg font-semibold mb-1"
                        >
                            {op.title}
                        </Text>
                        <Text
                            style={{ color: colors.textSecondary }}
                            className="text-xs leading-5"
                        >
                            {op.description}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Hero / Promo Card */}
            <View
                style={{
                    backgroundColor: colors.primary,
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.3,
                    shadowRadius: 16,
                    elevation: 8,
                }}
                className="mt-4 rounded-3xl p-6 relative overflow-hidden"
            >
                {/* Decorative Circles */}
                <View className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full" />
                <View className="absolute bottom-[-20] left-[-20] w-32 h-32 bg-white opacity-10 rounded-full" />

                <View className="flex-row items-center justify-between">
                    <View className="flex-1 mr-4">
                        <Text className="text-white text-xl font-bold mb-2">
                            Upgrade Plan
                        </Text>
                        <Text className="text-indigo-100 text-sm">
                            Unlock advanced operations and analytics tools.
                        </Text>
                    </View>
                    <View className="bg-white/20 p-3 rounded-xl">
                        <Ionicons name="rocket" size={24} color="white" />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}
