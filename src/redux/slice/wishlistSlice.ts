import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
export interface WishlistState {
  data: null;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: WishlistState = {
  data: null,
  isLoader: false,
  isError: false,
  error: null,
};

export const fetchWishlistProducts = createAsyncThunk(
  'fetchWishlistProducts',
  async (_, {dispatch}) => {
    try {
      const res = await ApiService.get('/wishlist');
      return res;
    } catch (error) {
      dispatch(setError(error));
      throw error;
    }
  },
);

const WishlistSlice = createSlice({
  name: 'WishlistProducts',
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchWishlistProducts.pending, (state, _action) => {
      state.isLoader = true;
    });
    builder.addCase(fetchWishlistProducts.fulfilled, (state, action) => {
      state.isLoader = false;
      state.data = action.payload;
    });
    builder.addCase(fetchWishlistProducts.rejected, (state, _action) => {
      state.isLoader = false;
      state.isError = true;
    });
  },
});
export const {setError} = WishlistSlice.actions;
export default WishlistSlice.reducer;
