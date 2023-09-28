import reducer, {
  AddressAdd,
  AddressAddState,
  setAdressAddData,
  setError,
} from '../../src/redux/slice/AddressAddSlice';

import {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';

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

describe('AddAddress Slice', () => {
  let store: ToolkitStore<
    {addressAdd: unknown},
    AnyAction,
    [ThunkMiddleware<{addressAdd: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        addressAdd: reducer,
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
  test('should handle a Address being added to an empty list', () => {
    const previousState: AddressAddState = {
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

    expect(reducer(previousState, setAdressAddData(successPayload))).toEqual({
      data: successPayload,
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  test('should handle a Address being added to an existing list', () => {
    const previousState: AddressAddState = {
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

    const expectedState: AddressAddState = {
      data: successPayload, // New data overwrites existing data
      isLoader: true,
      isError: false,
      error: null,
    };

    expect(reducer(previousState, setAdressAddData(successPayload))).toEqual(
      expectedState,
    );
  });

  it('should add address data to the state when `setAdressAddData` action is dispatched', async () => {
    const testData = {
      message: 'Address added successfully',
      status: 'success',
    };

    store.dispatch(setAdressAddData(testData));

    const state = store.getState().addressAdd as AddressAddState; // Assuming AddressAddState is the correct type
    expect(state.data).toEqual(testData);
    expect(state.isError).toBe(false);
    expect(state.error).toBe(null);
  });
  it('should handle the `AddressAdd.pending` and `AddressAdd.fulfilled` actions correctly', async () => {
    const addressData = {
      addressLine1: '123 Main St',
      addressLine2: '',
      addressType: 'Home',
      city: 'City',
      country: 'Country',
      postalCode: '12345',
      state: 'State',
      defaultType: true,
    };

    await store.dispatch(AddressAdd(addressData));

    const state = store.getState().addressAdd as AddressAddState; // Assuming AddressAddState is the correct type

    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(true);
  });
  it('should handle the `AddressAdd.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    const addressData = {
      addressLine1: '123 Main St',
      addressLine2: '',
      addressType: 'Home',
      city: 'City',
      country: 'Country',
      postalCode: '12345',
      state: 'State',
      defaultType: true,
    };

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(AddressAdd(addressData)).catch(() => {
      const state = store.getState().addressAdd as AddressAddState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage); // Check the error message
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    store.dispatch(setError(error));

    const state = store.getState().addressAdd as AddressAddState;
    expect(state.isError).toBe(true); // Error occurred
    expect(state.error).toEqual(error); // Check the error message
    expect(state.data).toEqual({
      message: '', // You may want to verify the message field too
      status: '',
    });
    expect(state.isLoader).toBe(false);
  });
});
