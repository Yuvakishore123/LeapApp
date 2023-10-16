import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
import {addressaddUrl} from '../../constants/apiRoutes';

interface AddressAddData {
  message: string;
  status: string;
}
export interface AddressAddState {
  data: AddressAddData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}
const initialState: AddressAddState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};
export const AddressAdd = createAsyncThunk(
  'AddressAdd',
  async (
    addressData: {
      addressLine1: string;
      addressLine2: string;
      addressType: string;
      city: string;
      country: string;
      postalCode: string;
      state: string;
      defaultType: boolean;
    },
    {dispatch},
  ) => {
    try {
      const response = await ApiService.post(addressaddUrl, addressData);

      return response;
    } catch (error: any) {
      dispatch(error);
      throw error;
    }
  },
);

const AddressAddThunk = createSlice({
  name: 'AddressAddData',
  initialState,
  reducers: {
    setAdressAddData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.isError = true;
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(AddressAdd.pending, state => {
        state.isLoader = true;
      })
      .addCase(AddressAdd.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(AddressAdd.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload as string | null;
      });
  },
});
export const {setAdressAddData, setError} = AddressAddThunk.actions;
export default AddressAddThunk.reducer;
