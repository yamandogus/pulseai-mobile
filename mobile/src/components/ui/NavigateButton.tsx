import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity,Text } from 'react-native';

type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  pulseAi: undefined;
  Insights: undefined;
  Profile: undefined;
};

// Stack Navigator Param List
type RootStackParamList = {
  MainTabs: undefined;
  Notifications: undefined;
};

type NavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  title: string;
  nav: string;
};

export default function NavigateButton({title, nav}:Props) {
const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(nav as never)}>
      <Text className='font-bold text-blue-400'>{title}</Text>
    </TouchableOpacity>
  );
}
