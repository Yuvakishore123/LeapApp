import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {updateProfileUrl} from '../../constants/apiRoutes';
import {getProfileData} from './profileDataSlice';

interface ProfileData {
  message: string;
  status: string;
}
interface ProfileDataState {
  data: ProfileData;
  isLoader: boolean;
  isError: boolean;
  error: null | string | unknown;
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
  async (data, {dispatch}) => {
    try {
      const response = await ApiService.put(updateProfileUrl, data);
      console.log('updated data is ', response);
      dispatch(getProfileData());
      return response;
    } catch (error) {
      console.log('error ', error);
      dispatch(setError(error));
      return error;
    }
  },
);

const updateProfileThunk = createSlice({
  name: 'updateCartData',
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
        state.error = action.payload;
      });
  },
});
export const {setData, setError} = updateProfileThunk.actions;
export default updateProfileThunk.reducer;