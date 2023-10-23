import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
} from '../../../src/redux/actions/actionTypes';
import CartReducer from '../../../src/redux/reducers/cartReducer';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('CartReducer', () => {
  test('should add item to the cart', () => {
    const initialState = [] as any;
    const action = {
      type: ADD_TO_CART,
      payload: {id: 1, name: 'Item 1'},
    };

    const newState = CartReducer(initialState, action);
    expect(newState).toEqual([{id: 1, name: 'Item 1'}]);
  });

  test('should remove item from the cart', () => {
    const initialState = [
      {id: 1, name: 'Item 1'},
      {id: 2, name: 'Item 2'},
    ];
    const action = {
      type: REMOVE_FROM_CART,
      payload: 1,
    };

    const newState = CartReducer(initialState as any, action);
    expect(newState).toEqual([{id: 1, name: 'Item 1'}]);
  });

  test('should return the current state for unknown action', () => {
    const initialState = [{id: 1, name: 'Item 1'}];
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: null,
    };

    const newState = CartReducer(initialState as any, action);
    expect(newState).toEqual(initialState);
  });
});
