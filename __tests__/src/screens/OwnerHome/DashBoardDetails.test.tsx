import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';

import {NavigationContainer} from '@react-navigation/native';
import DashboardDetails from 'screens/OwnerScreens/OwnerHomepage/DashboardDetails';
import {useDispatch} from 'react-redux';
import useAnalytics from 'screens/OwnerScreens/AnalyticsPage/useAnalytics';
jest.mock('rn-fetch-blob', () => ({
  fetch: jest.fn(), // Mock the fetch method
}));
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
jest.mock('network/network');
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('victory-native', () => ({
  VictoryChart: jest.fn().mockReturnValue(null), // Mock the VictoryChart component
  VictoryBar: jest.fn().mockReturnValue(null), // Mock the VictoryBar component
  VictoryAxis: jest.fn().mockReturnValue(null), // Mock the VictoryAxis component
  VictoryLabel: jest.fn().mockReturnValue(null), // Mock the VictoryLabel component
}));
jest.mock('@notifee/react-native', () => require('notifee'));
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('screens/OwnerScreens/AnalyticsPage/useAnalytics', () => ({
  handleAnalytics: jest.fn(),
  handleOrders: jest.fn(),
  orderData: [{}],
  loading: false,
  piechart: {
    /* your mock piechart data here */
  },
  HandlePiechart: jest.fn(),
  handleExportpdf: jest.fn(),
  DashboardYearly: [],
  Dashboardyeardata: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));

describe('DashBoard details', () => {
  const mockDispatch = jest.fn();

  const mockPieChartData = {
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
  const selectedMonth = '2023-11';
  const mockOrderData = {
    [selectedMonth]: [
      {
        borrowerId: 1,
        borrowerName: 'John Doe',
        rentalCost: 50,
        name: 'Product 1',
        borrowerPhoneNumber: '123-456-7890',
        imageUrl: 'https://example.com/product1.jpg',
      },
      {
        borrowerId: 2,
        borrowerName: 'Jane Smith',
        rentalCost: 75,
        name: 'Product 2',
        borrowerPhoneNumber: '987-654-3210',
        imageUrl: 'https://example.com/product2.jpg',
      },
      // Add more order items as needed
    ],
  };

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
  const mockYearlyData = {
    '2023': {
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
      '2023-09': {
        totalEarnings: 5596,
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
    },
    '2024': {
      '2024-01': {
        totalEarnings: 1399,
        totalNumberOfItems: 1,
      },
      '2024-03': {
        totalEarnings: 8999,
        totalNumberOfItems: 1,
      },
      '2024-05': {
        totalEarnings: 4797,
        totalNumberOfItems: 3,
      },
      '2024-06': {
        totalEarnings: 2798,
        totalNumberOfItems: 1,
      },
      '2024-08': {
        totalEarnings: 4197,
        totalNumberOfItems: 2,
      },
      '2024-09': {
        totalEarnings: 8999,
        totalNumberOfItems: 1,
      },
      '2024-11': {
        totalEarnings: 8999,
        totalNumberOfItems: 1,
      },
    },
    '2025': {
      '2025-02': {
        totalEarnings: 2199,
        totalNumberOfItems: 1,
      },
      '2025-04': {
        totalEarnings: 2398,
        totalNumberOfItems: 2,
      },
      '2025-06': {
        totalEarnings: 10298,
        totalNumberOfItems: 2,
      },
      '2025-09': {
        totalEarnings: 4197,
        totalNumberOfItems: 2,
      },
      '2025-12': {
        totalEarnings: 1399,
        totalNumberOfItems: 1,
      },
    },
  };

  const transformMockDataToRentalData = (
    mockData: any,
    selectedYear: string,
  ) => {
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

    const rentalData = monthNames.map(month => {
      const monthIndex = monthNames.indexOf(month);
      const formattedMonth = `${selectedYear}-${String(monthIndex + 1).padStart(
        2,
        '0',
      )}`;

      const monthData = mockData[selectedYear]?.[formattedMonth] || {
        totalOrders: 0,
        totalNumberOfItems: 0,
      };

      return {
        month: month,
        totalEarnings: monthData.totalOrders,
        totalNumberOfItems: monthData.totalNumberOfItems,
        monthIndex: monthIndex,
      };
    });

    return rentalData;
  };
  const years = Object?.keys(mockYearlyData);
  const chartColors = ['#FF5733', '#FFC300', '#FF5733', '#FFC300']; // Define your chart colors

  const pieChartData = mockPieChartData?.[selectedMonth] ?? {};

  const transformedData = Object.entries(pieChartData).map(
    ([subcategory, {totalOrders}], index) => ({
      name: subcategory,
      value: totalOrders,
      color: chartColors[index % chartColors.length],
    }),
  );

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      handleOrders: jest.fn(),
      orderData: [{}],
      loading: false,
      piechart: {
        /* your mock piechart data here */
      },
      HandlePiechart: jest.fn(),
      handleExportpdf: jest.fn(),
      DashboardYearly: [],
      Dashboardyeardata: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('render DashBoard details', () => {
    const result = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );
    expect(result).toBeDefined();
  });
  it('render Loading Screen details', () => {
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      handleOrders: jest.fn(),
      orderData: mockOrderData,
      loading: true,
      piechart: mockPieChartData,
      showModel: false,
      HandlePiechart: jest.fn(),
      handleExportpdf: jest.fn(),
      DashboardYearly: mockEarningsData,
      Dashboardyeardata: jest.fn(),
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );
    const loadingContainer = getByTestId('Loading-Container');
    expect(loadingContainer).toBeDefined();
  });
  it('render Data on the Screen', async () => {
    const mockSetModel = jest.fn();
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      handleOrders: jest.fn(),
      orderData: mockOrderData,
      loading: false,
      piechart: mockPieChartData,
      showModel: false,
      setShowModel: mockSetModel,

      HandlePiechart: jest.fn(),
      handleExportpdf: jest.fn(),
      DashboardYearly: mockEarningsData,
      Dashboardyeardata: jest.fn(),
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );
    const totalEarningButton = getByTestId('Total-Earnings');
    expect(totalEarningButton).toBeDefined();
    fireEvent.press(totalEarningButton);
    expect(mockNav).toBeCalledWith('FilteredAnalytics');
    const totalOrders = getByTestId('Total-Orders');
    expect(totalOrders).toBeDefined();
    await act(async () => {
      fireEvent.press(totalOrders);
    });
    expect(mockSetModel).toBeCalledWith(true);
    const selectMonth = getByTestId('Selected-Month');
    fireEvent.press(selectMonth);
  });
  it('render orders Data when clicked on orders', async () => {
    const mockSetModel = jest.fn();
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      handleOrders: jest.fn(),
      orderData: mockOrderData,
      loading: false,
      piechart: mockPieChartData,
      showModel: true,
      setShowModel: mockSetModel,

      HandlePiechart: jest.fn(),
      handleExportpdf: jest.fn(),
      DashboardYearly: mockEarningsData,
      Dashboardyeardata: jest.fn(),
    });

    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );

    const totalOrders = getByTestId('Total-Orders');
    expect(totalOrders).toBeDefined();
    act(() => {
      fireEvent.press(totalOrders);
    });
    expect(mockSetModel).toBeCalledWith(true);
    const selectMonth = getByTestId('Selected-Month');
    fireEvent.press(selectMonth);
    act(() => {
      fireEvent.press(totalOrders);
    });
    const modalButton = getByTestId('Modal-component');
    expect(modalButton).toBeDefined();
    const close = getByTestId('Close-button');
    expect(close).toBeDefined();

    expect(getByText('John Doe')).toBeDefined();
    expect(getByText('123-456-7890')).toBeTruthy();
    fireEvent.press(close);
    expect(mockSetModel).toBeCalledWith(false);
  });
  it('render MOnth Names on the Screen', async () => {
    const mockSetModel = jest.fn();
    const mockSelectedYear = jest.fn();
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      handleOrders: jest.fn(),
      orderData: mockOrderItems,
      loading: false,
      piechart: mockPieChartData,
      showModel: false,
      setShowModel: mockSetModel,
      HandlePiechart: jest.fn(),
      handleExportpdf: jest.fn(),
      DashboardYearly: mockEarningsData,
      Dashboardyeardata: jest.fn(),
      selectedYear: 'November',
      setSelectedYear: mockSelectedYear,
    });

    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );
    const monthText = getByTestId('Month-Text');
    expect(monthText).toBeDefined();
    const currentMonth = getByText('Nov');
    expect(currentMonth).toBeTruthy();
    const SelectedMonth = getByTestId('Selected-Month');
    fireEvent(SelectedMonth, 'valueChange', 'November');

    fireEvent.press(SelectedMonth);
    expect(mockSelectedYear).toHaveBeenCalledWith('November');
  });
  it('render the Victory Chart for Orders', async () => {
    const mockSetModel = jest.fn();
    const mockSelectedYear = jest.fn();

    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      handleOrders: jest.fn(),
      orderData: mockOrderData,
      loading: false,
      piechart: transformedData,
      showModel: true,
      setShowModel: mockSetModel,
      HandlePiechart: jest.fn(),
      handleExportpdf: jest.fn(),
      DashboardYearly: mockYearlyData,
      Dashboardyeardata: jest.fn(),
      selectedYear: '2022',
      setSelectedYear: mockSelectedYear,
    });
    transformMockDataToRentalData(mockYearlyData, 'November');

    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );
    const monthText = getByTestId('Month-Text');
    expect(monthText).toBeDefined();
    const currentMonth = getByText('Nov');
    expect(currentMonth).toBeTruthy();

    const totalOrders = getByTestId('Total-Orders');

    expect(totalOrders).toBeDefined();
    await act(async () => {
      fireEvent.press(totalOrders);
    });
  });
});
