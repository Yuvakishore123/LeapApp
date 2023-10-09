import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {useDispatch} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CategoryProducts from 'screens/CategoryProducts/CategoryProducts';
import useCategoryProducts from 'screens/CategoryProducts/useCategoryProducts';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

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
jest.mock('screens/CategoryProducts/useCategoryProducts', () => ({
  subcategories: [], // Mocked OrderProducts array
  wishlistList: [], // Mocked orderData object
  toggleWishlist: jest.fn(),
  getContainerStyle: jest.fn(),
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
describe('CategoryProducts Screen', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

    (useCategoryProducts as jest.Mock).mockReturnValue({
      useCategoryProducts: jest.fn(() => ({
        subcategories: [], // Mocked OrderProducts array
        wishlistList: [], // Mocked orderData object
        toggleWishlist: jest.fn(),
        getContainerStyle: jest.fn(),
      })),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockedData = [
    {
      availableQuantities: 0,
      brand: 'MockBrand',
      categoryIds: [1],
      color: 'MockColor',
      description: 'MockDescription',
      disabled: true,
      disabledQuantities: 0,
      id: 1,
      imageUrl: ['https://example.com/mock-image.jpg'],
      material: 'MockMaterial',
      name: 'MockProduct',
      price: 10.99,
      rentedQuantities: 0,
      size: 'MockSize',
      subcategoryIds: [2],
      totalQuantity: 100,
    },
  ];
  const mockWishlist = [1, 2, 3];

  it('should render the CategoryProducts Screen', () => {
    const route = {
      params: {
        subcategoryId: '123', // Provide a valid subcategoryId here
      },
    };

    const categoryProducts = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CategoryProducts"
            component={CategoryProducts}
            initialParams={route.params}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(categoryProducts).toBeDefined();
  });
  it('should render the Empty Screen in the CategoryProducts Screen', () => {
    (useCategoryProducts as jest.Mock).mockReturnValue({
      subcategories: [], // Mocked OrderProducts array
      wishlistList: [], // Mocked orderData object
      toggleWishlist: jest.fn(),
    });
    const route = {
      params: {
        subcategoryId: '123', // Provide a valid subcategoryId here
      },
    };

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CategoryProducts"
            component={CategoryProducts}
            initialParams={route.params}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const EmptyText = getByTestId('products-available');
    expect(EmptyText).toBeDefined();
  });
  it('should render the Data in the CategoryProducts Screen', () => {
    (useCategoryProducts as jest.Mock).mockReturnValue({
      subcategories: mockedData, // Mocked OrderProducts array
      wishlistList: [], // Mocked orderData object
      toggleWishlist: jest.fn(),
    });
    const route = {
      params: {
        subcategoryId: '123', // Provide a valid subcategoryId here
      },
    };

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CategoryProducts"
            component={CategoryProducts}
            initialParams={route.params}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const categoryProduct = getByTestId('product-button-1');
    expect(categoryProduct).toBeDefined();
  });
  it('should navigate when clicked on the button  in the CategoryProducts Screen', () => {
    (useCategoryProducts as jest.Mock).mockReturnValue({
      subcategories: mockedData, // Mocked OrderProducts array
      wishlistList: [], // Mocked orderData object
      toggleWishlist: jest.fn(),
    });
    const route = {
      params: {
        subcategoryId: '123', // Provide a valid subcategoryId here
      },
    };

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CategoryProducts"
            component={CategoryProducts}
            initialParams={route.params}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const categoryProduct = getByTestId('product-button-1');
    expect(categoryProduct).toBeDefined();
    fireEvent.press(categoryProduct);
    expect(mockNav).toHaveBeenCalledWith('UProductDetails', {
      product: mockedData[0],
    });
  });
  it('should navigate when clicked on the name& price container  in the CategoryProducts Screen', () => {
    (useCategoryProducts as jest.Mock).mockReturnValue({
      subcategories: mockedData, // Mocked OrderProducts array
      wishlistList: [], // Mocked orderData object
      toggleWishlist: jest.fn(),
    });
    const route = {
      params: {
        subcategoryId: '123', // Provide a valid subcategoryId here
      },
    };

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CategoryProducts"
            component={CategoryProducts}
            initialParams={route.params}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const categoryProduct = getByTestId('product-Button-1');
    expect(categoryProduct).toBeDefined();
    fireEvent.press(categoryProduct);
    expect(mockNav).toHaveBeenCalledWith('UProductDetails', {
      product: mockedData[0],
    });
  });
  it('should render  name in the CategoryProducts Screen', () => {
    (useCategoryProducts as jest.Mock).mockReturnValue({
      subcategories: mockedData, // Mocked OrderProducts array
      wishlistList: [], // Mocked orderData object
      toggleWishlist: jest.fn(),
    });
    const route = {
      params: {
        subcategoryId: '123', // Provide a valid subcategoryId here
      },
    };

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CategoryProducts"
            component={CategoryProducts}
            initialParams={route.params}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const categoryName = getByTestId('product-name-MockProduct');
    expect(categoryName).toBeDefined();
  });
  it('should add to wishlist when clicked', () => {
    const mocktoggleWishlist = jest.fn();
    (useCategoryProducts as jest.Mock).mockReturnValue({
      subcategories: mockedData, // Mocked OrderProducts array
      wishlistList: mockWishlist, // Mocked orderData object
      toggleWishlist: mocktoggleWishlist,
    });
    const route = {
      params: {
        subcategoryId: '123', // Provide a valid subcategoryId here
      },
    };

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="CategoryProducts"
            component={CategoryProducts}
            initialParams={route.params}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const wishlistButton = getByTestId('wishlist-1');
    expect(wishlistButton).toBeDefined();
    fireEvent.press(wishlistButton);
    expect(mocktoggleWishlist).toBeCalledWith(1);
  });
});
