import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
import {productaddUrl} from '../../constants/apiRoutes';
export interface ProductData {
  brand: string;
  categoryIds: [];
  color: string;
  name: string;
  description: string;
  id: number;
  imageUrl: string[];
  material: string;
  price: string;
  totalQuantity: string;
  size: string;
  subcategoryIds: [];
}
export interface ProductAddState {
  data: ProductData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}
const initialState: ProductAddState = {
  data: {
    brand: '',
    categoryIds: [],
    color: '',
    name: '',
    description: '',
    id: 0,
    imageUrl: [],
    material: '',
    price: '',
    totalQuantity: '',
    size: '',
    subcategoryIds: [],
  },
  isLoader: false,
  isError: false,
  error: null,
};

export const ProductAdd = createAsyncThunk(
  'ProductAdd',
  async (
    Data: {
      brand: string;
      categoryIds: [];
      color: string;
      name: string;
      description: string;
      id: number;
      imageUrl: string[];
      material: string;
      price: string;
      totalQuantity: string;
      size: string;
      subcategoryIds: [];
    },
    {dispatch},
  ) => {
    try {
      const response = await ApiService.post(productaddUrl, Data);

      return response;
    } catch (error: any) {
      dispatch(setError(error));
      throw error;
    }
  },
);
const ProductAddThunk = createSlice({
  name: 'productAddData',
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ProductAdd.pending, state => {
        state.isLoader = true;
      })
      .addCase(ProductAdd.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(ProductAdd.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});
export const {setProductData, setError} = ProductAddThunk.actions;
export default ProductAddThunk.reducer;
