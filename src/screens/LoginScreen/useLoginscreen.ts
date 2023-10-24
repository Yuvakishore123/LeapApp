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
  let Fcm_token: string;
  const getFCMToken = async () => {
    Fcm_token = await messaging()?.getToken();
  };
  useEffect(() => {
    getFCMToken();
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
    console.log(Fcm_token);
    const credentials = {
      email: formik.values.email,
      password: formik.values.password,
      deviceToken: Fcm_token,
    };
    const response = await dispatch(postLogin(credentials));
    logMessage.info('response of HandleLogin', response);
    loginEvent();
    dispatch(fetchUserProducts({pageSize}));
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
    postLogin,
    setPasswordVisible,
    handleErrorResponse,
  };
};
export default useLoginscreen;
