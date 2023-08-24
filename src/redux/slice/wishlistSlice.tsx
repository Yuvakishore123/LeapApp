import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';

export const fetchWishlistProducts = createAsyncThunk(
  'fetchWishlistProducts',
  async () => {
    const res = await ApiService.get('/wishlist/list');
    return res;
  },
);

const WishlistSlice = createSlice({
  name: 'WishlistProducts',
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
export default WishlistSlice.reducer;
