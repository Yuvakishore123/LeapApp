import reducer, {
  fetchWishlistProducts,
} from '../../../src/redux/slice/wishlistSlice';

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

describe('Wishlist  Slice', () => {
  let store: ToolkitStore<
    {wishlist: unknown},
    AnyAction,
    [ThunkMiddleware<{wishlist: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        wishlist: reducer,
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

  it('should getdata to the state when `fetchProducts  ` action is dispatched', async () => {
    const state = store.getState().wishlist; // Assuming AddressAddState is the correct type
    expect(state.isError).toBe(false);
  });
  it('should handle the  `fetchWishlistProducts .fulfilled` actions correctly', async () => {
    const responseData = [
      {
        availableQuantities: 10,
        brand: 'Example Brand',
        categoryIds: [1, 2],
        color: 'Blue',
        description: 'This is a sample product description.',
        disabled: false,
        disabledQuantities: 2,
        id: 12345,
        imageUrl: ['https://example.com/product_image.jpg'],
        material: 'Cotton',
        name: 'Sample Product',
        price: 29.99,
        rentedQuantities: 5,
        size: 'Medium',
        subcategoryIds: [3, 4],
        totalQuantity: 20,
      },
    ];
    jest.spyOn(ApiService, 'get').mockResolvedValue(responseData);

    // Dispatch the FliterAnalyticslist action with your mockItem
    await store.dispatch(fetchWishlistProducts());

    // Get the state after the action is fulfilled
    const state = store.getState().wishlist;

    // Assert that the loading state is updated correctly
    expect(state.isLoader).toBe(false);

    // Assert that the data state is updated with the mockApiResponse
    expect(state.data).toEqual(responseData);

    // Assert that the isError state is set to false
    expect(state.isError).toBe(false);
  });
  it('should handle the `fetchWishlistProducts.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(errorMessage);

    store.dispatch(fetchWishlistProducts()).catch(() => {
      const state = store.getState().wishlist; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while fetching Data';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(error);
    store.dispatch(fetchWishlistProducts()).catch(() => {
      const state = store.getState().wishlist;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      // Check the error message
    });
  });
  it('should get error when error occured', () => {
    return store.dispatch(fetchWishlistProducts()).catch(() => {
      const actions = store.getActions(); // Get dispatched actions
      const expectedActions = [
        // Define your expected actions here, for example, the action to handle rejection
        {type: 'wishlist/fetchWishlistProducts/pending'},
        {
          type: 'wishlist/fetchWishlistProducts/rejected',
          error: true,
          payload: undefined,
        },
      ];

      // Verify that the expected actions were dispatched
      expect(actions).toEqual(expectedActions);

      // Verify the state after the rejection
      const newState = store.getState().wishlist;
      expect(newState.isLoader).toBe(false);
      expect(newState.isError).toBe(true);
    });
  });
});
