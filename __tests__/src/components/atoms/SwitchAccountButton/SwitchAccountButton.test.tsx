import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import SwitchAccountButton from 'components/atoms/SwtichAccountButton';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import ApiService from 'network/network';
import AsyncStorageWrapper from '../../../../../src/utils/asyncStorage';

jest.mock('../../../../../src/utils/asyncStorage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('network/network');

jest.mock('@react-native-async-storage/async-storage');
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

describe('SwitchAccountButton', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

    useSelector.mockImplementation(selector =>
      selector({
        Rolereducer: 'Owner',
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the component', () => {
    const {getByTestId} = render(<SwitchAccountButton />);

    expect(getByTestId('switch-account-button')).toBeTruthy();
  });

  it('should toggle the options when the button is pressed', () => {
    const {getByTestId, queryByTestId} = render(<SwitchAccountButton />);

    fireEvent.press(getByTestId('switch-account-button'));

    expect(queryByTestId('account-type-borrower')).toBeTruthy();

    fireEvent.press(getByTestId('switch-account-button'));

    expect(queryByTestId('account-type-borrower')).toBeFalsy();
  });
  it('should toggle the option to Owner is pressed', () => {
    const {getByTestId} = render(<SwitchAccountButton />);
    const ToggleButton = getByTestId('switch-account-button');
    fireEvent.press(ToggleButton);
    const Role = getByTestId('account-type-owner');
    expect(Role).toBeTruthy();
    fireEvent.press(Role);
  });
  it('should toggle the option to Borrower is pressed', async () => {
    const {getByTestId, getByText} = render(<SwitchAccountButton />);
    const mockData = {
      status: 200,
      headers: {
        access_token: 'newAccessToken',
      },
    };
    (ApiService.post as jest.Mock).mockResolvedValue(mockData);

    // Find the button for toggling the role
    const ToggleButton = getByTestId('switch-account-button');

    // Simulate a press on the button
    fireEvent.press(ToggleButton);

    // Find the "Borrower" role button
    const RoleBorrower = getByTestId('account-type-borrower');
    (AsyncStorageWrapper.setItem as jest.Mock).mockResolvedValue(
      mockData.headers.access_token,
    );

    // Simulate a press on the "Borrower" role button
    fireEvent.press(RoleBorrower);
    const AccountType = getByText('Borrower');
    expect(AccountType).toBeTruthy();
  });
  it('should toggle the option to Owner  is pressed', async () => {
    const {getByTestId} = render(<SwitchAccountButton />);
    const mockData = {
      status: 200,
      headers: {
        access_token: 'newAccessToken',
      },
    };
    (ApiService.post as jest.Mock).mockResolvedValue(mockData);

    // Find the button for toggling the role
    const ToggleButton = getByTestId('switch-account-button');

    // Simulate a press on the button
    fireEvent.press(ToggleButton);

    // Find the "Borrower" role button
    const RoleBorrower = getByTestId('account-type-owner');

    // Simulate a press on the "Borrower" role button
    fireEvent.press(RoleBorrower);
  });
});
