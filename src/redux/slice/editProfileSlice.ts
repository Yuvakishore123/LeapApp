import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {updateProfileUrl} from '../../constants/apiRoutes';
import {getProfileData} from './profileDataSlice';
import {logMessage} from 'helpers/helper';

interface ProfileData {
  message: string;
  status: string;
}
export interface ProfileDataState {
  data: ProfileData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}
const initialState: ProfileDataState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};

export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (
    data: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    },
    {dispatch},
  ) => {
    try {
      const response = await ApiService.put(updateProfileUrl, data);
      dispatch(getProfileData());
      return response;
    } catch (error) {
      logMessage.error('error in updating profile ', error);
      dispatch(setError(error));
      throw error;
    }
  },
);

const updateProfileThunk = createSlice({
  name: 'updateprofile',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateProfile.pending, state => {
        state.isLoader = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});
export const {setData, setError} = updateProfileThunk.actions;
export default updateProfileThunk.reducer;
