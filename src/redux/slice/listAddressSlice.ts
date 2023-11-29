import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {listAddressUrl} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';
export interface ListAddressData {
  message: string;
  status: string;
}
export interface ListAddressState {
  data: ListAddressData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}
const initialState: ListAddressState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};
export const ListAddress = createAsyncThunk('ListAddress', async () => {
  try {
    const response = await ApiService.get(listAddressUrl);
    return response;
  } catch (error) {
    logMessage.error('error in listing of Address', error);
    throw error;
  }
});

const listAddressThunk = createSlice({
  name: 'listAddressData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ListAddress.pending, state => {
        state.isLoader = true;
      })
      .addCase(ListAddress.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(ListAddress.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export const AddressDataReducer = (state: {listAddress: {data: any}}) =>
  state.listAddress.data;
export const AddressLoadingReducer = (state: {
  listAddress: {isLoader: boolean};
}) => state.listAddress.isLoader;
export const {setData} = listAddressThunk.actions;
export default listAddressThunk.reducer;
