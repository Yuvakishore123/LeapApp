import React from 'react';
import {render} from '@testing-library/react-native';

import {NavigationContainer} from '@react-navigation/native';
import Subcategory from 'screens/Subcategory/Subcategory';
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('Subcategory', () => {
  it('renders subcategories', () => {
    const result = render(
      <NavigationContainer>
        <Subcategory route={{params: {categoryId: '123'}}} />
      </NavigationContainer>,
    );
    expect(result).toBeDefined();
  });

  test('renders loading animation when loading is true', async () => {
    const {queryByTestId} = render(
      <NavigationContainer>
        <Subcategory route={{params: {categoryId: '123'}}} loading={true} />
      </NavigationContainer>,
    );

    const loadingAnimation = queryByTestId('loading-animation');
    expect(loadingAnimation).toBeTruthy();
  });
});
