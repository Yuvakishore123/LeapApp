import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider, useDispatch} from 'react-redux';
import CheckoutScreen from 'screens/CheckoutScreen/CheckoutScreen';
import {store} from '../../../src/redux/store';
import useChectout from 'screens/CheckoutScreen/useCheckout';

jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../src/screens/CheckoutScreen/useCheckout', () => {
  return jest.fn(() => ({
    refreshing: false,
    setRefreshing: jest.fn(),
    onRefresh: jest.fn(),
    handlePayment: jest.fn(),
    cartItems: {
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
        {
          id: 2,
          imageUrl: 'https://example.com/product2.jpg',
          product: {
            availableQuantities: 5,
            brand: 'Brand B',
            color: 'Blue',
            createdAt: '2023-09-27T09:51:08.657Z',
            createdBy: 2,
            deleted: false,
            description: 'Product 2 Description',
            disabled: false,
            disabledQuantities: 0,
            id: 102,
            material: 'Material Y',
            name: 'Product 2',
            price: 39.99,
            quantity: 1,
            rentedQuantities: 0,
            size: 'Large',
            updatedAt: '2023-09-27T09:51:08.657Z',
            updatedBy: 2,
          },
          quantity: 1,
          rentalEndDate: '2023-11-30T23:59:59.999Z',
          rentalStartDate: '2023-10-01T00:00:00.000Z',
        },
      ],
      finalPrice: 99.97,
      shippingCost: 10.0,
      tax: 9.98,
      totalCost: 119.95,
      userId: 12345,
    },
    data: [
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
    ],
    rentalStartDate: new Date(),
    rentalEndDate: new Date(),
    setRentalStartDate: jest.fn(),
    setRentalEndDate: jest.fn(),
    handleCheckboxChange: jest.fn(),
    imageLoaded: false,
    setImageLoaded: jest.fn(),
    selectedAddressIndex: -1,
    isCheckedArray: [],
    isChecked: true,
    setIsCheckedArray: jest.fn(),
  }));
});
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      addListener: jest.fn(),
    }),
  };
});

