import axios from 'axios';
import {url} from 'constants/Apis';

import {
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
} from '../types';
import {Dispatch} from 'redux';
export const getOTP = (phoneNumber: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({type: VERIFY_OTP_REQUEST});
    try {
      const response = await axios.post(
        `${url}/phoneNo?phoneNumber=${phoneNumber}`,
        {
          phoneNumber,
        },
      );

      dispatch({type: VERIFY_OTP_SUCCESS, payload: response.data});
    } catch (error) {
      dispatch({type: VERIFY_OTP_FAILURE, payload: error});
    }
  };
};
