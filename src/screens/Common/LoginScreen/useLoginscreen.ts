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

  let Fcm_token: string;
  const getToken = async () => {
    Fcm_token = await messaging()?.getToken();
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleErrorResponse = (error: number) => {
    if (error === StatusCodes.UNAUTHORIZED) {
      openModal();
    } else if (error === StatusCodes.NOT_FOUND) {
      navigation.navigate('ApiErrorScreen', {status: 404});
    }
  };
  useEffect(() => {
    handleErrorResponse(isError);
  }, [isError]);
  const handleLoginScreen = async () => {
    const credentials = {
      email: formik.values.email,
      password: formik.values.password,
      deviceToken: Fcm_token,
    };
    dispatch(postLogin(credentials) as any);
    loginEvent();
    dispatch(fetchUserProducts({pageSize}) as any);
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
    // handleLoginGuest,
    handleLoginScreen,
    passwordVisible,

    setPasswordVisible,

    // onTokenRefresh,
    // storeFCMToken,
    loginEvent,
    handleErrorResponse,
    // backgroundMessageHandler,
    // requestFCMPermission,
  };
};
export default useLoginscreen;
