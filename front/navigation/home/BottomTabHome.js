import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import StackFavorites from './StackFavorites';
import StackHome from './stackhome';
import StackSettings from './StackSettings';
import StackStatistics from './StackStatistics';

export default function BottomTabHome() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="StackHome">
        <Tab.Screen name="StackHome" component={StackHome} />
        <Tab.Screen name="StackFavorites" component={StackFavorites} />
        <Tab.Screen name="StackStatistics" component={StackStatistics} />
        <Tab.Screen name="StackSettings" component={StackSettings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}