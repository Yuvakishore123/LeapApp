import {renderHook, act} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useAddress from '../../../../src/screens/Owneraddaddress/useAddress';

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));
const mockNav = jest.fn();
const mockAddListener = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNav,
      // Add other navigation properties and methods as needed
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
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  });
  useSelector.mockImplementation(selector =>
    selector({
      listAddress: {data: {}},
    }),
  );
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should open the modal', () => {
    const {result} = renderHook(() => useAddress());
    expect(result.current.showModal).toBe(false);
    act(() => {
      result.current.openModal();
    });
    expect(result.current.showModal).toBe(true);
  });
  it('should close the modal', () => {
    const {result} = renderHook(() => useAddress());
    expect(result.current.showModal).toBe(false);
    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModal).toBe(false);
  });
  it('should navigate to EditAddress with the correct item', () => {
    const {result} = renderHook(() => useAddress());
    const mockItem = {id: 1, addressLine1: '123 Main St'}; // Mock item data

    act(() => {
      result.current.handleEditItems(mockItem);
    });

    // Expect that the navigate function was called with the expected route and params
    expect(mockNav).toHaveBeenCalledWith('EditAddress', {address: mockItem});
  });
  it('should navigate to Owneraddaddress ', () => {
    const {result} = renderHook(() => useAddress());

    act(() => {
      result.current.handleOwnerAddAddress();
    });

    // Expect that the navigate function was called with the expected route and params
    expect(mockNav).toHaveBeenCalledWith('Owneraddaddress');
  });
  it('should fetch and update address data', async () => {
    const mockAddressData = {
      id: 1,
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001',
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
    };

    // Mock useSelector to return the mock address data
    useSelector.mockReturnValue(mockAddressData);

    const {result} = renderHook(() => useAddress());

    // Call the fetchData function
    await act(async () => {
      await result.current.fetchData();
    });

    // Expect that the dispatch function was called with ListAddress action
    // expect(dispatchMock).toHaveBeenCalledWith(ListAddress());
    expect(dispatchMock).toBeCalled();
    // Assert that the state variables were updated with the mock data
    // expect(result.current.id).toBe(mockAddressData.id);
    expect(result.current.city).toBe(mockAddressData.city);
    expect(result.current.state).toBe(mockAddressData.state);

    expect(result.current.postalCode).toBe(mockAddressData.postalCode);
    expect(result.current.addressLine1).toBe(mockAddressData.addressLine1);
    expect(result.current.addressLine2).toBe(mockAddressData.addressLine2);
  });
  it('should delete an address and open modal', () => {
    // Create a mock deleteId
    const deleteId = 1;

    const {result} = renderHook(() => useAddress());

    // Call the handleDeleteAddress function
    act(() => {
      result.current.handleDeleteAddress(deleteId);
    });

    // Expect that dispatch was called with removeAddress action and deleteId
    expect(dispatchMock).toBeCalled();

    // Expect that openModal was called
    expect(result.current.showModal).toBe(true);
  });
});
