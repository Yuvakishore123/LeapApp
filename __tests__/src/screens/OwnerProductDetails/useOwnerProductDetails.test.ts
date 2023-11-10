import {act, renderHook} from '@testing-library/react-native';
import useOProductDetails from 'screens/OwnerScreens/OwnerProductdetailsPage/useOProductDetails';
jest.mock('rn-fetch-blob', () => require('rn-fetch-blob-mock'));
jest.mock('@notifee/react-native', () => require('notifee-mocks'));
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

const mockAddListener = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  const mockRoute = {
    params: {
      product: [{}],
    },
  };
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNavigate,
      goBack: mockNavigate,
      // Add other navigation properties and methods as needed
    }),
    useRoute: () => mockRoute,
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
describe('useOwnerProductDetails', () => {
  const mockProduct = {
    name: 'Sample Product',
    imageUrl: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    price: 100.0,
    description: 'This is a sample product description.',
  };
  const mockRoute = {
    params: {
      product: mockProduct,
    },
  };

  it('should render the useOwnerDetails Screen', () => {
    const {result} = renderHook(() =>
      useOProductDetails({
        route: mockRoute,
        navigation: {goBack: mockNavigate},
      }),
    );
    expect(result).toBeDefined();
  });
  it('should navigate back when clicked on habdleBack ', () => {
    const {result} = renderHook(() =>
      useOProductDetails({
        route: mockRoute,
        navigation: {goBack: mockNavigate},
      }),
    );
    act(() => {
      result.current.goBack();
    });
    expect(mockNavigate).toBeCalled();
  });
});
