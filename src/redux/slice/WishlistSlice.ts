import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/Network';
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
      const res = await ApiService.get('/wishlist/list');
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
export const WishlistdataReducer = (state: {
  WishlistProducts: {data: null[]};
}) => state.WishlistProducts.data;
export const WishlistDataReducer = (state: {WishlistProducts: {data: any[]}}) =>
  state.WishlistProducts.data;
export const WishlistLoadingreducer = (state: {
  WishlistProducts: {isLoader: boolean};
}) => state.WishlistProducts.isLoader;
export const WishlistErrorreducer = (state: {
  WishlistProducts: {error: boolean};
}) => state.WishlistProducts.error;
export const {setError} = WishlistSlice.actions;
export default WishlistSlice.reducer;