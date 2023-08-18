import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {userProductsUrl} from '../../constants/apiRoutes';

export const fetchUserProducts = createAsyncThunk(
  'fetchUserProducts',
  async ({pageNumber}: {pageNumber: number}) => {
    try {
      console.log('pageNumber is ', pageNumber);
      const response = await ApiService.get(
        `${userProductsUrl}?pageNumber=${pageNumber}&pageSize=${10}`,
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
    firstCallLoading: false, // Loading state for the first call
    loading: false, // Loading state for subsequent calls
    isError: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserProducts.pending, (state, action) => {
        if (action.meta.arg.pageNumber === 1) {
          state.firstCallLoading = true; // Set loading state for the first call
        } else {
          state.loading = true; // Set loading state for subsequent calls
        }
      })
      .addCase(fetchUserProducts.fulfilled, (state, action) => {
        state.firstCallLoading = false; // Clear loading state for the first call
        state.loading = false; // Clear loading state for subsequent calls
        state.data = action.payload;
      })
      .addCase(fetchUserProducts.rejected, (state, action) => {
        state.firstCallLoading = false; // Clear loading state for the first call
        state.loading = false; // Clear loading state for subsequent calls
        state.isError = true;
      });
  },
});

export default UserProductSlice.reducer;
