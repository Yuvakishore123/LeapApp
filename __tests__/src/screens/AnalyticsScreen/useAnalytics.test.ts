import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useDispatch} from 'react-redux';

import useAnalytics from '../../../../src/screens/AnalyticsPage/useAnalytics';
import ApiService from 'network/network';

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
const mockLog = {
  error: jest.fn(),
};

jest.mock('helpers/helper', () => ({
  logMessage: jest.fn(() => ({
    log: jest.fn(), // Mock the log function here
  })),
}));
jest.mock('rn-fetch-blob', () => ({
  fetch: jest.fn(), // Mock the fetch method
}));
jest.mock('@notifee/react-native', () => require('notifee'));
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
describe('useAnalytics Screen', () => {
  const dispatchMock = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dispatchMock);

  it('should get the Analytics Data', async () => {
    const {result} = renderHook(() => useAnalytics());
    const mockEarningsData = {
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
      // Add more data for other months as needed
    };

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockEarningsData);

    expect(result.current.loading).toBe(false);
    act(() => {
      result.current.handleAnalytics();
    });
    expect(result.current.loading).toBe(true);
    await waitFor(() => {
      // Assert that loading is set to false after the async code completes
      expect(result.current.loading).toBe(false);

      // Assert that data is set to the sample result
      expect(result.current.Data).toEqual(mockEarningsData);
    });
  });
  it('should get the OrdersData ', async () => {
    const {result} = renderHook(() => useAnalytics());
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
      '2023-08': [
        {
          name: 'SABYASACHI SAREE',
          quantity: 1,
          rentalStartDate: '2023-08-10T06:30:00',
          rentalEndDate: '2023-08-18T06:30:00',
          rentalCost: 7992,
          imageUrl:
            'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685335472835_image.png',
          productId: 25,
          borrowerId: 5,
          borrowerName: 'Bala Pranay reddy Reddy',
          borrowerEmail: 'p.pranayreddy699@gmail.com',
          borrowerPhoneNumber: '9505180888',
        },
        {
          name: 'PRADA JACKET',
          quantity: 1,
          rentalStartDate: '2023-08-24T06:30:00',
          rentalEndDate: '2023-08-25T06:30:00',
          rentalCost: 1399,
          imageUrl:
            'https://7fdb-106-51-70-135.ngrok-free.app/api/v1/file/view?image=1685336081896_image.png',
          productId: 28,
          borrowerId: 4,
          borrowerName: 'Yuva Kishore Kolli',
          borrowerEmail: 'yuvakishorekolli@gmail.com',
          borrowerPhoneNumber: '8978661606',
        },
      ],
      // You can continue to add data for other months as needed.
    };

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderItems);

    act(() => {
      result.current.handleOrders();
    });

    // Assert that data is set to the sample result
    await waitFor(() => {
      expect(result.current.orderData).toEqual(mockOrderItems);
    });
  });
  it('should get the PieChart data ', async () => {
    const {result} = renderHook(() => useAnalytics());
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

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderItems);

    act(() => {
      result.current.HandlePiechart();
    });

    // Assert that data is set to the sample result
    await waitFor(() => {
      expect(result.current.piechart).toEqual(mockOrderItems);
    });
  });
  it('should get the CategoryPiechart data ', async () => {
    const {result} = renderHook(() => useAnalytics());
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

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockOrderItems);

    act(() => {
      result.current.CategoriePieData();
    });

    // Assert that data is set to the sample result
    await waitFor(() => {
      expect(result.current.CategoriesPiechart).toEqual(mockOrderItems);
    });
  });
  it('should get the Yearly  data ', async () => {
    const {result} = renderHook(() => useAnalytics());
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

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockYearlyData);

    act(() => {
      result.current.Dashboardyeardata();
    });

    // Assert that data is set to the sample result
    await waitFor(() => {
      expect(result.current.DashboardYearly).toEqual(mockYearlyData);
    });
  });
  // it('should handle notification', async () => {
  //   const {result} = renderHook(() => useAnalytics());

  //   // Call the HandleNotification function
  //   await act(async () => {
  //     await result.current.HandleNotification();
  //   });

  //   // Assert that createChannel and displayNotification were called as expected
  //   expect(notifee.createChannel).toHaveBeenCalledWith({
  //     id: 'pdf_download_channel1',
  //     name: 'PDF Download Channel1',
  //     sound: 'default',

  //     lights: true,
  //     importance: AndroidImportance.HIGH,
  //     lightColor: AndroidColor.RED,
  //   });

  //   expect(notifee.displayNotification).toHaveBeenCalledWith({
  //     title: 'Leaps',
  //     body: 'PDF file downloaded successfully.',
  //     android: {
  //       channelId: 'pdf_download_channel1',
  //       largeIcon: require('../../../assets/Leaps-1.png'),
  //       lights: [AndroidColor.RED, 300, 600],
  //       progress: {
  //         max: 10,
  //         current: 10,
  //       },
  //     },
  //   });
  // });
});
