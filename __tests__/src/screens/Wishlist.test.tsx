import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import Wishlist from 'screens/Wishlist/Wishlist';
import useWishlist from 'screens/Wishlist/useWishlist';

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
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNavigate,
      // Add other navigation properties and methods as needed
    }),
  };
});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('screens/Wishlist/useWishlist', () => ({
  WishlistProducts: [],
  wishlistremove: jest.fn(),
  closeModal: jest.fn(),
  showModal: false, // You can set this to true if needed
  openModal: jest.fn(),
  refreshing: false,
  onRefresh: jest.fn(),
  isLoading: false,
  default: jest.fn(),
  __esModule: true,
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

describe('Wishlist Screen', () => {
  const mockWishlistProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 50,
      imageUrl: ['image_url_1'],
    },
    {
      id: 2,
      name: 'Product 2',
      price: 75,
      imageUrl: ['image_url_2'],
    },
    // Add more products as needed
  ];

  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useWishlist as jest.Mock).mockReturnValue({
      WishlistProducts: [],
      wishlistremove: jest.fn(),
      closeModal: jest.fn(),
      showModal: false, // You can set this to true if needed
      openModal: jest.fn(),
      refreshing: false,
      onRefresh: jest.fn(),
      isLoading: false,
    });
    useSelector.mockImplementation(selector =>
      selector({
        WishlistProducts: {data: [], error: false},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the Wishlist Screen', () => {
    const result = render(<Wishlist />);
    expect(result).toBeDefined();
  });
  it('should render the Loading Component ', () => {
    (useWishlist as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    const {getByTestId} = render(<Wishlist />);
    const loadingComponent = getByTestId('loading-Component');
    expect(loadingComponent).toBeDefined();
  });
  it('should render the Empty Component ', () => {
    (useWishlist as jest.Mock).mockReturnValue({
      isLoading: false,
    });
    const {getByTestId} = render(<Wishlist />);
    const emptyComponent = getByTestId('wishlist-Loading');
    expect(emptyComponent).toBeDefined();
  });
  it('should render the Data in the screen ', () => {
    useSelector.mockImplementation(selector =>
      selector({
        WishlistProducts: {data: mockWishlistProducts, error: false},
      }),
    );
    (useWishlist as jest.Mock).mockReturnValue({
      isLoading: false,
      WishlistProducts: mockWishlistProducts,
    });
    const {getByTestId, getByText} = render(<Wishlist />);
    const cardComponent = getByTestId('wishlist-Button-1');
    expect(cardComponent).toBeDefined();
    const wishlistProduct = getByText('Product 1');
    expect(wishlistProduct).toBeDefined();
    fireEvent.press(cardComponent);
    expect(mockNavigate).toHaveBeenCalledWith('UProductDetails', {
      product: mockWishlistProducts[0],
    });
  });
  it('should remove wishlist after clicking on button ', () => {
    const mockwishlistRemove = jest.fn();
    useSelector.mockImplementation(selector =>
      selector({
        WishlistProducts: {data: mockWishlistProducts, error: false},
      }),
    );
    (useWishlist as jest.Mock).mockReturnValue({
      isLoading: false,
      WishlistProducts: mockWishlistProducts,
      wishlistremove: mockwishlistRemove,
    });
    const {getByTestId} = render(<Wishlist />);
    const removeFromWishlist = getByTestId('Wishlist-remove-1');
    expect(removeFromWishlist).toBeDefined();

    fireEvent.press(removeFromWishlist);
    expect(mockwishlistRemove).toHaveBeenCalled();
  });
});
