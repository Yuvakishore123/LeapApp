import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FilterScreen from 'screens/BorrowerScreens/FilterScreen/FilterScreen';
import useFilterScreen from 'screens/BorrowerScreens/FilterScreen/useFilterScreen';
import {useDispatch} from 'react-redux';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('rn-fetch-blob', () => require('rn-fetch-blob-mock'));
jest.mock('@notifee/react-native', () => require('notifee-mocks'));
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
jest.mock('screens/BorrowerScreens/FilterScreen/useFilterScreen', () => ({
  FilterData: jest.fn(), // Mocked OrderProducts array
  minimumPrice: 100, // Mocked orderData object
  maximumPrice: 1000,
  filteredProducts: [],
  setMinimumPrice: jest.fn(),
  setMaximumPrice: jest.fn(),
  size: 'M',
  SetSize: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));

const Stack = createNativeStackNavigator();
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
describe('FilterScreen Screen', () => {
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

  (useFilterScreen as jest.Mock).mockReturnValue({
    useFilterScreen: jest.fn(() => ({
      FilterData: jest.fn(), // Mocked OrderProducts array
      minimumPrice: 100, // Mocked orderData object
      maximumPrice: 1000,
      filteredProducts: [],
      handlePriceChange: () => jest.fn(),
      // setMinimumPrice: jest.fn(),
      // setMaximumPrice: jest.fn(),
      size: 'M',
      SetSize: jest.fn(),
    })),
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockdata = [
    {
      availableQuantities: 5,
      brand: 'Example Brand',
      categoryIds: [1, 2],
      color: 'Red',
      description: 'This is a sample product description.',
      disabled: false,
      disabledQuantities: 0,
      id: 1,
      imageUrl: ['https://example.com/product-image.jpg'],
      material: 'Cotton',
      name: 'Sample Product',
      price: 19.99,
      rentedQuantities: 2,
      size: 'Medium',
      subcategoryIds: [3, 4],
      totalQuantity: 10,
    },
  ];
  it('should render the FilterScreen Screen', () => {
    const filterScreen = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FilterScreen" component={FilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    expect(filterScreen).toBeDefined();
  });
  it('should get the minimum Price', () => {
    const mockMinimumPrice = jest.fn();
    const mockFilterData = jest.fn();
    (useFilterScreen as jest.Mock).mockReturnValue({
      filteredProducts: mockdata,
      FilterData: mockFilterData,
      setMinimumPrice: mockMinimumPrice,
    });
    const {getByPlaceholderText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FilterScreen" component={FilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const minimumPrice = getByPlaceholderText('Enter Minimum Price');
    expect(minimumPrice).toBeDefined();
    fireEvent.changeText(minimumPrice, '100');
    expect(mockMinimumPrice).toHaveBeenCalledWith('100');
  });
  it('should get the maximum Price', () => {
    const mockMaximumPrice = jest.fn();
    const mockFilterData = jest.fn();
    (useFilterScreen as jest.Mock).mockReturnValue({
      filteredProducts: mockdata,
      FilterData: mockFilterData,
      setMaximumPrice: mockMaximumPrice,
    });
    const {getByPlaceholderText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FilterScreen" component={FilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const maximumPrice = getByPlaceholderText('Enter Maximum Price');
    expect(maximumPrice).toBeDefined();
    fireEvent.changeText(maximumPrice, '1000');
    expect(mockMaximumPrice).toHaveBeenCalledWith('1000');
  });
  it('should get the Size which is selected', () => {
    const mockSelectSize = jest.fn();
    const mockFilterData = jest.fn();
    (useFilterScreen as jest.Mock).mockReturnValue({
      filteredProducts: mockdata,
      FilterData: mockFilterData,
      SetSize: mockSelectSize,
    });

    const {getByPlaceholderText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FilterScreen" component={FilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const selectedSize = getByPlaceholderText('Enter Size');
    expect(selectedSize).toBeDefined();
    fireEvent.changeText(selectedSize, 'Small');
    expect(mockSelectSize).toHaveBeenCalledWith('Small');
  });
  it('should get the Data After details are selected is selected ', async () => {
    const mockProductsData = [
      {
        id: '1', // Replace with actual product data
        imageUrl: ['url'], // Replace with actual data
        name: 'Product 1', // Replace with actual data
        brand: 'Brand 1', // Replace with actual data
        price: 100, // Replace with actual data
      },
      {
        id: '2', // Replace with actual product data
        imageUrl: ['url'], // Replace with actual data
        name: 'Product ', // Replace with actual data
        brand: 'Brand 1', // Replace with actual data
        price: 100, // Replace with actual data
      },
    ];

    const mockFilterData = jest.fn();
    (useFilterScreen as jest.Mock).mockReturnValue({
      filteredProducts: mockdata,
      FilterData: mockFilterData,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="FilterScreen" component={FilterScreen} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const FilterButton = getByTestId('Filter-Button');
    expect(FilterButton).toBeTruthy();
    fireEvent.press(FilterButton);

    mockdata.forEach(product => {
      const ImageComponent = getByTestId(`Image-${product.id}`);
      expect(ImageComponent).toBeDefined();
      const Name = getByTestId(`Name-${product.id}`);
      expect(Name).toBeDefined();
      const Brand = getByTestId(`Brand-${product.id}`);
      expect(Brand).toBeDefined();
      const Price = getByTestId(`price-${product.id}`);
      expect(Price).toBeDefined();
    });
  });
});
