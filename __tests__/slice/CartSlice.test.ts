import reducer, {
  fetchCartProducts,
  setError,
  CartState,
} from '../../src/redux/slice/cartSlice';

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

describe('CartSlice', () => {
  const mockCartData = {
    cartItems: [
      {
        id: 1,
        imageUrl: 'https://example.com/product1.jpg',
        product: {
          availableQuantities: 10,
          brand: 'Brand A',
          color: 'Red',
          createdAt: '2023-09-27T09:51:08.657Z',
          createdBy: 1,
          deleted: false,
          description: 'Product 1 Description',
          disabled: false,
          disabledQuantities: 0,
          id: 101,
          material: 'Material X',
          name: 'Product 1',
          price: 29.99,
          quantity: 2,
          rentedQuantities: 0,
          size: 'Medium',
          updatedAt: '2023-09-27T09:51:08.657Z',
          updatedBy: 1,
        },
        quantity: 2,
        rentalEndDate: '2023-12-31T23:59:59.999Z',
        rentalStartDate: '2023-09-01T00:00:00.000Z',
      },
      {
        id: 2,
        imageUrl: 'https://example.com/product2.jpg',
        product: {
          availableQuantities: 5,
          brand: 'Brand B',
          color: 'Blue',
          createdAt: '2023-09-27T09:51:08.657Z',
          createdBy: 2,
          deleted: false,
          description: 'Product 2 Description',
          disabled: false,
          disabledQuantities: 0,
          id: 102,
          material: 'Material Y',
          name: 'Product 2',
          price: 39.99,
          quantity: 1,
          rentedQuantities: 0,
          size: 'Large',
          updatedAt: '2023-09-27T09:51:08.657Z',
          updatedBy: 2,
        },
        quantity: 1,
        rentalEndDate: '2023-11-30T23:59:59.999Z',
        rentalStartDate: '2023-10-01T00:00:00.000Z',
      },
    ],
    finalPrice: 99.97,
    shippingCost: 10.0,
    tax: 9.98,
    totalCost: 119.95,
    userId: 12345,
  };

  let store: ToolkitStore<
    {cartSlice: unknown},
    AnyAction,
    [ThunkMiddleware<{cartSlice: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cartSlice: reducer,
      },
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: null,
      isLoader: false,
      isError: false,
      error: null,
    });
  });

  it('should add address data to the state when `setCart data` action is dispatched', async () => {
    const state = store.getState().cartSlice as CartState; // Assuming AddressAddState is the correct type

    expect(state.isError).toBe(false);
    expect(state.error).toBe(null);
  });
  it('should handle the ` `cartAdd.fulfilled` actions correctly', async () => {
    await store.dispatch(fetchCartProducts());

    const state = store.getState().cartSlice as CartState; // Assuming AddressAddState is the correct type
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCartData);

    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(false);
  });
  it('should handle the `cartAdd.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';

    // Mock the ApiService.get function to throw an error, simulating a rejected API call

    store.dispatch(fetchCartProducts()).catch(() => {
      const state = store.getState().cartSlice as CartState; // Assuming AddressAddState is the correct type
      jest.spyOn(ApiService, 'get').mockRejectedValue(new Error(errorMessage));

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    store.dispatch(setError(error));

    store.dispatch(fetchCartProducts()).catch(() => {
      const state = store.getState().cartSlice as CartState;
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
