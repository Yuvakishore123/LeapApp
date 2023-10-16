import reducer, {
  updateCart,
  CartDataState,
  setError,
  setData,
} from '../../../src/redux/slice/cartUpdateSlice';

import {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import ApiService from 'network/network';
import {cartupdateUrl} from 'constants/apiRoutes';

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

describe('Cart Update Slice', () => {
  const mockData = {
    productId: 'product123', // Replace with your desired product ID as a string
    quantity: 2, // Replace with the desired quantity as a number
  };
  let store: ToolkitStore<
    {cartUpdate: unknown},
    AnyAction,
    [ThunkMiddleware<{cartUpdate: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cartUpdate: reducer,
      },
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: {
        message: '',
        status: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  test('should handle a cart Update being added to an empty list', () => {
    const previousState: CartDataState = {
      data: {
        message: '',
        status: '',
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
    const previousState: CartDataState = {
      data: {
        message: 'Previous data',
        status: 'Existing',
      },
      isLoader: true,
      isError: false,
      error: null,
    };

    const successPayload = {
      message: 'Success',
      status: 'OK',
    };

    const expectedState: CartDataState = {
      data: successPayload, // New data overwrites existing data
      isLoader: true,
      isError: false,
      error: null,
    };

    expect(reducer(previousState, setData(successPayload))).toEqual(
      expectedState,
    );
  });

  it('should add cart Update  to the state when `setCart data` action is dispatched', async () => {
    const testData = {
      message: 'Product updated successfully',
      status: 'success',
    };
    (ApiService.put as jest.Mock).mockResolvedValue(testData);

    await store.dispatch(updateCart({productId: '123', quantity: 2}));

    const state = store.getState().cartUpdate as CartDataState; // Assuming AddressAddState is the correct type
    expect(state.data).toEqual(testData);
    expect(state.isError).toBe(false);
    expect(state.error).toBe(null);
    expect(ApiService.put).toHaveBeenCalledWith(cartupdateUrl, {
      productId: '123',
      quantity: 2,
    });
  });
  it('should handle the updateCart.rejected action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    // Replace with your desired product ID
    (ApiService.put as jest.Mock).mockRejectedValue(errorMessage);

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(updateCart(mockData)).catch(() => {
      const state = store.getState().cartUpdate as CartDataState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage);
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    store.dispatch(setError(error));

    store.dispatch(updateCart(mockData)).catch(() => {
      const state = store.getState().cartUpdate as CartDataState;
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
