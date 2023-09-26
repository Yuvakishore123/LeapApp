import React from 'react';
import {render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from 'screens/Home/Homescreen';

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
describe('Home Page', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  test('renders Home correctly', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Homescreen" component={Homescreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeTruthy();
  });
});
