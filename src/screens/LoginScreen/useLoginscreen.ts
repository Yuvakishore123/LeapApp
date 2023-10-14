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
import messaging from '@react-native-firebase/messaging';
import firebase from '../../utils/firebase';
import {fetchUserProducts} from '../../redux/slice/userProductSlice';
import {logger} from 'react-native-logs';
import {defaultConfig} from '../../helpers/helper';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';

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

  const storeFCMToken = async (Dtoken: string) => {
    try {
      await asyncStorageWrapper.setItem('fcmToken', Dtoken);
    } catch (error) {
      logMessage.error('Error storing FCM token:', error);
    }
  };
  const onTokenRefresh = async (DnewToken: string) => {
    try {
      const storedToken = await asyncStorageWrapper.getItem('fcmToken');
      if (storedToken !== DnewToken) {
        await storeFCMToken(DnewToken);
      }
    } catch (error) {
      logMessage.error('Error handling FCM token refresh:', error);
    }
  };
  useEffect(() => {
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
    await asyncStorageWrapper.setItem('device_token', Fcm_token);
    try {
      const token = await asyncStorageWrapper.getItem('fcmToken');
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
    storeFCMToken,
    onTokenRefresh,
    handleSignUp,
    handleLoginScreen,
    passwordVisible,
    postLogin,
    setPasswordVisible,
    handleErrorResponse,
  };
};
export default useLoginscreen;
