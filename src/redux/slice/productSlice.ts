import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {rentedProductsUrl} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';

export interface ProductData {
  message: string;
  status: string;
}

export interface ProductDataState {
  data: ProductData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: ProductDataState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};
export const fetchProducts = createAsyncThunk('fetchProducts', async () => {
  try {
    const products = await ApiService.get(rentedProductsUrl);
    return products;
  } catch (error) {
    logMessage.error('error in fetching products', error);
    throw error;
  }
});

const ProductSlice = createSlice({
  name: 'products',
  initialState,
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
export const ProductsDataReducer = (state: {products: {data: any[]}}) =>
  state.products.data;
export default ProductSlice.reducer;
