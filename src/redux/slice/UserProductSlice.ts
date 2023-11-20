import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/Network';
import {userProductsUrl} from '../../constants/ApiRoutes';
import {logger} from 'react-native-logs';
import {defaultConfig} from '../../helpers/Helper';

export interface UserproductState {
  data: null;
  firstCallLoading: boolean;
  loading: boolean;
  isError: boolean;
  productsEnd: boolean;
}

const initialState: UserproductState = {
  data: null,
  firstCallLoading: false, // Loading state for the first call
  loading: false, // Loading state for subsequent calls
  isError: false,
  productsEnd: false,
};
export const fetchUserProducts = createAsyncThunk(
  'fetchUserProducts',
  async ({pageSize}: {pageSize: number}) => {
    const logMessage = logger.createLogger(defaultConfig);
    try {
      const response = await ApiService.get(
        `${userProductsUrl}?pageNumber=${0}&pageSize=${pageSize}`,
      );
      return response;
    } catch (error) {
      logMessage.error('error recieved during Fetching the Products');
      throw error;
    }
  },
);

export const UserProductSlice = createSlice({
  name: 'products',
  initialState,
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
export const UserProductsreducer = (state: {UserProducts: {data: []}}) =>
  state.UserProducts.data;
export const UserProductsErrorReducer = (state: {
  UserProducts: {isError: null};
}) => state.UserProducts.isError;
export const UserProductsLoading = (state: {
  UserProducts: {firstCallLoading: boolean};
}) => state.UserProducts.firstCallLoading;
export default UserProductSlice.reducer;