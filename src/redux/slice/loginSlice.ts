import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {url} from '../../constants/Apis';

export const postLogin = createAsyncThunk(
  'postLogin',
  async (credentials: {email: string; password: string}, {dispatch}) => {
    try {
      const response = await axios.post(`${url}/login`, credentials);
      await AsyncStorage.setItem('token', response.headers.access_token);
      await AsyncStorage.setItem(
        'refresh_token',
        response.headers.refresh_token,
      );
      console.log('refresh_token', response.headers.refresh_token);
      console.log('refresh_token expiry time', response.headers);
      return response;
    } catch (error: any) {
      console.log('error here is ', error.response.status);
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
        console.log('Response data:', action.payload);
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
