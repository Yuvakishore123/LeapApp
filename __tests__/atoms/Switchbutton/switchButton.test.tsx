import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import SwitchAccountButton from '../../../src/components/atoms/switchButton/SwtichAccountButton';
import useSwitchButton from 'components/atoms/switchButton/useSwitchbutton';
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
jest.mock('components/atoms/switchButton/useSwitchbutton', () => ({
  accountType: 'BORROWER',
  showOptions: true,
  handleOptionPress: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));
describe('SwitchAccountButton', () => {
  beforeEach(() => {
    (useSwitchButton as jest.Mock).mockReturnValue({
      accountType: 'BORROWER',
      showOptions: true,
      handleOptionPress: jest.fn(),
    });
  });
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
    (useSwitchButton as jest.Mock).mockReturnValue({
      accountType: 'OWNER',
      showOptions: true,
      handleOptionPress: jest.fn(),
    });
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
