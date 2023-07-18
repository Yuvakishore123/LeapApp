import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
import {addressaddUrl} from '../../constants/apiRoutes';
import {ListAddress} from './listAddressSlice';
interface AddressAddData {
  message: string;
  status: string;
}
interface AddressAddState {
  data: AddressAddData;
  isLoader: boolean;
  isError: boolean;
  error: null | string | unknown;
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
      dispatch(ListAddress);
      console.log('AddressAdd', response);
      console.log('--------------------------------');
      return response;
    } catch (error: any) {
      dispatch(error);
      return error;
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
      state.data = action.payload;
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
        state.error = action.payload;
      });
  },
});
export const {setAdressAddData, setError} = AddressAddThunk.actions;
export default AddressAddThunk.reducer;