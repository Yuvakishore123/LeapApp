import Rolereducer from '../../../src/redux/reducers/Rolereducer';
import {SET_ROLE} from '../../../src/redux/actions/actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('Rolereducer', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });

  it('should return the initial state', () => {
    const initialState = {
      role: 'borrower',
    };
    const action = {type: 'UNKNOWN_ACTION', role: 'borrower'};

    // Act
    const newState = Rolereducer(undefined, action);

    // Assert
    expect(newState).toEqual(initialState);
  });

  it('should handle SET_ROLE action', () => {
    const initialState = {
      role: 'borrower',
    };
    const action = {type: SET_ROLE, role: 'borrower'};

    const newState = Rolereducer(initialState, action);

    expect(newState).toEqual({role: 'borrower'});
  });
  it('should not modify state for unknown action', () => {
    const initialState = {
      role: 'borrower',
    };
    const action = {type: 'UNKNOWN_ACTION', role: 'borrower'};

    // Act
    const newState = Rolereducer(initialState, action);

    // Assert
    expect(newState).toEqual(initialState);
  });
});
