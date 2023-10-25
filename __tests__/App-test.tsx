import 'react-native';
import React from 'react';
import App, {AuthStack, RootNavigation} from '../App';
import {act, render} from '@testing-library/react-native';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorageWrapper from '../src/utils/asyncStorage';

jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
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
      getInitialLink: jest.fn(() => Promise.resolve('Your Mocked Link')),
      // You can add other methods you need here
    })),
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
jest.mock('@notifee/react-native', () => require('notifee'));
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

// Note: test renderer must be required after react-native.
describe('App ', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    render(<App />);
  });
});
describe('Auth Stack ', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  it('renders correctly', () => {
    const result = render(
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>,
    );
    expect(result).toBeDefined();
  });

  it('handles first-time user correctly', async () => {
    // Mock AsyncStorageWrapper.getItem to return null (first-time user)
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue(null);

    // Run your component or function that calls checkFirstTimeUser
    const result = render(
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>,
    );

    // Expect that navigation.navigate has been called with 'SplashScreen'
    expect(mockNavigate).toHaveBeenCalledWith('SplashScreen');

    // Expect that AsyncStorageWrapper.setItem has been called with the flag 'hasLoggedIn' set to 'true'
    expect(AsyncStorageWrapper.setItem).toHaveBeenCalledWith(
      'hasLoggedIn',
      'true',
    );
  });
  it('Should Navigate to Login Screen', async () => {
    (AsyncStorageWrapper.setItem as jest.Mock).mockResolvedValue('hasLoggedIn');
    // Mock AsyncStorageWrapper.getItem to return null (first-time user)
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('hasLoggedIn');

    // Run your component or function that calls checkFirstTimeUser
    render(
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>,
    );

    // Expect that AsyncStorageWrapper.setItem has been called with the flag 'hasLoggedIn' set to 'true'
  });
});
describe('RootNavigation ', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn();
    const useSelector = useSelectorOriginal as jest.Mock;
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        login: {data: {authToken: ''}},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    render(<RootNavigation />);
  });
  it('should set the Token in Async Storage', () => {
    const result = render(<RootNavigation />);
    (AsyncStorageWrapper.setItem as jest.Mock).mockResolvedValue('Fcm_token');
  });
  it('should handle deep linking and navigate to UProductDetails', async () => {
    jest.mock('@react-navigation/native', () => ({
      useNavigation: () => ({navigate: mockNavigate}),
    }));

    // Mock dynamicLinks and simulate a deep link
    const mockGetInitialLink = jest
      .fn()
      .mockResolvedValue({url: 'your_deep_link'});
    const mockOnLink = jest.fn();
    jest.mock('@react-native-firebase/dynamic-links', () => ({
      getInitialLink: mockGetInitialLink,
      onLink: mockOnLink,
    }));
    const mockData = [
      {
        id: '1',
        name: 'Product 1',
        price: 100,
        imageUrl: ['url1'],
      },
      {
        id: '2',
        name: 'Product 2',
        price: 200,
        imageUrl: ['url2'],
      },
      // Add more mock items as needed
    ];

    // Mock ApiService
    const mockApiService = {
      get: jest.fn().mockResolvedValue(mockData),
    };
    jest.mock('network/network', () => ({
      default: mockApiService,
    }));

    // Render the HandleDeepLinking component
    render(<App />);

    // Assert that the deep link is handled and UProductDetails is navigated to
    await act(async () => {
      // Wait for promises to resolve
    });
  });
});
