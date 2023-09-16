import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
import {subCategoryUrl} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';

export interface SubCategoryData {
  description: string;
  id: string;
  imageUrl: string;
  subcategoryName: string;
}

interface SubCategoryState {
  data: SubCategoryData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: SubCategoryState = {
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

export const getsubcategoryData = createAsyncThunk(
  'subcategoryData',
  async (productId: string) => {
    const {log} = logMessage();
    try {
      const response = await ApiService.get(`${subCategoryUrl}${productId}`);

      return response;
    } catch (error) {
      log.error('error in fetching subcategory data');
      throw error;
    }
  },
);

const subcategoryThunk = createSlice({
  name: 'profileData',
  initialState,
  reducers: {
    setSubcategoryData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getsubcategoryData.pending, state => {
        state.isLoader = true;
      })
      .addCase(getsubcategoryData.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(getsubcategoryData.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});

export const {setSubcategoryData, setError} = subcategoryThunk.actions;
export default subcategoryThunk.reducer;
