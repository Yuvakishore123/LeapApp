import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';

import {store} from '../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PaymentSuccessScreen from 'screens/Common/PaymentScreens/PaymentSuccessScreen';

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
describe('PaymentSuccessScreen Screen', () => {
  it('should render the PaymentSuccessScreen Screen', () => {
    // Define a mock route with the necessary params

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OwnerRentalScreen"
              component={PaymentSuccessScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeDefined();
  });
  it('should navigate the Order Screen', () => {
    // Define a mock route with the necessary params

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OwnerRentalScreen"
              component={PaymentSuccessScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const yourrderButton = getByTestId('YourOrder-Button');
    expect(yourrderButton).toBeDefined();
    fireEvent.press(yourrderButton);
    expect(mockNav).toHaveBeenCalledWith('ProfileScreen', {screen: 'MyOrder'});
  });
  it('should navigate to the Home Screen', () => {
    // Define a mock route with the necessary params

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="OwnerRentalScreen"
              component={PaymentSuccessScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const yourrderButton = getByTestId('Home-Button');
    expect(yourrderButton).toBeDefined();
    fireEvent.press(yourrderButton);
    expect(mockNav).toHaveBeenCalledWith('UserHomescreen', {
      screen: 'Homescreen',
    });
  });
});
