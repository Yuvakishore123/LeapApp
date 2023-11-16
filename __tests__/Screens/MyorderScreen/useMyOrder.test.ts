import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook, waitFor} from '@testing-library/react-native';
import notifee from '@notifee/react-native';
import axios from 'axios';
import {url} from 'constants/Apis';
import asyncStorageWrapper from 'constants/AsyncStorageWrapper';
import {useDispatch, useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import useMyOrder from 'screens/MyOrder/useMyOrder';
jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/dynamic-links', () =>
  require('@react-native-firebase'),
);
jest.mock('axios');
global.FileReader = jest.fn(() => ({
  onloadend: jest.fn(),
  onerror: jest.fn(),
  readAsDataURL: jest.fn(),
}));

jest.mock('rn-fetch-blob', () => ({
  fs: {
    dirs: {
      DownloadDir: '/mock/download/dir', // Provide a mock directory
    },
    writeFile: jest.fn(),
  },
}));
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('@react-native-firebase'),
);
jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
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
  it('should handle order details correctly', async () => {
    // Mock asyncStorageWrapper.getItem to return a token
    (asyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockToken');

    // Mock axios.get to return a response
    (axios.get as jest.Mock).mockResolvedValue({
      data: new Blob(), // Mocking a blob response
    });
    const mockFileReader = {
      onloadend: jest.fn(),
      onerror: jest.fn(),
      readAsDataURL: jest.fn(),
      result: 'data:application/pdf;base64,mockBase64String', // Mock the result
    };

    global.FileReader = jest.fn(() => mockFileReader);

    // ... your code ...

    // Trigger onloadend event

    // Render the hook
    const {result} = renderHook(() => useMyOrder()); // Replace with the actual hook

    // Call handleOrderDetails with an orderId
    await act(async () => {
      await result.current.handleOrderDetails('mockOrderId'); // Provide a valid orderId
    });
    await act(async () => {
      mockFileReader.onloadend();
    });

    // Add some delay if necessary, in case there's an asynchronous operation
    // that may not resolve immediately
    // Assert that the necessary functions have been called correctly
    expect(asyncStorageWrapper.getItem).toHaveBeenCalledWith('token');
    expect(axios.get).toHaveBeenCalledWith(
      `${url}/order/generateInvoice/mockOrderId`,
      {
        headers: {
          Authorization: 'Bearer mockToken',
        },
        responseType: 'blob',
      },
    );
    const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/invoice.pdf`;
    const base64String = 'mockBase64String'; // Mock the base64 string
    expect(RNFetchBlob.fs.writeFile).toHaveBeenCalledWith(
      filePath,
      base64String,
      'base64',
    );

    // Add further assertions based on your specific logic
  });
  it('should show notification', async () => {
    // Mock the channel creation
    (notifee.createChannel as jest.Mock).mockResolvedValue('mockChannelId');

    // Render the hook
    const {result} = renderHook(() => useMyOrder());

    // Call the function
    await act(async () => {
      await result.current.showNotification();
    });

    // Check if notifee.createChannel was called correctly
    expect(notifee.createChannel).toHaveBeenCalledWith({
      id: 'pdf_download_channel1',
      name: 'PDF Download Channel1',
      sound: 'default',
    });

    // Check if notifee.displayNotification was called correctly
    expect(notifee.displayNotification).toHaveBeenCalledWith({
      title: 'Leaps',
      body: 'PDF file downloaded successfully.',
      android: {
        channelId: 'mockChannelId', // Assuming createChannel returned this value
        largeIcon: require('../../../assets/Leaps-1.png'),
        progress: {
          max: 10,
          current: 10,
        },
      },
    });
  });
});
