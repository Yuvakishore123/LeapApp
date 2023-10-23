import React from 'react';
import {renderHook} from '@testing-library/react-native';

import SwitchAccountButton from 'components/atoms/SwtichAccountButton';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

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
});
