import {render} from '@testing-library/react-native';
import React from 'react';
import {useDispatch} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OwnerRentalScreen from 'screens/OwnerScreens/ownerRentalStatusScreen/ownerRentalScreen';
import useOwnerorderproducts from 'screens/OwnerScreens/ownerRentalStatusScreen/useOwnerorderproducts';

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
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock(
  'screens/OwnerScreens/ownerRentalStatusScreen/useOwnerorderproducts',
  () => ({
    ownerrentalproducts: [],
    default: jest.fn(),
    __esModule: true,
  }),
);

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
describe('OwnerRentalScreen Screen', () => {
  const mockData = [
    {
      id: 1,
      imageUrl: 'https://example.com/product-image.jpg',
      totalPrice: 500,
      name: 'Example Product',
      quantity: 2,
      status: 'Order placed',
      // Change this to 'returned' to test the other condition
    },
    {
      id: 2,
      imageUrl: 'https://example.com/product-image-2.jpg',
      totalPrice: 600,
      name: 'Product 2',
      quantity: 2,
      status: 'Order returned',
    },
  ];
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useOwnerorderproducts as jest.Mock).mockReturnValue({
      useOwnerorderproducts: jest.fn(() => ({
        ownerrentalproducts: [],
      })),
    });
  });
  it('should render the OwnerRentalScreen Screen', () => {
    // Define a mock route with the necessary params

    const result = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="OwnerRentalScreen"
            component={OwnerRentalScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(result).toBeDefined();
  });
  it('should render the Flatlist Data', async () => {
    (useOwnerorderproducts as jest.Mock).mockReturnValue({
      ownerrentalproducts: mockData,
    });
    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="OwnerRentalScreen"
            component={OwnerRentalScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const RentalData = getByTestId('Rental-data');
    expect(RentalData).toBeDefined();
    expect(RentalData.props.data).toEqual(mockData);

    // Check for the presence of an item with testID 'image-1' in the FlatList
    const ItemWithTestId1 = getByTestId('image-1');
    expect(ItemWithTestId1).toBeDefined();
    const ItemId = getByText(' Order Id: 1');
    const orderId = getByTestId('OrderId-1');
    expect(orderId).toBeDefined();
    expect(ItemId).toBeTruthy();
  });
  it('should get the name and Price of Item', async () => {
    (useOwnerorderproducts as jest.Mock).mockReturnValue({
      ownerrentalproducts: mockData,
    });
    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="OwnerRentalScreen"
            component={OwnerRentalScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    // Check for the presence of an item with testID 'image-1' in the FlatList
    const itemPrice = getByTestId('Price-1');
    expect(itemPrice).toBeDefined();
    mockData.forEach(item => {
      const ItemPrice = getByText(`Price: ₹${item.totalPrice}/-`);
      expect(ItemPrice).toBeTruthy();
    });

    const itemName = getByTestId('Name-1');
    expect(itemName).toBeDefined();
    const ItemName = getByText(' Name: Example Product');

    expect(ItemName).toBeTruthy();
  });
});
