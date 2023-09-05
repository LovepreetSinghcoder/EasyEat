import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/LoginSignupScreen/LoginScreen';
import SignupScreen from './src/LoginSignupScreen/SignupScreen';
import SignupNextScreen from './src/LoginSignupScreen/SignupNextScreen';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      {/* <LoginScreen /> */}
      {/* <SignupScreen/> */}
      <SignupNextScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
