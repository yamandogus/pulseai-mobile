import { Platform, ScrollViewProps, View, } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = ScrollViewProps & {
  height?: number;
};

export default function AndroidView({ children, height = 72, style, ...rest }: Props) {
  const insets = useSafeAreaInsets();
  const topInset = Platform.OS === 'ios' ? 0 : insets.top;
  return (
    <View
      {...rest}
      className='flex-1'
      style={[
        {
          paddingTop: topInset,
          paddingHorizontal: 16,
          height: topInset + height,
          backgroundColor: '#f5f5f5',
        },
        style,
      ]}>
      {children}
    </View>
  );
}
