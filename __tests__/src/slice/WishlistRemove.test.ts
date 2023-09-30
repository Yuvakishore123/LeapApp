import reducer, {
  WishlistDataState,
  wishListRemove,
  setError,
  setData,
} from '../../../src/redux/slice/wishlistRemoveSlice';

import {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import ApiService from 'network/network';
import {wishListRemoveUrl} from 'constants/apiRoutes';
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

describe('WishList Remove Slice', () => {
  const productId = '12';
  let store: ToolkitStore<
    {wishlistRemove: unknown},
    AnyAction,
    [ThunkMiddleware<{wishlistRemove: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        wishlistRemove: reducer,
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
  test('should handle a Wishlist being added to an empty list', () => {
    const previousState: WishlistDataState = {
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
  test('should handle a cartAdd being added to an existing list', () => {
    const previousState: WishlistDataState = {
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

    const expectedState: WishlistDataState = {
      data: successPayload, // New data overwrites existing data
      isLoader: true,
      isError: false,
      error: null,
    };

    expect(reducer(previousState, setData(successPayload))).toEqual(
      expectedState,
    );
  });

  it('should remove state when ` wishlist removed` action is dispatched', async () => {
    const testData = {
      message: 'Product removed successfully',
      status: 'success',
    };

    store.dispatch(setData(testData));

    const state = store.getState().wishlistRemove as WishlistDataState; // Assuming AddressAddState is the correct type
    expect(state.data).toEqual(testData);
    expect(state.isError).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should handle the `wishlistRemove.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    // Replace with your desired product ID

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(wishListRemove(productId)).catch(() => {
      const state = store.getState().wishlistRemove as WishlistDataState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage);
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    store.dispatch(setError(error));

    store.dispatch(wishListRemove(productId)).catch(() => {
      const state = store.getState().wishlistRemove as WishlistDataState;
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(error); // Check the error message
      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.isLoader).toBe(false);
    });
  });
  it('should handle the wishListRemove async thunk', async () => {
    // Replace with your test product ID
    const successResponse = {
      message: 'Success',
      status: '200 OK',
    };

    // Mock ApiService.delete with jest.spyOn
    const deleteMock = jest
      .spyOn(ApiService, 'delete')
      .mockResolvedValue({successResponse});

    // Dispatch the wishListRemove async thunk
    await store.dispatch(wishListRemove(productId));

    // Get the state after the action is fulfilled
    const state = store.getState().wishlistRemove;

    // Assert that the loading state is updated correctly
    expect(state.isLoader).toBe(false);

    // Assert that isError state is set to false for a successful delete
    expect(state.isError).toBe(false);

    // Assert that the data field in the state contains the expected response data
    // Replace with your expected response data for a successful delete
    expect(state.data).toEqual({
      successResponse,
    });

    // Verify that ApiService.delete was called with the correct URL
    expect(deleteMock).toHaveBeenCalledWith(
      `${wishListRemoveUrl}/${productId}`,
    );

    // Clean up the mock
    deleteMock.mockRestore();
  });

  const deleteMock = jest
    .spyOn(ApiService, 'delete')
    .mockRejectedValue(new Error('API Error'));

  // Your test case goes here
  it('should dispatch setError action when API call fails', async () => {
    // Create a mock store

    try {
      // Dispatch the wishListRemove async thunk, which will throw an error
      await store.dispatch(wishListRemove(productId));
    } catch (error) {
      // Verify that setError action was dispatched with the error
      const dispatchedActions = store.getActions()
        .wishListRemove as WishlistDataState;

      // Expect the first dispatched action to be setError with the error object
      expect(dispatchedActions[0]).toEqual(setError(error));
    }
  });

  // Clean up the mock after all tests
  afterAll(() => {
    deleteMock.mockRestore();
  });
});
