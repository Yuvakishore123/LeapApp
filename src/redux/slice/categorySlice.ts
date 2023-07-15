import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {categoryDataUrl} from '../../constants/apiRoutes';

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
export const fetchCategoriesdata = createAsyncThunk(
  'fetchCategoriesdata',
  async () => {
    try {
      const response = await ApiService.get(categoryDataUrl);
      console.log(response);
      console.log('response here is ', response);
      return response;
    } catch (error) {
      console.log('error ', error);
      return error;
    }
  },
);

const categoryThunk = createSlice({
  name: 'fetchcategoryData',
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
      .addCase(fetchCategoriesdata.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchCategoriesdata.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchCategoriesdata.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});
export const {setData, setError} = categoryThunk.actions;
export default categoryThunk.reducer;
