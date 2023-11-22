import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {cartList} from '../../constants/apiRoutes';
import {fetchCartProducts} from './cartSlice';

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
export const initialState: CartDataState = {
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
      const response = await ApiService.put(`${cartList}`, data);
      dispatch(fetchCartProducts());
      return response;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  },
);

const cartUpdateThunk = createSlice({
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
export const selectCartUpdateLoading = (state: {
  cartUpdate: {isLoader: boolean};
}) => state.cartUpdate.isLoader;
export const selectCartError = (state: {cartUpdate: {error: any}}) =>
  state.cartUpdate.error;

export const {setData, setError} = cartUpdateThunk.actions;
export default cartUpdateThunk.reducer;
