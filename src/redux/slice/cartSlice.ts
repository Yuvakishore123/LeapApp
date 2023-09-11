import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {cartList} from '../../constants/apiRoutes';

export const fetchCartProducts = createAsyncThunk(
  'fetchCartProducts',
  async () => {
    try {
      const response = await ApiService.get(cartList);
      return response;
    } catch (error) {
      console.log('error ', error);
    }
  },
);

const CartSlice = createSlice({
  name: 'cartproducts',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
    error: null,
  },
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCartProducts.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchCartProducts.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});
export const {setError} = CartSlice.actions;
export default CartSlice.reducer;
