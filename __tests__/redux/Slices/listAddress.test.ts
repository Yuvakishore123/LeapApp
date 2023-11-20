import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  ListAddress,
  setData,
} from '../../../src/redux/slice/ListAddressSlice';
import {AnyAction, ThunkMiddleware, configureStore} from '@reduxjs/toolkit';
import ApiService from 'network/Network';
import {ListAddressState} from 'src/redux/slice/ListAddressSlice';
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
describe('List Address Slice', () => {
  let store: ToolkitStore<
    {ListAddressData: unknown},
    AnyAction,
    [ThunkMiddleware<{ListAddressData: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        ListAddressData: reducer,
      },
    });
  });
  const mockData = {
    addressLine1: '123 Main Street',
    addressLine2: '',
    addressType: 'Home',
    city: 'Cityville',
    country: 'USA',
    postalCode: '12345',
    state: 'CA',
    defaultType: false,
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should return the initial state', () => {
    const initialState = {
      data: {message: '', status: ''},
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().ListAddressData).toEqual(initialState);
  });
  it('should handle listAddress.pending action', () => {
    const state = store.getState().ListAddressData as ListAddressState;
    expect(state.isLoader).toBe(false);
    store.dispatch(ListAddress());
    const newState = store.getState().ListAddressData as ListAddressState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle listAddress.fulfilled action', async () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);

    await store.dispatch(ListAddress());
    const state = store.getState().ListAddressData as ListAddressState;
    expect(state.isLoader).toBe(false);
    expect(state.data).toEqual(mockData);
  });

  it('should handle listAddress.rejected action', async () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    try {
      return await store.dispatch(ListAddress());
    } catch {
      const state = store.getState().ListAddressData as ListAddressState;
      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true);
      expect(state.error).toEqual(mockError);
    }
  });
  it('should handle setData correctly', () => {
    const newState = reducer(
      undefined,
      setData({
        message: 'Fetched Address successfully',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe('Fetched Address successfully');
    expect(newState.data.status).toBe('OK');
  });
});
