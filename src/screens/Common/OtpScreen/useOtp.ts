import {useContext, useState} from 'react';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import colors from 'constants/colors';
import {getOTP} from '../../../../src/redux/reducers/OtpReducer';
import {submitOTP} from '../../../../src/redux/reducers/SubmitOtp';

type Dispatch = ThunkDispatch<any, any, AnyAction>;

type UseotpReturnType = {
  phoneNo: string;
  otptext: string;
  handlephoneNumberChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  GETOTP: () => void;
  handleLogin: () => void;
  passwordError: string;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  setPasswordError: (value: string) => void;
  PlaceholderColor: any;
};

const Useotp = (): UseotpReturnType => {
  const [phoneNo, setphoneNo] = useState<string>('');
  const [otptext, setotp] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const dispatch: Dispatch = useDispatch();

  const {colorScheme} = useContext(ColorSchemeContext);

  // Function to open the modal
  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Function to dispatch an action to get OTP and open the modal
  const GETOTP = () => {
    dispatch(getOTP(phoneNo));
    openModal();
  };

  // Function to dispatch an action to submit OTP for login
  const handleLogin = () => {
    dispatch(submitOTP(phoneNo, Number(otptext)));
  };

  // Function to handle the change in the phone number input
  const handlephoneNumberChange = (value: string) => {
    setphoneNo(value);
  };

  // Function to handle the change in the OTP input
  const handlePasswordChange = (value: string) => {
    setotp(value);
  };

  // State variable for the placeholder color based on the color scheme
  const [PlaceholderColor, _setPlaceholderColor] = useState(
    colorScheme === 'dark' ? colors.Textinput : colors.black,
  );

  return {
    phoneNo,
    otptext,
    handlephoneNumberChange,
    handlePasswordChange,
    GETOTP,
    handleLogin,
    passwordError,
    showModal,
    openModal,
    closeModal,
    setPasswordError,
    PlaceholderColor,
  };
};

export default Useotp;
