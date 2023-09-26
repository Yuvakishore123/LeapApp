import React from 'react';
import {render} from '@testing-library/react-native';
import OwnerProfile from '../../../src/screens/Ownerprofile/OwnerProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('OwnerProfile', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test('should render OwnerProfile correctly', () => {
    const Stack = createNativeStackNavigator();
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Test for the presence of specific elements or text
    expect(result).toBeDefined();

    // Add more assertions as needed to test the rendering of your component
  });
});
