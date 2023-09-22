import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {url} from '../../constants/Apis';

import {logger} from 'react-native-logs';
import {defaultConfig} from '../../helpers/helper';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';

export const postLogin = createAsyncThunk(
  'postLogin',
  async (
    credentials: {email: string; password: string; deviceToken: string | null},
    {dispatch},
  ) => {
    const logMessage = logger.createLogger(defaultConfig);
    try {
      const response = await axios.post(
        `${url}/login?email=${credentials.email}&password=${credentials.password}&devicetoken=${credentials.deviceToken}`,
        credentials,
      );
      await asyncStorageWrapper.setItem('token', response.headers.access_token);
      await asyncStorageWrapper.setItem(
        'refresh_token',
        response.headers.refresh_token,
      );
      logMessage.error('refresh_token', response.headers.refresh_token);
      logMessage.error('refresh_token expiry time', response.headers);
      console.log(response);
      return response;
    } catch (error: any) {
      logMessage.error('error recieved during Login');
      console.log('yokes bhosidike', error);
      dispatch(setError(error.response.status));
      throw error;
    }
  },
);

const loginThunk = createSlice({
  name: 'loginData',
  initialState: {
    data: {
      authToken: null,
      isAuthenticated: false,
    },
    isLoader: false,
    isError: false,
    error: null,
  },
  reducers: {
    setLoginData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postLogin.pending, state => {
        state.isLoader = true;
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = {
          ...state,
          authToken: action.payload,
          isAuthenticated: true,
        };
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const {setLoginData, setError} = loginThunk.actions;
export default loginThunk.reducer;
