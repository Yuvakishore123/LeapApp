import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
import {cartaddUrl} from '../../constants/apiRoutes';
interface CartAddData {
  message: string;
  status: string;
}
interface CartAddState {
  data: CartAddData;
  isLoader: boolean;
  isError: boolean;
  error: null | string | unknown;
}
const initialState: CartAddState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};
export const CartAdd = createAsyncThunk(
  'CartAdd',
  async (
    Item: {
      productId: string;
      quantity: number;
      rentalEndDate: string;
      rentalStartDate: string;
    },
    {dispatch},
  ) => {
    try {
      const response = await ApiService.post(cartaddUrl, Item);
      console.log('CartAdd', response.data);
      console.log('-------------------------------');
      return response;
    } catch (error: any) {
      if (error.response) {
        console.log('error', error.response.status);
        dispatch(setError(error.response as any));
      }
      return error.response;
    }
  },
);
const cartThunk = createSlice({
  name: 'cartAddData',
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(CartAdd.pending, state => {
        state.isLoader = true;
      })
      .addCase(CartAdd.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(CartAdd.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});
export const {setCartData, setError} = cartThunk.actions;
export default cartThunk.reducer;
