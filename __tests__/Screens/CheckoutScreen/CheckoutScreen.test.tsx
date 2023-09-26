import React from 'react';
import {render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CheckoutScreen from 'screens/CheckoutScreen/CheckoutScreen';

jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
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
  it('renders CheckoutScreen correctly', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeTruthy();

    // Add similar assertions for other elements as needed
  });
});
