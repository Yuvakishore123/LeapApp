import axios from 'axios';
import {Dispatch} from 'redux';
import {url} from 'constants/Apis';
import {logMessage} from 'helpers/helper';

import {setLoginData} from '../slice/loginSlice';
import AsyncStorageWrapper from '../../../src/utils/asyncStorage';

export const Logout = () => {
  return async (dispatch: Dispatch) => {
    const {log} = logMessage();
    const refreshToken = await AsyncStorageWrapper.getItem('refresh_token');
    try {
      AsyncStorageWrapper.removeItem('token');
      dispatch(setLoginData({authToken: null, isAuthenticated: false}));
      const response = await axios.post(`${url}/user/logout`, null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      log.debug(response);
    } catch (error) {
      log.error(error);
    }
  };
};
