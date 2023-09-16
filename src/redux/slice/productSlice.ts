import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {rentedProductsUrl} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';
export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  const {log} = logMessage();
  try {
    const products = await ApiService.get(rentedProductsUrl);
    return products;
  } catch (error) {
    log.error('error during fetching products data', error);
  }
});

const ProductSlice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export default ProductSlice.reducer;
