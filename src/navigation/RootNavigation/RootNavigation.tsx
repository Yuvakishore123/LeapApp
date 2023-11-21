/* eslint-disable react-native/no-inline-styles */
import {logMessage} from 'helpers/helper';
import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import AsyncStorageWrapper from '../../utils/asyncStorage';
import OwnerNavigation from '../OwnerNavigation';
import Lottie from 'lottie-react-native';
import messaging from '@react-native-firebase/messaging';
import {AuthStack} from '../AuthStack/AuthStack';
import {Init} from '../../../src/redux/reducers/InitializeReducer';
import {useNavigation} from '@react-navigation/native';

export const RootNavigation = () => {
  const {log} = logMessage();

  const token = useSelector((state: any) => state.login.data.authToken);
  useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    const Fcm_token = await messaging().getToken();
    await AsyncStorageWrapper.setItem('device_token', Fcm_token);
  };
  const navigation = useNavigation();
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

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Init() as any);
    setLoading(false);
  };
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      log.info('Message handled in the background!', remoteMessage);
    });
  });
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
        <Lottie
          source={require('../../../assets/Loginloading.json')}
          autoPlay
          loop
        />
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
