import PulseAiSuggestions from "@/components/home/AiSuggestionCard";
import HomeHeader from "@/components/home/Header";
import PriorityTasks from "@/components/home/PriorityTasksSection";
import { ScrollView } from "react-native";
import { useColors } from "../../../context/ThemeContext";

export default function HomeScreen() {
  const colors = useColors();

  return (
    <ScrollView style={{ backgroundColor: colors.background }} className="flex flex-col px-4">
      <HomeHeader />
      <PulseAiSuggestions />
      <PriorityTasks />
    </ScrollView>
  );
}