import React from 'react';
import {render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OwnerRentalScreen from 'screens/ownerRentalStatusScreen/ownerRentalScreen';

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
describe('OwnerRentalStatusScreen Page', () => {
  beforeEach(() => {
    AsyncStorage.clear();
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
});
