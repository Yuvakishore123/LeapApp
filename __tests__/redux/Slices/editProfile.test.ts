import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  ProfileDataState,
  setData,
  setError,
  updateProfile,
} from '../../../src/redux/slice/editProfileSlice';
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
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
describe('editProfile thunk slice', () => {
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
    firstName: 'johnwesly',
    lastName: 'uchula',
    email: 'test@gmail.com',
    phoneNumber: '79203832033',
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the initial state', () => {
    const initialState = {
      data: {
        message: '',
        status: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().ProfileData as ProfileDataState).toEqual(
      initialState,
    );
  });
  it('should handle fetchCategoriesProducts.pending action', () => {
    const state = store.getState().ProfileData as ProfileDataState;
    expect(state.isLoader).toBe(false);
    store.dispatch(updateProfile(mockData));
    const newState = store.getState().ProfileData as ProfileDataState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle fetchCategoriesProducts.fulfilled action', async () => {
    jest.spyOn(ApiService, 'put').mockResolvedValue(mockData);

    await store.dispatch(updateProfile(mockData));

    const state = store.getState().ProfileData as ProfileDataState;
    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('should handle fetchCategoriesProducts.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'put').mockRejectedValueOnce(mockError);

    return store.dispatch(updateProfile(mockData)).catch(() => {
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
  it('should handle setAdressAddData correctly', () => {
    const newState = reducer(
      undefined,
      setData({
        message: 'Edit Profile successfully updated',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe('Edit Profile successfully updated');
    expect(newState.data.status).toBe('OK');
  });
});
