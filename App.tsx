/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState, useRef} from 'react';
import {
  NavigationContainer,
  useNavigation,
  NavigationContainerRef,
} from '@react-navigation/native';

import {LogBox, StatusBar, View} from 'react-native';
import LoginScreen from 'screens/LoginScreen/LoginScreen';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/redux/store';
import {Init} from './src/redux/actions/Actions';
import OtpScreen from 'screens/OtpScreen/OtpScreen';
import OwnerNavigation from './src/navigation/OwnerNavigation';
import SplashScreen from 'screens/Splashscreen/Splashscreen';
import {ColorSchemeProvider} from './ColorSchemeContext';
import Lottie from 'lottie-react-native';
import SignupScreen from 'screens/SignUp/SignupScreen';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import ApiService from 'network/Network';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Sentry from '@sentry/react-native';
import messaging from '@react-native-firebase/messaging';
import Homescreen from 'screens/Home/Homescreen';

import {setNavigationReference} from './src/network/Network';
import {listProductsById} from 'constants/ApiRoutes';
import {logMessage} from 'helpers/Helper';
import NetInfo from '@react-native-community/netinfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
Sentry.init({
  dsn: 'https://1a526180b7ecdaa480950fe3b01322a4@o4505635340419072.ingest.sentry.io/4505724329918464',
  enableAutoSessionTracking: true,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});

const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();

export const AuthStack = () => {
  const navigation = useNavigation();
  useEffect(() => {
    checkFirstTimeUser();
  }, []);
  const checkFirstTimeUser = async () => {
    try {
      // Check if the user has already logged in
      const hasLoggedIn = await AsyncStorage.getItem('hasLoggedIn');

      // If the user has logged in before, navigate to the LoginScreen
      if (hasLoggedIn) {
        navigation.navigate('Login' as never);
      } else {
        // If it's the first time user, navigate to the SplashScreen
        navigation.navigate('SplashScreen' as never);

        // Store the flag indicating that the user has logged in
        await AsyncStorage.setItem('hasLoggedIn', 'true');
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
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
    </Stack.Navigator>
  );
};
export const RootNavigation = () => {
  const token = useSelector((state: any) => state.login.data.authToken);
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    const Fcm_token = await messaging().getToken();
    await AsyncStorage.setItem('device_token', Fcm_token);
  };
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init() as any);
    setLoading(false);
  };
  useEffect(() => {
    init();
  }, [token]);
  useEffect(() => {
    const delay = setTimeout(() => {
      init()
        .then(() => {
          // Do something after init() resolves (e.g., continue your code)
        })
        .catch(error => {
          // Handle any errors if init() rejects
          logMessage.error(error);
        });
    }, 3000);
    // Add a delay of 2 seconds before initializing
    return () => clearTimeout(delay); // Clear the timeout if the component unmounts before the delay is completed
  }, []);
  if (loading === true) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
        <Lottie source={require('./assets/Loginloading.json')} autoPlay loop />
      </View>
    );
  }

  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {token === null ? <AuthStack /> : <OwnerNavigation />}
    </>
  );
};
const checkInternetConnectivity = async () => {
  try {
    const state = await NetInfo.fetch();
    return state.isConnected;
  } catch (error) {
    return false;
  }
};
const App = () => {
  const navigationRef = useRef<NavigationContainerRef | null>(null);

  useEffect(() => {
    setNavigationReference(navigationRef.current);
    const checkConnectivity = async () => {
      const isConnected = await checkInternetConnectivity();
      if (!isConnected && navigationRef.current) {
        navigationRef.current.navigate('ApiErrorScreen', {status: null});
      }
    };

    checkConnectivity();
  }, []);

  const HandleDeepLinking = () => {
    // Add this line to check if HandleDeepLinking is triggered
    const navigation = useNavigation();
    const Handlelink = async (link: any) => {
      // Add this line to check if Handlelink is triggered
      try {
        let productId = link.url.split('=').pop();
        const result = await ApiService.get(`${listProductsById}/${productId}`);
        navigation.navigate('UProductDetails', {product: result});
      } catch (error) {
        logMessage.error('Error handling deep link:', error);
      }
    };
    useEffect(() => {
      const initialLink = dynamicLinks()?.getInitialLink();
      initialLink
        ?.then(link => {
          if (link) {
            Handlelink(link);
          }
        })
        .catch(error => {
          logMessage.error('Error getting initial link:', error);
        });

      const subscribe = dynamicLinks()?.onLink(() => {
        Handlelink(initialLink).catch(error => {
          logMessage.error('error in handlelink', error);
          // Handle any errors if Handlelink() rejects
        });
      });

      return () => subscribe();
    }, []);

    return null;
  };

  return (
    <ColorSchemeProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <HandleDeepLinking />
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </ColorSchemeProvider>
  );
};

export default Sentry.wrap(App);
