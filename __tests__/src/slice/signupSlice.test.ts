import {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import ApiService from 'network/network';
import {signupUrl} from 'constants/apiRoutes';
import reducer, {
  SigninDataState,
  postSignup,
  setError,
  setSignupData,
} from '../../../src/redux/slice/signupSlice';

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
jest.mock('network/network');

describe('Signup Slice', () => {
  const mockCredentials = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
    password: 'secretpassword',
    role: 'user',
  };

  let store: ToolkitStore<
    {postSignup: unknown},
    AnyAction,
    [ThunkMiddleware<{postSignup: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        postSignup: reducer,
      },
    });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: {
        message: '',
        status: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    });
  });

  it('should post the data using whne postSignup is fulfilled action is dispatched', async () => {
    const testData = {
      message: 'signup success',
      status: 'success',
    };
    (ApiService.post as jest.Mock).mockResolvedValue(testData);
    store.dispatch(setSignupData(mockCredentials));

    await store.dispatch(postSignup(mockCredentials));

    const state = store.getState().postSignup as SigninDataState; // Assuming AddressAddState is the correct type
    expect(state.data).toEqual(testData);
    expect(state.isError).toBe(false);
    expect(state.error).toBe(null);

    expect(ApiService.post).toHaveBeenCalledWith(signupUrl, mockCredentials);
  });
  it('should handle the postSignup.rejected action correctly', async () => {
    const errorMessage = 404;
    // Replace with your desired product ID
    (ApiService.post as jest.Mock).mockRejectedValue(errorMessage);
    store.dispatch(setError(errorMessage));

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(postSignup(mockCredentials)).catch(() => {
      const state = store.getState().postSignup as SigninDataState; // Assuming AddressAddState is the correct type
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage);
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const errorMessage = 404;
    store.dispatch(setError(errorMessage));

    store.dispatch(postSignup(mockCredentials)).catch(() => {
      const state = store.getState().postSignup as SigninDataState;
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage); // Check the error message
      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.isLoader).toBe(false);
    });
  });
});
