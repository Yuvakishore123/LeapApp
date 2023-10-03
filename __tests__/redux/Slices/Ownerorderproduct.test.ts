import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  OrderdataState,
  ownerorderproducts,
} from '../../../src/redux/slice/OwnerorderproductSlice';
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
describe('OwnerOrderProduct slice', () => {
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
  const mockStatus = 'Order Placed';
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
    store.dispatch(ownerorderproducts(mockStatus));
    const newState = store.getState().OrderData as OrderdataState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetch OrderData.fulfilled action', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    await store.dispatch(ownerorderproducts(mockStatus));
    const state = store.getState().OrderData as OrderdataState;
    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('should handle fetch OrderData.rejected action', async () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    try {
      return await store.dispatch(ownerorderproducts(mockStatus));
    } catch {
      const state = store.getState().OrderData as OrderdataState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    }
  });
});
