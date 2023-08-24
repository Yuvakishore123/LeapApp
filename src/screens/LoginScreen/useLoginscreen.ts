/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {Login} from '../../redux/actions/actions';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {passwordValidation} from '../../constants/Regex';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import colors from '../../constants/colors';
import {postLogin} from '../../redux/slice/loginSlice';
import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
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
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
  const handleLogin = async () => {
    try {
      await dispatch(Login(formik.values.email, formik.values.password));
      openModal();
    } catch (error) {
      console.log('error is ', error);
      console.log('error in login');
    }
  };
  const handleLoginGuest = async () => {
    try {
      const credentials = {
        email: 'GuestLogin@leaps.com',
        password: 'GuestLogin',
      };
      // const response = await dispatch(postLogin(credentials));
      navigation.navigate('Homescreen');
      loginEvent();
      console.log('Login data:', response);
    } catch (error) {
      console.log('isError', isError);
    }
  };
  // console.log('isError', isError);

  const handleErrorResponse = (error: number) => {
    if (error === 401) {
      console.log('is this triggered');
      openModal();
    } else {
      console.log('error', error);
    }
  };
  useEffect(() => {
    handleErrorResponse(isError);
  }, [isError]);
  const handleLoginScreen = async () => {
    const Fcm_token = await messaging().getToken();
    await AsyncStorage.setItem('device_token', Fcm_token);
    console.log('devicetoken', Fcm_token);
    try {
      const credentials = {
        email: formik.values.email,
        password: formik.values.password,
        deviceToken: Fcm_token,
      };
      const response = await dispatch(postLogin(credentials));
      loginEvent();
      console.log('Login data:', response);
    } catch (error) {
      console.log('isError', isError);
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
    onSubmit: handleLogin,
  });
  const loginEvent = async () => {
    await analytics().logEvent('loged_users');
    console.log('log event success');
  };
  return {
    openModal,
    placeholadercolor,
    closeModal,
    showModal,
    formik,
    passwordError,
    setPasswordError,
    handleLogin,
    colorScheme,
    handleOtpScreen,
    handleSignUp,
    handleLoginGuest,
    handleLoginScreen,
    passwordVisible,

    setPasswordVisible,
  };
};
export default useLoginscreen;
