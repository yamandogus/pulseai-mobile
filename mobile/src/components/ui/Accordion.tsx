import React from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';

type AccordionItemProps = {
  isExpanded: SharedValue<boolean>;
  children: React.ReactNode;
  viewKey: string;
  duration?: number;
};

function AccordionItem({
  isExpanded,
  children,
  viewKey,
  duration = 500,
}: AccordionItemProps) {
  const height = useSharedValue(0);

  const animatedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(isExpanded.value), {
      duration,
    })
  );

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
  }));

  return (
    <Animated.View
      key={`accordion-${viewKey}`}
      style={animatedStyle}
      className="w-full overflow-hidden"
    >
      <View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
        }}
        className="absolute w-full items-center"
      >
        {children}
      </View>
    </Animated.View>
  );
}


type AccordionProps = {
  open: SharedValue<boolean>;
  children: React.ReactNode;
};

export function Accordion({ open, children }: AccordionProps) {
  return (
    <View className="w-52">
      <AccordionItem isExpanded={open} viewKey="main">
        {children}
      </AccordionItem>
    </View>
  );
}


