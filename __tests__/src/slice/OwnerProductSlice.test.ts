import reducer, {
  OwnerOrderProductsState,
  ownerorderproducts,
} from '../../../src/redux/slice/OwnerorderproductSlice';

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

describe('Owner Products  Slice', () => {
  const status = 'Order placed';

  let store: ToolkitStore<
    {ownerproducts: unknown},
    AnyAction,
    [ThunkMiddleware<{ownerproducts: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ownerproducts: reducer,
      },
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: null,
      isLoader: false,
      isError: false,
    });
  });

  it('should get data to the state when `ownerorderproducts data` action is dispatched', async () => {
    const state = store.getState().ownerproducts as OwnerOrderProductsState; // Assuming AddressAddState is the correct type

    expect(state.isError).toBe(false);
  });
  it('should handle the ` `ownerorderproducts .fulfilled` actions correctly', async () => {
    const mockApiResponse = [
      {
        createdDate: '2023-09-27T13:03:21.092Z',
        id: 0,
        imageUrl: 'string',
        name: 'string',
        pricePerDay: 0,
        productId: 0,
        quantity: 0,
        rentalEndDate: '2023-09-27T13:03:21.092Z',
        rentalStartDate: '2023-09-27T13:03:21.092Z',
        status: 'string',
        totalPrice: 0,
      },
    ];

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockApiResponse);

    // Dispatch the FliterAnalyticslist action with your mockItem
    await store.dispatch(ownerorderproducts(status));

    // Get the state after the action is fulfilled
    const state = store.getState().ownerproducts as OwnerOrderProductsState;

    // Assert that the loading state is updated correctly
    expect(state.isLoader).toBe(false);

    // Assert that the data state is updated with the mockApiResponse
    expect(state.data).toEqual(mockApiResponse);

    // Assert that the isError state is set to false
    expect(state.isError).toBe(false);
  });
  it('should handle the `ownerorderproducts.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(errorMessage);

    store.dispatch(ownerorderproducts(status)).catch(() => {
      const state = store.getState().ownerproducts as OwnerOrderProductsState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    store.dispatch(ownerorderproducts(status)).catch(() => {
      const state = store.getState().ownerproducts as OwnerOrderProductsState;
      expect(state.isError).toBe(true); // Error occurred

      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.isLoader).toBe(false);
    });
  });
});
