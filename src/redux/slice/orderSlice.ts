import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {url} from '../../constants/Apis';
import ApiService from '../../network/network';
import {generateInvoice} from '../../constants/apiRoutes';

export const fetchOrderProducts = createAsyncThunk(
  'fetchOrderProducts',
  async () => {
    try {
      const response = await ApiService.get(`${url}/order/list`);
      console.log('orderData is ', response);
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);
export const fetchInvoiceDetails = createAsyncThunk(
  'fetchInvoiceDetails',
  async (orderId: string) => {
    try {
      console.log('orderId', orderId);
      const response = await ApiService.get(`${generateInvoice}/${orderId}`);
      console.log(response);
      return response;
    } catch (error) {
      console.log('orderId', orderId);
      console.log(error);
      throw error;
    }
  },
);

export const orderSlice = createSlice({
  name: 'orderproducts',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
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
