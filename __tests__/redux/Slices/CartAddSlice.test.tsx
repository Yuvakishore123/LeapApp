import ApiService from 'network/Network';
// Assuming this is the correct path
import {configureStore} from '@reduxjs/toolkit';
import reducer, {
  CartAdd,
  setCartData,
  setError,
} from '../../../src/redux/slice/CartAddSlice';
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
describe('CartAddThunk Slice', () => {
  const mockData = {
    productId: '02',
    quantity: 12,
    rentalEndDate: '2023-09-01',
    rentalStartDate: '2023-09-30',
  };
  const initialState = {
    data: {message: '', status: ''},
    isLoader: false,
    isError: false,
    error: null,
  };
  let store: {
    getActions(): unknown;
    getState: () => {(): any; new (): any; cartadd: any};
    dispatch: (arg0: any) => void;
  };
  beforeEach(() => {
    store = configureStore({
      reducer: {
        cartadd: reducer, // Assuming you have a slice named 'cartadd'
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
  it('should handle CartAdd.pending correctly', () => {
    const state = store.getState().cartadd;

    expect(state.isLoader).toBe(false);

    store.dispatch(CartAdd(mockData));

    const newState = store.getState().cartadd;

    expect(newState.isLoader).toBe(true);
  });

  it('should handle CartAdd.fulfilled correctly', async () => {
    const mockResponse = {
      productId: '1',
      quantity: 12,
      rentalEndDate: '2023-09-01',
      rentalStartDate: '2023-09-30',
    };

    jest.spyOn(ApiService, 'post').mockResolvedValue(mockResponse as any);

    await store.dispatch(CartAdd(mockData));

    const state = store.getState().cartadd;

    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockResponse);
  });

  it('should handle CartAdd.rejected correctly', async () => {
    const errorMessage = 'An error occurred while adding the Cartadding';

    jest.spyOn(ApiService, 'post').mockRejectedValueOnce(errorMessage);

    try {
      await store.dispatch(
        CartAdd({
          productId: '',
          quantity: 12,
          rentalEndDate: '2023-09-01',
          rentalStartDate: '2023-09-30',
        }),
      );
    } catch (error) {
      const state = store.getState().cartadd;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(errorMessage);
    }
  });
  it('should handle setCartData correctly', () => {
    const newState = reducer(
      undefined,
      setCartData({
        message: 'CartAdd updated successfully',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe('CartAdd updated successfully');
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
