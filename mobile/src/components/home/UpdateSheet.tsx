import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Modal } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';

type BottomSheetProps = {
  isOpen: boolean;
  toggleSheet: () => void;
  duration?: number;
  children: React.ReactNode;
  headerTitle?: string;
  buttonText?: string;
  onButtonPress?: () => void;
};

export default function UpdateSheet({
  isOpen,
  toggleSheet,
  duration = 300,
  children,
  headerTitle,
  buttonText = "Ertele",
  onButtonPress,
}: BottomSheetProps) {
  const [isVisible, setIsVisible] = useState(false);
  const height = useSharedValue(0);
  const progress = useSharedValue(1); // 1: Hidden (Translated Down), 0: Visible (No Translation)

  const handleVisibility = (visible: boolean) => {
    setIsVisible(visible);
  };

  useEffect(() => {
    if (isOpen) {
      handleVisibility(true);
      progress.value = withTiming(0, { duration });
    } else {
      progress.value = withTiming(1, { duration }, (finished) => {
        if (finished) {
          runOnJS(handleVisibility)(false);
        }
      });
    }
  }, [isOpen, duration]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: progress.value * (height.value + 100) }], // Add extra buffer
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: (1 - progress.value) * 1, // Max opacity 1 (bg-black/30 handles the 0.3)
  }));

  if (!isVisible) return null;

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="none"
      onRequestClose={toggleSheet}
      statusBarTranslucent
    >
      <View className="flex-1 justify-end">
        {/* BACKDROP */}
        <Animated.View style={backdropStyle} className="absolute inset-0 bg-black/30">
          <TouchableOpacity className="flex-1" onPress={toggleSheet} activeOpacity={1} />
        </Animated.View>

        {/* SHEET */}
        <Animated.View
          onLayout={(e) => {
            height.value = e.nativeEvent.layout.height;
          }}
          style={sheetStyle}
          className="w-full items-center justify-center rounded-t-3xl bg-white px-6 py-6 shadow-xl dark:bg-gray-800"
        >
          {/* HEADER INDICATOR */}
          <View className="mb-6 h-1.5 w-12 rounded-full bg-gray-300 dark:bg-gray-600" />

          {/* OPTIONAL TITLE */}
          {headerTitle && (
            <View className="mb-4 w-full">
              <Text className="text-center text-xl font-bold text-gray-900 dark:text-white">
                {headerTitle}
              </Text>
            </View>
          )}

          {/* CONTENT */}
          <View className="mb-6 w-full">{children}</View>

          {/* DYNAMIC ACTION BUTTON */}
          {onButtonPress && (
            <View className="w-full mb-8">
              <TouchableOpacity
                onPress={onButtonPress}
                className="w-full items-center rounded-2xl bg-purple-600 py-4 active:bg-purple-700 dark:bg-purple-700 dark:active:bg-purple-800"
              >
                <Text className="text-base font-bold text-white dark:text-white dark:active:bg-purple-800">
                  {buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          )}
       
        </Animated.View>
      </View>
    </Modal>
  );
}

