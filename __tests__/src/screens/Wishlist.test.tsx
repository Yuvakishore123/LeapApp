import {act, renderHook, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Wishlist from 'screens/Wishlist/Wishlist';
import useWishlist from 'screens/Wishlist/useWishlist';

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

describe('Wishlist Screen', () => {
  it('should render the Wishlist Screen', () => {
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Wishlist" component={Wishlist} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeDefined();

    // Use waitFor to wait for asynchronous actions to complete
  });
});
describe('useWishlist Screen', () => {
  it('This should open custom modal', () => {
    // Wrap your hook with the Redux Provider
    const {result} = renderHook(() => useWishlist(), {
      // Provide the Redux store as a value for the Provider
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.openModal();
    });

    expect(result.current.showModal).toBe(true);
  });
  it('This should close custom modal', () => {
    // Wrap your hook with the Redux Provider
    const {result} = renderHook(() => useWishlist(), {
      // Provide the Redux store as a value for the Provider
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModal).toBe(false);
  });
  it('This should dispatch  remove from wishlist', () => {
    const mockDispatch = jest.fn();
    const mockItemId = 1;
    // Wrap your hook with the Redux Provider
    const {result} = renderHook(() => useWishlist(), {
      // Provide the Redux store as a value for the Provider
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    result.current.wishlistremove(mockItemId);

    // Wait for the action to complete
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'removefromWishlist/pending', // Replace with your actual action type
          payload: mockItemId,
        }),
      );
    });
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'removefromWishlist/success', // Replace with your actual action type
          payload: mockItemId,
        }),
      );
    });
  });
  it('This should dispatch  fetchwishlist ', async () => {
    const mockDispatch = jest.fn();

    // Wrap your hook with the Redux Provider
    const {result} = renderHook(() => useWishlist(), {
      // Provide the Redux store as a value for the Provider
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });
    expect(result.current.refreshing).toBe(false);
    act(() => {
      result.current.onRefresh();
    });
    expect(result.current.refreshing).toBe(true);
    // Wait for the action to complete
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'fetchWishlistProducts/pending', // Replace with your actual action type
        }),
      );
    });
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'fetchWishlistProducts/success', // Replace with your actual action type
        }),
      );
    });
  });
  it('This should dispatch  fetch wishlist', () => {
    const mockDispatch = jest.fn();
    const mockItemId = 1;
    // Wrap your hook with the Redux Provider
    const {result} = renderHook(() => useWishlist(), {
      // Provide the Redux store as a value for the Provider
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    result.current.wishlistremove(mockItemId);

    // Wait for the action to complete
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'removefromWishlist/pending', // Replace with your actual action type
          payload: mockItemId,
        }),
      );
    });
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'removefromWishlist/success', // Replace with your actual action type
          payload: mockItemId,
        }),
      );
    });
  });
});
