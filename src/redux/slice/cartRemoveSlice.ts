import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {cartRemoveUrl} from '../../constants/apiRoutes';

interface WishlistData {
  message: string;
  status: string;
}
interface WishlistDataState {
  data: WishlistData;
  isLoader: boolean;
  isError: boolean;
  error: null | string | unknown;
}
const initialState: WishlistDataState = {
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
      console.log(response);
      return response;
    } catch (error) {
      console.log('error ', error);
      dispatch(setError(error));
      return error;
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
        state.error = action.payload;
      });
  },
});
export const {setData, setError} = cartRemoveThunk.actions;
export default cartRemoveThunk.reducer;
