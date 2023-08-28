import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import ApiService from '../../network/network';
import {url} from '../../constants/Apis';

export const FliterAnalyticslist = createAsyncThunk(
  'FliterAnalyticslist',
  async (item: {formattedStartDate: string; formattedEndDate: string}) => {
    try {
      if (!item.formattedStartDate || !item.formattedEndDate) {
        throw new Error('Invalid date range');
      }
      const response = await ApiService.get(
        `${url}/dashboard/date-selector?endDate=${item.formattedEndDate}&startDate=${item.formattedStartDate}`,
      );
      console.log('FilterAnaltyics', response);
      console.log('---------------------------------------------');

      return response;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  },
);
const FilterAnaltyicsThunk = createSlice({
  name: 'FilterAnaltyicsData',
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
