import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
import {addressaddUrl} from '../../constants/apiRoutes';

interface AddressAddData {
  message: string;
  status: string;
}
interface AddressAddState {
  data: AddressAddData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}
// Define the initial state
const initialState: AddressAddState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};

// Define an asynchronous thunk to handle the address adding process
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
      // Make a POST request to the API to add an address
      const response = await ApiService.post(addressaddUrl, addressData);
      return response;
    } catch (error: any) {
      dispatch(error);
      return error;
    }
  },
);

// Define a slice to manage address adding state
const AddressAddThunk = createSlice({
  name: 'AddressAddData',
  initialState,
  reducers: {
    setAdressAddData: (state, action) => {
      state.data = action.payload; // Update the address data in the state
    },
    setError: (state, action) => {
      state.data = action.payload; // Set an error in the state
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

// Export the action creators and reducer
export const {setAdressAddData, setError} = AddressAddThunk.actions;
export default AddressAddThunk.reducer;
