import authReducer from '../../../../src/redux/reducers/reducers';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  OTP_REQUEST,
  OTP_SUCCESS,
  OTP_FAILURE,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAILURE,
} from '../../../../src/redux/types';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual({
      authToken: null,
      loading: false,
      isAuthenticated: false,
      error: '',
      verifyingOTP: false,
    });
  });

  it('should handle LOGIN_REQUEST', () => {
    const action = {type: LOGIN_REQUEST};
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.verifyingOTP).toBe(true);
  });

  it('should handle LOGIN_SUCCESS', () => {
    const action = {
      type: LOGIN_SUCCESS,
      payload: 'mockAuthToken',
    };
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.authToken).toBe('mockAuthToken');
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBe('');
    expect(state.verifyingOTP).toBe(false);
  });

  it('should handle LOGIN_FAILURE', () => {
    const action = {
      type: LOGIN_FAILURE,
      payload: 'mockError',
    };
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('mockError');
    expect(state.verifyingOTP).toBe(false);
  });

  it('should handle SIGNUP_REQUEST', () => {
    const action = {type: SIGNUP_REQUEST};
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.verifyingOTP).toBe(true);
  });

  it('should handle SIGNUP_SUCCESS', () => {
    const action = {
      type: SIGNUP_SUCCESS,
      payload: 'mockAuthToken',
    };
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.authToken).toBe('mockAuthToken');
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBe('');
    expect(state.verifyingOTP).toBe(false);
  });

  it('should handle SIGNUP_FAILURE', () => {
    const action = {
      type: SIGNUP_FAILURE,
      payload: 'mockError',
    };
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('mockError');
    expect(state.verifyingOTP).toBe(false);
  });

  it('should handle OTP_REQUEST', () => {
    const action = {type: OTP_REQUEST};
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.verifyingOTP).toBe(true);
  });

  it('should handle OTP_SUCCESS', () => {
    const action = {
      type: OTP_SUCCESS,
      payload: 'mockAuthToken',
    };
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.authToken).toBe('mockAuthToken');
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBe('');
    expect(state.verifyingOTP).toBe(false);
  });

  it('should handle OTP_FAILURE', () => {
    const action = {
      type: OTP_FAILURE,
      payload: 'mockError',
    };
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('mockError');
    expect(state.verifyingOTP).toBe(false);
  });

  it('should handle VERIFY_OTP_REQUEST', () => {
    const action = {type: VERIFY_OTP_REQUEST};
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.verifyingOTP).toBe(true);
  });

  it('should handle VERIFY_OTP_SUCCESS', () => {
    const action = {type: VERIFY_OTP_SUCCESS};
    const prevState = {
      authToken: 'mockAuthToken',
      loading: true,
      isAuthenticated: true,
      error: 'mockError',
      verifyingOTP: true,
    };
    const state = authReducer(prevState, action);

    expect(state.verifyingOTP).toBe(false);
  });

  it('should handle VERIFY_OTP_FAILURE', () => {
    const action = {
      type: VERIFY_OTP_FAILURE,
      payload: 'mockError',
    };
    const state = authReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('mockError');
    expect(state.verifyingOTP).toBe(false);
  });

  it('should handle "LOGOUT"', () => {
    const action = {type: 'LOGOUT'};
    const prevState = {
      authToken: 'mockAuthToken',
      verifyingOTP: true,
    };
    const state = authReducer(prevState, action);

    expect(state.authToken).toBe(null);
    expect(state.verifyingOTP).toBe(false);
  });

  it('should handle default case', () => {
    const action = {type: 'UNKNOWN_ACTION'};
    const prevState = {
      authToken: 'mockAuthToken',
      loading: true,
      isAuthenticated: true,
      error: 'mockError',
      verifyingOTP: true,
    };
    const state = authReducer(prevState, action);

    expect(state).toBe(prevState); // Ensure that state remains unchanged
  });
});
