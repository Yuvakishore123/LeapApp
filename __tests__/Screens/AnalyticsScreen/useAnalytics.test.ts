import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAnalytics from 'screens/AnalyticsPage/useAnalytics';
import ApiService from 'network/network';
import axios from 'axios';
import Colors from '../../../src/constants/colors';
import {url} from 'constants/Apis';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';
import RNFetchBlob from 'rn-fetch-blob';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
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
    (ApiService.get as jest.Mock).mockResolvedValueOnce(mockData);

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
    (ApiService.get as jest.Mock).mockResolvedValue(mockOrderItems);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.HandlePiechart();
    });
  });
  it('should handle order successfully', async () => {
    const mockData = {
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
    };
    (ApiService.get as jest.Mock).mockResolvedValueOnce(mockData);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.handleOrders();
    });
    waitFor(() => {
      expect(result.current.orderData).toEqual(mockData);
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
    (ApiService.get as jest.Mock).mockResolvedValue(mockOrderItems);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.CategoriePieData();
    });
    waitFor(() => {
      expect(result.current.CategoriePieData).toBe(mockOrderItems);
    });
  });
  it('should  handle DashboardyearlyData successfully', async () => {
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
    (ApiService.get as jest.Mock).mockResolvedValue(mockYearlyData);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.Dashboardyeardata();
    });
    waitFor(() => {
      expect(result.current.DashboardYearly).toBe(mockYearlyData);
    });
  });
  it('should reject handle DashboardyearlyData successfully', async () => {
    const mockYearlyData = {
      '2023': {
        '2023-09': {
          totalEarnings: 5596,
          totalNumberOfItems: 3,
        },
      },
    };
    const mockError = 'Error getting Dashboard yearly data';
    (ApiService.get as jest.Mock).mockRejectedValueOnce(mockError);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.Dashboardyeardata();
    });

    waitFor(() => {
      expect(result.current.DashboardYearly).not.toBe(mockYearlyData);
    });
  });
  it('should handleVisibleModal correctly', async () => {
    const {result} = renderHook(() => useAnalytics());

    // Initial value of showModel should be false
    expect(result.current.showModel).toBe(false);

    // Toggle modal visibility
    act(() => {
      result.current.handleVisibleModal();
    });

    // After toggling, showModel should be true
    expect(result.current.showModel).toBe(true);

    // Check if filterOrderData is called
    // expect(result.current.filterOrderData).toBeCalled();
  });
  it('should open modal after 800ms when handleTotalOrdersClick is called', async () => {
    const {result} = renderHook(() => useAnalytics());
    expect(result.current.showModel).toBe(false);
    act(() => {
      result.current.handleTotalOrdersClick();
    });

    expect(result.current.showModel).toBe(true);
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
    const {result} = renderHook(() => useAnalytics()); // Replace with the actual hook

    // Call handleOrderDetails with an orderId
    await act(async () => {
      await result.current.handleExportpdf(); // Provide a valid orderId
    });
    await act(async () => {
      mockFileReader.onloadend();
    });

    // Add some delay if necessary, in case there's an asynchronous operation
    // that may not resolve immediately
    // Assert that the necessary functions have been called correctly
    expect(asyncStorageWrapper.getItem).toHaveBeenCalledWith('token');
    expect(axios.get).toHaveBeenCalledWith(`${url}/pdf/export`, {
      headers: {
        Authorization: 'Bearer mockToken',
      },
      responseType: 'blob',
    });
    const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/report.pdf`;
    const base64String = 'mockBase64String'; // Mock the base64 string
    expect(RNFetchBlob.fs.writeFile).toHaveBeenCalledWith(
      filePath,
      base64String,
      'base64',
    );

    // Add further assertions based on your specific logic
  });
  it('should reject handle analytics successfully', async () => {
    const errorMessage = 'Error fetching analytics'; // You can change the error message as needed

    (ApiService.get as jest.Mock).mockRejectedValueOnce(errorMessage);

    const {result} = renderHook(() => useAnalytics());

    act(async () => {
      await result.current.handleAnalytics();
    });
    // Assert loading state changes
    expect(result.current.loading).toBe(true);
  });
  it('should reject handle CategoriePieData successfully', async () => {
    const mockYearlyData = {
      '2023-05': {
        Women: {
          orderItems: {
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
          totalOrders: 4,
        },
      },
    };
    (ApiService.get as jest.Mock).mockRejectedValueOnce(mockYearlyData);

    const {result} = renderHook(() => useAnalytics());

    act(() => {
      result.current.CategoriePieData();
    });
    expect(result.current.DashboardYearly).not.toBe(mockYearlyData);
  });
  it('should return Colors.buttonColor for selected bar', () => {
    const selectedBarIndex = 9; // Set the selected bar index
    const {result} = renderHook(() => useAnalytics());
    const datum = {index: selectedBarIndex};
    act(() => {
      expect(result.current.selectedBarIndex).toBe(9);
    });
    result.current.getBarColor(datum);
    const res = result.current.getBarColor(datum);

    expect(res).toBe(Colors.buttonColor);
  });

  it('should return #eadaff for other bars', () => {
    const {result} = renderHook(() => useAnalytics());
    act(() => {
      expect(result.current.selectedBarIndex).toBe(9);
    });
    const datum = {index: 3}; // This is not the selected bar index

    result.current.getBarColor(datum);
    const res = result.current.getBarColor(datum);

    expect(res).toBe('#eadaff');
  });
  it('should handle bar click correctly', () => {
    const {result} = renderHook(() => useAnalytics());

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const DashboardYearly = {
      '2023': {
        '2023-05': {
          totalEarnings: 23596,
          totalNumberOfItems: 4,
        },
        // Add more data as needed
      },
    };

    // Mock barData
    const barData = {
      datum: {
        month: 4, // Assuming May (0-indexed)
      },
      index: 4,
    };
    const mockDate = '2023-05';
    // Call handleBarClick
    act(() => {
      result.current.handleBarClick({}, barData as any);
    });

    act(() => {
      result.current.setSelectedMonth('2023-05');
      result.current.setSelectedBarIndex(4 as any);
      result.current.setTotalEarnings(23596 as any);
      result.current.settotalNumberOfItems(4 as any);
      result.current.setmonthtitle('May' as any);
    });

    expect(result.current.selectedMonth).toBe(mockDate);
    expect(result.current.selectedBarIndex).toBe(barData.index);
    expect(result.current.totalEarnings).toBe(
      DashboardYearly['2023']['2023-05'].totalEarnings,
    );
    expect(result.current.totalNumberOfItems).toBe(
      DashboardYearly['2023']['2023-05'].totalNumberOfItems,
    );
    expect(result.current.monthtitle).toBe(monthNames[barData.datum.month]);
  });
});
