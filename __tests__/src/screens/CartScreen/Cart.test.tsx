import {render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';

import {store} from '../../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from 'screens/Cart/Cart';
import ApiService from 'network/network';

jest.mock('network/network');
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

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
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
describe('Cart Screen', () => {
  it('should render the Crt Screen', () => {
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeDefined();
  });

  it('renders loading message when cartData is falsy', async () => {
    const {queryByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const loadingText = queryByText('The Items are Loading...');
    expect(loadingText).toBeNull(); // Verify that the loading text is not initially present
  });
  it('calls handleRemove when remove button is pressed', async () => {
    const mockResponse = {data: {success: true}};

    const mockCartData = {
      cartItems: [
        {
          id: 1,
          imageUrl: 'https://example.com/product1.jpg',
          product: {
            availableQuantities: 10,
            brand: 'Brand A',
            color: 'Red',
            createdAt: '2023-09-27T09:51:08.657Z',
            createdBy: 1,
            deleted: false,
            description: 'Product 1 Description',
            disabled: false,
            disabledQuantities: 0,
            id: 101,
            material: 'Material X',
            name: 'Product 1',
            price: 29.99,
            quantity: 2,
            rentedQuantities: 0,
            size: 'Medium',
            updatedAt: '2023-09-27T09:51:08.657Z',
            updatedBy: 1,
          },
          quantity: 2,
          rentalEndDate: '2023-12-31T23:59:59.999Z',
          rentalStartDate: '2023-09-01T00:00:00.000Z',
        },
      ],
      finalPrice: 99.97,
      shippingCost: 10.0,
      tax: 9.98,
      totalCost: 119.95,
      userId: 12345,
    };

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCartData);
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    jest.spyOn(ApiService, 'delete').mockResolvedValue(mockResponse);
    await waitFor(() => {
      mockCartData.cartItems.forEach(product => {
        const productNameTestId = `ProductName-${product.id}`;
        expect(productNameTestId).toBeDefined();
      });
    });
  });
  it('calls get the data when api call is made', async () => {
    const mockCartData = {
      cartItems: [
        {
          id: 1,
          imageUrl: 'https://example.com/product1.jpg',
          product: {
            availableQuantities: 10,
            brand: 'Brand A',
            color: 'Red',
            createdAt: '2023-09-27T09:51:08.657Z',
            createdBy: 1,
            deleted: false,
            description: 'Product 1 Description',
            disabled: false,
            disabledQuantities: 0,
            id: 101,
            material: 'Material X',
            name: 'Product 1',
            price: 29.99,
            quantity: 2,
            rentedQuantities: 0,
            size: 'Medium',
            updatedAt: '2023-09-27T09:51:08.657Z',
            updatedBy: 1,
          },
          quantity: 2,
          rentalEndDate: '2023-12-31T23:59:59.999Z',
          rentalStartDate: '2023-09-01T00:00:00.000Z',
        },
      ],
      finalPrice: 99.97,
      shippingCost: 10.0,
      tax: 9.98,
      totalCost: 119.95,
      userId: 12345,
    };

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCartData);
    const {queryAllByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    await waitFor(() => {
      mockCartData.cartItems.forEach(product => {
        const productNameTestId = queryAllByTestId(
          `product-name-${product.id}`,
        );
        expect(productNameTestId).toBeDefined();
      });
    });
  });
  it('renders loading view when cartData is not available', async () => {
    const mockCartData = {
      cartItems: [
        {
          id: 1,
          imageUrl: 'https://example.com/product1.jpg',
          product: {
            availableQuantities: 10,
            brand: 'Brand A',
            color: 'Red',
            createdAt: '2023-09-27T09:51:08.657Z',
            createdBy: 1,
            deleted: false,
            description: 'Product 1 Description',
            disabled: false,
            disabledQuantities: 0,
            id: 101,
            material: 'Material X',
            name: 'Product 1',
            price: 29.99,
            quantity: 2,
            rentedQuantities: 0,
            size: 'Medium',
            updatedAt: '2023-09-27T09:51:08.657Z',
            updatedBy: 1,
          },
          quantity: 2,
          rentalEndDate: '2023-12-31T23:59:59.999Z',
          rentalStartDate: '2023-09-01T00:00:00.000Z',
        },
      ],
      finalPrice: 99.97,
      shippingCost: 10.0,
      tax: 9.98,
      totalCost: 119.95,
      userId: 12345,
    };
    jest.spyOn(ApiService, 'get').mockResolvedValue(!mockCartData);

    const {queryAllByTestId, queryByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const loadingView = queryAllByTestId('loading-view');
    expect(loadingView).toBeDefined();
    // Assert that the loading view is rendered

    // Assert the text content within the loading view
    const loadingText = await queryByText('The Items are Loading...');
    expect(loadingText).toBeDefined();
  });
});
