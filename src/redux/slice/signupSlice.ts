import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {signupUrl} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';

interface SigninData {
  message: string;
  status: string;
}
export interface SigninDataState {
  data: SigninData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}
const initialState: SigninDataState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};

export const postSignup = createAsyncThunk(
  'postSignup',
  async (
    credentials: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      password: string;
      role: string;
    },
    {dispatch},
  ) => {
    const {log} = logMessage();
    try {
      const response = await ApiService.post(signupUrl, credentials);

      return response;
    } catch (error: any) {
      log.error('error ', error.response.status);
      dispatch(setError(error.response.status));
      throw error;
    }
  },
);

const signupThunk = createSlice({
  name: 'signupData',
  initialState,
  reducers: {
    setSignupData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postSignup.pending, state => {
        state.isLoader = true;
      })
      .addCase(postSignup.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(postSignup.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});
export const selectSignupError = (state: {signup: {error: any}}) =>
  state.signup.error;

export const {setSignupData, setError} = signupThunk.actions;
export default signupThunk.reducer;
