import { View, Text, StyleSheet } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { useEffect } from "react";
import Switch from "../../../components/ui/Switch";
import { useTheme, useColors } from "../../../context/ThemeContext";

export default function ProfileScreen() {
  const { isDark, toggleTheme } = useTheme();
  const colors = useColors();

  // Switch için shared value - tema durumuna göre senkronize
  const switchValue = useSharedValue<boolean>(isDark);

  // Tema değiştiğinde switch'i güncelle
  useEffect(() => {
    switchValue.value = isDark;
  }, [isDark]);

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Başlık */}
      <Text style={[styles.title, { color: colors.text }]}>Profile</Text>

      {/* Dark Mode Ayarı */}
      <View style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>
              🌙 Dark Mode
            </Text>
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
              {isDark ? "Karanlık tema aktif" : "Aydınlık tema aktif"}
            </Text>
          </View>

          <Switch
            value={switchValue}
            onPress={handleToggle}
            style={styles.switch}
            trackColors={{
              on: "#6366F1",  // Primary color
              off: "#E5E7EB", // Gray
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  settingCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
  switch: {
    width: 60,
    height: 32,
    padding: 4,
  },
});