describe('Checkout Screen', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useChectout as jest.Mock).mockReturnValue({
      refreshing: false,
      setRefreshing: jest.fn(),
      onRefresh: jest.fn(),
      handlePayment: jest.fn(),
      cartData: {
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
          {
            id: 2,
            imageUrl: 'https://example.com/product2.jpg',
            product: {
              availableQuantities: 5,
              brand: 'Brand B',
              color: 'Blue',
              createdAt: '2023-09-27T09:51:08.657Z',
              createdBy: 2,
              deleted: false,
              description: 'Product 2 Description',
              disabled: false,
              disabledQuantities: 0,
              id: 102,
              material: 'Material Y',
              name: 'Product 2',
              price: 39.99,
              quantity: 1,
              rentedQuantities: 0,
              size: 'Large',
              updatedAt: '2023-09-27T09:51:08.657Z',
              updatedBy: 2,
            },
            quantity: 1,
            rentalEndDate: '2023-11-30T23:59:59.999Z',
            rentalStartDate: '2023-10-01T00:00:00.000Z',
          },
        ],
        finalPrice: 99.97,
        shippingCost: 10.0,
        tax: 9.98,
        totalCost: 119.95,
        userId: 12345,
      },
      data: [
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
      ],
      rentalStartDate: new Date(),
      rentalEndDate: new Date(),
      setRentalStartDate: jest.fn(),
      setRentalEndDate: jest.fn(),
      handleCheckboxChange: jest.fn(),
      imageLoaded: false,
      setImageLoaded: jest.fn(),
      selectedAddressIndex: -1,
      isCheckedArray: [],
      isChecked: true,
      setIsCheckedArray: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('rendering checkout screen', async () => {
    const navigationMock = {navigate: jest.fn()};
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <CheckoutScreen
            route={{
              name: '',
            }}
            navigation={navigationMock}
          />
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeDefined();
  });
  test('rendering loading state of screen', async () => {
    const navigationMock = {navigate: jest.fn()};
    (useChectout as jest.Mock).mockReturnValue({
      cartData: false,
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CheckoutScreen
            route={{
              name: '',
            }}
            navigation={navigationMock}
          />
        </NavigationContainer>
      </Provider>,
    );

    const loading = getByTestId('loading-1');
    expect(loading).toBeDefined();
  });
  test('should rendering checkout product  in screen', async () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CheckoutScreen
            route={{
              name: '',
            }}
            navigation={navigationMock}
          />
        </NavigationContainer>
      </Provider>,
    );
    const products = getByTestId('checkoutproducts-1');
    expect(products).toBeDefined();
  });
  test('should rendering Address in screen', async () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CheckoutScreen
            route={{
              name: '',
            }}
            navigation={navigationMock}
          />
        </NavigationContainer>
      </Provider>,
    );
    const address = getByTestId('address-1');
    expect(address).toBeDefined();
  });
  test('should navigate to owneraddresspage in screen', async () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CheckoutScreen
            route={{
              name: '',
            }}
            navigation={navigationMock}
          />
        </NavigationContainer>
      </Provider>,
    );
    const address = getByTestId('navigationId');
    act(() => {
      fireEvent.press(address);
    });
    expect(navigationMock.navigate).toBeCalledWith('Owneraddresspage');
  });
  test('should render checkbox in screen', async () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CheckoutScreen
            route={{
              name: '',
            }}
            navigation={navigationMock}
          />
        </NavigationContainer>
      </Provider>,
    );
    const address = getByTestId('checkbox-1');
    expect(address).toBeDefined();
  });
  test('should handle handlepayment in screen', async () => {
    const navigationMock = {navigate: jest.fn()};
    const handlepay = jest.fn();
    (useChectout as jest.Mock).mockReturnValue({
      refreshing: false,
      setRefreshing: jest.fn(),
      onRefresh: jest.fn(),
      handlePayment: handlepay,
      cartData: {
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
          {
            id: 2,
            imageUrl: 'https://example.com/product2.jpg',
            product: {
              availableQuantities: 5,
              brand: 'Brand B',
              color: 'Blue',
              createdAt: '2023-09-27T09:51:08.657Z',
              createdBy: 2,
              deleted: false,
              description: 'Product 2 Description',
              disabled: false,
              disabledQuantities: 0,
              id: 102,
              material: 'Material Y',
              name: 'Product 2',
              price: 39.99,
              quantity: 1,
              rentedQuantities: 0,
              size: 'Large',
              updatedAt: '2023-09-27T09:51:08.657Z',
              updatedBy: 2,
            },
            quantity: 1,
            rentalEndDate: '2023-11-30T23:59:59.999Z',
            rentalStartDate: '2023-10-01T00:00:00.000Z',
          },
        ],
        finalPrice: 99.97,
        shippingCost: 10.0,
        tax: 9.98,
        totalCost: 119.95,
        userId: 12345,
      },
      data: [
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
      ],
      rentalStartDate: new Date(),
      rentalEndDate: new Date(),
      setRentalStartDate: jest.fn(),
      setRentalEndDate: jest.fn(),
      handleCheckboxChange: jest.fn(),
      imageLoaded: false,
      setImageLoaded: jest.fn(),
      selectedAddressIndex: -1,
      isCheckedArray: [],
      isChecked: false,
      setIsCheckedArray: jest.fn(),
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CheckoutScreen
            route={{
              name: '',
            }}
            navigation={navigationMock}
          />
        </NavigationContainer>
      </Provider>,
    );
    const payment = getByTestId('paymentId');
    act(() => {
      fireEvent.press(payment);
    });
    expect(handlepay).toHaveBeenCalled();
  });
  test('should handle handlecheckbox in screen', async () => {
    const navigationMock = {navigate: jest.fn()};
    const handlecheckout = jest.fn();
    (useChectout as jest.Mock).mockReturnValue({
      refreshing: false,
      setRefreshing: jest.fn(),
      onRefresh: jest.fn(),
      handlePayment: jest.fn(),
      cartData: {
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
          {
            id: 2,
            imageUrl: 'https://example.com/product2.jpg',
            product: {
              availableQuantities: 5,
              brand: 'Brand B',
              color: 'Blue',
              createdAt: '2023-09-27T09:51:08.657Z',
              createdBy: 2,
              deleted: false,
              description: 'Product 2 Description',
              disabled: false,
              disabledQuantities: 0,
              id: 102,
              material: 'Material Y',
              name: 'Product 2',
              price: 39.99,
              quantity: 1,
              rentedQuantities: 0,
              size: 'Large',
              updatedAt: '2023-09-27T09:51:08.657Z',
              updatedBy: 2,
            },
            quantity: 1,
            rentalEndDate: '2023-11-30T23:59:59.999Z',
            rentalStartDate: '2023-10-01T00:00:00.000Z',
          },
        ],
        finalPrice: 99.97,
        shippingCost: 10.0,
        tax: 9.98,
        totalCost: 119.95,
        userId: 12345,
      },
      data: [
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
      ],
      rentalStartDate: new Date(),
      rentalEndDate: new Date(),
      setRentalStartDate: jest.fn(),
      setRentalEndDate: jest.fn(),
      handleCheckboxChange: handlecheckout,
      imageLoaded: false,
      setImageLoaded: jest.fn(),
      selectedAddressIndex: 1,
      isCheckedArray: [],
      isChecked: false,
      setIsCheckedArray: jest.fn(),
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <CheckoutScreen
            route={{
              name: '',
            }}
            navigation={navigationMock}
          />
        </NavigationContainer>
      </Provider>,
    );
    const checkbox = getByTestId('checkbox-1');
    act(() => {
      fireEvent.press(checkbox);
    });
    expect(handlecheckout).toHaveBeenCalled();
  });
});
