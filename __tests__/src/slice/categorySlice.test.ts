import reducer, {
  CategoryState,
  setError,
  setData,
  fetchCategoriesData,
  fetchSubcategoryList,
} from '../../../src/redux/slice/categorySlice';

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

describe('Category Slice', () => {
  let store: ToolkitStore<
    {categorySlice: unknown},
    AnyAction,
    [ThunkMiddleware<{categorySlice: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        categorySlice: reducer,
      },
    });
  });
  const mockCategoryData = {
    description: 'Sample description',
    id: '1', // Assuming id is a string
    imageUrl: 'sample-image-url.jpg',
    subcategoryName: 'Sample Subcategory',
  };

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
  test('should handle a cart Update being added to an empty list', () => {
    const previousState: CategoryState = {
      data: {
        description: '',
        id: '',
        imageUrl: '',
        subcategoryName: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    };

    const successPayload = {
      message: 'Success',
      status: 'OK',
    };

    expect(reducer(previousState, setData(successPayload))).toEqual({
      data: successPayload,
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  test('should handle a cart Update being added to an existing list', () => {
    const previousState: CategoryState = {
      data: {
        description: 'Sample description',
        id: '1', // Assuming id is a string
        imageUrl: 'sample-image-url.jpg',
        subcategoryName: 'Sample Subcategory',
      },
      isLoader: true,
      isError: false,
      error: null,
    };

    const expectedState: CategoryState = {
      data: mockCategoryData, // New data overwrites existing data
      isLoader: true,
      isError: false,
      error: null,
    };

    expect(reducer(previousState, setData(mockCategoryData))).toEqual(
      expectedState,
    );
  });

  it('should add fetch the subcategory details  to the state when `setCart data` action is dispatched', async () => {
    store.dispatch(setData(mockCategoryData));

    const state = store.getState().categorySlice as CategoryState; // Assuming AddressAddState is the correct type
    expect(state.data).toEqual(mockCategoryData);
    expect(state.isError).toBe(false);
    expect(state.error).toBe(null);
  });
  it('should handle the `categoryData.fulfilled` actions correctly', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCategoryData);
    store.dispatch(setData(mockCategoryData));
    const state = store.getState().categorySlice as CategoryState; // Assuming AddressAddState is the correct type
    await store.dispatch(fetchCategoriesData());

    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(false);
  });

  it('should handle the `categoryData.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValue(errorMessage);
    // Replace with your desired product ID

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(fetchCategoriesData()).catch(() => {
      const state = store.getState().categorySlice as CategoryState;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage);
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    store.dispatch(setError(error));

    store.dispatch(fetchCategoriesData()).catch(() => {
      const state = store.getState().categorySlice as CategoryState;
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(error); // Check the error message
      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.isLoader).toBe(false);
    });
  });
  it('should handle the `fetchSubcategoryList.fulfilled` actions correctly', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCategoryData);
    store.dispatch(setData(mockCategoryData));
    const state = store.getState().categorySlice as CategoryState; // Assuming AddressAddState is the correct type
    await store.dispatch(fetchSubcategoryList());

    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(false);
  });

  it('should handle the `fetchSubcategoryList.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValue(errorMessage);
    // Replace with your desired product ID

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(fetchSubcategoryList()).catch(() => {
      const state = store.getState().categorySlice as CategoryState;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage);
    });
  });
  it('should set an error state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    store.dispatch(setError(error));

    store.dispatch(fetchSubcategoryList()).catch(() => {
      const state = store.getState().categorySlice as CategoryState;
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
