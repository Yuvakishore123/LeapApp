import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import axios from 'axios';
import {url} from '../../constants/Apis';
import {logMessage} from 'helpers/helper';
import AsyncStorageWrapper from '../../utils/asyncStorage';

export const postLogin = createAsyncThunk(
  'postLogin',
  async (
    credentials: {email: string; password: string; deviceToken: string | null},
    {dispatch},
  ) => {
    const {log} = logMessage();
    try {
      const response = await axios.post(
        `${url}/login?email=${credentials.email}&password=${credentials.password}&devicetoken=${credentials.deviceToken}`,
        credentials,
      );
      console.log('access_token', response.headers.access_token);
      await AsyncStorageWrapper.setItem('token', response.headers.access_token);
      await AsyncStorageWrapper.setItem(
        'refresh_token',
        response.headers.refresh_token,
      );
      return response;
    } catch (error: any) {
      log.error('error during login  ', error.response.status);
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
