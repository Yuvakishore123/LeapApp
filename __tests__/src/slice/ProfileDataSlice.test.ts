import reducer, {
  setProfiledata,
  getProfileData,
  ProfileDataState,
  ProfileData,
  setError,
} from '../../../src/redux/slice/profileDataSlice';

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

describe('profile Data Slice', () => {
  let store: ToolkitStore<
    {profileData: unknown},
    AnyAction,
    [ThunkMiddleware<{profileData: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        profileData: reducer,
      },
    });
  });
  const mockProfileData: ProfileData = {
    email: 'example@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '123-456-7890',
    profileImageUrl: 'https://example.com/profile.jpg',
    role: 'User',
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({
      data: {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        profileImageUrl: '',
        role: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  test('should handle a Profile being added to an empty list', () => {
    const previousState: ProfileDataState = {
      data: {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        profileImageUrl: '',
        role: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    };

    expect(reducer(previousState, setProfiledata(mockProfileData))).toEqual({
      data: mockProfileData,
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  test('should handle a profile date is fetched being added to an existing list', () => {
    const previousState: ProfileDataState = {
      data: {
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        profileImageUrl: '',
        role: '',
      },
      isLoader: true,
      isError: false,
      error: null,
    };

    const expectedState: ProfileDataState = {
      data: mockProfileData, // New data overwrites existing data
      isLoader: true,
      isError: false,
      error: null,
    };

    expect(reducer(previousState, setProfiledata(mockProfileData))).toEqual(
      expectedState,
    );
  });

  it('should add fetch the getProfileData details  to the state when `setCart data` action is dispatched', async () => {
    store.dispatch(setProfiledata(mockProfileData));

    const state = store.getState().profileData as ProfileDataState;
    expect(state.data).toEqual(mockProfileData);
    expect(state.isError).toBe(false);
  });
  it('should handle the `getProfileData.fulfilled` actions correctly', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockProfileData);
    store.dispatch(setProfiledata(mockProfileData));
    const state = store.getState().profileData as ProfileDataState; // Assuming AddressAddState is the correct type
    await store.dispatch(getProfileData());

    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(false);
  });

  it('should handle the `getProfileData.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValue(errorMessage);
    // Replace with your desired product ID

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(getProfileData()).catch(() => {
      const state = store.getState().profileData as ProfileDataState;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });

  it('should handle the `getProfileData.fulfilled` actions correctly when dispatched', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockProfileData);
    store.dispatch(setProfiledata(mockProfileData));
    const state = store.getState().profileData as ProfileDataState;
    await store.dispatch(getProfileData());

    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.isError).toBe(false);
  });

  it('should handle the `fetchSubcategoryList.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    jest.spyOn(ApiService, 'get').mockRejectedValue(errorMessage);
    // Replace with your desired product ID

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(getProfileData()).catch(() => {
      const state = store.getState().profileData as ProfileDataState;

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
    });
  });
  it('should set an error state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    store.dispatch(setError(error));

    store.dispatch(getProfileData()).catch(() => {
      const state = store.getState().profileData as ProfileDataState;
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(error); // Check the error message
      expect(state.data).toEqual({
        message: '', // You may want to verify the message field too
        status: '',
      });
      expect(state.isLoader).toBe(false);
    });
  });
});
