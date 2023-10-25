import reducer, {
  postLogin,
  setError,
  setLoginData,
} from '../../../src/redux/slice/loginSlice';

import {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import axios from 'axios';
import AsyncStorageWrapper from '../../../src/utils/asyncStorage';
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

describe('loginSlice Slice', () => {
  let store: ToolkitStore<
    {login: unknown},
    AnyAction,
    [ThunkMiddleware<{login: unknown}, AnyAction>]
  >;
  const mockResponse = {
    data: {}, // Your mock response data here
    headers: {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
    },
  };
  beforeEach(() => {
    store = configureStore({
      reducer: {
        login: reducer,
      },
    });
  });
  const credentials = {
    email: 'test@example.com',
    password: 'password123',
    deviceToken: 'device-token',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: {
        authToken: null,
        isAuthenticated: false,
      },
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  test('should change when login is done', () => {
    const previousState = {
      data: {
        authToken: null,
        isAuthenticated: false,
      },
      isLoader: false,
      isError: false,
      error: null,
    };

    const successPayload = {
      message: 'Success',
      status: 'OK',
    };

    expect(reducer(previousState, setLoginData(successPayload))).toEqual({
      data: successPayload,
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  test('should handle a Login', () => {
    const previousState = {
      data: {
        authToken: null,
        isAuthenticated: false,
      },
      isLoader: true,
      isError: false,
      error: null,
    };

    const successPayload = {
      authToken: 'Adawdadawdaw2sxad',
      isAuthenticated: true,
    };

    const expectedState = {
      data: successPayload, // New data overwrites existing data
      isLoader: true,
      isError: false,
      error: null,
    };

    expect(reducer(previousState, setLoginData(successPayload))).toEqual(
      expectedState,
    );
  });

  it('should handle the `postLogin.rejected` action correctly', async () => {
    const mockedResponse = {
      message: 'An error occurred during the API call',
      status: 401,
    };
    const axiosPostSpy = jest.spyOn(axios, 'post');
    axiosPostSpy.mockRejectedValue(mockedResponse);
    store.dispatch(setError(mockedResponse.status));

    // Simulate a rejected API call by providing a rejected promise
    await store.dispatch(postLogin(credentials)).catch(() => {
      const state = store.getState();

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(mockedResponse);
    });
  });
  it('should set an error in the state when `setError` action is dispatched', async () => {
    const errorMessage = 'Sample error message'; // Replace with the actual error message
    const errorStatus = 404; // Replace with the desired HTTP error status
    const mockCredentials = {}; // Replace with your mock credentials if needed

    // Mock the postSignup function to reject with the error object
    const errorResponse = {
      response: {
        status: errorStatus,
      },
    };
    (axios.post as jest.Mock).mockRejectedValue(errorResponse);
    store.dispatch(setError(errorResponse));

    await store.dispatch(postLogin(mockCredentials)).catch(() => {
      const state = store.getState();
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage); // Check the error message
      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.isLoader).toBe(false);
    });
  });
  it('should set auth token in AsyncStorage after a successful login', async () => {
    const testData = {
      authToken: 'Adawdadawdaw2sxad',
      isAuthenticated: true,
    };
    // Mock the Axios response before dispatching the action
    const axiosPostSpy = jest.spyOn(axios, 'post');
    axiosPostSpy.mockResolvedValue(mockResponse);

    // Mock AsyncStorageWrapper.setItem to check if it's called correctly
    const AsyncStorageWrapperSpy = jest.spyOn(AsyncStorageWrapper, 'setItem');

    await store.dispatch(postLogin(credentials));
    store.dispatch(setLoginData(testData));

    // Assert that AsyncStorageWrapper.setItem is called with the correct arguments
    expect(AsyncStorageWrapperSpy).toHaveBeenCalledWith(
      'token',
      mockResponse.headers.access_token,
    );
    expect(AsyncStorageWrapperSpy).toHaveBeenCalledWith(
      'refresh_token',
      mockResponse.headers.refresh_token,
    );

    // Restore the original axios.post and AsyncStorageWrapper.setItem methods
    axiosPostSpy.mockRestore();
    AsyncStorageWrapperSpy.mockRestore();
  });
});
