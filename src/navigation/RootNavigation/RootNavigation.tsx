/* eslint-disable react-native/no-inline-styles */

// React and third-party imports
import Lottie from 'lottie-react-native';
import {View, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

// Custom helper and utility imports
import {logMessage} from 'helpers/helper';
import AsyncStorageWrapper from '../../utils/asyncStorage';

// Redux actions and stack navigators
import {AuthStack} from '../AuthStack/AuthStack';
import OwnerNavigation from '../OwnerNavigation';
import {Init} from '../../../src/redux/reducers/InitializeReducer';

// Component for managing the root navigation based on authentication status
export const RootNavigation = () => {
  // Logging function from helper
  const {log} = logMessage();

  // Redux selector to get the authentication token
  const token = useSelector((state: any) => state.login.data.authToken);

  // React Navigation hook
  const navigation = useNavigation();

  // Effect to retrieve and store the FCM token
  useEffect(() => {
    const getToken = async () => {
      const Fcm_token = await messaging().getToken();
      await AsyncStorageWrapper.setItem('device_token', Fcm_token);
    };
    getToken();
  }, []);

  // Effect to handle notification when the app is opened or in the background
  useEffect(() => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate('MyOrder');
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from kill state:',
            remoteMessage.notification,
          );
          navigation.navigate('MyOrder');
        }
      });
  }, [navigation]);

  // State and dispatch setup
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  // Function to initialize the app and dispatch initialization action
  const init = async () => {
    await dispatch(Init() as any);
    setLoading(false);
  };

  // Effect to handle background messages
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      log.info('Message handled in the background!', remoteMessage);
    });
  });

  // Initializations and cleanup effect for loading state
  useEffect(() => {
    init();
  }, [token]);

  // Delayed initialization to show a loading animation
  useEffect(() => {
    const delay = setTimeout(() => {
      init()
        .then(() => {
          // Do something after init() resolves (e.g., continue your code)
        })
        .catch(error => {
          // Handle any errors if init() rejects
          log.error('Error in clearing cart', error);
        });
    }, 3000);
    // Add a delay of 2 seconds before initializing
    return () => clearTimeout(delay); // Clear the timeout if the component unmounts before the delay is completed
  }, []);

  // Render loading animation while initializing
  if (loading === true) {
    return (
      <View
        style={{flex: 1, justifyContent: 'center', backgroundColor: 'black'}}>
        <Lottie
          source={require('../../../assets/Loginloading.json')}
          autoPlay
          loop
        />
      </View>
    );
  }

  // Render based on authentication status
  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {token === null ? <AuthStack /> : <OwnerNavigation />}
    </>
  );
};
