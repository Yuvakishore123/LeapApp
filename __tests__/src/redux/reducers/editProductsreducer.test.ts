import {REMOVE_PRODUCT} from '../../../../src/redux/types';
import CartReducer from '../../../../src/redux/reducers/EditProductsReducers';
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('CartReducer', () => {
  it('should remove a product from the cart', () => {
    // Arrange: Set up the initial state
    const initialState = [1, 2, 3, 4];
    const action = {
      type: REMOVE_PRODUCT,
      payload: 2, // The index of the item to remove
    };

    // Act: Call the reducer with the action
    const newState = CartReducer(initialState, action);

    // Assert: Check the new state
    expect(newState).toEqual([1, 2, 4]);
  });

  it('should return the same state for an unknown action', () => {
    // Arrange: Set up the initial state
    const initialState = [1, 2, 3, 4];
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: 2,
    };

    // Act: Call the reducer with the action
    const newState = CartReducer(initialState, action);

    // Assert: Check that the state remains unchanged
    expect(newState).toEqual(initialState);
  });
  it('should handle null state when removing a product', () => {
    // Arrange: Set up the initial state as null
    const initialState = [];
    const action = {
      type: REMOVE_PRODUCT,
      payload: 2,
    };

    // Act: Call the reducer with the action
    const newState = CartReducer(initialState, action);

    // Assert: Check that the state remains null
    expect(newState).toStrictEqual([]);
  });
});
