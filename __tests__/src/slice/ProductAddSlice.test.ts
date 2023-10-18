import reducer, {
  ProductAddState,
  ProductAdd,
  ProductData,
  setProductData,
} from '../../../src/redux/slice/ProductAddSlice';

import {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import ApiService from 'network/network';
import {productaddUrl} from 'constants/apiRoutes';

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
jest.mock('network/network');

describe('ProductAdd  Slice', () => {
  const mockData: ProductData = {
    brand: 'Sample Brand',
    categoryIds: [],
    color: 'Sample Color',
    name: 'Sample Product',
    description: 'Sample Description',
    id: 1,
    imageUrl: ['sample-image-1.jpg', 'sample-image-2.jpg'],
    material: 'Sample Material',
    price: '$99.99',
    totalQuantity: '10',
    size: 'Sample Size',
    subcategoryIds: [],
  };
  let store: ToolkitStore<
    {productAdd: unknown},
    AnyAction,
    [ThunkMiddleware<{productAdd: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        productAdd: reducer,
      },
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: {
        brand: '',
        categoryIds: [],
        color: '',
        name: '',
        description: '',
        id: 0,
        imageUrl: [],
        material: '',
        price: '',
        totalQuantity: '',
        size: '',
        subcategoryIds: [],
      },
      isLoader: false,
      isError: false,
      error: null,
    });
  });

  it('should getdata to the state when `ProductAdd  ` action is dispatched', async () => {
    const state = store.getState().productAdd as ProductAddState; // Assuming AddressAddState is the correct type
    expect(state.isError).toBe(false);
  });

  it('should handle the `ProductAdd.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'post').mockRejectedValueOnce(errorMessage);

    store.dispatch(ProductAdd(mockData)).catch(() => {
      const state = store.getState().productAdd as ProductAddState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while fetching Data';
    (ApiService.post as jest.Mock).mockRejectedValueOnce(error);
    store.dispatch(ProductAdd(mockData)).catch(() => {
      const state = store.getState().productAdd as ProductAddState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      // Check the error message
      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.isLoader).toBe(false);
      expect(state.error).toBe(error);
    });
  });
  it('should add Product when `productAdd` action is dispatched', async () => {
    (ApiService.post as jest.Mock).mockResolvedValue(mockData);

    await store.dispatch(ProductAdd(mockData));
    store.dispatch(setProductData(mockData));

    store.dispatch(ProductAdd(mockData)).catch(() => {
      const state = store.getState().productAdd as ProductAddState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(false); // Error occurred
      // Check the error message
      expect(state.data).toEqual({
        mockData,
      });
      expect(state.isLoader).toBe(false);
    });
    expect(ApiService.post).toHaveBeenCalledWith(productaddUrl, mockData);
  });
});
