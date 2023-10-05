import {
  ADD_ADDRESS,
  REMOVE_ADDRESS,
} from '../../../src/redux/actions/actionTypes';
import {AddressReducers} from '../../../src/redux/reducers/AddressReducers';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('AddressReducers', () => {
  it('should handle ADD_ADDRESS', () => {
    const initialState: never[] | undefined = [];
    const action = {
      type: ADD_ADDRESS,
      payload: 12345,
    };
    const newState = AddressReducers(initialState, action);
    expect(newState).toEqual([12345]);
  });

  it('should handle REMOVE_ADDRESS', () => {
    const initialState = [12345, 67890, 54321];
    const action = {
      type: REMOVE_ADDRESS,
      payload: 1,
    };
    const newState = AddressReducers(initialState, action);
    expect(newState).toEqual([12345, 54321]);
  });

  it('should return the initial state for unknown action types', () => {
    const initialState = [12345, 67890, 54321];
    const action = {
      type: 'UNKNOWN_ACTION',
      payload: 123,
    };
    const newState = AddressReducers(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it('should return the initial state when no action is provided', () => {
    const initialState: any[] | undefined = [];
    const action = {
      type: undefined,
      payload: undefined,
    };
    const newState = AddressReducers(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
