import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeScreen from "./screens/home/HomeScreen";
import TaskListScreen from "./screens/task/TaskListScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";

type TabType = "Home" | "Tasks" | "Profile";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("Home");

  const renderScreen = () => {
    switch (activeTab) {
      case "Home":
        return <HomeScreen />;
      case "Tasks":
        return <TaskListScreen />;
      case "Profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {renderScreen()}
      </View>
      
      {/* Tab Bar */}
      <View className="flex-row border-t border-gray-200 bg-white">
        <TabButton
          label="Home"
          isActive={activeTab === "Home"}
          onPress={() => setActiveTab("Home")}
        />
        <TabButton
          label="Tasks"
          isActive={activeTab === "Tasks"}
          onPress={() => setActiveTab("Tasks")}
        />
        <TabButton
          label="Profile"
          isActive={activeTab === "Profile"}
          onPress={() => setActiveTab("Profile")}
        />
      </View>
    </SafeAreaView>
  );
}

function TabButton({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 py-3 items-center ${
        isActive ? "bg-blue-50" : ""
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          isActive ? "text-blue-600" : "text-gray-600"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}