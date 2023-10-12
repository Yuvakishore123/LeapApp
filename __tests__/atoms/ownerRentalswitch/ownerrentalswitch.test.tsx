import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import OwnerRentalSwitch from '../../../src/components/atoms/OwnerRentalSwitch';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));
// Mocking Redux store
const mockStore = configureStore([]);
const store = mockStore({});

describe('OwnerRentalSwitch', () => {
  it('renders correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <OwnerRentalSwitch />
      </Provider>,
    );

    // Check if the component renders correctly
    expect(getByText('Ordered')).toBeTruthy();
    expect(getByText('Returned')).toBeTruthy();
  });

  it('changes tab on press', () => {
    const {getByText} = render(
      <Provider store={store}>
        <OwnerRentalSwitch />
      </Provider>,
    );

    // Click on the "Returned" tab
    fireEvent.press(getByText('Returned'));
  });

  // Add more test cases as needed
});
