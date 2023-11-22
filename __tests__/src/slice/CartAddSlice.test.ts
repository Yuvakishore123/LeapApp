import reducer, {
  CartAdd,
  CartAddState,
  setCartData,
  setError,
} from '../../../src/redux/slice/CartAddSlice';

import {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import ApiService from 'network/network';
import {cartList} from 'constants/apiRoutes';

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

describe('Cart Add Slice', () => {
  let store: ToolkitStore<
    {cartAdd: unknown},
    AnyAction,
    [ThunkMiddleware<{cartAdd: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cartAdd: reducer,
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
  test('should handle a cartData being added to an empty list', () => {
    const previousState: CartAddState = {
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

    expect(reducer(previousState, setCartData(successPayload))).toEqual({
      data: successPayload,
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  test('should handle a cartAdd being added to an existing list', () => {
    const previousState: CartAddState = {
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

    const expectedState: CartAddState = {
      data: successPayload, // New data overwrites existing data
      isLoader: true,
      isError: false,
      error: null,
    };

    expect(reducer(previousState, setCartData(successPayload))).toEqual(
      expectedState,
    );
  });

  it('should add address data to the state when `setCart data` action is dispatched', async () => {
    const testData = {
      message: 'Product added successfully',
      status: 'success',
    };
    (ApiService.post as jest.Mock).mockResolvedValue(testData);

    store.dispatch(setCartData(testData));

    const state = store.getState().cartAdd as CartAddState; // Assuming AddressAddState is the correct type
    expect(state.data).toEqual(testData);
    expect(state.isError).toBe(false);
    expect(state.error).toBe(null);
  });
  it('should handle the  `cartAdd.fulfilled` actions correctly', async () => {
    const mockItem = {
      productId: 'product123', // Replace with your desired product ID
      quantity: 2, // Replace with the desired quantity
      rentalEndDate: '2023-12-31', // Replace with the desired rental end date
      rentalStartDate: '2023-09-01', // Replace with the desired rental start date
    };
    await store.dispatch(CartAdd(mockItem));

    const state = store.getState().cartAdd as CartAddState; // Assuming AddressAddState is the correct type

    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(false);
    expect(ApiService.post).toHaveBeenCalledWith(cartList, mockItem);
  });
  it('should handle the `cartAdd.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    const mockItem = {
      productId: 'product123', // Replace with your desired product ID
      quantity: 2, // Replace with the desired quantity
      rentalEndDate: '2023-12-31', // Replace with the desired rental end date
      rentalStartDate: '2023-09-01', // Replace with the desired rental start date
    };
    (ApiService.post as jest.Mock).mockRejectedValue(errorMessage);
    store.dispatch(setError(errorMessage));

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(CartAdd(mockItem)).catch(() => {
      const state = store.getState().cartAdd as CartAddState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage);
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    store.dispatch(setError(error));
    const mockItem = {
      productId: 'product123', // Replace with your desired product ID
      quantity: 2, // Replace with the desired quantity
      rentalEndDate: '2023-12-31', // Replace with the desired rental end date
      rentalStartDate: '2023-09-01', // Replace with the desired rental start date
    };

    store.dispatch(CartAdd(mockItem)).catch(() => {
      const state = store.getState().cartAdd as CartAddState;
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
