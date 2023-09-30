import reducer, {
  setError,
  ProfileDataState,
  setData,
  updateProfile,
} from '../../../src/redux/slice/editProfileSlice';

import {ThunkMiddleware} from 'redux-thunk';
import {AnyAction, configureStore} from '@reduxjs/toolkit';
import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
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

describe('Edit Profile Slice', () => {
  const mockData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '123-456-7890',
  };

  let store: ToolkitStore<
    {editProfile: unknown},
    AnyAction,
    [ThunkMiddleware<{editProfile: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        editProfile: reducer,
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
  test('should handle a edit Address being added to an empty list', () => {
    const previousState: ProfileDataState = {
      data: {
        message: '',
        status: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    };

    const successPayload = {
      message: 'Success',
      status: 'OK',
    };

    expect(reducer(previousState, setData(successPayload))).toEqual({
      data: successPayload,
      isLoader: false,
      isError: false,
      error: null,
    });
  });

  it('should handle the ` `editAddressData .fulfilled` actions correctly', async () => {
    jest.spyOn(ApiService, 'put').mockResolvedValue(mockData);
    await store.dispatch(updateProfile(mockData));

    const state = store.getState().editProfile as ProfileDataState; // Assuming AddressAddState is the correct type
    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.data).toEqual(mockData);
    expect(state.isError).toBe(false);
  });
  it('should handle the `editAddressData.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'put').mockRejectedValue(new Error(errorMessage));

    // Dispatch the updateProfile action with mock data
    await store.dispatch(updateProfile(mockData)); // Replace with your actual mock data

    // Get the state after the action is rejected
    store.dispatch(updateProfile(mockData)).catch(() => {
      const state = store.getState().editProfile as ProfileDataState;
      expect(state.isLoader).toBe(false);

      // Assert that the isError state is set to true
      expect(state.isError).toBe(true);

      // Assert that the error message matches the expected error message
      expect(state.error).toEqual(errorMessage);
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    jest.spyOn(ApiService, 'put').mockRejectedValueOnce(error);
    store.dispatch(setError(error));

    store.dispatch(updateProfile(mockData)).catch(() => {
      const state = store.getState().editProfile as ProfileDataState;
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(error); // Check the error message
      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
    });
  });
});
