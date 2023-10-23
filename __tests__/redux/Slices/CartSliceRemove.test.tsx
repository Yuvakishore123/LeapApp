import ApiService from 'network/network';
// Assuming this is the correct path
import {configureStore} from '@reduxjs/toolkit';
import reducer, {
  removefromCart,
  setData,
  setError,
} from '../../../src/redux/slice/cartRemoveSlice';
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
describe('CartRemoveThunk Slice', () => {
  const productId = 1;
  const initialState = {
    data: {message: '', status: ''},
    isLoader: false,
    isError: false,
    error: null,
  };
  let store: {
    getActions(): unknown;
    getState: () => {(): any; new (): any; removefromcart: any};
    dispatch: (arg0: any) => void;
  };

  beforeEach(() => {
    store = configureStore({
      reducer: {
        removefromcart: reducer, // Assuming you have a slice named 'addressAdd'
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

  it('should handle removefromcart.pending correctly', () => {
    const state = store.getState().removefromcart;

    expect(state.isLoader).toBe(false);

    store.dispatch(removefromCart(productId));

    const newState = store.getState().removefromcart;

    expect(newState.isLoader).toBe(true);
  });

  it('should handle removefromcart.fulfilled correctly', async () => {
    const mockResponse = {message: 'Product removed', status: 'SUCCESS'};

    jest.spyOn(ApiService, 'delete').mockResolvedValue(mockResponse);

    await store.dispatch(removefromCart(productId));

    const state = store.getState().removefromcart;

    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockResponse);
  });

  it('should handle removefromcart.rejected correctly', async () => {
    const errorMessage = 'An error occurred while adding the address';

    jest.spyOn(ApiService, 'delete').mockRejectedValueOnce(errorMessage);

    try {
      await store.dispatch(removefromCart(productId));
    } catch (error) {
      const state = store.getState().removefromcart;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(errorMessage);
    }
  });
  it('should handle setData correctly', () => {
    const newState = reducer(
      undefined,
      setData({
        message: 'Cart Remove successfully',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe('Cart Remove successfully');
    expect(newState.data.status).toBe('OK');
  });
  it('should handle setError', () => {
    const payload = {message: 'Error message', status: 'ERROR'};
    const action = setError(payload);
    const newState = reducer(initialState, action);

    expect(newState.data).toEqual(initialState.data); // Ensure data remains the same
    expect(newState.isLoader).toEqual(initialState.isLoader); // Ensure isLoader remains the same
    expect(newState.isError).toBe(initialState.isError); // Ensure isError remains the same
    expect(newState.error).toEqual(payload); // Check the error field
  });
});
