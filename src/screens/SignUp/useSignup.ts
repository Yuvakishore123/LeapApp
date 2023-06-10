import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SetStateAction, useState} from 'react';
import {url} from '../../constants/Apis';
import {passwordValidation, phonenumberValidation} from '../../constants/Regex';
import ApiService from '../../network/network';

type RootStackParamList = {
  Login: undefined;
};
const useSignup = () => {
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
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
  const handleSignupfun: () => Promise<void> = async () => {
    console.log('indrill');
    console.log(role);
    console.log('first name ', formik.values.firstName);
    try {
      const response = await ApiService.post(`${url}/user/signup`, {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        phoneNumber: formik.values.phoneNumber,
        password: formik.values.password,
        role: role,
      });
      console.log(response);
      navigation.navigate('Login');
    } catch (error) {
      openModal();
      console.log(error);
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
    onSubmit: handleSignupfun,
  });
  const handleRole = (value: SetStateAction<string>) => {
    setRole(value);
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  return {
    formik,
    role,
    openModal,
    closeModal,
    showModal,
    handleSignupfun,
    handleRole,
    handleLogin,
  };
};
export default useSignup;