import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {url} from '../../constants/Apis';

import {logger} from 'react-native-logs';
import {defaultConfig} from '../../helpers/helper';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';
export interface LoginData {
  authToken: null | string;
  isAuthenticated: boolean;
}

export interface LoginState {
  data: LoginData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: LoginState = {
  data: {
    authToken: null,
    isAuthenticated: false,
  },
  isLoader: false,
  isError: false,
  error: null,
};
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
      return response;
    } catch (error: any) {
      logMessage.error('error recieved during Login');
      dispatch(setError(error.response.status));
      throw error;
    }
  },
);

const loginThunk = createSlice({
  name: 'loginData',
  initialState,
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
