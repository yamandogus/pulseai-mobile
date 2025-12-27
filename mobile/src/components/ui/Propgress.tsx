import { View } from "react-native";

type ProgressProps = {
  value: number; // 0 - 100
};

export function ProgressBar({ value }: ProgressProps) {
  return (
    <View className="w-full h-3 bg-[#87b9d9] rounded-full overflow-hidden">
      <View
        className="h-full bg-white rounded-full"
        style={{ width: `${value}%` }}
      />
    </View>
  );
}
