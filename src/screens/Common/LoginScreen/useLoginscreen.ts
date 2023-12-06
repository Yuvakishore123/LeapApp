/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {passwordValidation} from '../../../constants/Regex';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import colors from 'constants/colors';
import {postLogin, selectLoginError} from '../../../redux/slice/loginSlice';
import analytics from '@react-native-firebase/analytics';

import messaging from '@react-native-firebase/messaging';
import {fetchUserProducts} from '../../../redux/slice/userProductSlice';

import {logMessage} from '../../../helpers/helper';

import {StatusCodes} from '../../../utils/statusCodes';
import AsyncStorageWrapper from '../../../../src/utils/asyncStorage';

type RootStackParamList = {
  OtpScreen: undefined;
  SignupScreen: undefined;
  ApiErrorScreen: {status: number};
};
const useLoginscreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {colorScheme} = useContext(ColorSchemeContext);
  const dispatch = useDispatch();
  const isError = useSelector(selectLoginError);
  const [pageSize, _setPageSize] = useState(10);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {log} = logMessage();

  // Validation schema using Yup for login form fields
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

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Variable to store the FCM token
  let Fcm_token: string;

  // Function to retrieve the FCM token using Firebase Cloud Messaging
  const getToken = async () => {
    Fcm_token = await messaging()?.getToken();
  };

  // Effect hook to get the FCM token when the component mounts
  useEffect(() => {
    getToken();
  }, []);

  // Function to handle error responses based on HTTP status codes
  const handleErrorResponse = (error: number) => {
    if (error === StatusCodes.UNAUTHORIZED) {
      openModal();
    } else if (error === StatusCodes.NOT_FOUND) {
      navigation.navigate('ApiErrorScreen', {status: 404});
    }
  };

  // Effect hook to handle error responses when 'isError' changes
  useEffect(() => {
    handleErrorResponse(isError);
  }, [isError]);

  // Function to handle the login screen submission
  const handleLoginScreen = async () => {
    const fcmToken = await AsyncStorageWrapper.getItem('device_token');

    // Prepare credentials for login
    const credentials = {
      email: formik.values.email,
      password: formik.values.password,
      deviceToken: fcmToken,
    };

    dispatch(postLogin(credentials) as any);
    loginEvent();
    dispatch(fetchUserProducts({pageSize}) as any);
  };

  // Function to navigate to the OTP screen
  const handleOtpScreen = () => {
    navigation.navigate('OtpScreen');
  };

  // Function to navigate to the sign-up screen
  const handleSignUp = () => {
    navigation.navigate('SignupScreen');
  };

  // Function to determine placeholder color based on color scheme
  const placeholadercolor = () => {
    return colorScheme === 'dark' ? colors.Textinput : colors.black;
  };

  // Formik hook for managing form state, validation, and submission
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: handleLoginScreen,
  });

  // Function to log a custom analytics event for user login
  const loginEvent = async () => {
    await analytics()?.logEvent('loged_users');
    log.info('login event is triggered');
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

    loginEvent,
    handleErrorResponse,
  };
};
export default useLoginscreen;