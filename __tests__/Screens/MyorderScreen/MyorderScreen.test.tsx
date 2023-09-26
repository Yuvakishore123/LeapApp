import {Provider} from 'react-redux';
import MyOrder from '../../../src/screens/MyOrder/MyOrder';
import {render} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import React from 'react';

jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
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
describe('My Order Screen', () => {
  const result = render(
    <Provider store={store}>
      <MyOrder />
    </Provider>,
  );

  it('Should render My order screen', async () => {
    expect(result).toBeTruthy();
  });
});
