import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {categoryDataUrl, subCategoryList} from '../../constants/apiRoutes';

export interface CategoryData {
  description: string;
  id: string;
  imageUrl: string;
  subcategoryName: string;
}

interface CategoryState {
  data: CategoryData;
  isLoader: boolean;
  isError: boolean;
  error: null | string | unknown;
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
    try {
      const response = await ApiService.get(categoryDataUrl);
      console.log(response);
      console.log('Response here is', response);
      return response;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  },
);

export const fetchSubcategoryList = createAsyncThunk(
  'category/fetchSubcategoryList',
  async () => {
    try {
      const response = await ApiService.get(subCategoryList);
      console.log(response);
      console.log('Response here is', response);
      return response;
    } catch (error) {
      console.log('Error', error);
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
        state.error = action.payload;
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
        state.error = action.payload;
      });
  },
});

export const {setData, setError} = categoryThunk.actions;
export default categoryThunk.reducer;
