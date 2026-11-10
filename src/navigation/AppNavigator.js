//src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import CategoryScreen from '../screens/CategoryScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
