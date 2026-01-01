import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/context/ThemeContext';

export default function QuickStatsGrid() {
    const colors = useColors();

    const stats = [
        { title: 'Aktif Projeler', value: '12', icon: 'briefcase', color: '#6366F1' },
        { title: 'Bekleyen', value: '5', icon: 'time', color: '#F59E0B' },
        { title: 'Tamamlanan', value: '28', icon: 'checkmark-circle', color: '#10B981' },
        { title: 'Verimlilik', value: '%94', icon: 'pulse', color: '#EC4899' },
    ];

    return (
        <View className="mb-6">
            <Text style={{ color: colors.text }} className="text-lg font-bold mb-4 px-2">Hızlı Bakış</Text>
            <View className="flex-row flex-wrap justify-between">
                {stats.map((stat, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        style={{
                            backgroundColor: colors.card,
                            width: '48%', // 2 items per row with gap
                            marginBottom: 12,
                            shadowColor: colors.shadow,
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.05,
                            shadowRadius: 8,
                            elevation: 2,
                        }}
                        className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800"
                    >
                        <View className="flex-row items-center justify-between mb-2">
                            <View
                                style={{ backgroundColor: `${stat.color}15` }}
                                className="w-8 h-8 rounded-full items-center justify-center"
                            >
                                <Ionicons name={stat.icon as any} size={16} color={stat.color} />
                            </View>
                            {index === 3 && ( // Example visual indicator for Efficiency
                                <Ionicons name="trending-up" size={14} color="#10B981" />
                            )}
                        </View>
                        <Text style={{ color: colors.text }} className="text-2xl font-bold">{stat.value}</Text>
                        <Text style={{ color: colors.textSecondary }} className="text-sm font-medium">{stat.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}
