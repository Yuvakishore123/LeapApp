import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import Homescreen from 'screens/Home/Homescreen';
import useHome from 'screens/Home/useHome';

jest.mock('@react-native-community/netinfo', () =>
  require('react-native-netinfo'),
);
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/in-app-messaging', () =>
  require('react-native-firebase-mock'),
);

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock the react-native-skeleton-placeholder package
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});

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
jest.mock('screens/Home/useHome', () => ({
  __esModule: true,
  default: jest.fn(),
  wishlistremove: jest.fn(),
  searchQuery: 'mockedSearchQuery',
  searchProducts: jest.fn(),
  setSearchQuery: jest.fn(),
  placeholderText: 'mockedPlaceholderText',
  placeholderTextColor: 'mockedPlaceholderTextColor',
  loading: false, // You can set this to true for loading scenarios
  closeModal: jest.fn(),
  showModal: jest.fn(),
  name: 'mockedName',
  handleEndReached: jest.fn(),
  allProducts: [], // Mocked array of products
  navigation: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
describe('Home Screen', () => {
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
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    useSelector.mockImplementation(selector =>
      selector({
        profileData: {
          data: [],
        },
        UserProducts: {
          data: [],
        },
        WishlistProducts: {
          data: [],
        },
        category: {
          data: [],
        },
      }),
    );
  });
  (useHome as jest.Mock).mockReturnValue({
    useHome: jest.fn(() => ({
      wishlistremove: jest.fn(),
      searchQuery: 'mockedSearchQuery',
      searchProducts: jest.fn(),
      setSearchQuery: jest.fn(),
      placeholderText: 'mockedPlaceholderText',
      placeholderTextColor: 'mockedPlaceholderTextColor',
      loading: false, // You can set this to true for loading scenarios
      closeModal: jest.fn(),
      showModal: jest.fn(),
      name: 'mockedName',
      handleEndReached: jest.fn(),
      allProducts: [], // Mocked array of products
      navigation: jest.fn(),
    })),
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the Home Screen', () => {
    const result = render(<Homescreen />);
    expect(result).toBeDefined();
  });
  it('should render the empty Screen ', () => {
    (useHome as jest.Mock).mockReturnValue({
      allProducts: false, // Mocked array of products
      navigation: jest.fn(),
    });
    const {getByTestId} = render(<Homescreen />);
    const EmptyComponent = getByTestId('EmptyState');
    expect(EmptyComponent).toBeDefined();
  });
  it('should render the Data in the Home Screen', () => {
    (useHome as jest.Mock).mockReturnValue({
      allProducts: [],
      name: {
        firstName: 'John',
      },

      loading: false, // Mocked array of products
      navigation: jest.fn(),
    });
    const {getByTestId, getByText} = render(<Homescreen />);
    const NameComponent = getByTestId('First-Name');
    const renderedName = getByText('Welcome John');
    expect(NameComponent).toBeDefined();
    expect(renderedName).toBeTruthy();
  });
  it('should search the query text in the Home Screen', () => {
    const mockQuery = jest.fn();
    const mockProducts = jest.fn();
    (useHome as jest.Mock).mockReturnValue({
      allProducts: [],
      name: {
        firstName: 'John',
      },

      loading: false, // Mocked array of products
      navigation: jest.fn(),
      searchQuery: 'Gucci',
      setSearchQuery: mockQuery,
      searchProducts: mockProducts,
    });
    const {getByTestId} = render(<Homescreen />);
    const searchBar = getByTestId('Search-text');

    expect(searchBar).toBeDefined();
    fireEvent.changeText(searchBar, 'Gucci');
    expect(mockQuery).toHaveBeenCalledWith('Gucci');
    fireEvent(searchBar, 'submitEditing');
    expect(mockProducts).toHaveBeenCalledWith('Gucci');
  });
  it('should navigate to the Categories Screen', () => {
    const mockQuery = jest.fn();
    const mockProducts = jest.fn();
    (useHome as jest.Mock).mockReturnValue({
      allProducts: [],
      name: {
        firstName: 'John',
      },

      loading: false, // Mocked array of products
      navigation: jest.fn(),
      searchQuery: 'Gucci',
      setSearchQuery: mockQuery,
      searchProducts: mockProducts,
    });
    const {getByTestId} = render(<Homescreen />);
    const categoriesButton = getByTestId('Categories-Button');

    expect(categoriesButton).toBeDefined();
    fireEvent.press(categoriesButton);
    expect(mockNav).toHaveBeenCalledWith('CategoryScreen');
  });
  it('should render the Products in the Home Screen ', () => {
    (useHome as jest.Mock).mockReturnValue({
      allProducts: mockData,
      loading: false, // Mocked array of products
      navigation: jest.fn(),
    });
    const {getByTestId} = render(<Homescreen />);
    const FlatListComponent = getByTestId('FlatList');
    expect(FlatListComponent).toBeDefined();
    const cardContainer = getByTestId('cardContainer-1');
    expect(cardContainer).toBeTruthy();
    fireEvent.press(cardContainer);
    expect(mockNav).toHaveBeenCalledWith('UProductDetails', {
      product: mockData[0],
    });
    const wishlistButton = getByTestId('wishlist-Button-1');
    expect(wishlistButton).toBeTruthy();
    fireEvent.press(wishlistButton);
  });
  it('should render the skeleton loader in the Home Screen ', () => {
    (useHome as jest.Mock).mockReturnValue({
      allProducts: mockData,
      loading: true, // Mocked array of products
      navigation: jest.fn(),
    });
    const result = render(<Homescreen />);
    expect(result).toBeDefined();
  });
});
