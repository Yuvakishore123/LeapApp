import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AddAddress from 'screens/Owneraddaddress/AddAddress';
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
jest.mock('screens/Owneraddaddress/useAddAddress', () => ({
  setStateName: jest.fn(),
  setCity: jest.fn(),
  addressLine2: 'mockedAddressLine2',
  FetchAddress: jest.fn(),
  addressLine1: 'mockedAddressLine1',
  handleSaveAddress: jest.fn(),
  handleCheckboxChange: jest.fn(),
  handleOptionChange: jest.fn(),
  selectedOption: 'mockedSelectedOption',
  isChecked: true,
  city: 'mockedCity',
  state: 'mockedState',
  handlePostalCodeChange: jest.fn(),
  postalCode: 'mockedPostalCode',
  country: 'mockedCountry',
  setCountry: jest.fn(),
  isLoading: false,
  formik: {values: {}}, // You may need to provide an appropriate formik object
  handleAddressLine1: jest.fn(),
  handleAddressLine2: jest.fn(),
  handleBlur: jest.fn(),
  showModal: jest.fn(),
  closeModal: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));
const Stack = createNativeStackNavigator();
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});
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
describe('AddAddress Screen', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAddAddress as jest.Mock).mockReturnValue({
      useAddAddress: jest.fn(() => ({
        setStateName: jest.fn(),
        setCity: jest.fn(),
        addressLine2: 'mockedAddressLine2',
        FetchAddress: jest.fn(),
        addressLine1: 'mockedAddressLine1',
        handleSaveAddress: jest.fn(),
        handleCheckboxChange: jest.fn(),
        handleOptionChange: jest.fn(),
        selectedOption: 'mockedSelectedOption',
        isChecked: true,
        city: 'mockedCity',
        state: 'mockedState',
        handlePostalCodeChange: jest.fn(),
        postalCode: 'mockedPostalCode',
        country: 'mockedCountry',
        setCountry: jest.fn(),
        isLoading: false,
        formik: {values: {}}, // You may need to provide an appropriate formik object
        handleAddressLine1: jest.fn(),
        handleAddressLine2: jest.fn(),
        handleBlur: jest.fn(),
        showModal: jest.fn(),
        closeModal: jest.fn(),
      })),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the AddAddress Screen', () => {
    const result = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AddAddress" component={AddAddress} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(result).toBeDefined();
  });
  it('should render the Addres Line1 , Address Line2 , Postal code', () => {
    const mockhandleAddressline1 = jest.fn();
    const mockhandleAddressline2 = jest.fn();
    const mockPincode = jest.fn();
    (useAddAddress as jest.Mock).mockReturnValue({
      addressLine1: 'mockedAddressLine1',

      handleAddressLine1: mockhandleAddressline1,
      handleAddressLine2: mockhandleAddressline2,
      handleBlur: jest.fn(),
      handlePostalCodeChange: mockPincode,
    });

    const {getByTestId, getByPlaceholderText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AddAddress" component={AddAddress} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const Addressline1 = getByTestId('Flat-No');
    expect(Addressline1).toBeDefined();
    const Addressline2 = getByTestId('Street-name');
    fireEvent.changeText(Addressline1, 'mock Address');
    fireEvent(Addressline1, 'blur');
    fireEvent.changeText(Addressline2, 'mock Street');
    fireEvent(Addressline2, 'blur');
    expect(mockhandleAddressline1).toHaveBeenCalledWith('mock Address');
    expect(mockhandleAddressline2).toHaveBeenCalledWith('mock Street');
    const pincode = getByPlaceholderText('Pincode');
    fireEvent.changeText(pincode, '560034');
    fireEvent(pincode, 'blur');
    expect(pincode).toBeDefined();
    expect(mockPincode).toHaveBeenCalledWith('560034');
  });
  it('should render the City , Country ', () => {
    const mockHandleCity = jest.fn();
    const mockHandleCountry = jest.fn();
    const mockHandleChange = jest.fn();

    (useAddAddress as jest.Mock).mockReturnValue({
      setCity: mockHandleCity,
      setStateName: mockHandleChange,
      handleBlur: jest.fn(),
      setCountry: mockHandleCountry,
    });

    const {getByTestId, getByPlaceholderText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AddAddress" component={AddAddress} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const CityName = getByTestId('City');
    expect(CityName).toBeDefined();
    fireEvent.changeText(CityName, 'Vizag');

    const StateName = getByPlaceholderText('State');
    fireEvent.changeText(StateName, 'Ap');
    const Country = getByPlaceholderText('Country');
    fireEvent.changeText(Country, 'India');
    fireEvent(Country, 'blur');
    expect(Country).toBeDefined();
  });
  it('should Check Home the selected Address Type', () => {
    const mockHandleOptionChange = jest.fn();

    (useAddAddress as jest.Mock).mockReturnValue({
      selectedOption: 'HOME',
      handleOptionChange: mockHandleOptionChange,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AddAddress" component={AddAddress} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const homeButton = getByTestId('Home-Button');
    expect(homeButton).toBeDefined();
    fireEvent.press(homeButton);
    expect(mockHandleOptionChange).toHaveBeenCalledWith('HOME');
  });
  it('should Check Office the selected Address Type', () => {
    const mockHandleOptionChange = jest.fn();

    (useAddAddress as jest.Mock).mockReturnValue({
      selectedOption: 'OFFICE',
      handleOptionChange: mockHandleOptionChange,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AddAddress" component={AddAddress} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const officeButton = getByTestId('Office-Button');
    expect(officeButton).toBeDefined();
    fireEvent.press(officeButton);
    expect(mockHandleOptionChange).toHaveBeenCalledWith('OFFICE');
  });
});
