import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  UserproductState,
  fetchUserProducts,
} from '../../../src/redux/slice/userProductSlice';
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
describe('userproductsSlice', () => {
  let store: ToolkitStore<
    {userproductdata: unknown},
    AnyAction,
    [ThunkMiddleware<{userproductdata: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        userproductdata: reducer,
      },
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const pageSize = 15;
  const mockData = [
    {
      id: '1',
      name: 'Product 1',
      imageUrl: ['https://example.com/image1.jpg'],
      price: 100,
    },
    {
      id: '2',
      name: 'Product 2',
      imageUrl: ['https://example.com/image2.jpg'],
      price: 150,
    },
    // Add more products as needed...
  ];
  it('should return the initial state', () => {
    const initialState = {
      data: null,
      firstCallLoading: false, // Loading state for the first call
      loading: false, // Loading state for subsequent calls
      isError: false,
      productsEnd: false,
    };
    expect(store.getState().userproductdata).toEqual(initialState);
  });
  it('should handle fetchCategoriesProducts.pending action', () => {
    const state = store.getState().userproductdata as UserproductState;
    expect(state.firstCallLoading).toBe(false);
    expect(state.loading).toBe(false);
    store.dispatch(fetchUserProducts({pageSize}));
    const newState = store.getState().userproductdata as UserproductState;
    expect(state.firstCallLoading).toBe(false);
    expect(newState.loading).toBe(true);
  });

  it('should handle fetchCategoriesProducts.fulfilled action', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    return store.dispatch(fetchUserProducts({pageSize})).then(() => {
      const state = store.getState().userproductdata as UserproductState;
      expect(state.firstCallLoading).toBe(false);
      expect(state.loading).toBe(false);
      expect(state.data).toEqual(mockData);
    });
  });

  it('should handle fetchCategoriesProducts.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    return store.dispatch(fetchUserProducts({pageSize})).catch(() => {
      const state = store.getState().userproductdata as UserproductState;
      expect(state.firstCallLoading).toBe(false);
      expect(state.loading).toBe(false);
      expect(state.isError).toBe(true);
    });
  });
});
