import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
import {productaddUrl} from '../../constants/apiRoutes';
interface ProductAddData {
  message: string;
  status: string;
}
interface ProductAddState {
  data: ProductAddData;
  isLoader: boolean;
  isError: boolean;
  error: null | string | unknown;
}
const initialState: ProductAddState = {
  data: {
    message: '',
    status: '',
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
      console.log('productadd', response.data);
      console.log('-----------------------------------');
      return response;
    } catch (error: any) {
      dispatch(setError(error));
      return error;
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
        state.error = action.payload;
      });
  },
});
export const {setProductData, setError} = ProductAddThunk.actions;
export default ProductAddThunk.reducer;
