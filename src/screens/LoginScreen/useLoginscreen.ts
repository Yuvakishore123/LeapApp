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
type RootStackParamList = {
  OtpScreen: undefined;
  SignupScreen: undefined;
};
const useLoginscreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [passwordError, setPasswordError] = useState<string>('');
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
  console.log('isError', isError);

  const handleErrorResponse = (error: number) => {
    if (error === 401) {
      console.log('is this triggered');
      openModal(); // Assuming you have a function called openModal() defined elsewhere
    } else {
      console.log('error', error);
    }
  };
  useEffect(() => {
    handleErrorResponse(isError);
  }, [isError]);
  const handleLoginScreen = async () => {
    try {
      const credentials = {
        email: formik.values.email,
        password: formik.values.password,
      };
      const response = await dispatch(postLogin(credentials));
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
    handleLoginScreen,
  };
};
export default useLoginscreen;
