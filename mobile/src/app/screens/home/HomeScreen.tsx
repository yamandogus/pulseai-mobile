import HomeHeader from "@/components/home/Header";
import {ScrollView } from "react-native";


export default function HomeScreen() {
  return (
    <ScrollView className="flex flex-col px-4">
      <HomeHeader/>
    </ScrollView>
  );
}