import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {categoryProductsUrl} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';

export interface CategoryProduct {
  availableQuantities: number;
  brand: string;
  categoryIds: number[];
  color: string;
  description: string;
  disabled: boolean;
  disabledQuantities: number;
  id: number;
  imageUrl: [] | null;
  material: string;
  name: string;
  price: number;
  rentedQuantities: number;
  size: string;
  subcategoryIds: number[];
  totalQuantity: number;
}

interface CategoryProductState {
  data: CategoryProduct[];
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: CategoryProductState = {
  data: [],
  isLoader: false,
  isError: false,
  error: null,
};

export const fetchCategoriesProductsdata = createAsyncThunk(
  'fetchCategoriesdata',
  async (subcategoryId: number) => {
    const {log} = logMessage();
    try {
      const response = await ApiService.get(
        `${categoryProductsUrl}/${subcategoryId}`,
      );

      return response;
    } catch (error) {
      log.error('error during fetching products in category ');
      return error;
    }
  },
);

const categoryProductsThunk = createSlice({
  name: 'fetchcategoryProductsData',
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
      .addCase(fetchCategoriesProductsdata.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchCategoriesProductsdata.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchCategoriesProductsdata.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});
export const {setData, setError} = categoryProductsThunk.actions;
export default categoryProductsThunk.reducer;
