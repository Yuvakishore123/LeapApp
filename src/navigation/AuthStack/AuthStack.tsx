import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OtpScreen from 'screens/Common/OtpScreen/OtpScreen';
import AsyncStorageWrapper from '../../utils/asyncStorage';
import SignupScreen from 'screens/Common/SignUp/SignupScreen';
import Homescreen from 'screens/BorrowerScreens/Home/Homescreen';
import LoginScreen from 'screens/Common/LoginScreen/LoginScreen';
import SplashScreen from 'screens/Common/Splashscreen/Splashscreen';
import ApiErrorScreen from 'screens/Common/ApiErrorScreen/ApiErrorScreen';

const Stack = createNativeStackNavigator();
export const AuthStack = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkFirstTimeUser();
  }, []);
  const checkFirstTimeUser = async () => {
    try {
      // Check if the user has already logged in
      const hasLoggedIn = await AsyncStorageWrapper.getItem('hasLoggedIn');

      // If the user has logged in before, navigate to the LoginScreen
      if (hasLoggedIn) {
        navigation.navigate('Login' as never);
      } else {
        // If it's the first time user, navigate to the SplashScreen
        navigation.navigate('SplashScreen' as never);

        // Store the flag indicating that the user has logged in
        await AsyncStorageWrapper.setItem('hasLoggedIn', 'true');
      }
    } catch (error) {
      console.error('Error checking first time user:', error);
    }
  };
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Homescreen" component={Homescreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="ApiErrorScreen" component={ApiErrorScreen} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
};
