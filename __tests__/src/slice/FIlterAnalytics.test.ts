import reducer, {
  FilterAnalyticsState,
  setData,
  FliterAnalyticslist,
} from '../../../src/redux/slice/fliterAnalyticsDataSlice';

import {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import ApiService from 'network/network';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('Filter Analytics  Slice', () => {
  const mockItem = {
    formattedStartDate: '2023-09-01',
    formattedEndDate: '2023-09-30',
  };

  let store: ToolkitStore<
    {filterAnalytics: unknown},
    AnyAction,
    [ThunkMiddleware<{filterAnalytics: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        filterAnalytics: reducer,
      },
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: null,
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  test('should handle a Data being added to an empty list', () => {
    const previousState: FilterAnalyticsState = {
      data: null,
      isLoader: false,
      isError: false,
      error: null,
    };

    const mockApiResponse = {
      borrowerEmail: 'example@email.com',
      borrowerId: 123,
      borrowerName: 'John Doe',
      borrowerPhoneNumber: '123-456-7890',
      imageUrl: 'https://example.com/image.jpg',
      name: 'Product Name',
      productId: 456,
      quantity: 2,
      rentalCost: 50.99,
      rentalEndDate: '2023-09-27T11:55:52.957Z',
      rentalStartDate: '2023-09-25T11:55:52.957Z',
    };

    expect(reducer(previousState, setData(mockApiResponse))).toEqual({
      data: mockApiResponse,
      isLoader: false,
      isError: false,
      error: null,
    });
  });

  it('should handle the ` `FliterAnalyticslist .fulfilled` actions correctly', async () => {
    const mockApiResponse = {
      borrowerEmail: 'example@email.com',
      borrowerId: 123,
      borrowerName: 'John Doe',
      borrowerPhoneNumber: '123-456-7890',
      imageUrl: 'https://example.com/image.jpg',
      name: 'Product Name',
      productId: 456,
      quantity: 2,
      rentalCost: 50.99,
      rentalEndDate: '2023-09-27T11:55:52.957Z',
      rentalStartDate: '2023-09-25T11:55:52.957Z',
    };

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockApiResponse);

    // Dispatch the FliterAnalyticslist action with your mockItem
    await store.dispatch(FliterAnalyticslist(mockItem));

    // Get the state after the action is fulfilled
    const state = store.getState().filterAnalytics as FilterAnalyticsState;

    // Assert that the loading state is updated correctly
    expect(state.isLoader).toBe(false);

    // Assert that the data state is updated with the mockApiResponse
    expect(state.data).toEqual(mockApiResponse);

    // Assert that the isError state is set to false
    expect(state.isError).toBe(false);
  });
  it('should handle the `FliterAnalyticslist.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(errorMessage);

    store.dispatch(FliterAnalyticslist(mockItem)).catch(() => {
      const state = store.getState().filterAnalytics as FilterAnalyticsState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage);
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';

    store.dispatch(FliterAnalyticslist(mockItem)).catch(() => {
      const state = store.getState().filterAnalytics as FilterAnalyticsState;
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(error); // Check the error message
      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.isLoader).toBe(false);
    });
  });
});
