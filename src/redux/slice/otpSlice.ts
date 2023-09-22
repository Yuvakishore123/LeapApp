import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {url} from '../../constants/Apis';
import {logMessage} from 'helpers/helper';

export const GetOtp = createAsyncThunk(
  'OtpLogin',
  async (credentials: {phoneNumber: string}, {dispatch}) => {
    const {log} = logMessage();
    try {
      console.log(credentials.phoneNumber);
      const response = await axios.post(
        `${url}/phoneNo?phoneNumber=${credentials.phoneNumber}`,
        credentials.phoneNumber,
      );
      console.log('access_token', response.headers.access_token);
      await AsyncStorage.setItem('token', response.headers.access_token);
      await AsyncStorage.setItem(
        'refresh_token',
        response.headers.refresh_token,
      );
      console.log(response);
      return response;
    } catch (error: any) {
      log.error('error during login  ', error.response.status);
      console.log(error);
      dispatch(setError(error.response.status));
      throw error;
    }
  },
);

const otpLoginThunk = createSlice({
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
      .addCase(GetOtp.pending, state => {
        state.isLoader = true;
      })
      .addCase(GetOtp.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = {
          ...state,
          authToken: action.payload,
          isAuthenticated: true,
        };
      })
      .addCase(GetOtp.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const {setLoginData, setError} = otpLoginThunk.actions;
export default otpLoginThunk.reducer;
