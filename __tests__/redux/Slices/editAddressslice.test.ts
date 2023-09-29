import {ToolkitStore} from '@reduxjs/toolkit/dist/configureStore';
import reducer, {
  EditAddressState,
  editAddressData,
  seteditAddressData,
  setError,
} from '../../../src/redux/slice/editAddressSlice';
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
describe('edit Address slice', () => {
  let store: ToolkitStore<
    {editaddressdata: unknown},
    AnyAction,
    [ThunkMiddleware<{editaddressdata: unknown}, AnyAction>]
  >;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        editaddressdata: reducer,
      },
    });
  });
  const mockId = 10;
  const mockeditAddressData = {
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
      data: {
        message: '',
        status: '',
      },
      isLoader: false,
      isError: false,
      error: null,
    };
    expect(store.getState().editaddressdata as EditAddressState).toEqual(
      initialState,
    );
  });
  it('should handle EditAddress.pending action', () => {
    const state = store.getState().editaddressdata as EditAddressState;
    expect(state.isLoader).toBe(false);
    store.dispatch(editAddressData({mockeditAddressData, mockId}));
    const newState = store.getState().editaddressdata as EditAddressState;
    expect(newState.isLoader).toBe(true);
  });

  it('should handle EditAddress.fulfilled action', () => {
    jest.spyOn(ApiService, 'post').mockResolvedValue(mockeditAddressData);

    return store
      .dispatch(editAddressData({mockeditAddressData, mockId}))
      .then(() => {
        const state = store.getState().editaddressdata as EditAddressState;
        expect(state.isLoader).toBe(false);
        expect(state.data).toEqual(mockeditAddressData);
      });
  });

  it('should handle EditAddress.rejected action', () => {
    const mockError = 'Some error message';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(mockError);

    return store
      .dispatch(editAddressData({mockeditAddressData, mockId}))
      .catch(() => {
        const state = store.getState().editaddressdata as EditAddressState;
        expect(state.isLoader).toBe(false);
        expect(state.isError).toBe(true);
        expect(state.error).toEqual(mockError);
      });
  });
  it('should handle setError action', () => {
    const errorPayload = 'Some error message';
    store.dispatch(setError(errorPayload));

    const state = store.getState().editaddressdata as EditAddressState;
    expect(state.error).toEqual(errorPayload);
  });
  it('should handle setData correctly', () => {
    const newState = reducer(
      undefined,
      seteditAddressData({
        message: 'Cart Update successfully',
        status: 'OK',
      }),
    );

    expect(newState.data.message).toBe('Cart Update successfully');
    expect(newState.data.status).toBe('OK');
  });
});
