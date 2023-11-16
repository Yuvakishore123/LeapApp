import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  WishlistState,
  fetchWishlistProducts,
  setError,
} from '../../../src/redux/slice/WishlistSlice';
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
describe('whislist Slice', () => {
  let store: ToolkitStore<
    {wishlistData: unknown},
    AnyAction,
    [ThunkMiddleware<{wishlistData: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        wishlistData: reducer,
      },
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockData = [
    {
      id: '1',
      imageUrl: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
      name: 'white shirt',
      price: 1000,
    },
    {
      id: '2',
      imageUrl: [
        'https://example.com/image3.jpg',
        'https://example.com/image4.jpg',
      ],
      name: 'black shirt',
      price: 1500,
    },
    // ... (more products)
  ];
  it('should return the initial state', () => {
    const initialState = {
      data: null,
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().wishlistData).toEqual(initialState);
  });
  it('should handle fetchCategoriesProducts.pending action', () => {
    const state = store.getState().wishlistData as WishlistState;
    expect(state.isLoader).toBe(false);
    store.dispatch(fetchWishlistProducts());
    const newState = store.getState().wishlistData as WishlistState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetchCategoriesProducts.fulfilled action', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    return store.dispatch(fetchWishlistProducts()).then(() => {
      const state = store.getState().wishlistData as WishlistState;
      expect(state.isLoader).toBe(false);
      expect(state.data).toEqual(mockData);
    });
  });

  it('should handle fetchCategoriesProducts.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    return store.dispatch(fetchWishlistProducts()).catch(() => {
      const state = store.getState().wishlistData as WishlistState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });
  it('should handle setError action', () => {
    const errorPayload = 'Some error message';
    store.dispatch(setError(errorPayload));

    const state = store.getState().wishlistData as WishlistState;
    expect(state.error).toEqual(errorPayload);
  });
});
