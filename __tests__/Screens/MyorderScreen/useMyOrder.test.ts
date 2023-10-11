import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook, waitFor} from '@testing-library/react-native';
import {useDispatch, useSelector} from 'react-redux';
import useMyOrder from 'screens/MyOrder/useMyOrder';
jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/dynamic-links', () =>
  require('@react-native-firebase'),
);
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('network/network');
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../src/redux/slice/editProfileSlice', () => ({
  updateProfile: jest.fn(),
}));

const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      addListener: jest.fn(),
    }),
    useIsFocused: jest.fn().mockReturnValue(true),
  };
});
describe('useOwnerEditprofile', () => {
  const mockDispatch = jest.fn();
  const OrderProducts = [
    {
      id: 1,
      orderItems: [
        {
          id: 1,
          imageUrl: 'https://example.com/image.jpg',
          status: 'Order placed',
          createdDate: '2023-09-27',
        },
        // Add more order items as needed for testing
      ],
    },
    // Add more orders as needed for testing
  ];
  const orderData = {
    id: 1,
    totalPrice: 100, // Replace with the actual total price
    orderItems: [
      {
        id: 101,
        name: 'Product 1', // Replace with the actual product name
        quantity: 2, // Replace with the actual quantity
        rentalStartDate: '2023-10-09', // Replace with the actual date
        rentalEndDate: '2023-10-10', // Replace with the actual date
        status: 'Pending',
        imageUrl: 'https://example.com/image1.jpg', // Replace with a valid image URL
      },
    ],
  };
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (arg0: {OrderProducts: {data: {}; isLoader: null}}) => any) =>
        selector({
          OrderProducts: {data: {}, isLoader: null},
        }),
    );
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render the custom Myorder hook', () => {
    const {result} = renderHook(() => useMyOrder());
    expect(result).toBeDefined();
  });
  it('This should open modal', () => {
    const wishlist = renderHook(() => useMyOrder());
    act(() => {
      wishlist.result.current.openModal(orderData);
    });
    waitFor(() => {
      expect(wishlist.result.current.selectedOrder).toBe(orderData);
      expect(wishlist.result.current.isModalOpen).toBe(true);
    });
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useMyOrder());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });
    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('handles onRefresh correctly', () => {
    const {result} = renderHook(() => useMyOrder());

    act(() => {
      result.current.onRefresh();
    });

    expect(result.current.refreshing).toBe(false);

    expect(mockDispatch).toBeCalledTimes(3);

    act(() => {
      result.current.setRefreshing(true);
    });

    expect(result.current.refreshing).toBe(true);
  });
  it('handles handleprofile correctly', () => {
    const {result} = renderHook(() => useMyOrder());

    act(() => {
      result.current.handleProfile();
    });

    expect(mockNav).toBeCalledWith('Profile');
  });
});
