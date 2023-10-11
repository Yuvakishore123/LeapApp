import {act, renderHook, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useOwnerHome from 'screens/OwnerHomepage/useOwnerHome';

import ApiService from 'network/network';
jest.mock('network/network');

jest.mock('rn-fetch-blob', () => require('rn-fetch-blob-mock'));
jest.mock('@notifee/react-native', () => require('notifee-mocks'));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
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

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
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
describe('useownerHome', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        products: {data: []},
        profileData: {data: []},
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render useHook in  OwnerhomeScreen', () => {
    const {result} = renderHook(() => useOwnerHome());
    expect(result).toBeTruthy();
  });
  it('should  refresh when on refresh is clicked', () => {
    const {result} = renderHook(() => useOwnerHome());
    expect(result.current.refreshing).toBe(false);
    act(() => {
      result.current.onRefresh();
    });
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
      expect(result.current.refreshing).toBe(false);
    });
  });
  it('should  navigate to Additems when clicked', () => {
    const {result} = renderHook(() => useOwnerHome());
    expect(result.current.refreshing).toBe(false);
    act(() => {
      result.current.handleAdditems();
    });
    expect(mockNavigate).toHaveBeenCalledWith('Additems');
  });
  it('should  navigate to MyRentals when clicked', async () => {
    const {result} = renderHook(() => useOwnerHome());

    act(() => {
      result.current.handleMyrentals();
    });
    expect(mockNavigate).toHaveBeenCalledWith('MyRentals');
  });
  it('should  navigate to DashboardDetails when clicked', async () => {
    const {result} = renderHook(() => useOwnerHome());

    act(() => {
      result.current.handleAnalatyics();
    });
    expect(mockNavigate).toHaveBeenCalledWith('DashboardDetails');
  });
  it('should  get The recently added details', async () => {
    const mockProducts = [
      {
        id: '1',
        name: 'Product 1',
        imageUrl: ['https://example.com/image1.jpg'],
        price: 10,
      },
    ];

    const {result} = renderHook(() => useOwnerHome());
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockProducts);

    act(() => {
      result.current.fetchRecentlyAdded();
    });
    waitFor(() => {
      expect(result.current.recentyAdded).toBe(mockProducts);
      expect(result.current.isloading).toBe(false);
    });
  });
});
