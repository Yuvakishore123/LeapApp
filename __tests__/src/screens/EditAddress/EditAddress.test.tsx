import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import EditAddress from 'screens/EditAddress/EditAddress';
import useEditAddress from 'screens/EditAddress/useEditAddress';
import useAddAddress from 'screens/Owneraddaddress/useAddAddress';

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
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockNav = jest.fn();
const mockRoute = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
    useRoute: () => ({
      params: mockRoute,
    }),
  };
});
jest.mock('screens/Owneraddaddress/useAddAddress', () => ({
  isLoading: false,
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('screens/EditAddress/useEditAddress', () => ({
  handleUpdateAddress: jest.fn(),
  handleOptionChange: jest.fn(),
  selectedOption: 'mockSelectedOption',
  isChecked: true,
  setAddressLine1: jest.fn(),
  setAddressLine2: jest.fn(),
  setPostalCode: jest.fn(),
  handleCheckboxChange: jest.fn(),
  closeModal: jest.fn(),
  showModal: jest.fn(),
  setStateName: jest.fn(),
  city: 'mockCity',
  addressLine1: 'mockAddressLine1',
  addressLine2: 'mockAddressLine2',
  postalCode: 'mockPostalCode',
  state: 'mockState',
  setCity: jest.fn(),
  PlaceholderColor: 'mockPlaceholderColor',
  isLoading: false,
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
describe('EditAddress Screen', () => {
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
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useEditAddress as jest.Mock).mockReturnValue({
      useEditAddress: jest.fn(() => ({
        handleUpdateAddress: jest.fn(),
        handleOptionChange: jest.fn(),
        selectedOption: 'mockSelectedOption',
        isChecked: true,
        setAddressLine1: jest.fn(),
        setAddressLine2: jest.fn(),
        setPostalCode: jest.fn(),
        handleCheckboxChange: jest.fn(),
        closeModal: jest.fn(),
        showModal: jest.fn(),
        setStateName: jest.fn(),
        city: 'mockCity',
        addressLine1: 'mockAddressLine1',
        addressLine2: 'mockAddressLine2',
        postalCode: 'mockPostalCode',
        state: 'mockState',
        setCity: jest.fn(),
        PlaceholderColor: 'mockPlaceholderColor',
        isLoading: false,
      })),
    });
    (useAddAddress as jest.Mock).mockReturnValue({
      useAddAddress: jest.fn(() => ({
        isLoading: false,
      })),
    });
    useSelector.mockImplementation(selector =>
      selector({
        editAddressData: {
          data: {},
          isLoader: null,
        },
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the EditAddress Screen', () => {
    const result = render(<EditAddress />);

    expect(result).toBeDefined();
  });
  it('should get the product details', () => {
    const mockCity = jest.fn();
    const mockAddressLine1 = jest.fn();
    const mockAddressLine2 = jest.fn();
    const mockState = jest.fn();
    (useEditAddress as jest.Mock).mockReturnValue({
      city: 'New York',
      setCity: mockCity,
      setAddressLine1: mockAddressLine1,
      setAddressLine2: mockAddressLine2,
      setStateName: mockState,
    });
    const {getByTestId} = render(<EditAddress />);
    const cityText = getByTestId('City');
    expect(cityText).toBeDefined();
    fireEvent.changeText(cityText, 'london');
    expect(mockCity).toHaveBeenCalledWith('london');
    const addressLine1 = getByTestId('Flat');
    expect(addressLine1).toBeDefined();
    fireEvent.changeText(addressLine1, '4th street');
    expect(mockAddressLine1).toHaveBeenCalledWith('4th street');
    const streetAddress = getByTestId('Street');
    expect(streetAddress).toBeDefined();
    fireEvent.changeText(streetAddress, 'Apt 4B');
    expect(mockAddressLine2).toHaveBeenCalledWith('Apt 4B');
    const stateAddress = getByTestId('State');
    expect(stateAddress).toBeDefined();
    fireEvent.changeText(stateAddress, 'Ap');
    expect(mockState).toHaveBeenCalledWith('Ap');
  });
  it('should select Home Radio Button when clicked ', () => {
    const mockRadioButton = jest.fn();

    (useEditAddress as jest.Mock).mockReturnValue({
      city: 'New York',
      selectedOption: 'HOME',
      handleOptionChange: mockRadioButton,
    });
    const {getByTestId} = render(<EditAddress />);
    const RadioButton = getByTestId('Radio-Home');
    expect(RadioButton).toBeDefined();
    fireEvent.press(RadioButton);
    expect(mockRadioButton).toHaveBeenCalledWith('HOME');
  });
  it('should select Office Radio Button when clicked ', () => {
    const mockRadioButton = jest.fn();

    (useEditAddress as jest.Mock).mockReturnValue({
      city: 'New York',
      selectedOption: 'OFFICE',
      handleOptionChange: mockRadioButton,
    });
    const {getByTestId} = render(<EditAddress />);
    const RadioButton = getByTestId('Radio-Office');
    expect(RadioButton).toBeDefined();
    fireEvent.press(RadioButton);
    expect(mockRadioButton).toHaveBeenCalledWith('OFFICE');
  });
  it('should render the Loading Screen', () => {
    (useAddAddress as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    const result = render(<EditAddress />);

    expect(result).toBeDefined();
  });
});
