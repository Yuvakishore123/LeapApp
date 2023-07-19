import {useFormik} from 'formik';
import * as Yup from 'yup';
import {SetStateAction, useContext, useState} from 'react';

import {passwordValidation, phonenumberValidation} from '../../constants/Regex';

import colors from '../../constants/colors';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import {useSelector} from 'react-redux';

import {postSignup} from '../../redux/slice/signupSlice';
import {useNavigationProp, useThunkDispatch} from '../../helpers/helper';

const useSignup = () => {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState<string>('');
  const {navigation} = useNavigationProp();
  const {colorScheme} = useContext(ColorSchemeContext);
  const {dispatch} = useThunkDispatch();
  const isError = useSelector(
    (state: {signup: {error: boolean}}) => state.signup.error,
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
    navigation.navigate('Login');
  };
  const closeModal = () => {
    setShowModal(false);
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
      navigation.navigate('Login');
    } catch (error) {
      console.log('hello', error);
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
    PlaceholderColor,
    BorrowerRole,
    OwnerRole,
    isError,
  };
};
export default useSignup;
