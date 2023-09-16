import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import ApiService from '../../network/network';
import {listAddressUrl} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';

export const ListAddress = createAsyncThunk('ListAddress', async () => {
  const {log} = logMessage();
  try {
    const response = await ApiService.get(listAddressUrl);

    return response;
  } catch (error) {
    log.error('error in fetching  Address');
    return error;
  }
});

const listAddressThunk = createSlice({
  name: 'listAddressData',
  initialState: {
    data: null,
    isLoader: false,
    isError: false,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(ListAddress.pending, state => {
        state.isLoader = true;
      })
      .addCase(ListAddress.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(ListAddress.rejected, state => {
        state.isLoader = false;
        state.isError = true;
      });
  },
});
export const {setData} = listAddressThunk.actions;
export default listAddressThunk.reducer;
