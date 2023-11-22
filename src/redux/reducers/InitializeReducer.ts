/**
 * Initialization action to check for the presence of a user token in AsyncStorage
 * and update the login state accordingly.

 */
import {Dispatch} from 'redux';
import {logMessage} from 'helpers/helper';
import {setLoginData} from '../slice/loginSlice';
import AsyncStorageWrapper from '../../../src/utils/asyncStorage';

export const Init = () => {
  const {log} = logMessage();

  return async (dispatch: Dispatch) => {
    try {
      // Retrieve the user token from AsyncStorage
      let token = await AsyncStorageWrapper.getItem('token');

      // If a token is present, update the login state with authentication information
      if (token !== null) {
        dispatch(setLoginData({authToken: token, isAuthenticated: true}));
      }
    } catch (error) {
      // Handle errors during initialization and log them
      log.error('Error in Init:', error);
    }
  };
};
