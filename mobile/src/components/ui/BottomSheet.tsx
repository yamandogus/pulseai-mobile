import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
  SharedValue,
  useSharedValue,
} from 'react-native-reanimated';

type BottomSheetProps = {
  isOpen: SharedValue<boolean>;
  toggleSheet: () => void;
  duration?: number;
  children: React.ReactNode;
  headerTitle?: string;
  buttonText?: string;
  onButtonPress?: () => void;
};

export default function BottomSheet({
  isOpen,
  toggleSheet,
  duration = 500,
  children,
  headerTitle,
  buttonText,
  onButtonPress,
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
        className="absolute bottom-0 w-full rounded-t-3xl bg-white px-6 py-6 items-center justify-center z-20 shadow-xl"
      >
        {/* HEADER INDICATOR */}
        <View className="w-12 h-1.5 bg-gray-300 rounded-full mb-6" />

        {/* OPTIONAL TITLE */}
        {headerTitle && (
          <View className="mb-4 w-full">
            <Text className="text-xl font-bold text-gray-900 text-center">{headerTitle}</Text>
          </View>
        )}

        {/* CONTENT */}
        <View className="w-full mb-6">
          {children}
        </View>

        {/* DYNAMIC ACTION BUTTON */}
        {buttonText && (
          <View className="w-full">
            <TouchableOpacity
              onPress={onButtonPress}
              className="w-full bg-purple-600 py-4 rounded-2xl items-center active:bg-purple-700"
            >
              <Text className="text-white font-bold text-base">
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </>
  );
}
