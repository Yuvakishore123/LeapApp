import reducer, {
  OrderProductsState,
  fetchInvoiceDetails,
  fetchOrderProducts,
} from '../../../src/redux/slice/orderSlice';

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

describe('Filter Analytics  Slice', () => {
  let store: ToolkitStore<
    {orderproducts: unknown},
    AnyAction,
    [ThunkMiddleware<{orderproducts: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        orderproducts: reducer,
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
    });
  });

  it('should add address data to the state when `Filtered analytics  data` action is dispatched', async () => {
    const state = store.getState().orderproducts as OrderProductsState; // Assuming AddressAddState is the correct type

    expect(state.isError).toBe(false);
  });
  it('should handle the ` `fetchOrderProducts .fulfilled` actions correctly', async () => {
    const mockOrderData = [
      {
        createdDate: '2023-09-27T12:28:28.976Z',
        id: 0,
        orderItems: [
          {
            createdDate: '2023-09-27T12:28:28.976Z',
            id: 0,
            imageUrl: 'string',
            name: 'string',
            pricePerDay: 0,
            productId: 0,
            quantity: 0,
            rentalEndDate: '2023-09-27T12:28:28.976Z',
            rentalStartDate: '2023-09-27T12:28:28.976Z',
            status: 'string',
            totalPrice: 0,
          },
        ],
        totalPrice: 0,
      },
    ];

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderData);

    // Dispatch the FliterAnalyticslist action with your mockItem
    await store.dispatch(fetchOrderProducts());

    // Get the state after the action is fulfilled
    const state = store.getState().orderproducts as OrderProductsState;

    // Assert that the loading state is updated correctly
    expect(state.isLoader).toBe(false);

    // Assert that the data state is updated with the mockApiResponse
    expect(state.data).toEqual(mockOrderData);

    // Assert that the isError state is set to false
    expect(state.isError).toBe(false);
  });
  it('should handle the `fetchOrderProducts.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(errorMessage);

    // Dispatch the `fetchInvoiceDetails` action with a rejected promise
    await store.dispatch(fetchOrderProducts()).catch(() => {
      // Get the state after the action is dispatched
      const state = store.getState().orderproducts as OrderProductsState;

      // Assert that the state is as expected
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
});
describe('Invoice Details Slice', () => {
  let store: any; // Define the store variable

  beforeEach(() => {
    // Create a store with the reducer
    store = configureStore({
      reducer: {
        orderproducts: reducer,
      },
    });
  });

  it('should handle the ``fetchInvoiceDetails .fulfilled` actions correctly', async () => {
    const orderId = 'order123';
    const mockOrderData = {
      createDate: '2023-09-27T12:37:27.596Z',
      id: 0,
      orderCreatedAt: '2023-09-27T12:37:27.596Z',
      orderCreatedBy: 0,
      orderItems: [
        {
          createdDate: '2023-09-27T12:37:27.596Z',
          id: 0,
          imageUrl: 'string',
          name: 'string',
          ownerId: 0,
          price: 0,
          product: {
            availableQuantities: 0,
            brand: 'string',
            color: 'string',
            createdAt: '2023-09-27T12:37:27.596Z',
            createdBy: 0,
            deleted: true,
            description: 'string',
            disabled: true,
            disabledQuantities: 0,
            id: 0,
            material: 'string',
            name: 'string',
            price: 0,
            quantity: 0,
            rentedQuantities: 0,
            size: 'string',
            updatedAt: '2023-09-27T12:37:27.596Z',
            updatedBy: 0,
          },
          quantity: 0,
          rentalEndDate: '2023-09-27T12:37:27.596Z',
          rentalStartDate: '2023-09-27T12:37:27.596Z',
          securityDeposit: 0,
          status: 'string',
        },
      ],
      orderUpdatedAt: '2023-09-27T12:37:27.596Z',
      orderUpdatedBy: 0,
      sessionId: 'string',
      totalPrice: 0,
    };

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderData);

    // Dispatch the FliterAnalyticslist action with your mockItem
    await store.dispatch(fetchInvoiceDetails(orderId));

    // Get the state after the action is fulfilled
    const state = store.getState().orderproducts as OrderProductsState;

    // Assert that the loading state is updated correctly
    expect(state.isLoader).toBe(false);

    // Assert that the data state is updated with the mockApiResponse
    expect(state.data).toEqual(mockOrderData);

    // Assert that the isError state is set to false
    expect(state.isError).toBe(false);
  });
  it('should handle the `fetchInvoiceDetails.rejected` action correctly', async () => {
    const orderId = 'order123';
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(errorMessage);

    // Dispatch the `fetchInvoiceDetails` action with a rejected promise
    await store.dispatch(fetchInvoiceDetails(orderId)).catch(() => {
      // Get the state after the action is dispatched
      const state = store.getState().orderproducts as OrderProductsState;

      // Assert that the state is as expected
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
});
