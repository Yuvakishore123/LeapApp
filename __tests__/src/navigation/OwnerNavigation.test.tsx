import {render} from '@testing-library/react-native';
import React from 'react';
import OwnerNavigation from '../../../src/navigation/OwnerNavigation';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-native-razorpay', () => {
  return {
    open: jest.fn().mockResolvedValue({
      razorpay_payment_id: 'your_mocked_payment_id',
    }),
  };
});
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('rn-fetch-blob', () => ({
  fetch: jest.fn(), // Mock the fetch method
}));
const mockAddListener = jest.fn();
const mockNavigate = jest.fn();
const mockIsFocused = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNavigate,
    }),
    useIsFocused: () => ({
      isFocused: mockIsFocused,
    }),
  };
});
jest.mock('network/network');
jest.mock('victory-native', () => ({
  VictoryChart: jest.fn().mockReturnValue(null), // Mock the VictoryChart component
  VictoryBar: jest.fn().mockReturnValue(null), // Mock the VictoryBar component
  VictoryAxis: jest.fn().mockReturnValue(null), // Mock the VictoryAxis component
  VictoryLabel: jest.fn().mockReturnValue(null), // Mock the VictoryLabel component
}));
jest.mock('@notifee/react-native', () => require('notifee'));
describe('OwnerNavigation', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    useSelector.mockImplementation(selector =>
      selector({
        profileData: {
          data: {},
        },
        products: {
          data: [],
          isError: {},
          firstCallLoading: false,
        },
        WishlistProducts: {
          data: [],
          isError: {},
        },
        category: {
          data: {},
          loading: {},
        },
        CartProducts: {
          data: [],
          error: false,
          isLoader: {},
        },
        cartUpdate: {
          error: false,
          isLoader: {},
        },
        Rolereducer: {
          role: 'string',
        },
        UserProducts: {
          data: [],
        },
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the OwnerNavigation', () => {
    const result = render(
      <NavigationContainer>
        <OwnerNavigation />
      </NavigationContainer>,
    );
    expect(result).toBeTruthy();
  });
  it('should check if owner or not', () => {
    useSelector.mockImplementation(selector =>
      selector({
        Rolereducer: {
          role: 'OWNER',
        },
        UserProducts: {
          data: [],
        },
        profileData: {
          data: [],
        },
        products: {
          data: [],
        },
      }),
    );
    const result = render(
      <NavigationContainer>
        <OwnerNavigation />
      </NavigationContainer>,
    );
    expect(result).toBeTruthy();
  });
});
