import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import CartReducer, {
  fetchCartProducts,
  setError,
} from '../../../src/redux/slice/CartSlice'; // Update the path to CartSlice

import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
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
  let store: ToolkitStore<
    {
      cartproducts: {
        data: null;
        isLoader: boolean;
        isError: boolean;
        error: null;
      };
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          cartproducts: {
            data: null;
            isLoader: boolean;
            isError: boolean;
            error: // Mock ApiService
            null;
          };
        },
        AnyAction
      >,
    ]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cartproducts: CartReducer,
      },
    });
  });
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
    ],
    finalPrice: 99.97,
    shippingCost: 10.0,
    tax: 9.98,
    totalCost: 119.95,
    userId: 12345,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the initial state', () => {
    const initialState = {
      data: null,
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().cartproducts).toEqual(initialState);
  });

  it('should handle fetchCartProducts.pending action', () => {
    const state = store.getState().cartproducts;
    expect(state.isLoader).toBe(false);
    store.dispatch(fetchCartProducts());
    const newState = store.getState().cartproducts;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetchCartProducts.fulfilled action', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCartData);

    return store.dispatch(fetchCartProducts()).then(() => {
      const state = store.getState().cartproducts;
      expect(state.isLoader).toBe(false);
      expect(state.data).toEqual(mockCartData);
    });
  });

  it('should handle fetchCartProducts.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    return store.dispatch(fetchCartProducts()).catch(() => {
      const state = store.getState().cartproducts;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });

  it('should handle setError action', () => {
    const errorPayload = 'Some error message';
    store.dispatch(setError(errorPayload));

    const state = store.getState().cartproducts;
    expect(state.error).toEqual(errorPayload);
  });
});
