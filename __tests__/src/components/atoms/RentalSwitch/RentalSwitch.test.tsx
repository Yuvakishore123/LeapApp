import {fireEvent, render} from '@testing-library/react-native';
import OwnerRentalSwitch from 'components/atoms/OwnerRentalSwitch';
import React from 'react';
import {useDispatch} from 'react-redux';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('Rental Switch', () => {
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  it('should render the rental switch', () => {
    const result = render(<OwnerRentalSwitch />);
    expect(result).toBeDefined();
  });
  it('should select the tab on the rental switch', () => {
    const {getByTestId} = render(<OwnerRentalSwitch />);
    const selectedtab = getByTestId('switch-Button');
    expect(selectedtab).toBeDefined();
    fireEvent.press(selectedtab);
    expect(mockDispatch).toBeCalled();
  });
  it('should select the rented products switch', () => {
    const {getByTestId} = render(<OwnerRentalSwitch />);
    const selectedtab = getByTestId('Rented-Button');
    expect(selectedtab).toBeDefined();
    fireEvent.press(selectedtab);
    expect(mockDispatch).toBeCalled();
  });
});
