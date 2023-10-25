import React from 'react';
import {act, fireEvent, renderHook} from '@testing-library/react-native';

import SwitchAccountButton from 'components/atoms/SwitchAccountButton/SwtichAccountButton';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import useSwitchButton from 'components/atoms/SwitchAccountButton/useSwitchAccontButton';
import AsyncStorageWrapper from '../../../../../src/utils/asyncStorage';
import ApiService from 'network/network';
import {url} from 'constants/Apis';

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
    const {result} = renderHook(() => SwitchAccountButton());
    expect(result).toBeDefined();
  });
  it('should Change the role from borrower to owner', () => {
    const {result} = renderHook(() => useSwitchButton());
    act(() => {
      result.current.handlePress();
    });
    expect(result).toBeDefined();
    expect(result.current.showOptions).toBe(true);
  });
  it('should Change the role from owner to borrower', () => {
    const {result} = renderHook(() => useSwitchButton());
    (AsyncStorageWrapper.removeItem as jest.Mock).mockResolvedValue(null);
    const mockValue = [
      {
        headers: {access_token: 'abcdes121'},
      },
    ];
    (ApiService.post as jest.Mock).mockResolvedValue(mockValue);
    act(() => {
      result.current.handleOptionPress('owner');
    });
    expect(ApiService.post).toHaveBeenCalledWith(
      `${url}/user/switch?profile=owner`,
      null,
    );
    expect(result).toBeDefined();
  });
});
