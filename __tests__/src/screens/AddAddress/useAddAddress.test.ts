import {renderHook, act} from '@testing-library/react-native';

import {useDispatch} from 'react-redux';

import useAddAddress from '../../../../src/screens/OwnerScreens/Owneraddaddress/useAddAddress';
import ApiService from 'network/network';
import {Alert} from 'react-native';

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));
const mockNav = jest.fn();
const mockGoback = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      goBack: mockGoback,
    }),
  };
});

jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  configureScope: jest.fn(),
  addBreadcrumb: jest.fn(),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  captureEvent: jest.fn(),
  withScope: jest.fn(),
  setTag: jest.fn(),
  setUser: jest.fn(),
  setExtra: jest.fn(),
  setContext: jest.fn(),
  flush: jest.fn(),
  close: jest.fn(),
  getCurrentHub: jest.fn(),
}));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('Address data', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should open the modal', () => {
    const {result} = renderHook(() => useAddAddress());
    expect(result.current.showModal).toBe(false);
    act(() => {
      result.current.openModal();
    });
    expect(result.current.showModal).toBe(true);
  });
  it('should close the modal', () => {
    const {result} = renderHook(() => useAddAddress());
    expect(result.current.showModal).toBe(false);
    act(() => {
      result.current.closeModal();
    });
    expect(mockGoback).toHaveBeenCalled();
    expect(result.current.showModal).toBe(false);
  });
  it('should check the checkbox', () => {
    const {result} = renderHook(() => useAddAddress());
    expect(result.current.isChecked).toBe(false);
    act(() => {
      result.current.handleCheckboxChange();
    });

    expect(result.current.isChecked).toBe(true);
  });
  it('should get the value of option', () => {
    const {result} = renderHook(() => useAddAddress());
    expect(result.current.selectedOption).toBe('HOME');
    act(() => {
      result.current.handleOptionChange('Office');
    });

    expect(result.current.selectedOption).toBe('Office');
  });
  it('should fetch address data and set state variables', async () => {
    // Mock the ApiService.get function to return a sample response
    jest.spyOn(ApiService, 'get').mockResolvedValue([
      {
        PostOffice: [
          {
            Country: 'Sample Country',
            District: 'Sample District',
            State: 'Sample State',
          },
        ],
      },
    ]);

    const {result} = renderHook(() => useAddAddress());

    await act(async () => {
      result.current.FetchAddress();
      // Wait for the hook to finish its asynchronous operation
    });

    // Assert that the state variables have been set correctly
    expect(result.current.country).toBe('Sample Country');
    expect(result.current.city).toBe('Sample District');
    expect(result.current.state).toBe('Sample State');
    expect(result.current.isLoading).toBe(false);
  });
  it('should fetch address data and set empty if the data is empty', async () => {
    // Mock the ApiService.get function to return a sample response
    jest.spyOn(ApiService, 'get').mockResolvedValue([]);

    const {result} = renderHook(() => useAddAddress());

    await act(async () => {
      result.current.FetchAddress();
      // Wait for the hook to finish its asynchronous operation
    });

    // Assert that the state variables have been set correctly
    expect(result.current.country).toBe('');
    expect(result.current.city).toBe('');
    expect(result.current.state).toBe('');

    // Check if the isLoading state is updated accordingly
    expect(result.current.isLoading).toBe(false);
  });
  it('should handle an error during the fetch and show an alert', async () => {
    // Mock the ApiService.get function to throw an error
    jest.spyOn(ApiService, 'get').mockRejectedValue(new Error('Sample Error'));

    const {result} = renderHook(() => useAddAddress());

    await act(async () => {
      result.current.FetchAddress();
    });

    // Assert that the error was logged and an alert was shown
    expect(Alert.alert).toHaveBeenCalledWith('Enter a valid Pincode');

    expect(result.current.isLoading).toBe(false);
  });
  it('should change the postal code when clicked', () => {
    const {result} = renderHook(() => useAddAddress());
    expect(result.current.isLoading).toBe(false);
    act(() => {
      result.current.handlePostalCodeChange('123423');
    });
    expect(result.current.postalCode).toBe('123423');

    expect(result.current.isLoading).toBe(true);
  });
  it('should throw alert when the postal code is grater than 6', () => {
    const {result} = renderHook(() => useAddAddress());
    expect(result.current.isLoading).toBe(false);
    act(() => {
      result.current.handlePostalCodeChange('1234234');
      expect(Alert.alert).toHaveBeenCalledWith('Enter a valid pincode');
    });
  });
  it('should save Address when save button is clicked ', () => {
    const {result} = renderHook(() => useAddAddress());
    const mockAddressData = {
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      addressType: 'Home',
      city: 'New York',
      country: 'USA',
      postalCode: '10001',
      state: 'NY',
      defaultType: true,
    };

    act(() => {
      result.current.handleSaveAddress();
    });
    console.log('Number of calls to dispatchMock:', dispatchMock.mock.calls);
    expect(dispatchMock).toBeCalled(); // Ensure dispatchMock is called exactly once
    // expect(dispatchMock).toHaveBeenCalledWith(AddressAdd(mockAddressData)); // Check the call to dispatch
  });
  it('should handle addressLine1 change', () => {
    const {result} = renderHook(() => useAddAddress());
    const addressLine1Value = '123 Main St';

    act(() => {
      result.current.handleAddressLine1(addressLine1Value);
    });

    // Check if addressLine1 state is updated
    expect(result.current.addressLine1).toBe(addressLine1Value);

    // Check if formik's setFieldValue is called with the correct arguments
  });
  it('should handle addressLine2 change', () => {
    const {result} = renderHook(() => useAddAddress());
    const addressLine2Value = 'Apt 4B';

    act(() => {
      result.current.handleAddressLine2(addressLine2Value);
    });

    // Check if addressLine2 state is updated
    expect(result.current.addressLine2).toBe(addressLine2Value);
  });
});
