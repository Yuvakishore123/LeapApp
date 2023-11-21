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
    const initialState = [
      {id: 1, name: 'Product 1'},
      {id: 2, name: 'Product 2'},
      {id: 3, name: 'Product 3'},
    ];

    // Create an action to remove a product with id 2
    const action = {
      type: REMOVE_PRODUCT,
      payload: 1, // Index of the product to be removed
    };

    // Apply the action to the reducer
    const newState = CartReducer(initialState, action);

    // Define the expected state after removing the product
    const expectedState = [
      {id: 1, name: 'Product 1'},
      {id: 3, name: 'Product 3'},
    ];

    // Verify that the product has been removed from the cart
    expect(newState).toEqual(expectedState);
  });

  it('should return the current state for an unknown action', () => {
    const initialState = [
      {id: 1, name: 'Product 1'},
      {id: 2, name: 'Product 2'},
      {id: 3, name: 'Product 3'},
    ];

    // Create an action that the reducer does not handle
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: 1,
    };

    // Apply the unknown action to the reducer
    const newState = CartReducer(initialState, action);

    // The state should remain unchanged
    expect(newState).toEqual(initialState);
  });
});
