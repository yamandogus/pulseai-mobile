import PulseAiSuggestions from "@/components/home/AiSuggestionCard";
import HomeHeader from "@/components/home/Header";
import PriorityTasks from "@/components/home/PriorityTasksSection";
import {ScrollView } from "react-native";


export default function HomeScreen() {
  return (
    <ScrollView className="flex flex-col px-4 bg-[#f5f5f5]">
      <HomeHeader/>
      <PulseAiSuggestions/>
      <PriorityTasks/>
    </ScrollView>
  );
}