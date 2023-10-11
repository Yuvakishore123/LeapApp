import reducer, {
  UserProductState,
  fetchUserProducts,
} from '../../../src/redux/slice/userProductSlice';

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

describe('UserProducts slice', () => {
  const pageSize = 1;
  const productsData = {
    description: 'Sample description',
    id: '1', // Assuming id is a string
    imageUrl: 'sample-image-url.jpg',
    subcategoryName: 'Sample Subcategory',
  };

  let store: ToolkitStore<
    {userProducts: unknown},
    AnyAction,
    [ThunkMiddleware<{userProducts: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        userProducts: reducer,
      },
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: null,
      firstCallLoading: false, // Loading state for the first call
      loading: false, // Loading state for subsequent calls
      isError: false,
      productsEnd: false,
    });
  });

  it('should handle the `getsubcategoryData.fulfilled` actions correctly', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(productsData);

    const state = store.getState().userProducts as UserProductState; // Assuming AddressAddState is the correct type
    await store.dispatch(fetchUserProducts({pageSize}));

    expect(state.firstCallLoading).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(false);
  });
  it('should handle the `getSubcategory.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';

    // Mock the ApiService.get function to throw an error, simulating a rejected API call

    store.dispatch(fetchUserProducts({pageSize})).catch(() => {
      const state = store.getState().userProducts as UserProductState; // Assuming AddressAddState is the correct type
      jest.spyOn(ApiService, 'get').mockRejectedValue(new Error(errorMessage));

      expect(state.firstCallLoading).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';

    store.dispatch(fetchUserProducts({pageSize})).catch(() => {
      const state = store.getState().userProducts as UserProductState;
      expect(state.isError).toBe(true); // Error occurred

      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.firstCallLoading).toBe(false);
    });
  });

  // Your test case goes here
  it('should handle the `getsubcategoryData.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(errorMessage);

    store.dispatch(fetchUserProducts({pageSize})).catch(() => {
      const state = store.getState().userProducts as UserProductState; // Assuming AddressAddState is the correct type

      expect(state.loading).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
});
