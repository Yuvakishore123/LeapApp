import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../../../../src/redux/types';
import authReducer from '../../../../src/redux/reducers/reducers';
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
describe('authReducer', () => {
  it('should handle LOGIN_REQUEST', () => {
    const initialState = {loading: false, verifyingOTP: false};
    const action = {type: LOGIN_REQUEST};
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({loading: true, verifyingOTP: true});
  });

  it('should handle LOGIN_SUCCESS', () => {
    const initialState = {loading: true, verifyingOTP: false};
    const action = {type: LOGIN_SUCCESS, payload: 'mockToken'};
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({
      loading: false,
      authToken: 'mockToken',
      isAuthenticated: true,
      error: '',
      verifyingOTP: false,
    });
  });

  it('should handle LOGIN_FAILURE', () => {
    const initialState = {loading: true, verifyingOTP: false};
    const action = {type: LOGIN_FAILURE, payload: 'Error message'};
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({
      loading: false,
      isAuthenticated: false,
      error: 'Error message',
      verifyingOTP: false,
    });
  });

  // Add similar test cases for SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, OTP_REQUEST, OTP_SUCCESS, OTP_FAILURE, VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_FAILURE

  it('should handle LOGOUT', () => {
    const initialState = {authToken: 'mockToken', verifyingOTP: false};
    const action = {type: 'LOGOUT'};
    const newState = authReducer(initialState, action);
    expect(newState).toEqual({authToken: null, verifyingOTP: false});
  });

  it('should handle an unknown action', () => {
    const initialState = {loading: false, verifyingOTP: false};
    const action = {type: 'UNKNOWN_ACTION'};
    const newState = authReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
