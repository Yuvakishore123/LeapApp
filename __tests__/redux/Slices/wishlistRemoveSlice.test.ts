import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  WishlistDataState,
  setData,
  setError,
  wishListRemove,
} from '../../../src/redux/slice/WishlistRemoveSlice';
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import ApiService from 'network/Network';
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
describe('Wihslist Remove slice', () => {
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
  const productId = '2';
  it('should return the initial state', () => {
    const initialState = {
      data: {message: '', status: ''},
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().wishlistData).toEqual(initialState);
  });
  it('should handle fetchCategoriesProducts.pending action', () => {
    const state = store.getState().wishlistData as WishlistDataState;
    expect(state.isLoader).toBe(false);
    store.dispatch(wishListRemove(productId));
    const newState = store.getState().wishlistData as WishlistDataState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetchCategoriesProducts.fulfilled action', async () => {
    const mockResponse = {message: 'Product removed', status: 'SUCCESS'};
    jest.spyOn(ApiService, 'delete').mockResolvedValue(mockResponse);

    await store.dispatch(wishListRemove(productId));
    const state = store.getState().wishlistData as WishlistDataState;
    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockResponse);
  });

  it('should handle fetchCategoriesProducts.rejected action', async () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'delete').mockRejectedValueOnce(mockError);

    try {
      return await store.dispatch(wishListRemove(productId));
    } catch {
      const state = store.getState().wishlistData as WishlistDataState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    }
  });
  it('should handle setError action', () => {
    const errorPayload = 'Some error message';
    store.dispatch(setError(errorPayload));

    const state = store.getState().wishlistData as WishlistDataState;
    expect(state.error).toEqual(errorPayload);
  });
  it('should handle setData correctly', () => {
    const newState = reducer(
      undefined,
      setData({
        message: 'product removed successfully from wishlist',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe(
      'product removed successfully from wishlist',
    );
    expect(newState.data.status).toBe('OK');
  });
});
