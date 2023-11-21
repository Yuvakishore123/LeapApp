import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {categoryDataUrl, subCategoryList} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';

export interface CategoryData {
  description: string;
  id: string;
  imageUrl: string;
  subcategoryName: string;
}

export interface CategoryState {
  data: CategoryData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: CategoryState = {
  data: {
    description: '',
    id: '',
    imageUrl: '',
    subcategoryName: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};

export const fetchCategoriesData = createAsyncThunk(
  'category/fetchCategoriesData',
  async () => {
    const {log} = logMessage();
    try {
      const response = await ApiService.get(categoryDataUrl);

      return response;
    } catch (error) {
      log.error('error during fetchong category data');
      throw error;
    }
  },
);

export const fetchSubcategoryList = createAsyncThunk(
  'category/fetchSubcategoryList',
  async () => {
    const {log} = logMessage();
    try {
      const response = await ApiService.get(subCategoryList);
      return response;
    } catch (error) {
      log.error('error during fetchong subcategory data');
      throw error;
    }
  },
);

const categoryThunk = createSlice({
  name: 'category',
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
      .addCase(fetchCategoriesData.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchCategoriesData.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchCategoriesData.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      })
      .addCase(fetchSubcategoryList.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchSubcategoryList.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchSubcategoryList.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});
export const selectCategoryData = (state: {category: {data: any}}) =>
  state.category.data;
export const selectCategoryLoading = (state: {category: {loading: boolean}}) =>
  state.category.loading;

export const {setData, setError} = categoryThunk.actions;
export default categoryThunk.reducer;
