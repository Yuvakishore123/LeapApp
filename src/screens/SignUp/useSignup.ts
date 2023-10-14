import {useFormik} from 'formik';
import * as Yup from 'yup';
import {SetStateAction, useContext, useState} from 'react';

import {passwordValidation, phonenumberValidation} from '../../constants/Regex';

import colors from '../../constants/colors';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import {useSelector} from 'react-redux';

import {postSignup} from '../../redux/slice/signupSlice';
import {
  logMessage,
  useNavigationProp,
  useThunkDispatch,
} from '../../helpers/helper';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const useSignup = () => {
  const [showModal, setShowModal] = useState(false);
  const [signInPasswordVisible, setSignInPasswordVisible] = useState(false);
  const [role, setRole] = useState<string>('');
  const {navigation} = useNavigationProp();
  const {colorScheme} = useContext(ColorSchemeContext);
  const {dispatch} = useThunkDispatch();
  const isError = useSelector(
    (state: {signup: {error: any}}) => state.signup.error,
  );
  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('Enter First Name'),
    lastName: Yup.string().required('Enter LastName'),
    email: Yup.string().email('Invalid email').required('Enter valid Email'),
    phoneNumber: Yup.string()
      .matches(phonenumberValidation, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .min(8)
      .required('Please enter password')
      .matches(
        passwordValidation,
        'Must contain special characters and uppercase letters',
      ),
  });
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'error during signup try again later',
    });
  };
  const handleError = () => {
    if (isError === 401) {
      logMessage.error(isError, 'error in signup with error status 401');
      openModal();
    } else {
      showToast();
    }
  };
  const handleSignup = () => {
    try {
      const credentials = {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        phoneNumber: formik.values.phoneNumber,
        password: formik.values.password,
        role: role,
      };
      dispatch(postSignup(credentials) as any);
      handleError();
    } catch (error) {
      logMessage.error('error in signup', error);
      openModal();
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: handleSignup,
  });
  const handleRole = (value: SetStateAction<string>) => {
    setRole(value);
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const PlaceholderColor = () => {
    return colorScheme === 'dark' ? colors.Textinput : colors.black;
  };
  const BorrowerRole = () => {
    if (role === 'BORROWER') {
      return 'checked';
    } else {
      return 'unchecked';
    }
  };
  const OwnerRole = () => {
    if (role === 'OWNER') {
      return 'checked';
    } else {
      return 'unchecked';
    }
  };

  return {
    formik,
    role,
    openModal,
    closeModal,
    showModal,
    handleSignup,
    handleRole,
    handleLogin,
    handleError,
    PlaceholderColor,
    showToast,
    BorrowerRole,
    OwnerRole,
    isError,
    signInPasswordVisible,
    setSignInPasswordVisible,
  };
};
export default useSignup;
