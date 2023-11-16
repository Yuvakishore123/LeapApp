import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {getOTP, submitOTP} from '../../redux/actions/Actions';

type Dispatch = ThunkDispatch<any, any, AnyAction>;

type UseotpReturnType = {
  phoneNo: string;
  otp: string;
  handlephoneNumberChange: (value: string) => void;
  handlePasswordChange: (value: string) => void;
  GETOTP: () => void;
  handleLogin: () => void;
  passwordError: string;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  setPasswordError: (value: string) => void;
};

const Useotp = (): UseotpReturnType => {
  const [phoneNo, setphoneNo] = useState<string>('');
  const [otp, setotp] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const dispatch: Dispatch = useDispatch();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const GETOTP = () => {
    dispatch(getOTP(phoneNo));
    openModal();
  };

  const handleLogin = () => {
    dispatch(submitOTP(phoneNo, Number(otp)));
  };

  const handlephoneNumberChange = (value: string) => {
    setphoneNo(value);
  };

  const handlePasswordChange = (value: string) => {
    setotp(value);
  };

  return {
    phoneNo,
    otp,
    handlephoneNumberChange,
    handlePasswordChange,
    GETOTP,
    handleLogin,
    passwordError,
    showModal,
    openModal,
    closeModal,
    setPasswordError,
  };
};

export default Useotp;
