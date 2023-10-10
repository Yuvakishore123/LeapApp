import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homescreen from 'screens/Home/Homescreen';
import useHome from 'screens/Home/useHome';

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
  test('should navigate to CategoryScreen correctly', () => {
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
  test('should render loading correctly', () => {
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
    const loading = getByTestId('searchId');
    expect(loading).toBeDefined();
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
    ];
    (useHome as jest.Mock).mockReturnValue({
      openModal: mockModal,
      isLoading: false,
      allProducts: mockWishlistProducts,
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

    const wishlistButton = getByTestId('wishlistremove-1');
    expect(wishlistButton).toBeTruthy();
    act(() => {
      fireEvent.press(wishlistButton);
    });
    const wishlist = getByTestId('wishlistheart-1');
    expect(wishlist).toBeDefined();
  });
});
