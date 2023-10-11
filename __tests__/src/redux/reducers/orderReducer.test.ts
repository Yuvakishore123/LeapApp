import {ADD_ORDER} from '../../../../src/redux/actions/actions';
import {Orderreducer} from '../../../../src/redux/reducers/Orderreducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
describe('Orderreducer', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  it('should return the correct action object', () => {
    const razorpay = '123456';
    const expectedAction = {
      type: ADD_ORDER,
      payload: razorpay,
    };

    const action = Orderreducer(razorpay);

    expect(action).toEqual(expectedAction);
  });

  it('should return the correct action type', () => {
    const razorpay = '123456';

    const action = Orderreducer(razorpay);

    expect(action.type).toBe(ADD_ORDER);
  });

  it('should return the correct payload', () => {
    const razorpay = '123456';

    const action = Orderreducer(razorpay);

    expect(action.payload).toBe(razorpay);
  });
});
