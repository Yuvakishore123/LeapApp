import reducer, {
  CategoryProductState,
  fetchCategoriesProductsdata,
  setData,
} from '../../../src/redux/slice/categoryProductsSlice';

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

describe('Category ProductsSlice', () => {
  let store: ToolkitStore<
    {categoryProduct: unknown},
    AnyAction,
    [ThunkMiddleware<{categoryProduct: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        categoryProduct: reducer,
      },
    });
  });
  const mockId = 12;
  const mockData = {
    availableQuantities: 10,
    brand: 'Sample Brand',
    categoryIds: [1, 2],
    color: 'Sample Color',
    description: 'Sample Description',
    disabled: false,
    disabledQuantities: 2,
    id: 1,
    imageUrl: ['sample-image-1.jpg', 'sample-image-2.jpg'],
    material: 'Sample Material',
    name: 'Sample Product',
    price: 99.99,
    rentedQuantities: 3,
    size: 'Sample Size',
    subcategoryIds: [3, 4],
    totalQuantity: 15,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: [],
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  test('should handle a Data being added to an empty list', () => {
    const previousState: CategoryProductState = {
      data: [],
      isLoader: false,
      isError: false,
      error: null,
    };

    expect(reducer(previousState, setData(mockData))).toEqual({
      data: mockData,
      isLoader: false,
      isError: false,
      error: null,
    });
  });

  it('should handle the ` `fetchProducts .fulfilled` actions correctly', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    // Dispatch the FliterAnalyticslist action with your mockItem
    await store.dispatch(fetchCategoriesProductsdata(mockId));

    // Get the state after the action is fulfilled
    const state = store.getState().categoryProduct as CategoryProductState;

    // Assert that the loading state is updated correctly
    expect(state.isLoader).toBe(false);

    // Assert that the data state is updated with the mockApiResponse
    expect(state.data).toEqual(mockData);

    // Assert that the isError state is set to false
    expect(state.isError).toBe(false);
  });
  it('should handle the `fetchProducts.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(errorMessage);

    store.dispatch(fetchCategoriesProductsdata(mockId)).catch(() => {
      const state = store.getState().categoryProduct as CategoryProductState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(errorMessage);
      expect(state.error).toEqual({
        message: errorMessage, // You may want to verify the message field too
        status: '',
      });
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while fetching Data';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(error);
    store.dispatch(fetchCategoriesProductsdata(mockId)).catch(() => {
      const state = store.getState().categoryProduct as CategoryProductState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      // Check the error message
      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.isLoader).toBe(false);
    });
  });
  test('should handle a Address being added to an existing list', () => {
    const previousState: CategoryProductState = {
      data: [],
      isLoader: true,
      isError: false,
      error: null,
    };

    const expectedState: CategoryProductState = {
      data: mockData, // New data overwrites existing data
      isLoader: true,
      isError: false,
      error: null,
    };

    expect(reducer(previousState, setData(mockData))).toEqual(expectedState);
  });
});
