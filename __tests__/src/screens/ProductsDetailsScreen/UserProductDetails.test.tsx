import {render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';

import {store} from '../../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UDetailScreen from 'screens/UProductDetails/UProductDetails';

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
jest.mock('@react-native-firebase/dynamic-links', () =>
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
describe('useProductdetails Screen', () => {
  it('should render the useProductdetails Screen', () => {
    // Define a mock route with the necessary params
    const route = {
      params: {
        subcategoryId: '123', // Provide a valid subcategoryId here
      },
    };

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="useProductdetails"
              component={UDetailScreen}
              initialParams={route}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeDefined();
  });
});
