import HomeHeader from "@/components/home/Header";
import { View} from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex flex-col px-4">
      <HomeHeader/>
    </View>
  );
}