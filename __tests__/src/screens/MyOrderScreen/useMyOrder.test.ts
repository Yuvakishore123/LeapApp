import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useMyOrder from '../../../../src/screens/BorrowerScreens/MyOrder/useMyOrder';
import notifee from '../../../__mocks__/notifee-mocks';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import {url} from 'constants/Apis';
import AsyncStorageWrapper from '../../../../src/utils/asyncStorage';

jest.mock('@notifee/react-native', () => require('notifee-mocks'));
const mockNav = jest.fn();
jest.mock('axios');
jest.mock('../../../../src/network/network', () => ({
  get: jest.fn(),
}));
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});
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

    expect(result.current.isModalOpen).toBe(true);
  });
  it('should handle orders', async () => {
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

      lights: true,
    });
  });
  it('should export the pdf', async () => {
    (AsyncStorageWrapper.getItem as jest.Mock).mockResolvedValue('mockToken');
    const {result} = renderHook(() => useMyOrder());

    // Set the mocked objects in the global scope

    const mockOrderId = '2';

    // Call the HandleNotification function

    (axios.get as jest.Mock).mockResolvedValue({mockedDAta: new Blob()});
    const mockResponse = {
      data: 'mockedBase64Data', // Mocked base64 data
    };
    const mockFileReader = {
      onloadend: jest.fn(),
      onerror: jest.fn(),
      readAsDataURL: jest.fn(),
      result: 'data:application/pdf;base64,mockBase64String', // Mock the result
    };
    global.FileReader = jest.fn(() => mockFileReader);
    await act(async () => {
      await result.current.handleOrderDetails(mockOrderId);
    });
    act(() => {
      mockFileReader.onloadend();
    });

    expect(axios.get).toHaveBeenCalledWith(
      `${url}/order/generateInvoice/${mockOrderId}`,
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
  });
});
