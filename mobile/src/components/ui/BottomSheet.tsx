import React from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

type BottomSheetProps = {
  isOpen: SharedValue<boolean>;
  toggleSheet: () => void;
  duration?: number;
  children: React.ReactNode;
};

function BottomSheet({
  isOpen,
  toggleSheet,
  duration = 500,
  children,
}: BottomSheetProps) {
  const height = useSharedValue(0);

  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, { duration })
  );

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * 2 * height.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 10
      : withDelay(duration, withTiming(-1, { duration: 0 })),
  }));

  return (
    <>
      {/* BACKDROP */}
      <Animated.View
        style={backdropStyle}
        className="absolute inset-0 bg-black/30"
      >
        <TouchableOpacity className="flex-1" onPress={toggleSheet} />
      </Animated.View>

      {/* SHEET */}
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        style={sheetStyle}
        className="absolute bottom-0 w-full rounded-t-2xl bg-white px-6 py-4 items-center justify-center z-20"
      >
        {children}
      </Animated.View>
    </>
  );
}

export default function App() {
  const isOpen = useSharedValue(false);

  const toggleSheet = () => {
    isOpen.value = !isOpen.value;
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <Pressable
        onPress={toggleSheet}
        className="bg-purple-400 px-4 py-3 rounded-full"
      >
        <Text className="text-white font-semibold">
          Toggle bottom sheet
        </Text>
      </Pressable>

      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet}>
        <Text className="text-center text-gray-700">
          Discover the indispensable convenience of a bottom sheet in mobile
          apps. Seamlessly integrated, it provides quick access to supplementary
          features.
        </Text>

        <View className="mt-4 flex-row justify-center">
          <Pressable className="flex-row items-center gap-2">
            <Text className="font-semibold underline text-purple-500">
              Read more
            </Text>
          </Pressable>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
}
