import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useMyOrder from '../../../../src/screens/MyOrder/useMyOrder';
import notifee from '../../../__mocks__/notifee-mocks';

jest.mock('@notifee/react-native', () => require('notifee-mocks'));
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
jest.mock('rn-fetch-blob', () => ({
  fs: {
    dirs: {
      DownloadDir: '/mocked/download/directory', // Replace with a mock directory path
    },
    writeFile: jest.fn(),
  },
}));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../../src/utils/asyncStorage', () => ({
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
describe('useCheckout', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        OrderProducts: {data: {}},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should refresh when on Refresh is clicked', async () => {
    const {result} = renderHook(() => useMyOrder());
    expect(result.current.refreshing).toBe(false);

    act(() => {
      result.current.onRefresh();
    });

    waitFor(() => {
      expect(mockDispatch).toBeCalledTimes(3);
      expect(result.current.refreshing).toBe(false);
    });
  });
  it('should navigate when handleProfile is clicked', async () => {
    const {result} = renderHook(() => useMyOrder());
    expect(result.current.refreshing).toBe(false);

    act(() => {
      result.current.handleProfile();
    });
    expect(mockNav).toBeCalledWith('Profile');
  });
  it('should close modal when closemodal is clicked', async () => {
    const {result} = renderHook(() => useMyOrder());
    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.selectedOrder).toBe(null);

    expect(result.current.showModal).toBe(false);
  });
  it('should open modal when openmodal is clicked', async () => {
    const mockOrder = {
      id: '12345', // Replace with a unique identifier
      orderItems: [
        {
          name: 'Product A',
          price: 10.99,
          quantity: 2,
        },
        {
          name: 'Product B',
          price: 5.99,
          quantity: 3,
        },
      ],
    };
    const {result} = renderHook(() => useMyOrder());
    expect(result.current.isModalOpen).toBe(false);

    act(() => {
      result.current.openModal(mockOrder);
    });
    expect(result.current.selectedOrder).toBe(mockOrder);
    // expect(result.current.handleOrderDetails(mockOrder.id)).toBeCalled();

    expect(result.current.isModalOpen).toBe(true);
  });
  it('should create and display a notification', async () => {
    const {result} = renderHook(() => useMyOrder());
    // Mock the createChannel function
    notifee.createChannel.mockResolvedValue('pdf_download_channel1');

    // Mock the displayNotification function
    notifee.displayNotification.mockResolvedValue(null);

    // Access the AndroidImportance and AndroidColor constants directly from notifee

    // Call the showNotification function
    act(() => {
      result.current.showNotification();
    });

    // Assertions
    expect(notifee.createChannel).toHaveBeenCalledWith({
      id: 'pdf_download_channel1',
      name: 'PDF Download Channel1',
      sound: 'default',
      //   importance: AndroidImportance.HIGH, // Access directly
      lights: true,
      //   lightColor: AndroidColor.RED, // Access directly
    });
    waitFor(() => {
      expect(notifee.displayNotification).toHaveBeenCalledWith({
        title: 'Leaps',
        body: 'PDF file downloaded successfully.',
        android: {
          channelId: 'pdf_download_channel1',
          largeIcon: {
            testUri: '../../../assets/Leaps-1.png', // Pass the icon source as a string
          }, // You can modify this expectation based on your actual asset path
          // lights: [AndroidColor.RED, 300, 600], // Access directly
          progress: {
            max: 10,
            current: 10,
          },
        },
      });
    });
  });
});
