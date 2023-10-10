import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import Wishlist from 'screens/Wishlist/Wishlist';
import useWishlist from 'screens/Wishlist/useWishlist';
import {NavigationContainer} from '@react-navigation/native';
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('screens/Wishlist/useWishlist', () => ({
  refreshing: false,
  setRefreshing: jest.fn(),
  imageLoaded: false,
  setImageLoaded: jest.fn(),
  showModal: false,
  openModal: jest.fn(),
  closeModal: jest.fn(),
  wishlistremove: jest.fn(),
  WishlistProducts: [],
  allWishlistProducts: [],
  isLoading: false,
  colorScheme: 'light',
  onRefresh: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));
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
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: jest.fn(),
      navigate: mockNav,
      // Add other navigation properties and methods as needed
    }),
  };
});
describe('OwnerImages Screen', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useWishlist as jest.Mock).mockReturnValue({
      refreshing: false,
      setRefreshing: jest.fn(),
      imageLoaded: false,
      setImageLoaded: jest.fn(),
      showModal: false,
      openModal: jest.fn(),
      closeModal: jest.fn(),
      wishlistremove: jest.fn(),
      WishlistProducts: [
        {
          id: 1,
          imageUrl: ['https://example.com/product1.jpg'],
          name: 'Product 1',
          price: 100,
        },
      ],
      allWishlistProducts: [
        {
          id: 1,
          imageUrl: ['https://example.com/product1.jpg'],
          name: 'Product 1',
          price: 100,
        },
      ],
      isLoading: false,
      colorScheme: 'light',
      onRefresh: jest.fn(),
    });
  });
  it('renders correctly', () => {
    const result = render(
      <NavigationContainer>
        <Wishlist
          route={{
            name: '',
          }}
          navigation={undefined}
        />
        ,
      </NavigationContainer>,
    );

    expect(result).toBeTruthy();
  });
  it('renders dark mode correctly', () => {
    (useWishlist as jest.Mock).mockReturnValue({
      refreshing: false,
      setRefreshing: jest.fn(),
      imageLoaded: false,
      setImageLoaded: jest.fn(),
      showModal: false,
      openModal: jest.fn(),
      closeModal: jest.fn(),
      wishlistremove: jest.fn(),
      WishlistProducts: [
        {
          id: 1,
          imageUrl: ['https://example.com/product1.jpg'],
          name: 'Product 1',
          price: 100,
        },
      ],
      allWishlistProducts: [
        {
          id: 1,
          imageUrl: ['https://example.com/product1.jpg'],
          name: 'Product 1',
          price: 100,
        },
      ],
      isLoading: false,
      colorScheme: 'dark',
      onRefresh: jest.fn(),
    });
    const result = render(
      <NavigationContainer>
        <Wishlist
          route={{
            name: '',
          }}
          navigation={undefined}
        />
        ,
      </NavigationContainer>,
    );

    expect(result).toBeTruthy();
  });
  test('renders loading state correctly', () => {
    (useWishlist as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
      </NavigationContainer>,
    );
    const loadingText = getByText('The Items are Loading...');
    const lottieAnimation = getByTestId('loadingAnimation'); // Assuming you have a testID on the Lottie animation element

    expect(loadingText).toBeTruthy();
    expect(lottieAnimation).toBeTruthy();
  });
  it('renders the image', () => {
    const {getAllByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
      </NavigationContainer>,
    );
    const image = getAllByTestId('wishlist-image');

    expect(image).toBeTruthy();
  });
  test('calls wishlistremove when the button is pressed', () => {
    const mockModal = jest.fn();
    const mockWishlistProducts = [
      {
        id: 1,
        imageUrl: ['https://example.com/product1.jpg'],
        name: 'Product 1',
        price: 100,
      },
    ];
    (useWishlist as jest.Mock).mockReturnValue({
      openModal: mockModal,
      isLoading: false,
      WishlistProducts: mockWishlistProducts,
      allWishlistProducts: mockWishlistProducts,
      wishlistremove: jest.fn(),
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
      </NavigationContainer>,
    );

    const wishlistButton = getByTestId('wishlist-button');
    expect(wishlistButton).toBeTruthy();
    act(() => {
      fireEvent.press(wishlistButton);
    });
    expect(mockModal).toBeCalled();
  });
  test('renders empty state correctly', () => {
    (useWishlist as jest.Mock).mockReturnValue({
      isLoading: false,
      WishlistProducts: [],
      allWishlistProducts: [],
      colorScheme: 'dark',
    });
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
      </NavigationContainer>,
    );
    const loadingText = getByText('Your wishlist is empty');
    const lottieAnimation = getByTestId('empty-animation'); // Assuming you have a testID on the Lottie animation element

    expect(loadingText).toBeTruthy();
    expect(lottieAnimation).toBeTruthy();
  });
  test('renders empty state in dark mode correctly', () => {
    (useWishlist as jest.Mock).mockReturnValue({
      isLoading: false,
      WishlistProducts: [],
      allWishlistProducts: [],
    });
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
      </NavigationContainer>,
    );
    const loadingText = getByText('Your wishlist is empty');
    const lottieAnimation = getByTestId('empty-animation'); // Assuming you have a testID on the Lottie animation element

    expect(loadingText).toBeTruthy();
    expect(lottieAnimation).toBeTruthy();
  });
  test('navigates to UProductDetailsScreen when TouchableOpacity is pressed', () => {
    const mockNavigate = jest.fn();
    const mockWishlistProducts = [
      {
        id: 1,
        imageUrl: ['https://example.com/product1.jpg'],
        name: 'Product 1',
        price: 100,
      },
    ];
    (useWishlist as jest.Mock).mockReturnValue({
      isLoading: false,
      WishlistProducts: mockWishlistProducts,
      allWishlistProducts: mockWishlistProducts,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: mockNavigate}} route={{name: ''}} />
      </NavigationContainer>,
    );

    const touchableOpacity = getByTestId('wishlist-touchable');
    fireEvent.press(touchableOpacity);

    expect(mockNavigate).toHaveBeenCalledWith('UProductDetails', {
      product: mockWishlistProducts[0],
    });
  });
});
