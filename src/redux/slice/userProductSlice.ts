import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {userProductsUrl} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';

export const fetchUserProducts = createAsyncThunk(
  'fetchUserProducts',
  async ({pageSize}: {pageSize: number}) => {
    const {log} = logMessage();
    try {
      const response = await ApiService.get(
        `${userProductsUrl}?pageNumber=${0}&pageSize=${pageSize}`,
      );
      return response;
    } catch (error) {
      log.error('error in fetching products data', error);
      throw error;
    }
  },
);

export const UserProductSlice = createSlice({
  name: 'products',
  initialState: {
    data: null,
    firstCallLoading: false, // Loading state for the first call
    loading: false, // Loading state for subsequent calls
    isError: false,
    productsEnd: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserProducts.pending, (state, action) => {
        if (action.meta.arg.pageSize === 10) {
          state.firstCallLoading = true; // Set loading state for the first call
          state.loading = false; // Clear loading state for subsequent calls
        } else {
          state.firstCallLoading = false; // Clear loading state for the first call
          state.loading = true; // Set loading state for subsequent calls
        }
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.firstCallLoading = false; // Clear loading state for the first call
        state.loading = false; // Clear loading state for subsequent calls
        state.data = action.payload;
      })
      .addCase(fetchUserProducts.rejected, state => {
        state.firstCallLoading = false; // Clear loading state for the first call
        state.loading = false; // Clear loading state for subsequent calls
        state.isError = true;
      });
  },
});

export default UserProductSlice.reducer;
