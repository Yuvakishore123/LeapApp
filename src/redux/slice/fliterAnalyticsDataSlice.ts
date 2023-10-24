import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
import {url} from '../../constants/Apis';
import {logMessage} from 'helpers/helper';
export interface FliterAnalyticsData {
  message: string;
  status: string;
}
export interface FilteranalyticsState {
  data: FliterAnalyticsData;
  isLoader: boolean;
  isError: boolean;
  error: null | string;
}

const initialState: FilteranalyticsState = {
  data: {
    message: '',
    status: '',
  },
  isLoader: false,
  isError: false,
  error: null,
};
export const FliterAnalyticslist = createAsyncThunk(
  'FliterAnalyticslist',
  async (item: {formattedStartDate: string; formattedEndDate: string}) => {
    try {
      const response = await ApiService.get(
        `${url}/dashboard/date-selector?endDate=${item.formattedEndDate}&startDate=${item.formattedStartDate}`,
      );

      return response;
    } catch (error) {
      logMessage.error('error in FliterAnalyticslist', error);
      throw error;
    }
  },
);
const FilterAnaltyicsThunk = createSlice({
  name: 'FilterAnaltyicsData',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(FliterAnalyticslist.pending, state => {
        state.isLoader = true;
      })
      .addCase(FliterAnalyticslist.fulfilled, (state, action) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(FliterAnalyticslist.rejected, state => {
        state.isError = true;
        state.isLoader = false;
      });
  },
});
export const {setData} = FilterAnaltyicsThunk.actions;
export default FilterAnaltyicsThunk.reducer;
