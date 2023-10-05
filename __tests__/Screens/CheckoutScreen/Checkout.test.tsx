import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import CheckoutScreen from 'screens/CheckoutScreen/CheckoutScreen';
import {store} from '../../../src/redux/store';

jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('../../../src/screens/CheckoutScreen/useCheckout', () => {
  return jest.fn(() => ({
    refreshing: false,
    setRefreshing: jest.fn(),
    onRefresh: jest.fn(),
    handlePayment: jest.fn(),
    cartItems: [
      {
        id: 1,
        rentalEndDate: new Date(),
        rentalStartDate: new Date(),
        imageUrl: 'https://example.com/image.jpg',
        quantity: 2,
        product: {
          name: 'Sample Product',
          id: 101,
          size: 'M',
          price: '50',
        },
      },
      // Add more items as needed
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
  beforeEach(() => {
    AsyncStorage.clear();
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
});
