import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Switch, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '../../../context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useTaskStore } from '@/store/task/task.store';

export default function CreateTaskScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState('Orta');
  const [category, setCategory] = useState('Genel');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  const addTask = useTaskStore((state) => state.addTask);

  const priorities = ['Düşük', 'Orta', 'Yüksek'];
  const categories = ['Genel', 'İş', 'Kişisel', 'Alışveriş', 'Sağlık'];

  const pickImage = async () => {
    // Gerçek cihazda izin istemek gerekebilir, expo-image-picker bunu halleder
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreateTask = () => {
    if (!title.trim()) {
      Alert.alert('Hata', 'Lütfen bir başlık giriniz.');
      return;
    }

    addTask({
      title,
      description,
      date: date.toISOString().split('T')[0],
      dueDate: date.toISOString().split('T')[0],
      priority: priority as any,
      category: category as any,
      image: image || undefined,
      notificationEnabled,
      calendarEnabled: true 
    });

    Alert.alert('Başarılı', 'Görev başarıyla oluşturuldu!', [
      { text: 'Tamam', onPress: () => navigation.goBack() }
    ]);
  };

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
        className="px-4 pb-4 flex-row items-center justify-between"
      >
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="w-10 h-10 items-center justify-center rounded-full"
        >
          <Ionicons name="close" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={{ color: colors.text }} className="text-lg font-bold">Yeni Görev</Text>
        <TouchableOpacity 
          onPress={handleCreateTask}
          className="px-4 py-2 bg-indigo-600 rounded-full"
        >
          <Text className="text-white font-bold text-sm">Ekle</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Title Input */}
        <View className="mb-6">
          <Text style={{ color: colors.textSecondary }} className="text-xs font-bold uppercase mb-2">Başlık</Text>
          <TextInput
            style={{ 
              color: colors.text, 
              backgroundColor: colors.card,
              borderColor: colors.border
            }}
            className="p-4 rounded-xl border text-lg font-semibold"
            placeholder="Ne yapılması gerekiyor?"
            placeholderTextColor={colors.textSecondary}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Description Input */}
        <View className="mb-6">
          <Text style={{ color: colors.textSecondary }} className="text-xs font-bold uppercase mb-2">Açıklama</Text>
          <TextInput
            style={{ 
              color: colors.text, 
              backgroundColor: colors.card,
              borderColor: colors.border
            }}
            className="p-4 rounded-xl border text-base min-h-[100px]"
            placeholder="Detayları ekle..."
            placeholderTextColor={colors.textSecondary}
            multiline
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Date & Time */}
        <View className="mb-6">
          <Text style={{ color: colors.textSecondary }} className="text-xs font-bold uppercase mb-2">Zamanlama</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity 
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
              className="flex-1 p-3 rounded-xl border flex-row items-center justify-center"
            >
              <Ionicons name="calendar-outline" size={20} color={colors.primary} className="mr-2" />
              <Text style={{ color: colors.text }} className="font-medium">Bugün</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ backgroundColor: colors.card, borderColor: colors.border }}
              className="flex-1 p-3 rounded-xl border flex-row items-center justify-center"
            >
              <Ionicons name="time-outline" size={20} color={colors.primary} className="mr-2" />
              <Text style={{ color: colors.text }} className="font-medium">12:00</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Priority & Category */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1">
            <Text style={{ color: colors.textSecondary }} className="text-xs font-bold uppercase mb-2">Öncelik</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {priorities.map(p => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPriority(p)}
                  style={{ 
                    backgroundColor: priority === p ? colors.primary : colors.card,
                    borderColor: priority === p ? colors.primary : colors.border
                  }}
                  className="mr-2 px-3 py-2 rounded-lg border"
                >
                  <Text style={{ color: priority === p ? 'white' : colors.text }} className="text-xs font-bold">{p}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <View className="mb-6">
            <Text style={{ color: colors.textSecondary }} className="text-xs font-bold uppercase mb-2">Kategori</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map(c => (
                <TouchableOpacity
                  key={c}
                  onPress={() => setCategory(c)}
                  style={{ 
                    backgroundColor: category === c ? colors.primary : colors.card,
                    borderColor: category === c ? colors.primary : colors.border
                  }}
                  className="mr-2 px-3 py-2 rounded-lg border"
                >
                  <Text style={{ color: category === c ? 'white' : colors.text }} className="text-xs font-bold">{c}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

        {/* Attachments */}
        <View className="mb-6">
          <Text style={{ color: colors.textSecondary }} className="text-xs font-bold uppercase mb-2">Görsel Ekle</Text>
          <TouchableOpacity 
            onPress={pickImage}
            style={{ 
              backgroundColor: colors.card, 
              borderColor: colors.border,
              borderStyle: 'dashed'
            }}
            className="w-full h-32 rounded-xl border-2 items-center justify-center overflow-hidden"
          >
            {image ? (
              <Image source={{ uri: image }} className="w-full h-full" resizeMode="cover" />
            ) : (
              <View className="items-center">
                <Ionicons name="image-outline" size={32} color={colors.textSecondary} />
                <Text style={{ color: colors.textSecondary }} className="text-xs mt-2">Görsel seçmek için dokun</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Settings */}
        <View className="mb-8">
          <Text style={{ color: colors.textSecondary }} className="text-xs font-bold uppercase mb-2">Ayarlar</Text>
          
          <View 
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
            className="p-4 rounded-xl border mb-3 flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 items-center justify-center mr-3">
                <Ionicons name="notifications-outline" size={18} color="#3B82F6" />
              </View>
              <Text style={{ color: colors.text }} className="font-medium">Bildirim Gönder</Text>
            </View>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
              trackColor={{ false: '#767577', true: '#818CF8' }}
              thumbColor={notificationEnabled ? '#4F46E5' : '#f4f3f4'}
            />
          </View>

          <View 
            style={{ backgroundColor: colors.card, borderColor: colors.border }}
            className="p-4 rounded-xl border flex-row items-center justify-between"
          >
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 items-center justify-center mr-3">
                <Ionicons name="calendar-outline" size={18} color="#F97316" />
              </View>
              <Text style={{ color: colors.text }} className="font-medium">Takvime Ekle</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
          </View>
        </View>

      </ScrollView>
    </View>
  );
}
