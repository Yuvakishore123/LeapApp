import reducer, {
  setData,
  ListAddressState,
  ListAddress,
} from '../../../src/redux/slice/listAddressSlice';

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
    {listAddress: unknown},
    AnyAction,
    [ThunkMiddleware<{listAddress: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        listAddress: reducer,
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
      data: null,
      isLoader: false,
      isError: false,
    });
  });
  test('should handle a listAddress being added to an empty list', () => {
    const previousState: ListAddressState = {
      data: null,
      isLoader: false,
      isError: false,
    };

    const successPayload = {
      message: 'Success',
      status: 'OK',
    };

    expect(reducer(previousState, setData(successPayload))).toEqual({
      data: successPayload,
      isLoader: false,
      isError: false,
    });
  });
  test('should handle a list Address being added to an existing list', () => {
    const previousState: ListAddressState = {
      data: null,
      isLoader: true,
      isError: false,
    };

    const expectedState: ListAddressState = {
      data: mockCategoryData, // New data overwrites existing data
      isLoader: true,
      isError: false,
    };

    expect(reducer(previousState, setData(mockCategoryData))).toEqual(
      expectedState,
    );
  });

  it('should add fetch the listAddress details  to the state when `setCart data` action is dispatched', async () => {
    store.dispatch(setData(mockCategoryData));

    const state = store.getState().listAddress as ListAddressState;
    expect(state.data).toEqual(mockCategoryData);
    expect(state.isError).toBe(false);
  });
  it('should handle the `listAddress.fulfilled` actions correctly', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCategoryData);
    store.dispatch(setData(mockCategoryData));
    const state = store.getState().listAddress as ListAddressState; // Assuming AddressAddState is the correct type
    await store.dispatch(ListAddress());

    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(false);
  });

  it('should handle the `listAddress.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValue(errorMessage);
    // Replace with your desired product ID

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(ListAddress()).catch(() => {
      const state = store.getState().listAddress as ListAddressState;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });

  it('should handle the `fetchSubcategoryList.fulfilled` actions correctly', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCategoryData);
    store.dispatch(setData(mockCategoryData));
    const state = store.getState().listAddress as ListAddressState;
    await store.dispatch(ListAddress());

    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(false);
  });

  it('should handle the `fetchSubcategoryList.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValue(errorMessage);
    // Replace with your desired product ID

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(ListAddress()).catch(() => {
      const state = store.getState().listAddress as ListAddressState;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
  //   it('should set an error state when `setError` action is dispatched', () => {
  //     const error = 'An error occurred while adding the address';
  //     store.dispatch(setError(error));

  //     store.dispatch(fetchSubcategoryList()).catch(() => {
  //       const state = store.getState().categorySlice as CategoryState;
  //       expect(state.isError).toBe(true); // Error occurred
  //       expect(state.error).toEqual(error); // Check the error message
  //       expect(state.data).toEqual({
  //         message: '', // You may want to verify the message field too
  //         status: '',
  //       });
  //       expect(state.isLoader).toBe(false);
  //     });
  //   });
});
