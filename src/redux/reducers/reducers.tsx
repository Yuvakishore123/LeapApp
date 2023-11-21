import {
  LOGIN_REQUEST,
  SIGNUP_REQUEST,
  OTP_REQUEST,
  VERIFY_OTP_REQUEST,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  OTP_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_FAILURE,
  OTP_FAILURE,
  VERIFY_OTP_FAILURE,
  VERIFY_OTP_SUCCESS,
} from '../types';

const initialState = {
  authToken: null,
  loading: false,
  isAuthenticated: false,
  error: '',
  verifyingOTP: false, // new state to keep track of whether OTP is being verified
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case SIGNUP_REQUEST:
    case OTP_REQUEST:
    case VERIFY_OTP_REQUEST: // add new action type for OTP verification
      return {
        ...state,
        loading: true,
        verifyingOTP: true, // set verifyingOTP to true while OTP is being verified
      };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
    case OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        authToken: action.payload,
        isAuthenticated: true,
        error: '',
        verifyingOTP: false, // set verifyingOTP to false after OTP is successfully verified
      };

    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
    case OTP_FAILURE:
    case VERIFY_OTP_FAILURE: // add new action type for OTP verification failure
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        verifyingOTP: false, // set verifyingOTP to false after OTP verification fails
      };
    case VERIFY_OTP_SUCCESS: // add new action type for OTP verification success
      return {
        ...state,
        verifyingOTP: false, // set verifyingOTP to false after OTP is successfully verified
      };
    case 'LOGOUT':
      return {
        authToken: null,
        verifyingOTP: false, // reset verifyingOTP to false on logout
      };
    default:
      return state;
  }
};

export default authReducer;
