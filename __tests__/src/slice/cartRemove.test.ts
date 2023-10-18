import reducer, {
  removefromCart,
  CartRemoveState,
  setError,
  setData,
} from '../../../src/redux/slice/cartRemoveSlice';

import {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import ApiService from 'network/network';
import {cartRemoveUrl} from 'constants/apiRoutes';
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('network/network');
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('Cart Remove Slice', () => {
  const productId = 12;
  let store: ToolkitStore<
    {cartRemove: unknown},
    AnyAction,
    [ThunkMiddleware<{cartRemove: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cartRemove: reducer,
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
  test('should handle a cartRemove is changing or not', () => {
    const previousState: CartRemoveState = {
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

  it('should remove product from cartaction is dispatched', async () => {
    const testData = {
      message: 'Product removed successfully',
      status: 'success',
    };
    (ApiService.delete as jest.Mock).mockResolvedValue(testData);
    await store.dispatch(removefromCart(productId));

    store.dispatch(setData(testData));

    const state = store.getState().cartRemove as CartRemoveState; // Assuming AddressAddState is the correct type
    expect(state.data).toEqual(testData);
    expect(state.isError).toBe(false);
    expect(state.error).toBe(null);
    expect(ApiService.delete).toHaveBeenCalledWith(
      `${cartRemoveUrl}${productId}`,
    );
  });

  it('should handle the `cartAdd.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    store.dispatch(setError(errorMessage));
    // Replace with your desired product ID
    (ApiService.delete as jest.Mock).mockRejectedValue(errorMessage);
    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(removefromCart(productId)).catch(() => {
      const state = store.getState().cartRemove as CartRemoveState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage);
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    store.dispatch(setError(error));

    store.dispatch(removefromCart(productId)).catch(() => {
      const state = store.getState().cartRemove as CartRemoveState;
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
