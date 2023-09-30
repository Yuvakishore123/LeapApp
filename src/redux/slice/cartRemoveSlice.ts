import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {cartRemoveUrl} from '../../constants/apiRoutes';

interface CartRemoveData {
  message: string;
  status: string;
}
export interface CartRemoveState {
  data: CartRemoveData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}
const initialState: CartRemoveState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};

export const removefromCart = createAsyncThunk(
  'removefromCart',
  async (productId: number, {dispatch}) => {
    try {
      const response = await ApiService.delete(`${cartRemoveUrl}${productId}`);

      return response;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  },
);

const cartRemoveThunk = createSlice({
  name: 'removefromCartData',
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
      .addCase(removefromCart.pending, state => {
        state.isLoader = true;
      })
      .addCase(removefromCart.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(removefromCart.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});
export const {setData, setError} = cartRemoveThunk.actions;
export default cartRemoveThunk.reducer;
