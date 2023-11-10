import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import Address from 'screens/OwnerScreens/Owneraddaddress/Address';
import useAddress from 'screens/OwnerScreens/Owneraddaddress/useAddress';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('react-native-razorpay', () => require('razorpay-mock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockAddListener = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNavigate,
      // Add other navigation properties and methods as needed
    }),
  };
});
jest.mock('screens/OwnerScreens/Owneraddaddress/useAddress', () => ({
  handleDeleteAddress: jest.fn(),
  handleOwnerAddAddress: jest.fn(),
  handleEditItems: jest.fn(),
  showModal: jest.fn(),
  closeModal: jest.fn(),
  addressdata: [],
  isloading: false,
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('@react-native-firebase/messaging', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    messaging: jest.fn(() => ({
      onTokenRefresh: jest.fn(),
      setBackgroundMessageHandler: jest.fn(),
    })),
  };
});
describe('Address Screen', () => {
  const mockAddressData = [
    {
      id: 1,
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      postalCode: '12345',
      city: 'New York',
      state: 'NY',
      country: 'USA',
    },
    {
      id: 2,
      addressLine1: '456 Elm St',
      addressLine2: 'Suite 101',
      postalCode: '54321',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
    },
    // Add more address items as needed
  ];
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAddress as jest.Mock).mockReturnValue({
      useAddAddress: jest.fn(() => ({
        handleDeleteAddress: jest.fn(),
        handleOwnerAddAddress: jest.fn(),
        handleEditItems: jest.fn(),
        showModal: jest.fn(),
        closeModal: jest.fn(),
        addressdata: [],
        isloading: false,
      })),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the Screen', () => {
    // Define a mock route with the necessary params
    (useAddress as jest.Mock).mockReturnValue({
      isloading: true,
    });

    const result = render(<Address />);

    expect(result).toBeDefined();
  });
  it('should render the LoadingComponent', () => {
    // Define a mock route with the necessary params
    (useAddress as jest.Mock).mockReturnValue({
      isloading: true,
    });

    const {getByTestId} = render(<Address />);
    const LoadingComponent = getByTestId('Loading-Component');

    expect(LoadingComponent).toBeDefined();
  });
  it('should render the Empty Component in the Address screen', () => {
    // Define a mock route with the necessary params
    (useAddress as jest.Mock).mockReturnValue({
      isloading: false,
      addressdata: [],
    });

    const {getByTestId} = render(<Address />);
    const emptyContainer = getByTestId('empty-container');

    expect(emptyContainer).toBeDefined();
  });
  it('should render the FlatList in the Address screen', () => {
    // Define a mock route with the necessary params
    (useAddress as jest.Mock).mockReturnValue({
      isloading: false,
      addressdata: mockAddressData,
    });

    const {getByTestId} = render(<Address />);
    const flatListComponent = getByTestId('FlastList-component');

    expect(flatListComponent).toBeDefined();
  });
  it('should edit the Address screen', () => {
    const mockEdit = jest.fn();

    (useAddress as jest.Mock).mockReturnValue({
      isloading: false,
      addressdata: mockAddressData,
      handleEditItems: mockEdit,
    });

    const {getByTestId} = render(<Address />);
    const EditButton = getByTestId('Edit-1');

    expect(EditButton).toBeDefined();
    fireEvent.press(EditButton);
    expect(mockEdit).toHaveBeenCalledWith(mockAddressData[0]);
  });
  it('should delete the Address screen', () => {
    const mockDelete = jest.fn();
    // Define a mock route with the necessary params
    (useAddress as jest.Mock).mockReturnValue({
      isloading: false,
      addressdata: mockAddressData,
      handleDeleteAddress: mockDelete,
    });

    const {getByTestId} = render(<Address />);
    const DeleteButton = getByTestId('delete-1');

    expect(DeleteButton).toBeDefined();
    fireEvent.press(DeleteButton);
    expect(mockDelete).toHaveBeenCalledWith(mockAddressData[0].id);
  });
});
