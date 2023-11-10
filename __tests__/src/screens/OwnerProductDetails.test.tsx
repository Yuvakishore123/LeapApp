import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';

import {store} from '../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OproductDetails from 'screens/OwnerScreens/OwnerProductdetailsPage/OproductDetails';
jest.mock('rn-fetch-blob', () => require('rn-fetch-blob-mock'));
jest.mock('@notifee/react-native', () => require('notifee-mocks'));
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

const Stack = createNativeStackNavigator();
const mockAddListener = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNavigate,
      // Add other navigation properties and methods as needed
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
describe('OwnerProduct DetailsPage Screen', () => {
  const mockProduct = {
    name: 'Sample Product',
    imageUrl: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    price: 100.0,
    description: 'This is a sample product description.',
  };
  it('should render the OwnerProduct DetailsPage Screen', () => {
    const mockRoute = {
      params: {
        product: mockProduct,
      },
    };

    const mockNavigation = {
      // Define any navigation functions or properties your component uses
      navigate: jest.fn(),
      // Add other mock functions or properties as needed
    };

    const ownerHome = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="OproductDetails">
              {() => (
                <OproductDetails
                  route={mockRoute}
                  navigation={mockNavigation}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(ownerHome).toBeDefined();
  });
  it('should display images of productsin the OwnerProduct DetailsPage Screen', () => {
    const mockRoute = {
      params: {
        product: mockProduct,
      },
    };

    const mockNavigation = {
      // Define any navigation functions or properties your component uses
      navigate: jest.fn(),
      goBack: jest.fn(),
      // Add other mock functions or properties as needed
    };

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="OproductDetails">
              {() => (
                <OproductDetails
                  route={mockRoute}
                  navigation={mockNavigation}
                />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const ImageComponent = getByTestId(
      'product-image-https://example.com/image1.jpg',
    );
    expect(ImageComponent).toBeDefined();
    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);
    expect(mockNavigation.goBack).toBeCalled();
  });
});