import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from 'screens/Home/Homescreen';
import useHome from 'screens/Home/useHome';
import {postProductToAPI} from '../../../src/redux/actions/actions';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/in-app-messaging', () =>
  require('@react-native-firebase'),
);
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      addListener: jest.fn(),
    }),
  };
});
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
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
jest.mock('screens/Home/useHome', () => ({
  onRefresh: jest.fn(),
  refreshing: false,
  name: 'John Doe', // Replace with your mock data
  searchQuery: '',
  searchResults: [],
  setSearchResults: jest.fn(),
  searchProducts: jest.fn(),
  setSearchQuery: jest.fn(),
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
  wishlistremove: jest.fn(),
  allProducts: [],
  pageError: '',
  IsError: null,
  handleEndReached: jest.fn(),
  productsData: [],
  default: jest.fn(),
  __esModule: true,
}));

describe('Home Page', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useHome as jest.Mock).mockReturnValue({
      onRefresh: jest.fn(),
      refreshing: false,
      name: 'John Doe', // Replace with your mock data
      searchQuery: '',
      searchResults: [],
      setSearchResults: jest.fn(),
      searchProducts: jest.fn(),
      setSearchQuery: jest.fn(),
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
      wishlistremove: jest.fn(),
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
  });
  test('renders Home correctly', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Homescreen" component={Homescreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeTruthy();
  });
  test('should render flatlist correctly', () => {
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Homescreen" component={Homescreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const flatlist = getByTestId('flatlist');

    expect(flatlist).toBeDefined();
  });
  test('should render searchBar correctly', () => {
    const mockQuery = jest.fn();
    const mockSearch = jest.fn();
    (useHome as jest.Mock).mockReturnValue({
      onRefresh: jest.fn(),
      refreshing: false,
      name: 'John Doe', // Replace with your mock data
      searchQuery: '',
      searchResults: [],
      setSearchResults: jest.fn(),
      searchProducts: mockSearch,
      setSearchQuery: mockQuery,
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
      wishlistremove: jest.fn(),
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
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Homescreen" component={Homescreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const searchBar = getByTestId('searchId');
    act(() => {
      fireEvent.changeText(searchBar, 'gucci');
    });
    expect(mockQuery).toBeCalledWith('gucci');
  });

  test('calls wishlistremove when the button is pressed', () => {
    const Stack = createNativeStackNavigator();
    const mockModal = jest.fn();
    const mockWishlistProducts = [
      {
        id: 1,
        imageUrl: ['https://example.com/product1.jpg'],
        name: 'Product 1',
        price: 100,
      },
      {
        id: 2,
        imageUrl: ['https://example.com/product1.jpg'],
        name: 'Product 2',
        price: 200,
      },
    ];
    (useHome as jest.Mock).mockReturnValue({
      openModal: mockModal,
      isLoading: false,
      allProducts: mockWishlistProducts,
      wishlistList: [1],
      setWishlistList: jest.fn(),
      wishlistremove: jest.fn(),
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Homescreen" component={Homescreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const wishlistButton = getByTestId('wishlistremove-2');
    expect(wishlistButton).toBeTruthy();
    act(() => {
      fireEvent.press(wishlistButton);
    });
    expect(mockDispatch).toBeCalledTimes(5);
  });
  test('should render loading state when isLoading is true', () => {
    const Stack = createNativeStackNavigator();
    const mockModal = jest.fn();
    (useHome as jest.Mock).mockReturnValue({
      openModal: mockModal,
      loading: true,
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Homescreen" component={Homescreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const loading = getByTestId('loading-component');
    expect(loading).toBeDefined();
  });
  test('should navigate to CategoryScreen', () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };
    const mockModal = jest.fn();
    (useHome as jest.Mock).mockReturnValue({
      openModal: mockModal,
      loading: false,
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <Homescreen
          navigation={mockNavigation}
          route={{
            name: '',
          }}
        />
      </Provider>,
    );

    const loading = getByTestId('seeallId');
    act(() => {
      fireEvent.press(loading);
    });
    expect(mockNavigation.navigate).toBeCalledWith('CategoryScreen');
  });
  it('should search the query text in the Home Screen', () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };
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
    const {getByTestId} = render(
      <Provider store={store}>
        <Homescreen
          navigation={mockNavigation}
          route={{
            name: '',
          }}
        />
      </Provider>,
    );
    const searchBar = getByTestId('searchId');

    expect(searchBar).toBeDefined();
    fireEvent.changeText(searchBar, 'Gucci');
    expect(mockQuery).toHaveBeenCalledWith('Gucci');
    fireEvent(searchBar, 'submitEditing');
    expect(mockProducts).toHaveBeenCalledWith('Gucci');
  });
  test('should navigate to UProductDetails', () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };
    const mockModal = jest.fn();
    const mockWishlistProducts = [
      {
        id: 1,
        imageUrl: ['https://example.com/product1.jpg'],
        name: 'Product 1',
        price: 100,
      },
    ];
    const mockproducts = {
      id: 1,
      imageUrl: ['https://example.com/product1.jpg'],
      name: 'Product 1',
      price: 100,
    };
    (useHome as jest.Mock).mockReturnValue({
      openModal: mockModal,
      isLoading: false,
      allProducts: mockWishlistProducts,
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <Homescreen
          navigation={mockNavigation}
          route={{
            name: '',
          }}
        />
      </Provider>,
    );

    const loading = getByTestId('productsDetails-1');
    act(() => {
      fireEvent.press(loading);
    });
    expect(mockNavigation.navigate).toBeCalledWith('UProductDetails', {
      product: mockproducts,
    });
  });
  it('should trigger wishlistremove when button is pressed', () => {
    const mockNavigation = {
      navigate: jest.fn(),
    };
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
    const {getByTestId} = render(
      <Provider store={store}>
        <Homescreen
          navigation={mockNavigation}
          route={{
            name: '',
          }}
        />
      </Provider>,
    );

    const button = getByTestId('wishlistremove-1'); // Assuming you have a button with this test ID

    fireEvent.press(button);
    expect(remove).toBeCalledWith(1);
  });
});
