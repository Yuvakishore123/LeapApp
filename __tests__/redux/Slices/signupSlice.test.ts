import ApiService from 'network/network';
// Assuming this is the correct path
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import reducer, {
  SigninDataState,
  postSignup,
  setError,
  setSignupData,
} from '../../../src/redux/slice/signupSlice';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
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
describe('signup slice', () => {
  let store: ToolkitStore<
    {SignUp: unknown},
    AnyAction,
    [ThunkMiddleware<{SignUp: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        SignUp: reducer, // Assuming you have a slice named 'addressAdd'
      },
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const credentials = {
    firstName: 'john',
    lastName: 'wesly',
    email: 'test@gmail.com',
    phoneNumber: '89229302932',
    password: 'John@123',
    role: 'BORROWER',
  };
  it('should return the initial state', () => {
    const initialState = {
      data: {message: '', status: ''},
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().SignUp).toEqual(initialState);
  });
  it('should handle fetchCategoriesProducts.pending action', () => {
    const state = store.getState().SignUp as SigninDataState;
    expect(state.isLoader).toBe(false);
    store.dispatch(postSignup(credentials));
    const newState = store.getState().SignUp as SigninDataState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetchCategoriesProducts.fulfilled action', () => {
    jest.spyOn(ApiService, 'post').mockResolvedValue(credentials);

    return store.dispatch(postSignup(credentials)).then(() => {
      const state = store.getState().SignUp as SigninDataState;
      expect(state.isLoader).toBe(false);
      expect(state.data).toEqual(credentials);
    });
  });

  it('should handle fetchCategoriesProducts.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'post').mockRejectedValueOnce(mockError);

    return store.dispatch(postSignup(credentials)).catch(() => {
      const state = store.getState().SignUp as SigninDataState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });
  it('should handle setError action', () => {
    const errorPayload = 'Some error message';
    store.dispatch(setError(errorPayload));

    const state = store.getState().SignUp as SigninDataState;
    expect(state.error).toEqual(errorPayload);
  });
  it('should handle setData correctly', () => {
    const newState = reducer(
      undefined,
      setSignupData({
        message: 'SignUp successfully',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe('SignUp successfully');
    expect(newState.data.status).toBe('OK');
  });
});
