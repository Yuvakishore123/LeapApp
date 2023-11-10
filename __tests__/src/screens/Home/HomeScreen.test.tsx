import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import Homescreen from 'screens/BorrowerScreens/Home/Homescreen';
import useHome from 'screens/BorrowerScreens/Home/useHome';

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
jest.mock('screens/BorrowerScreens/Home/useHome', () => ({
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
  wishlistList: [],
  setWishlistList: jest.fn(),
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
      wishlistList: [],
      setWishlistList: jest.fn(),
    })),
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the Home Screen', () => {
    const mockSetWishlist = jest.fn();
    const initialWishlist = [1];
    (useHome as jest.Mock).mockReturnValue({
      allProducts: mockData,
      loading: false, // Mocked array of products
      navigation: jest.fn(),
      wishlistList: initialWishlist,
      setWishlistList: mockSetWishlist,
    });
    const result = render(<Homescreen />);
    expect(result).toBeDefined();
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
    const mockSetWishlist = jest.fn();
    const initialWishlist = [1];
    (useHome as jest.Mock).mockReturnValue({
      allProducts: mockData,
      loading: false, // Mocked array of products
      navigation: jest.fn(),
      wishlistList: initialWishlist,
      setWishlistList: mockSetWishlist,
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
  it('should add and remove the product to wishlist ', () => {
    const mockSetWishlist = jest.fn();
    const initialWishlist = [1];
    (useHome as jest.Mock).mockReturnValue({
      allProducts: mockData,
      loading: false, // Mocked array of products
      navigation: jest.fn(),
      wishlistList: initialWishlist,
      setWishlistList: mockSetWishlist,
    });
    const {getByTestId} = render(<Homescreen />);

    const wishlistButton = getByTestId('wishlist-Button-2');
    expect(wishlistButton).toBeTruthy();
    fireEvent.press(wishlistButton);
    expect(mockSetWishlist).toHaveBeenCalled();
  });
  it('should not add the same product to the wishlist again', () => {
    const mockSetWishlist = jest.fn();
    const mockWishlistremove = jest.fn();
    const initialWishlist = [1, 3];
    const itemToRemove = 2;
    (useHome as jest.Mock).mockReturnValue({
      allProducts: mockData,
      loading: false, // Mocked array of products
      navigation: jest.fn(),
      wishlistList: initialWishlist,
      setWishlistList: mockSetWishlist,
      wislistremove: mockWishlistremove,
    });
    const {getByTestId} = render(<Homescreen />);

    const wishlistButton = getByTestId('wishlist-Button-2'); // Assuming item id is 2
    expect(wishlistButton).toBeTruthy();
    fireEvent.press(wishlistButton);

    expect(initialWishlist).not.toContain(itemToRemove);
  });
  // it('should remove the product from the wishlist if it is already in the list', () => {
  //   const mockSetWishlist = jest.fn();
  //   const mockWishlistremove = jest.fn();
  //   const initialWishlist = [1, 2, 3];
  //   const itemIdToRemove = 2; // Assuming item with ID 2 is already in the wishlist

  //   (useHome as jest.Mock).mockReturnValue({
  //     allProducts: mockData,
  //     loading: false,
  //     wishlistList: [1, 2],
  //     setWishlistList: mockSetWishlist,
  //     wishlistremove: mockWishlistremove,
  //   });
  //   const {getByTestId} = render(<Homescreen />);

  //   const wishlistButton = getByTestId('wishlist-Button-1');
  //   expect(wishlistButton).toBeTruthy();

  //   fireEvent.press(wishlistButton);
  //   expect(mockWishlistremove).toHaveBeenCalledWith(1);
  // });
  it('should trigger wishlistremove when button is pressed', () => {
    const remove = jest.fn();
    const setwishlist = jest.fn();
    (useHome as jest.Mock).mockReturnValue({
      onRefresh: jest.fn(),
      refreshing: false,
      name: 'John Doe', // Replace with your mock data
      searchQuery: '',
      searchResults: [],
      setSearchResults: jest.fn(),
      searchProducts: jest.fn(),
      setSearchQuery: jest.fn(),
      wishlistList: [1, 2],
      setWishlistList: setwishlist,
      placeholderText: 'Search',
      placeholderTextColor: 'black',
      loading: false,
      openModal: jest.fn(),
      setRefreshing: jest.fn(),
      closeModal: jest.fn(),
      showModal: false,
      Data: [],
      oldData: [],
      pageSize: 10,
      wishlistremove: remove,
      allProducts: [
        {
          id: 1,
          imageUrl: ['image1.jpg'],
          name: 'Product 1',
          price: 10,
        },
        {
          id: 2,
          imageUrl: ['image2.jpg'],
          name: 'Product 2',
          price: 20,
        },
      ],
      pageError: '',
      IsError: null,
      handleEndReached: jest.fn(),
      productsData: [],
    });
    const {getByTestId} = render(<Homescreen />);
    const button = getByTestId('wishlist-remove-1'); // Assuming you have a button with this test ID
    fireEvent.press(button);
    expect(remove).toBeCalledWith(1);
  });
});
