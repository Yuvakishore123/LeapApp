import ApiService from 'network/network';
// Assuming this is the correct path
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import reducer, {
  CartDataState,
  setData,
  setError,
  updateCart,
} from '../../../src/redux/slice/CartUpdateSlice';
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
describe('cartThunk Slice', () => {
  const mockData = {
    productId: '1',
    quantity: 12,
  };
  const initialState = {
    data: {message: '', status: ''},
    isLoader: false,
    isError: false,
    error: null,
  };
  let store: ToolkitStore<
    {cartupdate: unknown},
    AnyAction,
    [ThunkMiddleware<{cartupdate: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cartupdate: reducer, // Assuming you have a slice named 'addressAdd'
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

  it('should handle cartUpdate.pending correctly', () => {
    const state = store.getState().cartupdate as CartDataState;

    expect(state.isLoader).toBe(false);

    store.dispatch(updateCart(mockData));

    const newState = store.getState().cartupdate as CartDataState;

    expect(newState.isLoader).toBe(true);
  });

  it('should handle cartupdate.fulfilled correctly', async () => {
    jest.spyOn(ApiService, 'put').mockResolvedValue(mockData);

    await store.dispatch(updateCart(mockData));

    const state = store.getState().cartupdate as CartDataState;

    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('should handle cartupdate.rejected correctly', async () => {
    const errorMessage = 'An error occurred while adding the address';

    jest.spyOn(ApiService, 'put').mockRejectedValueOnce(errorMessage);

    try {
      await store.dispatch(updateCart(mockData));
    } catch (error) {
      const state = store.getState().cartupdate as CartDataState;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(errorMessage);
    }
  });
  it('should handle setData correctly', () => {
    const newState = reducer(
      undefined,
      setData({
        message: 'Cart Update successfully',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe('Cart Update successfully');
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
