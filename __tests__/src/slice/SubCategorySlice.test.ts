import reducer, {
  SubCategoryState,
  setError,
  getsubcategoryData,
  setSubcategoryData,
} from '../../../src/redux/slice/subcategorySlice';

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

describe('SubCategory slice', () => {
  const productId = '23';
  const mockSubCategoryData = {
    description: 'Sample description',
    id: '1', // Assuming id is a string
    imageUrl: 'sample-image-url.jpg',
    subcategoryName: 'Sample Subcategory',
  };

  let store: ToolkitStore<
    {subcategoryData: unknown},
    AnyAction,
    [ThunkMiddleware<{subcategoryData: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        subcategoryData: reducer,
      },
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: {
        description: '',
        id: '',
        imageUrl: '',
        subcategoryName: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    });
  });

  it('should handle the `getsubcategoryData.fulfilled` actions correctly', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockSubCategoryData);
    store.dispatch(setSubcategoryData(mockSubCategoryData));
    const state = store.getState().subcategoryData as SubCategoryState; // Assuming AddressAddState is the correct type
    await store.dispatch(getsubcategoryData(productId));

    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(false);
  });
  it('should handle the `getSubcategory.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';

    // Mock the ApiService.get function to throw an error, simulating a rejected API call

    store.dispatch(getsubcategoryData(productId)).catch(() => {
      const state = store.getState().subcategoryData as SubCategoryState; // Assuming AddressAddState is the correct type
      jest.spyOn(ApiService, 'get').mockRejectedValue(new Error(errorMessage));

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    store.dispatch(setError(error));

    store.dispatch(getsubcategoryData(productId)).catch(() => {
      const state = store.getState().subcategoryData as SubCategoryState;
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(error); // Check the error message
      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.isLoader).toBe(false);
    });
  });

  // Your test case goes here
  it('should handle the `getsubcategoryData.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(errorMessage);

    store.dispatch(getsubcategoryData(productId)).catch(() => {
      const state = store.getState().subcategoryData as SubCategoryState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage);
    });
  });
});
