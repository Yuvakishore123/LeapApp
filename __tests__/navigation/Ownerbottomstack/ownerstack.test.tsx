import {NavigationContainer} from '@react-navigation/native';
import {boolean} from 'yup';
import Ownerstack from '../../../src/navigation/Ownerbottomtab/Ownerstack';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('react-native-razorpay', () => {
  return {
    open: jest.fn().mockResolvedValue({
      razorpay_payment_id: 'your_mocked_payment_id',
    }),
  };
});
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('network/network');
jest.mock('rn-fetch-blob', () => ({
  fetch: jest.fn(), // Mock the fetch method
}));
jest.mock('@react-native-firebase/in-app-messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/dynamic-links', () =>
  require('@react-native-firebase'),
);
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

describe('MyStack Component', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    useSelector.mockImplementation(selector =>
      selector({
        profileData: {
          data: {},
        },
        UserProducts: {
          data: {},
          isError: {},
          firstCallLoading: boolean,
        },
        WishlistProducts: {
          data: [],
          isError: {},
        },
        category: {
          data: {},
          loading: {},
        },
        cartUpdate: {
          error: false,
          isLoader: {},
        },
        Rolereducer: {
          role: 'string',
        },
        CartProducts: {
          data: {},
        },
        products: {
          data: [],
        },
        OwnerRentalproducts: {
          data: {},
        },
        GenderReducer: {
          data: {},
        },
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders Ownerstack errors', () => {
    const result = render(
      <NavigationContainer>
        <Ownerstack />
      </NavigationContainer>,
    );
    expect(result).toBeDefined();
  });
  it('renders Home stack without errors', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Ownerstack />
      </NavigationContainer>,
    );
    const homescreen = getByTestId('Home'); // You can set a testID in your CategoryScreen component
    fireEvent.press(homescreen);
    expect(homescreen).toBeTruthy();
  });
  it('renders Additems stack without errors', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Ownerstack />
      </NavigationContainer>,
    );
    const AdditemTab = getByTestId('Additem'); // You can set a testID in your CategoryScreen component
    fireEvent.press(AdditemTab);
    expect(AdditemTab).toBeTruthy();
  });
  it('renders RentalstatusScreen stack without errors', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Ownerstack />
      </NavigationContainer>,
    );
    const RentalstatusTab = getByTestId('RentalStatus'); // You can set a testID in your CategoryScreen component
    fireEvent.press(RentalstatusTab);
    expect(RentalstatusTab).toBeTruthy();
  });
  it('renders ownerprofile stack without errors', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Ownerstack />
      </NavigationContainer>,
    );
    const ownerprofileTab = getByTestId('ProfileScreen'); // You can set a testID in your CategoryScreen component
    fireEvent.press(ownerprofileTab);
    expect(ownerprofileTab).toBeTruthy();
  });
});
