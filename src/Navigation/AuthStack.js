import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../LoginSignupScreen/LoginScreen';
import SignupScreen from '../LoginSignupScreen/SignupScreen';
import SignupNextScreen from '../LoginSignupScreen/SignupNextScreen';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
                <Stack.Screen name="SignUp" component={SignupScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignUpNext" component={SignupNextScreen} options={{headerShown: false}}/>


            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AuthStack

const styles = StyleSheet.create({})