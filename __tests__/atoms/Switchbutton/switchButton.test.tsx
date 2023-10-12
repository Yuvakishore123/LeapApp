import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import SwitchAccountButton from '../../../src/components/atoms/switchButton/SwtichAccountButton';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
describe('SwitchAccountButton', () => {
  test('renders without errors', () => {
    render(<SwitchAccountButton />);
  });
  test('should handle handleOptionsPress of borrower without errors', () => {
    const {getByTestId} = render(<SwitchAccountButton />);
    const switchButton = getByTestId('switch-account-button');
    act(() => {
      fireEvent.press(switchButton);
    });
    const borrowerButton = getByTestId('account-type-borrower');
    act(() => {
      fireEvent.press(borrowerButton);
    });
    expect(borrowerButton).toBeDefined();
  });
  test('should handle handleOptionsPress of owner without errors', () => {
    const {getByTestId} = render(<SwitchAccountButton />);
    const switchButton = getByTestId('switch-account-button');
    act(() => {
      fireEvent.press(switchButton);
    });
    const ownerButton = getByTestId('account-type-owner');
    act(() => {
      fireEvent.press(ownerButton);
    });
    expect(ownerButton).toBeDefined();
  });
});
