import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-native-razorpay', () => {
  return {
    open: jest.fn().mockResolvedValue({
      razorpay_payment_id: 'your_mocked_payment_id',
    }),
  };
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
jest.mock('@notifee/react-native', () => require('notifee'));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('rn-fetch-blob', () => ({
  fetch: jest.fn(), // Mock the fetch method
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
const mockAddListener = jest.fn();
const mockNavigate = jest.fn();
const mockIsFocused = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNavigate,
    }),
    useIsFocused: () => ({
      isFocused: mockIsFocused,
    }),
  };
});

import MyStack from '../../../src/navigation/Userbottomtab/UserStack';
import {NavigationContainer} from '@react-navigation/native';
import {boolean} from 'yup';

describe('MyStack Component', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    useSelector.mockImplementation(selector =>
      selector({
        profileData: {
          data: {},
        },
        UserProducts: {
          data: {},
          isError: {},
          firstCallLoading: boolean,
        },
        WishlistProducts: {
          data: [],
          isError: {},
        },
        category: {
          data: {},
          loading: {},
        },
        CartProducts: {
          data: [],
          error: false,
          isLoader: {},
        },
        cartUpdate: {
          error: false,
          isLoader: {},
        },
        Rolereducer: {
          role: 'string',
        },
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders MyStack errors', () => {
    const result = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );
    expect(result).toBeDefined();
  });

  it('renders Category stack without errors', async () => {
    const {getByTestId, getByLabelText} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );

    // Check if the CategoryScreen component renders correctly
    const categoryScreen = getByTestId('categoryTab'); // You can set a testID in your CategoryScreen component
    fireEvent.press(categoryScreen);
    await waitFor(() => {
      // Adjust the text if needed
      expect(getByLabelText('Category, tab, 2 of 5')).toBeTruthy();
      expect(getByLabelText('Wishlist, tab, 3 of 5')).toBeTruthy();
      expect(getByLabelText('Cart, tab, 4 of 5')).toBeTruthy();
      expect(getByLabelText('Profile, tab, 5 of 5')).toBeTruthy();
    });
    expect(categoryScreen).toBeTruthy();
  });

  it('renders Cart stack without errors', () => {
    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );

    // Simulate clicking on the CategoryScreen tab

    // Check if the CategoryScreen component renders correctly

    const cartTab = getByTestId('Cart-tab'); // You can set a testID in your CategoryScreen component
    fireEvent.press(cartTab);
    expect(cartTab).toBeTruthy();
  });
  it('renders Wishlist stack without errors', () => {
    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );

    const WishlistScreen = getByTestId('Wishlits-Tab'); // You can set a testID in your CategoryScreen component
    fireEvent.press(WishlistScreen);
    expect(WishlistScreen).toBeTruthy();
  });
  it('renders ProfileScreen stack without errors', () => {
    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );

    const ProfileTab = getByTestId('Profile-tab'); // You can set a testID in your CategoryScreen component
    fireEvent.press(ProfileTab);
    expect(ProfileTab).toBeTruthy();
  });
  it('renders Home tab with null tabBarIcon when not focused', () => {
    // Arrange
    const {getByTestId, queryByTestId} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );

    // Simulate clicking on the Home tab
    const homeTab = getByTestId('Home-tab'); // Adjust testID as needed

    // Act
    fireEvent.press(homeTab);

    // Assert
    // Ensure that the tabBarIcon is not in the DOM when not focused
    expect(queryByTestId('homeTabBarIcon')).toBeNull();
  });
  it('renders Category tab with icon when not focused', () => {
    // Arrange
    const {getByTestId, queryByTestId} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );

    // Simulate clicking on the Category tab
    const categoryTab = getByTestId('categoryTab'); // Adjust testID as needed

    // Act
    fireEvent.press(categoryTab);
    expect(categoryTab).toBeDefined();

    // Assert
    // Ensure that the tabBarIcon is not in the DOM when not focused
    expect(queryByTestId('categoryTabBarIcon')).toBeNull();
  });
  it('renders Home tab with icon ', () => {
    // Arrange
    const {getByTestId, queryByTestId} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );

    // Simulate clicking on the Category tab
    const home = getByTestId('Home-tab'); // Adjust testID as needed

    // Act
    fireEvent.press(home);

    expect(home).toBeDefined();
  });
  it('renders Category stack ', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );
    const categoryScreen = getByTestId('categoryTab'); // You can set a testID in your CategoryScreen component
    fireEvent.press(categoryScreen);
    expect(categoryScreen).toBeTruthy();
  });
  it('renders Cart stack', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );
    // Simulate clicking on the CategoryScreen tab
    // Check if the CategoryScreen component renders correctly
    const categoryScreen = getByTestId('Cart-tab'); // You can set a testID in your CategoryScreen component
    fireEvent.press(categoryScreen);
    expect(categoryScreen).toBeTruthy();
  });
  it('renders Wishlist stack ', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );
    const WishlistScreen = getByTestId('Wishlits-Tab'); // You can set a testID in your CategoryScreen component
    fireEvent.press(WishlistScreen);
    expect(WishlistScreen).toBeTruthy();
  });
  it('renders ProfileScreen stack ', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>,
    );
    const WishlistScreen = getByTestId('Profile-tab'); // You can set a testID in your CategoryScreen component
    fireEvent.press(WishlistScreen);
    expect(WishlistScreen).toBeTruthy();
  });
});