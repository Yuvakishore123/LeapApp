import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import ApiService from 'network/network';
import reducer, {
  ProductDataState,
  fetchProducts,
} from '../../../src/redux/slice/ProductSlice';
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
describe('Product Slice', () => {
  let store: ToolkitStore<
    {ProductsData: unknown},
    AnyAction,
    [ThunkMiddleware<{ProductsData: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        ProductsData: reducer,
      },
    });
  });
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
    expect(store.getState().ProductsData).toEqual(initialState);
  });
  it('should handle fetchProducts.pending action', () => {
    const state = store.getState().ProductsData as ProductDataState;
    expect(state.isLoader).toBe(false);
    store.dispatch(fetchProducts());
    const newState = store.getState().ProductsData as ProductDataState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetchProducts.fulfilled action', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    await store.dispatch(fetchProducts());
    const state = store.getState().ProductsData as ProductDataState;
    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('should handle fetchProducts.rejected action', async () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    try {
      return await store.dispatch(fetchProducts());
    } catch {
      const state = store.getState().ProductsData as ProductDataState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    }
  });
});
