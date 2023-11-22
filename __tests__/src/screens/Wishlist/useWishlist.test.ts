import {act, renderHook, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import useWishlist from 'screens/BorrowerScreens/Wishlist/useWishlist';

import Toast from 'react-native-toast-message';

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

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockAddListener = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNavigate,
      // Add other navigation properties and methods as needed
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
describe('useWishlist', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        WishlistProducts: {data: [], error: true},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render use Wishlist ', () => {
    const result = renderHook(() => useWishlist());
    expect(result).toBeDefined();
  });
  it('This should close custom modal', () => {
    const {result} = renderHook(() => useWishlist());
    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModal).toBe(false);
  });
  it('should showToast when error occured', async () => {
    const {result} = renderHook(() => useWishlist());
    const toastShowMock = jest.spyOn(Toast, 'show');

    await act(() => {
      result.current.showToast();
    });
    await waitFor(() => {
      expect(toastShowMock).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Error in wishlist cart',
      });
    });
    if (result.current.isError) {
      expect(toastShowMock).toBeCalled();
    }
  });
  it('This should open custom modal', () => {
    // Wrap your hook with the Redux Provider
    const {result} = renderHook(() => useWishlist());

    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.openModal();
    });

    expect(result.current.showModal).toBe(true);
  });
  it('should onRefresh when on refresh is called', async () => {
    const {result} = renderHook(() => useWishlist());

    await act(() => {
      result.current.onRefresh();
    });
    await waitFor(() => {
      expect(result.current.refreshing).toBe(false);
    });
  });
  it('should dispatch remove from wishlist', async () => {
    const {result} = renderHook(() => useWishlist());
    const mockId = '2';
    await act(() => {
      result.current.wishlistremove(mockId);
    });
    expect(mockDispatch).toBeCalled();
  });
});
