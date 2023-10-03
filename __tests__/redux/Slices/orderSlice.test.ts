import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  OrderdataState,
  fetchInvoiceDetails,
  fetchOrderProducts,
} from '../../../src/redux/slice/orderSlice';
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
describe('order Slice', () => {
  let store: ToolkitStore<
    {OrderData: unknown},
    AnyAction,
    [ThunkMiddleware<{OrderData: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        OrderData: reducer,
      },
    });
  });
  const mockId = '2';
  const mockData = [
    {
      createdDate: '2023-09-27T12:28:28.976Z',
      id: 2,
      orderItems: [
        {
          createdDate: '2023-09-27T12:28:28.976Z',
          id: 0,
          imageUrl: 'tests_image.png',
          name: 'gucci black shirt',
          pricePerDay: 20,
          productId: 1,
          quantity: 2,
          rentalEndDate: '2023-09-27T12:28:28.976Z',
          rentalStartDate: '2023-09-27T12:28:28.976Z',
          status: 'order placed',
          totalPrice: 0,
        },
      ],
      totalPrice: 0,
    },
  ];
  const mockInVoiceData = {
    createDate: '2023-09-27T12:37:27.596Z',
    id: 1,
    orderCreatedAt: '2023-09-27T12:37:27.596Z',
    orderCreatedBy: 0,
    orderItems: [
      {
        createdDate: '2023-09-27T12:37:27.596Z',
        id: 0,
        imageUrl: 'test_image.png',
        name: 'Gucci black shirt',
        ownerId: 0,
        price: 0,
        product: {
          availableQuantities: 0,
          brand: 'Gucci',
          color: 'black',
          createdAt: '2023-09-27T12:37:27.596Z',
          createdBy: 0,
          deleted: true,
          description: 'mens gucci black shirt',
          disabled: true,
          disabledQuantities: 0,
          id: 0,
          material: 'silk',
          name: 'gucci black shirt',
          price: 0,
          quantity: 0,
          rentedQuantities: 0,
          size: 'XXL',
          updatedAt: '2023-09-27T12:37:27.596Z',
          updatedBy: 0,
        },
        quantity: 0,
        rentalEndDate: '2023-09-27T12:37:27.596Z',
        rentalStartDate: '2023-09-27T12:37:27.596Z',
        securityDeposit: 0,
        status: 'Order Placed',
      },
    ],
    orderUpdatedAt: '2023-09-27T12:37:27.596Z',
    orderUpdatedBy: 0,
    sessionId: '20',
    totalPrice: 12092,
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the initial state', () => {
    const initialState = {
      data: {message: '', status: ''},
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().OrderData).toEqual(initialState);
  });
  it('should handle fetch OrderData.pending action', () => {
    const state = store.getState().OrderData as OrderdataState;
    expect(state.isLoader).toBe(false);
    store.dispatch(fetchOrderProducts());
    const newState = store.getState().OrderData as OrderdataState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetch OrderData.fulfilled action', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    await store.dispatch(fetchOrderProducts());
    const state = store.getState().OrderData as OrderdataState;
    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('should handle fetch OrderData.rejected action', async () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    try {
      return await store.dispatch(fetchOrderProducts());
    } catch {
      const state = store.getState().OrderData as OrderdataState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    }
  });
  it('should handle fetch OrderInvoiceData.pending action', () => {
    const state = store.getState().OrderData as OrderdataState;
    expect(state.isLoader).toBe(false);
    store.dispatch(fetchInvoiceDetails(mockId));
    const newState = store.getState().OrderData as OrderdataState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetch OrderInvoiceData.fulfilled action', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockInVoiceData);

    await store.dispatch(fetchInvoiceDetails(mockId));
    const state = store.getState().OrderData as OrderdataState;
    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockInVoiceData);
  });

  it('should handle fetch OrderInvoiceData.rejected action', async () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    try {
      return await store.dispatch(fetchInvoiceDetails(mockId));
    } catch {
      const state = store.getState().OrderData as OrderdataState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    }
  });
});
