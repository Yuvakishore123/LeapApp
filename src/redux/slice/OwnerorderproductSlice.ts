import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {url} from '../../constants/Apis';

import ApiService from '../../network/network';
export const ownerorderproducts = createAsyncThunk(
  'ownerorderproducts',
  async (status: string) => {
    try {
      const products = await ApiService.get(
        `${url}/order/shipping-status?status=${status}`,
      );
      return products;
    } catch (error) {
      console.log(error);
    }
  },
);

const ownerorderproductsSlice = createSlice({
  name: 'ownerorderproducts',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
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
