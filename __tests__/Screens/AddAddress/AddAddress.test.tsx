import React from 'react';
import {render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Owneraddaddress from '../../../src/screens/Owneraddaddress/AddAddress';

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
describe('SignUpScreen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  it('renders correctly AddAddress Screen', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
});
