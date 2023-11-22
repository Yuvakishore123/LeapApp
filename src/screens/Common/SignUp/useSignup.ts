import {useFormik} from 'formik';
import * as Yup from 'yup';
import {SetStateAction, useContext, useState} from 'react';

import {
  passwordValidation,
  phonenumberValidation,
} from '../../../constants/Regex';

import colors from '../../../constants/colors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import {useSelector} from 'react-redux';

import {postSignup, selectSignupError} from '../../../redux/slice/signupSlice';
import {useNavigationProp, useThunkDispatch} from '../../../helpers/helper';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
const useSignup = () => {
  const [showModal, setShowModal] = useState(false);
  const [signInPasswordVisible, setSignInPasswordVisible] = useState(false);
  const [role, setRole] = useState<string>('');
  const {navigation} = useNavigationProp();
  const {colorScheme} = useContext(ColorSchemeContext);
  const {dispatch} = useThunkDispatch();

  const isError = useSelector(selectSignupError);
  // Validation schema using Yup for sign-up form fields
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

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to show a toast notification for sign-up error
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error during signup, try again later',
    });
  };

  // Function to handle different error scenarios during signup
  const handleError = () => {
    if (isError === 401) {
      openModal();
    } else {
      showToast();
    }
  };

  // Function to handle the sign-up process
  const handleSignup = () => {
    const credentials = {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      email: formik.values.email,
      phoneNumber: formik.values.phoneNumber,
      password: formik.values.password,
      role: role,
    };
    dispatch(postSignup(credentials));
    handleError();
  };

  // Formik hook for managing form state, validation, and submission
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

  // Function to handle the change in the user role
  const handleRole = (value: SetStateAction<string>) => {
    setRole(value);
  };

  // Function to navigate to the login screen
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  // Function to determine placeholder color based on color scheme
  const PlaceholderColor = () => {
    return colorScheme === 'dark' ? colors.Textinput : colors.black;
  };

  // Function to determine the state of the Borrower role checkbox
  const BorrowerRole = () => {
    return role === 'BORROWER' ? 'checked' : 'unchecked';
  };

  // Function to determine the state of the Owner role checkbox
  const OwnerRole = () => {
    return role === 'OWNER' ? 'checked' : 'unchecked';
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
    PlaceholderColor,
    BorrowerRole,
    OwnerRole,
    isError,
    signInPasswordVisible,
    setSignInPasswordVisible,
    showToast,
    handleError,
    dispatch,
  };
};
export default useSignup;
