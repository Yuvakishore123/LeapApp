import React from 'react';
import {render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OwnerRentalScreen from 'screens/ownerRentalStatusScreen/ownerRentalScreen';
import useOwnerorderproducts from 'screens/ownerRentalStatusScreen/useOwnerorderproducts';
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/in-app-messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('screens/ownerRentalStatusScreen/useOwnerorderproducts', () => ({
  useOwnerorderproducts: jest.fn(), // Ensure it's a function
}));

jest.mock('screens/ownerRentalStatusScreen/useOwnerorderproducts', () => ({
  ownerrentalproducts: [
    {
      id: 1,
      imageUrl: 'https://example.com/image1.jpg',
      status: 'Order placed',
      totalPrice: 100,
      name: 'Product 1',
      quantity: 2,
    },
    // Add more mock data if needed
  ],
  default: jest.fn(),
  __esModule: true,
}));
describe('OwnerRentalStatusScreen Page', () => {
  beforeEach(() => {
    AsyncStorage.clear();
    (useOwnerorderproducts as jest.Mock).mockReturnValue({
      ownerrentalproducts: [
        {
          id: 1,
          imageUrl: 'https://example.com/image1.jpg',
          status: 'Order placed',
          totalPrice: 100,
          name: 'Product 1',
          quantity: 2,
        },
        // Add more mock data if needed
      ],
    });
  });
  test('renders OwnerRentalStatusScreen correctly', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OwnerRentalScreen"
              component={OwnerRentalScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeTruthy();
  });
  test('renders OwnerRentalStatusScreen correctly of returned products', () => {
    (useOwnerorderproducts as jest.Mock).mockReturnValue({
      ownerrentalproducts: [
        {
          id: 1,
          imageUrl: 'https://example.com/image1.jpg',
          status: 'Returned',
          totalPrice: 100,
          name: 'Product 1',
          quantity: 2,
        },
        // Add more mock data if needed
      ],
    });
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OwnerRentalScreen"
              component={OwnerRentalScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeTruthy();
  });
  test('renders a list of rental items', () => {
    const Stack = createNativeStackNavigator();
    const ownerrentalproducts = [
      {
        id: 1,
        name: 'Item 1',
        quantity: 2,
        totalPrice: 50,
        status: 'Order placed',
        imageUrl: 'https://example.com/image1.jpg',
      },
      // Add more mock data as needed
    ];

    const {getAllByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OwnerRentalScreen"
              component={OwnerRentalScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const rentalItemCards = getAllByTestId('Rentalitemcard');
    expect(rentalItemCards.length).toBe(ownerrentalproducts.length);
  });
  it('displays product information correctly', () => {
    const Stack = createNativeStackNavigator();
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OwnerRentalScreen"
              component={OwnerRentalScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(getByText('Order Id: 1')).toBeTruthy();
    expect(getByText('Price: ₹ 100/-')).toBeTruthy();
    expect(getByText('Name: Product 1')).toBeTruthy();
    expect(getByText('Qty: 2')).toBeTruthy();
    expect(getByText('Order placed')).toBeTruthy();
  });
  it('renders the image', () => {
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OwnerRentalScreen"
              component={OwnerRentalScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const image = getByTestId('image-1'); // Replace with your actual test ID

    expect(image).toBeTruthy(); // Assert that the image element is present
  });
});
