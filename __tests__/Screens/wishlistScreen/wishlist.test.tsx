import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import Wishlist from '../../../src/screens/Wishlist/Wishlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../../../src/redux/store';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('Wishlist Screen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  test('should render the Wishlist page correctly', () => {
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Wishlist navigation={jest.fn()} route={{name: ''}} />
        </NavigationContainer>
      </Provider>,
    );

    // Add your assertions to check if the Wishlist page renders correctly
    expect(result).toBeTruthy();
    // ... add more assertions based on your component's structure
  });
});
