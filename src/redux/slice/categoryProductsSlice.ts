import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {categoryProductsUrl} from '../../constants/apiRoutes';

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
  error: null | string | unknown;
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
    try {
      console.log('subcategoryId', subcategoryId);
      const response = await ApiService.get(
        `${categoryProductsUrl}/${subcategoryId}`,
      );

      console.log('category product data is  is ', response);

      return response;
    } catch (error) {
      console.log('error here is  ', error);
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
        state.error = action.payload;
      });
  },
});
export const {setData, setError} = categoryProductsThunk.actions;
export default categoryProductsThunk.reducer;
