import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {profileDataUrl} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';

export interface ProfileData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImageUrl: string;
  role: string;
}
export interface ProfileDataState {
  data: ProfileData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}
const initialState: ProfileDataState = {
  data: {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    profileImageUrl: '',
    role: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};

export const getProfileData = createAsyncThunk('getProfileData', async () => {
  const {log} = logMessage();
  try {
    const response = await ApiService.get(profileDataUrl);

    return response;
  } catch (error) {
    log.error('error ', error);
    throw error;
  }
});

const profileThunk = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    setProfiledata: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProfileData.pending, state => {
        state.isLoader = true;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});
export const selectprofileData = (state: {profileData: {data: any}}) =>
  state.profileData.data;
export const selectProfileDataLoading = (state: {
  profileData: {isLoader: any};
}) => state.profileData.isLoader;

export const {setProfiledata, setError} = profileThunk.actions;
export default profileThunk.reducer;
