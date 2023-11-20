import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  LoginState,
  postLogin,
  setError,
  setLoginData,
} from '../../../src/redux/slice/LoginSlice';
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import axios from 'axios';
import asyncStorageWrapper from 'constants/AsyncStorageWrapper';
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('network/Network');
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/constants/AsyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('axios');
describe('LoginSlice', () => {
  let store: ToolkitStore<
    {LoginData: unknown},
    AnyAction,
    [ThunkMiddleware<{LoginData: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        LoginData: reducer,
      },
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const credentials = {
    email: 'ujohnwesly@gmail.com',
    password: 'John@123',
    deviceToken: 'TestToken',
  };
  it('should return the initial state', () => {
    const initialState = {
      data: {authToken: null, isAuthenticated: false},
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().LoginData).toEqual(initialState);
  });
  it('should handle fetchCategoriesProducts.pending action', () => {
    const state = store.getState().LoginData as LoginState;
    expect(state.isLoader).toBe(false);
    store.dispatch(postLogin(credentials));
    const newState = store.getState().LoginData as LoginState;
    expect(newState.isLoader).toBe(true);
  });

  it('should set auth token in AsyncStorage after a successful login', async () => {
    const testData = {
      authToken: 'Adawdadawdaw2sxad',
      isAuthenticated: true,
    };
    const mockResponse = {
      data: {}, // Your mock response data here
      headers: {
        access_token: 'mock-access-token',
        refresh_token: 'mock-refresh-token',
      },
    };
    // Mock the Axios response before dispatching the action
    const axiosPostSpy = jest.spyOn(axios, 'post');
    axiosPostSpy.mockResolvedValue(mockResponse);

    // Mock AsyncStorageWrapper.setItem to check if it's called correctly
    const AsyncStorageWrapperSpy = jest.spyOn(asyncStorageWrapper, 'setItem');

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

  it('should handle fetchCategoriesProducts.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(axios, 'post').mockRejectedValueOnce(mockError);

    return store.dispatch(postLogin(credentials)).catch(() => {
      const state = store.getState().LoginData as LoginState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });
  it('should handle setError action', () => {
    const errorPayload = 'Some error message';
    store.dispatch(setError(errorPayload));

    const state = store.getState().LoginData as LoginState;
    expect(state.error).toEqual(errorPayload);
  });
  it('should handle setData correctly', () => {
    const newState = reducer(
      undefined,
      setLoginData({
        authToken: 'test_Token',
        isAuthenticated: true,
      }),
    );

    expect(newState.data.authToken).toBe('test_Token');
    expect(newState.data.isAuthenticated).toBe(true);
  });
});
