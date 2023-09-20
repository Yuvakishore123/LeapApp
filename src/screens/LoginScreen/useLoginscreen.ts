/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {passwordValidation} from '../../constants/Regex';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import colors from 'constants/colors';
import {postLogin} from '../../redux/slice/loginSlice';
import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {fetchUserProducts} from '../../redux/slice/userProductSlice';
import {logger} from 'react-native-logs';
import {defaultConfig} from '../../helpers/helper';

type RootStackParamList = {
  OtpScreen: undefined;
  SignupScreen: undefined;
};
const useLoginscreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {colorScheme} = useContext(ColorSchemeContext);
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const isError = useSelector((state: any) => state.login.error);
  const [pageSize, _setPageSize] = useState(10);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const logMessage = logger.createLogger(defaultConfig);
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Enter valid email'),
    password: Yup.string()
      .min(8)
      .required('Please enter password')
      .matches(
        passwordValidation,
        'Must contain * characters and uppercase letters',
      ),
  });
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const googleApiKey = process.env.GOOGLE_API_KEY;
    logMessage.error(googleApiKey, 'Hola i am Here');

    if (firebase?.apps.length === 0) {
      firebase.initializeApp({
        apiKey: googleApiKey,
        authDomain: 'In-App Messaging.firebase.com',
        databaseURL:
          'https://in-app-messaging-feed0-default-rtdb.firebaseio.com/',
        projectId: 'in-app-messaging-feed0',
        storageBucket: 'in-app-messaging-feed0.appspot.com',
        messagingSenderId: '280824523367',
        appId: '1:280824523367:android:5d9cfd3fae3dc9e65b02c2',
      });
    }
    const storeFCMToken = async (Dtoken: string) => {
      try {
        await AsyncStorage.setItem('fcmToken', Dtoken);
      } catch (error) {
        logMessage.error('Error storing FCM token:', error);
      }
    };
    const onTokenRefresh = async (DnewToken: string) => {
      try {
        const storedToken = await AsyncStorage.getItem('fcmToken');
        if (storedToken !== DnewToken) {
          await storeFCMToken(DnewToken);
        }
      } catch (error) {
        logMessage.error('Error handling FCM token refresh:', error);
      }
    };

    const requestFCMPermission = async () => {
      try {
        await firebase.messaging().requestPermission();
        const Dtoken = await firebase.messaging().getToken();
        onTokenRefresh(Dtoken);
      } catch (error) {
        logMessage.error('Error requesting FCM permission:', error);
      }
    };
    const backgroundMessageHandler = async (remoteMessage: string) => {
      logMessage.error('FCM background message:', remoteMessage);
    };

    requestFCMPermission();
    firebase?.messaging().onTokenRefresh(onTokenRefresh);
    firebase?.messaging().setBackgroundMessageHandler(backgroundMessageHandler);
  }, []);

  const handleErrorResponse = (error: number) => {
    if (error === 401) {
      logMessage.error('error triggered with 401');
      openModal();
    } else {
      logMessage.error('error', error);
    }
  };
  useEffect(() => {
    handleErrorResponse(isError);
  }, [isError]);
  const handleLoginScreen = async () => {
    const Fcm_token = await messaging().getToken();
    await AsyncStorage.setItem('device_token', Fcm_token);
    try {
      const token = await AsyncStorage.getItem('fcmToken');
      const credentials = {
        email: formik.values.email,
        password: formik.values.password,
        deviceToken: token,
      };
      const response = await dispatch(postLogin(credentials));
      logMessage.info('response of HandleLogin', response);
      loginEvent();
      dispatch(fetchUserProducts({pageSize}));
    } catch (error) {
      logMessage.error('error recieved during login');
    }
  };
  const handleOtpScreen = () => {
    navigation.navigate('OtpScreen');
  };
  const handleSignUp = () => {
    navigation.navigate('SignupScreen');
  };

  const placeholadercolor = () => {
    return colorScheme === 'dark' ? colors.Textinput : colors.black;
  };
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: handleLoginScreen,
  });
  const loginEvent = async () => {
    await analytics().logEvent('loged_users');
    logMessage.error('log event success');
  };
  return {
    openModal,
    placeholadercolor,
    closeModal,
    showModal,
    formik,
    passwordError,
    setPasswordError,
    colorScheme,
    handleOtpScreen,
    handleSignUp,
    handleLoginScreen,
    passwordVisible,

    setPasswordVisible,
  };
};
export default useLoginscreen;
