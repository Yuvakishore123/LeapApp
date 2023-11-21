import {Dispatch} from 'redux';
import {logMessage} from 'helpers/helper';
import {setLoginData} from '../slice/loginSlice';
import AsyncStorageWrapper from '../../../src/utils/asyncStorage';

export const Init = () => {
  const {log} = logMessage();
  return async (dispatch: Dispatch) => {
    try {
      let token = await AsyncStorageWrapper.getItem('token');
      if (token !== null) {
        dispatch(setLoginData({authToken: token, isAuthenticated: true}));
      }
    } catch (error) {
      log.error('error in Init:', error);
    }
  };
};
