import reducer, {
  setError,
  EditAddressState,
  editAddressData,
  seteditAddressData,
} from '../../../src/redux/slice/editAddressSlice';

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
jest.mock('network/network');

describe('Edit Address Slice', () => {
  const mockData = {
    updateaddress: {
      addressLine1: '123 Main Street',
      addressLine2: 'Apt 4B',
      addressType: 'Home',
      city: 'New York',
      country: 'USA',
      postalCode: '10001',
      state: 'NY',
      defaultType: true,
    },
    addressid: 3,
  };

  let store: ToolkitStore<
    {editAddress: unknown},
    AnyAction,
    [ThunkMiddleware<{editAddress: unknown}, AnyAction>]
  >;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        editAddress: reducer,
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
    const previousState: EditAddressState = {
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

    expect(reducer(previousState, seteditAddressData(successPayload))).toEqual({
      data: successPayload,
      isLoader: false,
      isError: false,
      error: null,
    });
  });
  it('should handle the Edit Profile state is fulfilled  actions correctly', async () => {
    (ApiService.put as jest.Mock).mockResolvedValue(mockData);
    await store.dispatch(editAddressData(mockData));

    const state = store.getState().editAddress as EditAddressState; // Assuming AddressAddState is the correct type
    expect(state.isLoader).toBe(false); // Make sure loading state is updated correctly
    expect(state.data).toEqual(mockData);
    expect(state.isError).toBe(false);
    expect(ApiService.put).toHaveBeenCalledWith(
      `/address/update/${mockData.addressid}`,
      mockData.updateaddress,
    );
  });

  it('should handle the `editAddressData.rejected` action correctly', async () => {
    const errorMessage = 'An error occurred during the API call';
    // Replace with your desired product ID

    // Simulate a rejected API call by providing a rejected promise
    store.dispatch(editAddressData(mockData)).catch(() => {
      const state = store.getState().editAddress as EditAddressState; // Assuming AddressAddState is the correct type

      expect(state.isLoader).toBe(false);
      expect(state.isError).toBe(true); // Error occurred
      expect(state.error).toEqual(errorMessage);
    });
  });
  it('should set an error in the state when `setError` action is dispatched', () => {
    const error = 'An error occurred while adding the address';
    (ApiService.put as jest.Mock).mockRejectedValue(error);
    store.dispatch(setError(error));

    store.dispatch(editAddressData(mockData)).catch(() => {
      const state = store.getState().editAddress as EditAddressState;
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
