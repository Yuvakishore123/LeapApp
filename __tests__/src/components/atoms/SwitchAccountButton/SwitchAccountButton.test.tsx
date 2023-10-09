import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SwitchAccountButton from 'components/atoms/SwtichAccountButton';
import {Store, AnyAction} from 'redux';
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage');
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

const mockStore = configureStore([]);

describe('SwitchAccountButton', () => {
  let store: Store<unknown, AnyAction>;

  beforeEach(() => {
    store = mockStore({
      Rolereducer: {
        role: 'OWNER',
      },
    });

    jest.clearAllMocks(); // Reset mocked functions before each test
  });

  it('should render the component', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <SwitchAccountButton />
      </Provider>,
    );

    expect(getByTestId('switch-account-button')).toBeTruthy();
  });

  it('should toggle the options when the button is pressed', () => {
    const {getByTestId, queryByTestId} = render(
      <Provider store={store}>
        <SwitchAccountButton />
      </Provider>,
    );

    fireEvent.press(getByTestId('switch-account-button'));

    expect(queryByTestId('account-type-borrower')).toBeTruthy();

    fireEvent.press(getByTestId('switch-account-button'));

    expect(queryByTestId('account-type-borrower')).toBeFalsy();
  });
});
