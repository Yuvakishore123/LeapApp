// AddressAddThunk.test.ts

import ApiService from 'network/network';
import reducer, {
  AddressAdd,
  setAdressAddData,
  setError,
} from '../../../src/redux/slice/AddressAddSlice'; // Assuming this is the correct path
import {configureStore} from '@reduxjs/toolkit';
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

describe('AddressAddThunk Slice', () => {
  const mockData = {
    addressLine1: '123 Main Street',
    addressLine2: '',
    addressType: 'Home',
    city: 'Cityville',
    country: 'USA',
    postalCode: '12345',
    state: 'CA',
    defaultType: false,
  };
  const initialState = {
    data: {message: '', status: ''},
    isLoader: false,
    isError: false,
    error: null,
  };
  let store: {
    getActions(): unknown;
    getState: () => {(): any; new (): any; addressAdd: any};
    dispatch: (arg0: any) => void;
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        addressAdd: reducer, // Assuming you have a slice named 'addressAdd'
      },
    }) as any;
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

  it('should handle AddressAdd.pending correctly', () => {
    const state = store.getState().addressAdd;

    expect(state.isLoader).toBe(false);

    store.dispatch(AddressAdd(mockData));

    const newState = store.getState().addressAdd;

    expect(newState.isLoader).toBe(true);
  });

  it('should handle AddressAdd.fulfilled correctly', async () => {
    (ApiService.post as jest.Mock).mockResolvedValue(mockData);

    await store.dispatch(AddressAdd(mockData));

    const state = store.getState().addressAdd;

    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('should handle AddressAdd.rejected correctly', async () => {
    const errorMessage = 'An error occurred while adding the address';

    (ApiService.post as jest.Mock).mockRejectedValue(errorMessage);

    try {
      await store.dispatch(AddressAdd(mockData));
    } catch (error) {
      const state = store.getState().addressAdd;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(errorMessage);
    }
  });

  it('should handle setAdressAddData correctly', () => {
    const newState = reducer(
      undefined,
      setAdressAddData({
        message: 'Address updated successfully',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe('Address updated successfully');
    expect(newState.data.status).toBe('OK');
  });

  it('should handle setError', () => {
    const payload = {message: 'Error message', status: 'ERROR'};
    const action = setError(payload);
    const newState = reducer(initialState, action);

    expect(newState).toEqual({
      ...initialState,
      data: payload,
    });
  });
});
