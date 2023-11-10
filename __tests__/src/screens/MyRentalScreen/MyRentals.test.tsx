import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import OwnerHome from 'screens/OwnerScreens/My Rentals/MyRentals';
import Usemyrental from 'screens/OwnerScreens/My Rentals/Usemyrental';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});

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
jest.mock('screens/OwnerScreens/My Rentals/Usemyrental', () => ({
  products: {},
  default: jest.fn(),
  __esModule: true,
}));

const Stack = createNativeStackNavigator();
const mockNav = jest.fn();
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      goBack: mockGoBack,
    }),
  };
});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
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
describe('MyRentals Screen', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Product 1',
      imageUrl: ['https://example.com/image1.jpg'],
      price: 10,
    },
  ];
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (Usemyrental as jest.Mock).mockReturnValue({
      Usemyrental: jest.fn(() => ({
        products: {},
      })),
    });
    useSelector.mockImplementation(selector =>
      selector({
        products: {data: mockProducts},
      }),
    );
  });
  it('should render the MyRentals Screen', () => {
    // Define a mock route with the necessary params

    const result = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OwnerHome" component={OwnerHome} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(result).toBeDefined();
  });
  it('should render Data in the the MyRentals Screen', () => {
    (Usemyrental as jest.Mock).mockReturnValue({
      products: mockProducts,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OwnerHome" component={OwnerHome} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const cardContainer = getByTestId('Cart-container-1');
    expect(cardContainer).toBeDefined();
    fireEvent.press(cardContainer);
    expect(mockNav).toHaveBeenCalledWith('OproductDetails', {
      product: mockProducts[0],
    });
  });
  it('should go Back when back Button is clicked', () => {
    (Usemyrental as jest.Mock).mockReturnValue({
      products: mockProducts,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OwnerHome" component={OwnerHome} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const backButton = getByTestId('Back-Button');
    expect(backButton).toBeDefined();
    fireEvent.press(backButton);
    expect(mockGoBack).toHaveBeenCalled();
  });
});
