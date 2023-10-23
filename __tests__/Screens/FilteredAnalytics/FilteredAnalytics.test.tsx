import React from 'react';
import {render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FilteredAnalytics from 'screens/FilteredAnalytics/FilteredAnalytics';
import useFilteredAnalytics from 'screens/FilteredAnalytics/useFilteredAnalytics';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('screens/FilteredAnalytics/useFilteredAnalytics', () => ({
  chartData: [
    {month: '2023-01-01', rentalCost: 1000},
    {month: '2023-02-01', rentalCost: 1200},
  ], // Mock chartData as needed
  data: {
    '2023-01': [
      {
        borrowerId: '123',
        borrowerName: 'John Doe',
        rentalCost: 500,
        name: 'Product 1',
        quantity: 2,
        borrowerPhoneNumber: '1234567890',
        imageUrl: 'https://example.com/image1.jpg',
      },
      // Add more items as needed for this month
    ],
    '2023-02': [
      {
        borrowerId: '456',
        borrowerName: 'Jane Doe',
        rentalCost: 700,
        name: 'Product 2',
        quantity: 1,
        borrowerPhoneNumber: '9876543210',
        imageUrl: 'https://example.com/image2.jpg',
      },
      // Add more items as needed for this month
    ],
  }, // Mock data as needed
  isLoading: false, // Mock isLoading as needed
  fetchData: jest.fn(),
  generateKey: jest.fn(),
  startDate: new Date(),
  endDate: new Date(),
  setStartDate: jest.fn(),
  setEndDate: jest.fn(),
  navigation: {
    navigate: jest.fn(),
  },
  response: null, // Mock response as needed
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('FilteredAnalytics Page', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useFilteredAnalytics as jest.Mock).mockReturnValue({
      chartData: [
        {month: '2023-01-01', rentalCost: 1000},
        {month: '2023-02-01', rentalCost: 1200},
      ], // Mock chartData as needed
      data: {
        '2023-01': [
          {
            borrowerId: '123',
            borrowerName: 'John Doe',
            rentalCost: 500,
            name: 'Product 1',
            quantity: 2,
            borrowerPhoneNumber: '1234567890',
            imageUrl: 'https://example.com/image1.jpg',
          },
          // Add more items as needed for this month
        ],
        '2023-02': [
          {
            borrowerId: '456',
            borrowerName: 'Jane Doe',
            rentalCost: 700,
            name: 'Product 2',
            quantity: 1,
            borrowerPhoneNumber: '9876543210',
            imageUrl: 'https://example.com/image2.jpg',
          },
          // Add more items as needed for this month
        ],
      }, // Mock data as needed
      isLoading: false, // Mock isLoading as needed
      fetchData: jest.fn(),
      generateKey: jest.fn(),
      startDate: new Date(),
      endDate: new Date(),
      setStartDate: jest.fn(),
      setEndDate: jest.fn(),
      navigation: {
        navigate: jest.fn(),
      },
      response: null, // Mock response as needed
    });
  });
  test('renders FilteredAnalytics correctly', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="FilteredAnalytics"
              component={FilteredAnalytics}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeTruthy();
  });
  test('renders loading state correctly', () => {
    const Stack = createNativeStackNavigator();
    (useFilteredAnalytics as jest.Mock).mockReturnValue({
      chartData: [], // Mock chartData as needed
      data: {}, // Mock data as needed
      isLoading: true, // Mock isLoading as needed
    });

    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="FilteredAnalytics"
              component={FilteredAnalytics}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(getByText('Loading...')).toBeDefined();
  });
  test('renders products data correctly', () => {
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="FilteredAnalytics"
              component={FilteredAnalytics}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const products = getByTestId('products-123');
    expect(products).toBeDefined();
  });
  test('renders chart data correctly', () => {
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="FilteredAnalytics"
              component={FilteredAnalytics}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const products = getByTestId('charData');
    expect(products).toBeDefined();
  });
  test('renders empty state correctly', () => {
    const Stack = createNativeStackNavigator();
    (useFilteredAnalytics as jest.Mock).mockReturnValue({
      chartData: [], // Mock chartData as needed
      data: {}, // Mock data as needed
    });

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="FilteredAnalytics"
              component={FilteredAnalytics}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const emptyview = getByTestId('empty-view');
    expect(emptyview).toBeDefined();
  });
});
