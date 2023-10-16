/* eslint-disable react-hooks/exhaustive-deps */
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
import {Init} from './src/redux/actions/actions';
import OtpScreen from 'screens/OtpScreen/OtpScreen';
import OwnerNavigation from './src/navigation/OwnerNavigation';
import SplashScreen from 'screens/Splashscreen/Splashscreen';
import {ColorSchemeProvider} from './ColorSchemeContext';
import Lottie from 'lottie-react-native';
import SignupScreen from 'screens/SignUp/SignupScreen';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import ApiService from 'network/network';

import * as Sentry from '@sentry/react-native';

import messaging from '@react-native-firebase/messaging';
import Homescreen from 'screens/Home/Homescreen';

import {listProductsById} from 'constants/apiRoutes';
import {logMessage} from 'helpers/helper';
import ApiErrorScreen from 'screens/ApiErrorScreen/ApiErrorScreen';
import {setNavigationReference} from '../LeapApp/src/network/network';
import AsyncStorageWrapper from '../LeapApp/src/utils/asyncStorage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
LogBox.ignoreAllLogs();
Sentry.init({
  dsn: 'https://1a526180b7ecdaa480950fe3b01322a4@o4505635340419072.ingest.sentry.io/4505724329918464',
  tracesSampleRate: 0.2,
  _experiments: {
    // The sampling rate for profiling is relative to TracesSampleRate.
    // In this case, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});
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
const RootNavigation = () => {
  const {log} = logMessage();

  const token = useSelector((state: any) => state.login.data.authToken);
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    const Fcm_token = await messaging().getToken();
    await AsyncStorageWrapper.setItem('device_token', Fcm_token);
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
          log.error('error in clearing cart', error);
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
const App = () => {
  const {log} = logMessage();
  const navigationRef = useRef<NavigationContainerRef | null>(null);

  useEffect(() => {
    setNavigationReference(navigationRef.current);
  }, []);

  const HandleDeepLinking = () => {
    const navigation = useNavigation();
    const Handlelink = async (link: any) => {
      try {
        let productId = link.url.split('=').pop();

        const result = await ApiService.get(`${listProductsById}/${productId}`);
        navigation.navigate('UProductDetails', {product: result});
      } catch (error) {}
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
          log.error('Error getting initial link:', error);
        });

      const subscribe = dynamicLinks()?.onLink(() => {
        Handlelink(initialLink)?.catch(error => {
          log.errror('error ', error);
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
