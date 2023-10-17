import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  LoginState,
  postLogin,
  setError,
  setLoginData,
} from '../../../src/redux/slice/loginSlice';
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import ApiService from 'network/network';
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('network/network');
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
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
  const mockdata = {
    authToken: 'test_Token',
    isAuthenticated: true,
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

  it('should handle fetchCategoriesProducts.fulfilled action', () => {
    (ApiService.post as jest.Mock).mockResolvedValue(credentials);

    return store.dispatch(postLogin(credentials)).then(() => {
      const state = store.getState().LoginData as LoginState;
      expect(state.isLoader).toBe(false);
      expect(state.data).toEqual({
        authToken: 'test_Token',
        isAuthenticated: true,
      });
    });
  });

  it('should handle fetchCategoriesProducts.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'post').mockRejectedValueOnce(mockError);

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
