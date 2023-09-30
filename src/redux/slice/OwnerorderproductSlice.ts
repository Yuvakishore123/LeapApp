import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {url} from '../../constants/Apis';

import ApiService from 'network/network';
import {logMessage} from 'helpers/helper';

export interface OwnerOrderProductsState {
  data: [] | null;
  isLoader: boolean;
  isError: boolean;
}

// Define the initial state for your slice
const initialState: OwnerOrderProductsState = {
  data: null,
  isLoader: false,
  isError: false,
};

export const ownerorderproducts = createAsyncThunk(
  'ownerorderproducts',
  async (status: string) => {
    const {log} = logMessage();
    try {
      const products = await ApiService.get(
        `${url}/order/shipping-status?status=${status}`,
      );
      return products;
    } catch (error) {
      log.error('error during fetching rental items', error);
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

export default ownerorderproductsSlice.reducer;
