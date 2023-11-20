import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/Network';
import {cartupdateUrl} from '../../constants/ApiRoutes';
import {fetchCartProducts} from './CartSlice';
import {logMessage} from 'helpers/Helper';

interface CartData {
  message: string;
  status: string;
}
export interface CartDataState {
  data: CartData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}
const initialState: CartDataState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};

export const updateCart = createAsyncThunk(
  'updateCart',
  async (data: {productId: string; quantity: number}, {dispatch}) => {
    try {
      const response = await ApiService.put(`${cartupdateUrl}`, data);
      console.log(response);
      dispatch(fetchCartProducts());
      return response;
    } catch (error) {
      logMessage.error('error in updating product in cart', error);
      console.log('error in updating product in cart', error);
      dispatch(setError(error));
      throw error;
    }
  },
);

const cartUpdateThunk = createSlice({
  name: 'updateCart',
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
      .addCase(updateCart.pending, state => {
        state.isLoader = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});
export const cartupdateloadingReducer = (state: {
  cartUpdate: {isLoader: boolean};
}) => state.cartUpdate.isLoader;
export const cartupdateerrorReducer = (state: {cartUpdate: {error: any}}) =>
  state.cartUpdate.error;
export const {setData, setError} = cartUpdateThunk.actions;
export default cartUpdateThunk.reducer;
