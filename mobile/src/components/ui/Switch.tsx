import React from 'react';
import {
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

type TrackColors = {
  on: string;
  off: string;
};

type SwitchProps = {
  value: SharedValue<boolean>;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  trackColors?: TrackColors;
};

const Switch: React.FC<SwitchProps> = ({
  value,
  onPress,
  style,
  duration = 400,
  trackColors = { on: '#82cab2', off: '#fa7f7c' },
}) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const backgroundColor = withTiming(
      interpolateColor(
        Number(value.value),
        [0, 1],
        [trackColors.off, trackColors.on]
      ),
      { duration }
    );

    return {
      backgroundColor,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateX = withTiming(
      interpolate(
        Number(value.value),
        [0, 1],
        [0, width.value - height.value]
      ),
      { duration }
    );

    return {
      transform: [{ translateX }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[switchStyles.track, style, trackAnimatedStyle]}
      >
        <Animated.View style={[switchStyles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
};

const switchStyles = {
  track: {
    alignItems: 'flex-start' as const,
    width: 100,
    height: 40,
    padding: 5,
  },
  thumb: {
    height: '100%' as const,
    aspectRatio: 1,
    backgroundColor: 'white',
  },
};

export default Switch;
