import WishlistReducer from '../../../../src/redux/reducers/wishlistReducer';
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from '../../../../src/redux/types';
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

// Mock AsyncStorage module
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  getAllKeys: jest.fn(),
}));

describe('WishlistReducer', () => {
  it('should have initial state of an empty array', () => {
    const initialState = undefined;
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: null,
    };

    const newState = WishlistReducer(initialState, action);

    expect(newState).toEqual([]);
  });

  it('should add an item to the wishlist', () => {
    const initialState: never[] = [];
    const action = {
      type: ADD_TO_WISHLIST,
      payload: 'item1',
    };

    const newState = WishlistReducer(initialState, action);

    expect(newState).toEqual(['item1']);
  });

  it('should remove an item from the wishlist', () => {
    const initialState = ['item1', 'item2', 'item3'];
    const action = {
      type: REMOVE_FROM_WISHLIST,
      payload: 1, // index of item2
    };

    const newState = WishlistReducer(initialState, action);

    expect(newState).toEqual(['item1', 'item3']);
  });

  it('should return the same state for unknown action types', () => {
    const initialState = ['item1', 'item2', 'item3'];
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: null,
    };

    const newState = WishlistReducer(initialState, action);

    expect(newState).toEqual(initialState);
  });
});
