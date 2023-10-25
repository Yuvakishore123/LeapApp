import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import SwitchAccountButton from 'components/atoms/SwitchAccountButton/SwtichAccountButton';
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
    useSelector.mockImplementation(selector =>
      selector({
        Rolereducer: 'OWNER',
      }),
    );
    const {getByTestId} = render(<SwitchAccountButton />);
    const ToggleButton = getByTestId('switch-account-button');
    fireEvent.press(ToggleButton);
    const Role = getByTestId('account-type-owner');
    expect(Role).toBeTruthy();
    fireEvent.press(Role);
  });
  it('should toggle the option to Borrower is pressed', async () => {
    useSelector.mockImplementation(selector =>
      selector({
        Rolereducer: 'Borrower',
      }),
    );
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
  it('should toggle the option to Owner when pressed', async () => {
    const {getByTestId, findByTestId, getByText} = render(
      <SwitchAccountButton />,
    );
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

    // Use findByTestId to wait for AccoutType to appear
    const AccoutType = await findByTestId('account-type-owner');
    expect(AccoutType.props.style).toEqual({opacity: 1});
  });
  it('should toggle the option to Borrower when pressed', async () => {
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
    const BorrowerButton = getByTestId('Borrower-Conatiner');
    expect(BorrowerButton.props.style).toStrictEqual({
      alignItems: 'center',
      backgroundColor: '#B8B5FF',
      borderRadius: 15,
      height: 50,
      justifyContent: 'center',
      marginBottom: 3,
      marginTop: 3,
      opacity: 0.7,
      width: 270,
    });

    // Use findByTestId to wait for AccoutType to appear
    const AccoutType = getByTestId('account-type-borrower');

    fireEvent.press(AccoutType);
  });
  it('should toggle the option to Borrower ', async () => {
    const {getByTestId, findByTestId} = render(<SwitchAccountButton />);
    const ToggleButton = getByTestId('switch-account-button');
    fireEvent.press(ToggleButton);

    const AccoutType = await findByTestId('account-type-borrower');
    fireEvent.press(AccoutType);
    // Add your assertions for the AccoutType's style or behavior here...
  });
});
