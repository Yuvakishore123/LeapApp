import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  ProfileDataState,
  getProfileData,
  setError,
  setProfiledata,
} from '../../../src/redux/slice/ProfileDataSlice';
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import ApiService from 'network/Network';
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
describe('ProfileData slice', () => {
  let store: ToolkitStore<
    {ProfileData: unknown},
    AnyAction,
    [ThunkMiddleware<{ProfileData: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        ProfileData: reducer,
      },
    });
  });
  const mockData = {
    email: 'test@gmail.com',
    firstName: 'john',
    lastName: 'wesly',
    phoneNumber: '89229302932',
    profileImageUrl: 'test_image.png',
    role: 'BORROWER',
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the initial state', () => {
    const initialState = {
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
    expect(store.getState().ProfileData).toEqual(initialState);
  });
  it('should handle ProfileData.pending action', () => {
    const state = store.getState().ProfileData as ProfileDataState;
    expect(state.isLoader).toBe(false);
    store.dispatch(getProfileData());
    const newState = store.getState().ProfileData as ProfileDataState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle ProfileData.fulfilled action', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    return store.dispatch(getProfileData()).then(() => {
      const state = store.getState().ProfileData as ProfileDataState;
      expect(state.isLoader).toBe(false);
      expect(state.data).toEqual(mockData);
    });
  });

  it('should handle ProfileData.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    return store.dispatch(getProfileData()).catch(() => {
      const state = store.getState().ProfileData as ProfileDataState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });
  it('should handle setError action', () => {
    const errorPayload = 'Some error message';
    store.dispatch(setError(errorPayload));

    const state = store.getState().ProfileData as ProfileDataState;
    expect(state.error).toEqual(errorPayload);
  });
  it('should handle setProfiledata correctly', () => {
    const newState = reducer(
      undefined,
      setProfiledata({
        email: 'test@gmail.com',
        firstName: 'john',
        lastName: 'wesly',
        phoneNumber: '89229302932',
        profileImageUrl: 'test_image.png',
        role: 'BORROWER',
      }),
    );

    expect(newState.data.email).toBe('test@gmail.com');
    expect(newState.data.firstName).toBe('john');
    expect(newState.data.lastName).toBe('wesly');
    expect(newState.data.phoneNumber).toBe('89229302932');
    expect(newState.data.profileImageUrl).toBe('test_image.png');
    expect(newState.data.role).toBe('BORROWER');
  });
});
