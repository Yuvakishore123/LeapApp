import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {userProductsUrl} from '../../constants/apiRoutes';

export const fetchUserProducts = createAsyncThunk(
  'fetchUserProducts',
  async ({pageNumber, pageSize}: {pageNumber: number; pageSize: number}) => {
    try {
      const response = await ApiService.get(
        `${userProductsUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const UserProductSlice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserProducts.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchUserProducts.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export default UserProductSlice.reducer;
