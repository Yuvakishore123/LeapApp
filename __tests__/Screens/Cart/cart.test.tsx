import {render} from '@testing-library/react-native';
import Cart from '../../../src/screens/Cart/Cart';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
jest.mock('../../../src/network/network');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const mockNavigation = {
    navigate: mockNavigate,
    addListener: jest.fn(),
  };
  return {
    useNavigation: () => mockNavigation,
  };
});
describe('Cart Screen', () => {
  const result = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );
  it('Cart Screen should render correctly', () => {
    expect(result).toBeTruthy();
  });
});
