import PulseAiSuggestions from "@/components/home/AiSuggestionCard";
import PriorityTasks from "@/components/home/PriorityTasksSection";
import QuickStatsGrid from "@/components/home/QuickStatsGrid";
import { ScrollView } from "react-native";
import { useColors } from "../../../context/ThemeContext";

export default function HomeScreen() {
  const colors = useColors();

  return (
    <ScrollView style={{ backgroundColor: colors.background }} className="flex flex-col px-4 pt-4">
      <PulseAiSuggestions />
      <QuickStatsGrid />
      <PriorityTasks />
    </ScrollView>
  );
}