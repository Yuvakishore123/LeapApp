import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {url} from '../../constants/Apis';
import ApiService from '../../network/network';
import {generateInvoice} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';

export interface OrderProductsState {
  data: null;
  isLoader: boolean;
  isError: boolean;
}
const initialState: OrderProductsState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
};

export const fetchOrderProducts = createAsyncThunk(
  'fetchOrderProducts',
  async () => {
    const {log} = logMessage();
    try {
      const response = await ApiService.get(`${url}/order/list`);

      return response;
    } catch (error) {
      log.error('error in fetching order details');
      throw error;
    }
  },
);
export const fetchInvoiceDetails = createAsyncThunk(
  'fetchInvoiceDetails',
  async (orderId: string) => {
    const {log} = logMessage();
    try {
      const response = await ApiService.get(`${generateInvoice}/${orderId}`);

      return response;
    } catch (error) {
      log.error('error in generating invoice');
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
