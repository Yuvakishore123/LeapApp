import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/Network';
import {wishListRemoveUrl} from '../../constants/ApiRoutes';
import {logMessage} from 'helpers/Helper';

interface WishlistData {
  message: string;
  status: string;
}
export interface WishlistDataState {
  data: WishlistData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
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

export const wishListRemove = createAsyncThunk(
  'removefromWishlist',
  async (productId: string, {dispatch}) => {
    try {
      const response = await ApiService.delete(
        `${wishListRemoveUrl}${productId}`,
      );
      return response;
    } catch (error) {
      logMessage.error('error in wishListRemove', error);
      dispatch(setError(error));
      throw error;
    }
  },
);

const wishlistRemoveThunk = createSlice({
  name: 'removefromWishlistData',
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
      .addCase(wishListRemove.pending, state => {
        state.isLoader = true;
      })
      .addCase(wishListRemove.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(wishListRemove.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});
export const {setData, setError} = wishlistRemoveThunk.actions;
export default wishlistRemoveThunk.reducer;
