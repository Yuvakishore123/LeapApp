import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {cartList} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';

export interface CartData {
  cartItems: CartItem[];
  finalPrice: number;
  shippingCost: number;
  tax: number;
  totalCost: number;
  userId: number;
}
interface CartItem {
  id: number;
  imageUrl: string;
  product: {
    availableQuantities: number;
    brand: string;
    color: string;
    createdAt: string;
    createdBy: number;
    deleted: boolean;
    description: string;
    disabled: boolean;
    disabledQuantities: number;
    id: number;
    material: string;
    name: string;
    price: number;
    quantity: number;
    rentedQuantities: number;
    size: string;
    updatedAt: string;
    updatedBy: number;
  };
  quantity: number;
  rentalEndDate: string;
  rentalStartDate: string;
}
interface CartError {
  message: string;
}

export interface CartState {
  data: CartData | null;
  isLoader: boolean;
  isError: boolean;
  error: CartError | null;
}

const initialState: CartState = {
  data: null,
  isLoader: false,
  isError: false,
  error: null,
};
export const fetchCartProducts = createAsyncThunk(
  'fetchCartProducts',
  async () => {
    const {log} = logMessage();
    try {
      const response = await ApiService.get(cartList);
      return response;
    } catch (error) {
      log.error('error during fetching cart details');
    }
  },
);

const CartSlice = createSlice({
  name: 'cartproducts',
  initialState,
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
