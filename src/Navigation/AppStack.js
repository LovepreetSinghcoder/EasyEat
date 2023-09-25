import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../MainScreens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProductScreen from '../MainScreens/ProductScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (

  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerShown: false }} />

  </Stack.Navigator>
)




const AppStack = () => {
  return (
    <NavigationContainer>
    
      <Tab.Navigator
      screenOptions={({ route}) => ({
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          }
          else if (route.name === 'Profile') {
            iconName = 'person';
          }
          else if (route.name === 'Settings') {
            iconName = 'settings';
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarLabelStyle: styles.tabBarLabel
      })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Profile" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={HomeStack} options={{ headerShown: false }} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppStack

const styles = StyleSheet.create({
  tabBar :{
    height: 55,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderColor: 'grey'
  },
  tabBarLabel  :{
    paddingBottom: 5
  }
})