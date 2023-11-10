import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import CheckoutScreen from 'screens/BorrowerScreens/CheckoutScreen/CheckoutScreen';
import useChectout from 'screens/BorrowerScreens/CheckoutScreen/useCheckout';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

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
jest.mock('screens/BorrowerScreens/CheckoutScreen/useCheckout', () => ({
  selectedAddressIndex: 0,
  handlePayment: jest.fn(),
  handleCheckboxChange: jest.fn(),
  refreshing: false,
  onRefresh: jest.fn(),
  isChecked: false,
  isLoading: false,
  data: [],
  handleAddAddress: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
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
describe('CheckOut Screen Screen', () => {
  const mockCartData = {
    cartItems: [
      {
        id: 1,
        imageUrl: 'https://example.com/product1.jpg',
        product: {
          availableQuantities: 10,
          brand: 'Brand A',
          color: 'Red',
          createdAt: '2023-09-27T09:51:08.657Z',
          createdBy: 1,
          deleted: false,
          description: 'Product 1 Description',
          disabled: false,
          disabledQuantities: 0,
          id: 101,
          material: 'Material X',
          name: 'Product 1',
          price: 29.99,
          quantity: 2,
          rentedQuantities: 0,
          size: 'Medium',
          updatedAt: '2023-09-27T09:51:08.657Z',
          updatedBy: 1,
        },
        quantity: 2,
        rentalEndDate: '2023-12-31T23:59:59.999Z',
        rentalStartDate: '2023-09-01T00:00:00.000Z',
      },
    ],
    finalPrice: 99.97,
    shippingCost: 10.0,
    tax: 9.98,
    totalCost: 119.95,
    userId: 12345,
  };
  const mockData = [
    {
      id: 1,
      addressLine1: '123 Main St',
      addressLine2: 'Apt 4B',
      postalCode: '12345',
      city: 'Example City 1',
      country: 'Example Country 1',
    },
    {
      id: 2,
      addressLine1: '456 Elm St',
      addressLine2: 'Suite 2C',
      postalCode: '67890',
      city: 'Example City 2',
      country: 'Example Country 2',
    },
    // Add more mock objects as needed
  ];
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        listAddress: {data: {}},
        CartProducts: {data: mockCartData},
      }),
    );

    (useChectout as jest.Mock).mockReturnValue({
      useCategoryProducts: jest.fn(() => ({
        selectedAddressIndex: 0,
        handlePayment: jest.fn(),
        handleCheckboxChange: jest.fn(),
        refreshing: false,
        onRefresh: jest.fn(),
        isChecked: false,
        handleAddAddress: jest.fn(),
        isLoading: false,
        data: [],
      })),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the CategoryProducts Screen', () => {
    const result = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(result).toBeDefined();
  });
  it('should render the loading component Screen', () => {
    (useChectout as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const LoadingComponent = getByTestId('Loading-Image');
    expect(LoadingComponent).toBeDefined();
    const Loadingtext = getByTestId('Loading-Text');
    expect(Loadingtext).toBeTruthy();
  });
  it('should render the Cart details Screen', () => {
    (useChectout as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const CardContainer = getByTestId('cardContainer-1');
    expect(CardContainer).toBeDefined();
    const ProductName = getByTestId('ProductName-1');
    expect(ProductName).toBeDefined();
  });
  it('should naviagate to AddAddress Screen when Adddaddress button is clicked', () => {
    const mockNavigation = jest.fn();
    (useChectout as jest.Mock).mockReturnValue({
      isLoading: false,
      data: [],
      handleAddAddress: mockNavigation,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const AddressButton = getByTestId('AddAddress-Button');
    expect(AddressButton).toBeDefined();
    fireEvent.press(AddressButton);
    expect(mockNavigation).toBeCalled();
  });
  it('should render the data of Address when Data is here', () => {
    (useChectout as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const addressContainer = getByTestId('AddressContainer-1');
    expect(addressContainer).toBeDefined();
    const addresstext = getByTestId('addressText-1');
    expect(addresstext).toBeDefined();
  });
  it('should render selected Address data of Address when Data is here', () => {
    const mockHandleChange = jest.fn();
    (useChectout as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
      handleCheckboxChange: mockHandleChange,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const selectedAddress = getByTestId('SelectAddress-1');
    expect(selectedAddress).toBeDefined();
    fireEvent.press(selectedAddress);
    expect(mockHandleChange).toBeCalled();
  });
  it('should placeOrder when button is clicked', () => {
    const mockHandlepayment = jest.fn();
    (useChectout as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
      isChecked: false,
      handlePayment: mockHandlepayment,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const paymentButton = getByTestId('Place-Order');
    expect(paymentButton).toBeDefined();
    fireEvent.press(paymentButton);
    expect(mockHandlepayment).toHaveBeenCalledWith();
  });
  it('should placeOrder  button should be disabled', () => {
    const mockHandlepayment = jest.fn();
    (useChectout as jest.Mock).mockReturnValue({
      isLoading: false,
      data: mockData,
      isChecked: true,
      handlePayment: mockHandlepayment,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const paymentButton = getByTestId('Place-Order');
    expect(paymentButton).toBeDefined();
    fireEvent.press(paymentButton);
    expect(paymentButton.props.style.opacity).toBe(0.5);
  });
});
