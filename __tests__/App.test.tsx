import 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import App from '../App';
import {render, waitFor} from '@testing-library/react-native';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-navigation-shared-element', () => {
  return {
    createSharedElementStackNavigator: jest.fn(),
  };
});

jest.mock('react-native-razorpay', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    open: jest.fn().mockResolvedValue({
      razorpay_payment_id: 'your_mocked_payment_id',
    }),
  };
});
jest.mock('@react-native-firebase/dynamic-links', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    dynamicLinks: jest.fn(() => ({
      getInitialLink: jest.fn().mockResolvedValue({
        url: 'http://example.com/product?id=123',
      }),
      // You can add other methods you need here
    })),
  };
});
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/in-app-messaging', () =>
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
jest.mock('rn-fetch-blob', () => ({
  fetch: jest.fn(), // Mock the fetch method
}));
jest.mock('@react-native-firebase/messaging', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    messaging: jest.fn(() => ({
      onTokenRefresh: jest.fn(),
      setBackgroundMessageHandler: jest.fn(),
    })),
  };
});

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
describe('App.tsx file', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  let mockAxios: {restore: () => void};

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterAll(() => {
    mockAxios.restore();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('render the App.tsx file correctly', () => {
    const result = render(<App />);
    expect(result).toBeDefined();
  });
});
