import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import GenerateScreen from './src/GenerateScreen';
import CaloriesScreen from './src/CaloriesScreen';
import HomeScreen from './src/HomeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeStack" component={HomeScreen} />
  </Stack.Navigator>
);

const GenerateStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GenerateStack" component={GenerateScreen} />
  </Stack.Navigator>
);

const CaloriesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CaloriesStack" component={CaloriesScreen} />
  </Stack.Navigator>
);

const Navigation = () => (
  <Tab.Navigator
  
    screenOptions={({ route }) => ({
      headerShown:false,
      tabBarShowLabel:false,
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Generate') {
          iconName = 'create';
        } else if (route.name === 'Calories') {
          iconName = 'local-fire-department';
        }

        return <Icon name={iconName} size={30} color={'#13bf00'} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Generate" component={GenerateStack} />
    <Tab.Screen name="Calories" component={CaloriesStack} />
  </Tab.Navigator>
);

    


export default Navigation;
