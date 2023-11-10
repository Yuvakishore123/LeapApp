import {renderHook} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import {act} from 'react-test-renderer';

import useFilteredAnalytics from 'screens/OwnerScreens/FilteredAnalytics/useFilteredAnalytics';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('react-native-razorpay', () => require('razorpay-mock'));
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

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});
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
describe('useFiltered Analytics Screen', () => {
  const mockDispatch = jest.fn();
  const mockChartData = [
    {
      month: '2023-01',
      rentals: 1000,
    },
    {
      month: '2023-02',
      rentals: 1200,
    },
    {
      month: '2023-03',
      rentals: 800,
    },
    // Add more data points as needed
  ];
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        FliterAnalyticsData: {data: null},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render filtered Analytics', () => {
    const {result} = renderHook(() => useFilteredAnalytics());
    jest.useFakeTimers();
    expect(result).toBeDefined();
  });
  it('should render data in the  Analytics', () => {
    useSelector.mockImplementation(selector =>
      selector({
        FliterAnalyticsData: {data: mockChartData},
      }),
    );
    const {result} = renderHook(() => useFilteredAnalytics());
    act(() => {
      result.current.handleChartData();
    });
  });
  it('should handle the end date', () => {
    useSelector.mockImplementation(selector =>
      selector({
        FliterAnalyticsData: {data: mockChartData},
      }),
    );
    const {result} = renderHook(() => useFilteredAnalytics());
    act(() => {
      result.current.handleEndDateChange('14');
    });
    expect(result.current.endDate).toBe('14');
  });
  it('generated keys should be unique', () => {
    const keys = new Set();
    const {result} = renderHook(() => useFilteredAnalytics());
    const numKeys = 1000; // You can adjust the number of keys to generate
    for (let i = 0; i < numKeys; i++) {
      const key = result.current.generateKey();
      keys.add(key);
    }
    expect(keys.size).toBe(numKeys);
  });
});
