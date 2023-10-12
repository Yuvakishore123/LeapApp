import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAnalytics from 'screens/AnalyticsPage/useAnalytics';
import ApiService from 'network/network';
import axios from 'axios';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
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
  };
});
jest.mock('axios');
describe('useAnalytics', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should handle analytics successfully', async () => {
    const mockData = {
      '2023-05': {
        totalEarnings: 23596,
        totalNumberOfItems: 4,
      },
      '2023-06': {
        totalEarnings: 7096,
        totalNumberOfItems: 2,
      },
      '2023-07': {
        totalEarnings: 8394,
        totalNumberOfItems: 1,
      },
      '2023-08': {
        totalEarnings: 11190,
        totalNumberOfItems: 3,
      },
      '2023-10': {
        totalEarnings: 9793,
        totalNumberOfItems: 5,
      },
      '2023-11': {
        totalEarnings: 11999,
        totalNumberOfItems: 1,
      },
      '2023-12': {
        totalEarnings: 16095,
        totalNumberOfItems: 5,
      },
      '2023-09': {
        totalEarnings: 5596,
        totalNumberOfItems: 3,
      },
      '2024-06': {
        totalEarnings: 2798,
        totalNumberOfItems: 1,
      },
    };
    ApiService.get.mockResolvedValueOnce(mockData);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.handleAnalytics();
    });
    waitFor(() => {
      // Assert loading state changes
      expect(result.current.loading).toBe(true);
      // Assert data and loading state after API call
      expect(result.current.Data).toEqual(mockData);
      expect(result.current.loading).toBe(false);
    });
  });
  it('should reject handle analytics successfully', async () => {
    const Error = 'Error getting fetching handle analytics';
    ApiService.get.mockRejectedValue(Error);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.handleAnalytics();
    });
    // Assert loading state changes
    expect(result.current.loading).toBe(true);
  });
  it('should handle handleOrder successfully', async () => {
    const mockOrderItems = {
      '2023-05': [
        {
          name: 'GUCCI PRINTED SHIRT',
          quantity: 1,
          rentalStartDate: '2023-05-29T06:30:00',
          rentalEndDate: '2023-05-30T06:30:00',
          rentalCost: 8999,
          imageUrl:
            'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685304417406_image.png',
          productId: 19,
          borrowerId: 5,
          borrowerName: 'Bala Pranay reddy Reddy',
          borrowerEmail: 'p.pranayreddy699@gmail.com',
          borrowerPhoneNumber: '9505180888',
        },
        {
          name: 'SHRUNK RACER JACKET',
          quantity: 1,
          rentalStartDate: '2023-05-29T06:30:00',
          rentalEndDate: '2023-05-30T06:30:00',
          rentalCost: 11999,
          imageUrl:
            'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685303764085_image.png',
          productId: 15,
          borrowerId: 5,
          borrowerName: 'Bala Pranay reddy Reddy',
          borrowerEmail: 'p.pranayreddy699@gmail.com',
          borrowerPhoneNumber: '9505180888',
        },
        {
          name: 'NILOUFER SAREE',
          quantity: 2,
          rentalStartDate: '2023-05-29T06:30:00',
          rentalEndDate: '2023-05-30T06:30:00',
          rentalCost: 2598,
          imageUrl:
            'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685335616131_image.png',
          productId: 26,
          borrowerId: 5,
          borrowerName: 'Bala Pranay reddy Reddy',
          borrowerEmail: 'p.pranayreddy699@gmail.com',
          borrowerPhoneNumber: '9505180888',
        },
      ],
      '2023-06': [
        {
          name: 'PRADA JACKET',
          quantity: 1,
          rentalStartDate: '2023-06-01T06:30:00',
          rentalEndDate: '2023-06-04T06:30:00',
          rentalCost: 5697,
          imageUrl:
            'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685335795440_image.png',
          productId: 27,
          borrowerId: 5,
          borrowerName: 'Bala Pranay reddy Reddy',
          borrowerEmail: 'p.pranayreddy699@gmail.com',
          borrowerPhoneNumber: '9505180888',
        },
        {
          name: 'ARMANI JACKET',
          quantity: 1,
          rentalStartDate: '2023-06-15T06:30:00',
          rentalEndDate: '2023-06-16T06:30:00',
          rentalCost: 1399,
          imageUrl:
            'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685341177953_image.png',
          productId: 30,
          borrowerId: 5,
          borrowerName: 'Bala Pranay reddy Reddy',
          borrowerEmail: 'p.pranayreddy699@gmail.com',
          borrowerPhoneNumber: '9505180888',
        },
      ],
      '2023-07': [
        {
          name: 'PRADA JACKET',
          quantity: 1,
          rentalStartDate: '2023-07-01T06:30:00',
          rentalEndDate: '2023-07-07T06:30:00',
          rentalCost: 8394,
          imageUrl:
            'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685336081896_image.png',
          productId: 28,
          borrowerId: 5,
          borrowerName: 'Bala Pranay reddy Reddy',
          borrowerEmail: 'p.pranayreddy699@gmail.com',
          borrowerPhoneNumber: '9505180888',
        },
      ],
      // You can continue to add data for other months as needed.
    };
    ApiService.get.mockResolvedValueOnce(mockOrderItems);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.handleOrders();
    });
    waitFor(() => {
      expect(result.current.orderData).toEqual(mockOrderItems);
    });
  });
  it('should  handle handlePieChart successfully', async () => {
    const mockOrderItems = {
      '2023-05': {
        Dresses: {
          orderItems: [
            {
              name: 'GUCCI PRINTED SHIRT',
              quantity: 1,
              rentalStartDate: '2023-05-29T06:30:00',
              rentalEndDate: '2023-05-30T06:30:00',
              rentalCost: 8999,
              imageUrl:
                'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685304417406_image.png',
              productId: 19,
              borrowerId: 5,
              borrowerName: 'Bala Pranay reddy Reddy',
              borrowerEmail: 'p.pranayreddy699@gmail.com',
              borrowerPhoneNumber: '9505180888',
            },
          ],
          totalOrders: 1,
        },
        'Traditional Wear': {
          orderItems: [
            {
              name: 'NILOUFER SAREE',
              quantity: 2,
              rentalStartDate: '2023-05-29T06:30:00',
              rentalEndDate: '2023-05-30T06:30:00',
              rentalCost: 2598,
              imageUrl:
                'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685335616131_image.png',
              productId: 26,
              borrowerId: 5,
              borrowerName: 'Bala Pranay reddy Reddy',
              borrowerEmail: 'p.pranayreddy699@gmail.com',
              borrowerPhoneNumber: '9505180888',
            },
          ],
          totalOrders: 2,
        },
        Sarees: {
          orderItems: [
            {
              name: 'NILOUFER SAREE',
              quantity: 2,
              rentalStartDate: '2023-05-29T06:30:00',
              rentalEndDate: '2023-05-30T06:30:00',
              rentalCost: 2598,
              imageUrl:
                'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685335616131_image.png',
              productId: 26,
              borrowerId: 5,
              borrowerName: 'Bala Pranay reddy Reddy',
              borrowerEmail: 'p.pranayreddy699@gmail.com',
              borrowerPhoneNumber: '9505180888',
            },
          ],
          totalOrders: 2,
        },
        Festives: {
          orderItems: [
            {
              name: 'NILOUFER SAREE',
              quantity: 2,
              rentalStartDate: '2023-05-29T06:30:00',
              rentalEndDate: '2023-05-30T06:30:00',
              rentalCost: 2598,
              imageUrl:
                'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685335616131_image.png',
              productId: 26,
              borrowerId: 5,
              borrowerName: 'Bala Pranay reddy Reddy',
              borrowerEmail: 'p.pranayreddy699@gmail.com',
              borrowerPhoneNumber: '9505180888',
            },
          ],
          totalOrders: 2,
        },
      },
      // You can add more data for other months as needed.
    };
    ApiService.get.mockResolvedValue(mockOrderItems);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.HandlePiechart();
    });
  });
  it('should  handle CategoriePieData successfully', async () => {
    const mockOrderItems = {
      '2023-05': {
        Women: {
          orderItems: [
            {
              name: 'GUCCI PRINTED SHIRT',
              quantity: 1,
              rentalStartDate: '2023-05-29T06:30:00',
              rentalEndDate: '2023-05-30T06:30:00',
              rentalCost: 8999,
              imageUrl:
                'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685304417406_image.png',
              productId: 19,
              borrowerId: 5,
              borrowerName: 'Bala Pranay reddy Reddy',
              borrowerEmail: 'p.pranayreddy699@gmail.com',
              borrowerPhoneNumber: '9505180888',
            },
            {
              name: 'SHRUNK RACER JACKET',
              quantity: 1,
              rentalStartDate: '2023-05-29T06:30:00',
              rentalEndDate: '2023-05-30T06:30:00',
              rentalCost: 11999,
              imageUrl:
                'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685303764085_image.png',
              productId: 15,
              borrowerId: 5,
              borrowerName: 'Bala Pranay reddy Reddy',
              borrowerEmail: 'p.pranayreddy699@gmail.com',
              borrowerPhoneNumber: '9505180888',
            },
            {
              name: 'NILOUFER SAREE',
              quantity: 2,
              rentalStartDate: '2023-05-29T06:30:00',
              rentalEndDate: '2023-05-30T06:30:00',
              rentalCost: 2598,
              imageUrl:
                'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685335616131_image.png',
              productId: 26,
              borrowerId: 5,
              borrowerName: 'Bala Pranay reddy Reddy',
              borrowerEmail: 'p.pranayreddy699@gmail.com',
              borrowerPhoneNumber: '9505180888',
            },
          ],
          totalOrders: 4,
        },
      },
      '2023-06': {
        Women: {
          orderItems: [
            {
              name: 'ARMANI JACKET',
              quantity: 1,
              rentalStartDate: '2023-06-15T06:30:00',
              rentalEndDate: '2023-06-16T06:30:00',
              rentalCost: 1399,
              imageUrl:
                'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685341177953_image.png',
              productId: 30,
              borrowerId: 5,
              borrowerName: 'Bala Pranay reddy Reddy',
              borrowerEmail: 'p.pranayreddy699@gmail.com',
              borrowerPhoneNumber: '9505180888',
            },
          ],
          totalOrders: 1,
        },
        Men: {
          orderItems: [
            {
              name: 'PRADA JACKET',
              quantity: 1,
              rentalStartDate: '2023-06-01T06:30:00',
              rentalEndDate: '2023-06-04T06:30:00',
              rentalCost: 5697,
              imageUrl:
                'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685335795440_image.png',
              productId: 27,
              borrowerId: 5,
              borrowerName: 'Bala Pranay reddy Reddy',
              borrowerEmail: 'p.pranayreddy699@gmail.com',
              borrowerPhoneNumber: '9505180888',
            },
          ],
          totalOrders: 1,
        },
      },
      // You can add more data for other months and categories as needed.
    };
    ApiService.get.mockResolvedValue(mockOrderItems);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.CategoriePieData();
    });
    waitFor(() => {
      expect(result.current.CategoriePieData).toBe(mockOrderItems);
    });
  });
  it('should reject handle CategoriePieData successfully', async () => {
    const mockYearlyData = {
      '2023': {
        '2023-09': {
          totalEarnings: 5596,
          totalNumberOfItems: 3,
        },
        '2023-12': {
          totalEarnings: 16095,
          totalNumberOfItems: 5,
        },
        '2023-11': {
          totalEarnings: 11999,
          totalNumberOfItems: 1,
        },
        '2023-10': {
          totalEarnings: 9793,
          totalNumberOfItems: 5,
        },
        '2023-08': {
          totalEarnings: 11190,
          totalNumberOfItems: 3,
        },
        '2023-07': {
          totalEarnings: 8394,
          totalNumberOfItems: 1,
        },
        '2023-06': {
          totalEarnings: 7096,
          totalNumberOfItems: 2,
        },
        '2023-05': {
          totalEarnings: 23596,
          totalNumberOfItems: 4,
        },
      },
      '2024': {
        '2024-03': {
          totalEarnings: 8999,
          totalNumberOfItems: 1,
        },
        '2024-09': {
          totalEarnings: 8999,
          totalNumberOfItems: 1,
        },
        '2024-01': {
          totalEarnings: 1399,
          totalNumberOfItems: 1,
        },
        '2024-05': {
          totalEarnings: 4797,
          totalNumberOfItems: 3,
        },
        '2024-11': {
          totalEarnings: 8999,
          totalNumberOfItems: 1,
        },
        '2024-08': {
          totalEarnings: 4197,
          totalNumberOfItems: 2,
        },
        '2024-06': {
          totalEarnings: 2798,
          totalNumberOfItems: 1,
        },
      },
    };
    ApiService.get.mockResolvedValue(mockYearlyData);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.Dashboardyeardata();
    });
    waitFor(() => {
      expect(result.current.DashboardYearly).toBe(mockYearlyData);
    });
  });
  it('should handle exporting PDF successfully', async () => {
    const mockToken = 'undefined';
    const mockResponse = {
      data: 'mocked_pdf_data', // Mocked base64 encoded PDF data
    };

    AsyncStorage.getItem.mockResolvedValueOnce(mockToken);
    axios.get.mockResolvedValueOnce(mockResponse);

    const {result} = renderHook(() => useAnalytics());

    await act(async () => {
      await result.current.handleExportpdf();
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://0f54-106-51-70-135.ngrok-free.app/api/v1/pdf/export',
      {
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
        responseType: 'blob',
      },
    );
  });
});
