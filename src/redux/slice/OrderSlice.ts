import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {url} from '../../constants/Apis';
import ApiService from '../../network/Network';
import {generateInvoice} from '../../constants/ApiRoutes';
import {logMessage} from 'helpers/Helper';
export interface OrderData {
  message: string;
  status: string;
}

export interface OrderdataState {
  data: OrderData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: OrderdataState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};
export const fetchOrderProducts = createAsyncThunk(
  'fetchOrderProducts',
  async () => {
    try {
      const response = await ApiService.get(`${url}/order/list`);
      return response;
    } catch (error) {
      logMessage.error('error in fetchOrderProducts', error);
      throw error;
    }
  },
);
export const fetchInvoiceDetails = createAsyncThunk(
  'fetchInvoiceDetails',
  async (orderId: string) => {
    try {
      const response = await ApiService.get(`${generateInvoice}/${orderId}`);
      return response;
    } catch (error) {
      logMessage.error('error in fetching InvoiceDetails', error);
      throw error;
    }
  },
);

export const orderSlice = createSlice({
  name: 'orderproducts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrderProducts.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchOrderProducts.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchOrderProducts.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      })
      .addCase(fetchInvoiceDetails.pending, state => {
        state.isLoader = true;
      })
      .addCase(fetchInvoiceDetails.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchInvoiceDetails.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});

export default orderSlice.reducer;
