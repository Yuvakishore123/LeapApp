import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
import {logMessage} from 'helpers/helper';
interface EditAddressData {
  message: string;
  status: string;
}
export interface EditAddressState {
  data: EditAddressData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}
const initialState: EditAddressState = {
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
      addressLine1: string;
      addressLine2: string;
      addressType: string;
      city: string;
      country: string;
      postalCode: string;
      state: string;
      defaultType: boolean;
    };
    addressid: number;
  }) => {
    const {log} = logMessage();
    try {
      const response = await ApiService.put(
        `/address/update/${addressid}`,
        updateaddress,
      );

      return response;
    } catch (error: any) {
      log.error('error', error);
      throw error;
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
        state.error = action.payload as string | null;
      });
  },
});
export const selectEditAddressData = (state: {editAddressData: {data: any}}) =>
  state.editAddressData.data;

export const {seteditAddressData, setError} = editAddressThunk.actions;
export default editAddressThunk.reducer;
