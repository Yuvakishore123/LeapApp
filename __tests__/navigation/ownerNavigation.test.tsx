import React from 'react';
import {render} from '@testing-library/react-native';
import OwnerNavigation from '../../src/navigation/OwnerNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/dynamic-links', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
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
jest.mock('@react-native-firebase/crashlytics', () =>
  require('@react-native-firebase'),
);
jest.mock('react-native-razorpay', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    open: jest.fn().mockResolvedValue({
      razorpay_payment_id: 'your_mocked_payment_id',
    }),
  };
});
jest.mock('@react-native-firebase/in-app-messaging', () =>
  require('@react-native-firebase'),
);
// Mock useSelector to provide a role
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('OwnerNavigation Component', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(selector =>
      selector({
        Rolereducer: {role: null},
        profileData: {data: {}},
        UserProducts: {data: {}},
        WishlistProducts: {data: {}},
        category: {data: {}},
        products: {data: {}},
      }),
    );
  });
  it('renders Ownerstack when role is OWNER', () => {
    (useSelector as jest.Mock).mockImplementation(selector =>
      selector({
        Rolereducer: {role: 'OWNER'},
        profileData: {data: {}},
        UserProducts: {data: {}},
        WishlistProducts: {data: {}},
        category: {data: {}},
        products: {data: {}},
      }),
    );
    const result = render(
      <NavigationContainer>
        <OwnerNavigation />
      </NavigationContainer>,
    );

    expect(result).toBeDefined();
  });
  it('renders Ownerstack when role is BRROWER', () => {
    (useSelector as jest.Mock).mockImplementation(selector =>
      selector({
        Rolereducer: {role: 'BORROWER'},
        profileData: {data: {}},
        UserProducts: {data: {}},
        WishlistProducts: {data: {}},
        category: {data: {}},
        products: {data: {}},
      }),
    );
    const result = render(
      <NavigationContainer>
        <OwnerNavigation />
      </NavigationContainer>,
    );

    expect(result).toBeDefined();
  });
});
