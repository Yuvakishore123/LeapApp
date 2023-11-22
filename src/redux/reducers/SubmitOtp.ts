import axios from 'axios';
import {Dispatch} from 'redux';
import {url} from 'constants/Apis';
import AsyncStorageWrapper from '../../../src/utils/asyncStorage';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../types';

//Function for sumbiting the otp and validating
export const submitOTP = (phoneNumber: string, otp: number) => {
  return async (dispatch: Dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    try {
      const response = await axios.post(
        `${url}/otp?phoneNumber=${phoneNumber}&otp=${otp}`,
        {
          phoneNumber: phoneNumber,
          otp: otp,
        },
      );
      const token = response.headers.access_token;
      await AsyncStorageWrapper.setItem('token', token);
      dispatch({type: LOGIN_SUCCESS, payload: token});
    } catch (error) {
      dispatch({type: LOGIN_FAILURE, payload: error});
    }
  };
};
