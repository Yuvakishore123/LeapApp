import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
interface editaddressData {
  message: string;
  status: string;
}
interface editAddressState {
  data: editaddressData;
  isLoader: boolean;
  isError: boolean;
  error: null | string | unknown;
}
const initialState: editAddressState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};
export const editAddressData = createAsyncThunk(
  'editAddressData',
  async ({
    updateaddress,
    addressid,
  }: {
    updateaddress: {
      addressLine1: any;
      addressLine2: any;
      addressType: string;
      city: any;
      country: any;
      postalCode: any;
      state: any;
      defaultType: boolean;
    };
    addressid: any;
  }) => {
    try {
      const response = await ApiService.put(
        `/address/update/${addressid}`,
        updateaddress,
      );
      console.log('Editaddress', response.data);
      console.log('-----------------------------');
      return response;
    } catch (error: any) {
      console.log('error', error);
      return error;
    }
  },
);
const editAddressThunk = createSlice({
  name: 'editaddressdata',
  initialState,
  reducers: {
    seteditAddressData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(editAddressData.pending, state => {
        state.isLoader = true;
      })
      .addCase(editAddressData.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(editAddressData.rejected, (state, action) => {
        state.isLoader = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});
export const {seteditAddressData, setError} = editAddressThunk.actions;
export default editAddressThunk.reducer;