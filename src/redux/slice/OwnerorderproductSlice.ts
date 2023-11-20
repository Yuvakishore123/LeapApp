import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {url} from '../../constants/Apis';

import ApiService from '../../network/Network';
import {logMessage} from 'helpers/Helper';

export interface OrderData {
  message: string;
  status: string;
}

export interface OrderdataState {
  data: OrderData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: OrderdataState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};
export const ownerorderproducts = createAsyncThunk(
  'ownerorderproducts',
  async (status: string) => {
    try {
      const products = await ApiService.get(
        `${url}/order/shipping-status?status=${status}`,
      );
      return products;
    } catch (error) {
      logMessage.error('error in ownerorderproducts', error);
      throw error;
    }
  },
);

const ownerorderproductsSlice = createSlice({
  name: 'ownerorderproducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(ownerorderproducts.pending, state => {
        state.isLoader = true;
      })
      .addCase(ownerorderproducts.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(ownerorderproducts.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});
export const ownerRentalproductsreducer = (state: {
  OwnerRentalproducts: {data: any};
}) => state.OwnerRentalproducts.data;
export const ownerRentalloadingreducer = (state: {
  OwnerRentalproducts: {isLoader: boolean};
}) => state.OwnerRentalproducts.isLoader;
export default ownerorderproductsSlice.reducer;
