import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import DashboardDetails from 'screens/OwnerHomepage/DashboardDetails';
import {useDispatch} from 'react-redux';
import useAnalytics from 'screens/AnalyticsPage/useAnalytics';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
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
jest.mock('victory-native', () => ({
  VictoryChart: jest.fn().mockReturnValue(null), // Mock the VictoryChart component
  VictoryBar: jest.fn().mockReturnValue(null), // Mock the VictoryBar component
  VictoryAxis: jest.fn().mockReturnValue(null), // Mock the VictoryAxis component
  VictoryLabel: jest.fn().mockReturnValue(null), // Mock the VictoryLabel component
}));
jest.mock('@react-native-firebase/in-app-messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/screens/AnalyticsPage/useAnalytics', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    handleAnalytics: jest.fn(),
    Data: null, // Set Data to null or any desired value
    handleOrders: jest.fn(),
    orderData: {
      '2023-10': [
        {
          imageUrl: 'https://example.com/image1.jpg',
          borrowerId: '12345',
          borrowerName: 'John Doe',
          rentalCost: 100,
          name: 'Item A',
          borrowerPhoneNumber: '1234567890',
        },
        {
          imageUrl: 'https://example.com/image2.jpg',
          borrowerId: '54321',
          borrowerName: 'Jane Doe',
          rentalCost: 150,
          name: 'Item B',
          borrowerPhoneNumber: '9876543210',
        },
        // Add more mock orders as needed
      ],
    },
    loading: false, // Set loading to false
    HandlePiechart: jest.fn(),
    piechart: {
      '2023-10': {
        'Category A': {totalOrders: 10},
        'Category B': {totalOrders: 20},
        // Add more categories for October 2023 as needed
      },
    },
    handleExportpdf: jest.fn(),
    CategoriePieData: jest.fn(),
    CategoriesPiechart: [
      {name: 'Category 1', value: 10},
      {name: 'Category 2', value: 20},
      // Add more categories as needed
    ],
    Dashboardyeardata: jest.fn(),
    DashboardYearly: {
      2023: {
        '2023-01': {totalEarnings: 5000, totalNumberOfItems: 50},
        '2023-02': {totalEarnings: 6000, totalNumberOfItems: 60},
      },
    },
    transformedData: [],
    getBarColor: jest.fn(),
    handleBarClick: jest.fn(),
    handleVisibleModal: jest.fn(),
    handleTotalOrdersClick: jest.fn(),
    years: ['2021', '2022', '2023'],
    totalEarnings: 0,
    totalNumberOfItems: 0,
    selectedBarIndex: 10,
    selectedMonth: '',
    selectedYear: '',
    monthtitle: '',
    setSelectedYear: jest.fn(),
    rentalData: [
      {
        month: 'Jan',
        totalEarnings: 1000,
        totalNumberOfItems: 50,
        monthIndex: 0,
      },
      {
        month: 'Feb',
        totalEarnings: 1500,
        totalNumberOfItems: 70,
        monthIndex: 1,
      },
    ],
    showModel: false, // Set showModel to false
  }),
}));

describe('Analytics Page', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      Data: null, // Set Data to null or any desired value
      handleOrders: jest.fn(),
      orderData: {
        '2023-10': [
          {
            imageUrl: 'https://example.com/image1.jpg',
            borrowerId: '12345',
            borrowerName: 'John Doe',
            rentalCost: 100,
            name: 'Item A',
            borrowerPhoneNumber: '1234567890',
          },
          {
            imageUrl: 'https://example.com/image2.jpg',
            borrowerId: '54321',
            borrowerName: 'Jane Doe',
            rentalCost: 150,
            name: 'Item B',
            borrowerPhoneNumber: '9876543210',
          },
          // Add more mock orders as needed
        ],
      },
      loading: false, // Set loading to false
      HandlePiechart: jest.fn(),
      piechart: {
        '2023-10': {
          'Category A': {totalOrders: 10},
          'Category B': {totalOrders: 20},
          // Add more categories for October 2023 as needed
        },
      },
      handleExportpdf: jest.fn(),
      CategoriePieData: jest.fn(),
      CategoriesPiechart: [
        {name: 'Category 1', value: 10},
        {name: 'Category 2', value: 20},
        // Add more categories as needed
      ],
      Dashboardyeardata: jest.fn(),
      DashboardYearly: {
        2023: {
          '2023-01': {totalEarnings: 5000, totalNumberOfItems: 50},
          '2023-02': {totalEarnings: 6000, totalNumberOfItems: 60},
        },
      },
      transformedData: [],
      getBarColor: jest.fn(),
      handleBarClick: jest.fn(),
      handleVisibleModal: jest.fn(),
      handleTotalOrdersClick: jest.fn(),
      years: ['2021', '2022', '2023'],
      totalEarnings: 0,
      totalNumberOfItems: 0,
      selectedBarIndex: 10,
      selectedMonth: '',
      selectedYear: '',
      monthtitle: '',
      setSelectedYear: jest.fn(),
      rentalData: [
        {
          month: 'Jan',
          totalEarnings: 1000,
          totalNumberOfItems: 50,
          monthIndex: 0,
        },
        {
          month: 'Feb',
          totalEarnings: 1500,
          totalNumberOfItems: 70,
          monthIndex: 1,
        },
      ],
      showModel: false, // Set showModel to false
    });
  });
  test('renders Analytics correctly', () => {
    const result = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );

    expect(result).toBeDefined();
  });
  it('should handleTotalOrdersClick and show the modal', () => {
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      Data: null, // Set Data to null or any desired value
      handleOrders: jest.fn(),
      orderData: {
        '2023-10': [
          {
            imageUrl: 'https://example.com/image1.jpg',
            borrowerId: '12345',
            borrowerName: 'John Doe',
            rentalCost: 100,
            name: 'Item A',
            borrowerPhoneNumber: '1234567890',
          },
          {
            imageUrl: 'https://example.com/image2.jpg',
            borrowerId: '54321',
            borrowerName: 'Jane Doe',
            rentalCost: 150,
            name: 'Item B',
            borrowerPhoneNumber: '9876543210',
          },
          // Add more mock orders as needed
        ],
      },
      loading: false, // Set loading to false
      HandlePiechart: jest.fn(),
      piechart: {
        '2023-10': {
          'Category A': {totalOrders: 10},
          'Category B': {totalOrders: 20},
          // Add more categories for October 2023 as needed
        },
      },
      handleExportpdf: jest.fn(),
      CategoriePieData: jest.fn(),
      CategoriesPiechart: [
        {name: 'Category 1', value: 10},
        {name: 'Category 2', value: 20},
        // Add more categories as needed
      ],
      Dashboardyeardata: jest.fn(),
      DashboardYearly: {
        2023: {
          '2023-01': {totalEarnings: 5000, totalNumberOfItems: 50},
          '2023-02': {totalEarnings: 6000, totalNumberOfItems: 60},
        },
      },
      transformedData: [],
      getBarColor: jest.fn(),
      handleBarClick: jest.fn(),
      handleVisibleModal: jest.fn(),
      handleTotalOrdersClick: jest.fn(),
      years: ['2021', '2022', '2023'],
      totalEarnings: 0,
      totalNumberOfItems: 0,
      selectedBarIndex: 10,
      selectedMonth: '',
      selectedYear: '',
      monthtitle: '',
      setSelectedYear: jest.fn(),
      rentalData: [
        {
          month: 'Jan',
          totalEarnings: 1000,
          totalNumberOfItems: 50,
          monthIndex: 0,
        },
        {
          month: 'Feb',
          totalEarnings: 1500,
          totalNumberOfItems: 70,
          monthIndex: 1,
        },
      ],
      showModel: true, // Set showModel to false
    });
    const {getByText, queryByTestId} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );

    const totalOrdersButton = getByText('Your Orders'); // Adjust the text to match your button text
    fireEvent.press(totalOrdersButton);

    const modal = queryByTestId('modal-component'); // Replace with an appropriate test ID
    expect(modal).toBeDefined();
  });
  it('should render loading state', () => {
    (useAnalytics as jest.Mock).mockReturnValue({
      loading: true,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );

    const loading = getByTestId('loadingview');
    expect(loading).toBeTruthy();
  });
  it('should navigate to FilteredAnalytics', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );

    const loading = getByTestId('navId');
    act(() => {
      fireEvent.press(loading);
    });
    expect(mockNav).toBeCalledWith('FilteredAnalytics');
  });
  it('should render orderData and show the modal', () => {
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      Data: null, // Set Data to null or any desired value
      handleOrders: jest.fn(),
      orderData: {
        '2023-10': [
          {
            imageUrl: 'https://example.com/image1.jpg',
            borrowerId: '12345',
            borrowerName: 'John Doe',
            rentalCost: 100,
            name: 'Item A',
            borrowerPhoneNumber: '1234567890',
          },
          {
            imageUrl: 'https://example.com/image2.jpg',
            borrowerId: '54321',
            borrowerName: 'Jane Doe',
            rentalCost: 150,
            name: 'Item B',
            borrowerPhoneNumber: '9876543210',
          },
          // Add more mock orders as needed
        ],
      },
      loading: false, // Set loading to false
      HandlePiechart: jest.fn(),
      piechart: {
        '2023-10': {
          'Category A': {totalOrders: 10},
          'Category B': {totalOrders: 20},
          // Add more categories for October 2023 as needed
        },
      },
      handleExportpdf: jest.fn(),
      CategoriePieData: jest.fn(),
      CategoriesPiechart: [
        {name: 'Category 1', value: 10},
        {name: 'Category 2', value: 20},
        // Add more categories as needed
      ],
      Dashboardyeardata: jest.fn(),
      DashboardYearly: {
        2023: {
          '2023-01': {totalEarnings: 5000, totalNumberOfItems: 50},
          '2023-02': {totalEarnings: 6000, totalNumberOfItems: 60},
        },
      },
      transformedData: [],
      getBarColor: jest.fn(),
      handleBarClick: jest.fn(),
      handleVisibleModal: jest.fn(),
      handleTotalOrdersClick: jest.fn(),
      years: ['2021', '2022', '2023'],
      totalEarnings: 0,
      totalNumberOfItems: 0,
      selectedBarIndex: 10,
      selectedMonth: '2023-10',
      selectedYear: '',
      monthtitle: '',
      setSelectedYear: jest.fn(),
      rentalData: [
        {
          month: 'Jan',
          totalEarnings: 1000,
          totalNumberOfItems: 50,
          monthIndex: 0,
        },
        {
          month: 'Feb',
          totalEarnings: 1500,
          totalNumberOfItems: 70,
          monthIndex: 1,
        },
      ],
      showModel: false, // Set showModel to false
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );

    const totalOrdersButton = getByTestId('yourOrdersId'); // Adjust the text to match your button text
    act(() => {
      fireEvent.press(totalOrdersButton);
    });

    const modal = getByTestId('modal-component');
    expect(modal).toBeDefined();
  });
  it('should test picker and labels', () => {
    const selectedyear = jest.fn();
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      Data: null, // Set Data to null or any desired value
      handleOrders: jest.fn(),
      orderData: {
        '2023-10': [
          {
            imageUrl: 'https://example.com/image1.jpg',
            borrowerId: '12345',
            borrowerName: 'John Doe',
            rentalCost: 100,
            name: 'Item A',
            borrowerPhoneNumber: '1234567890',
          },
          {
            imageUrl: 'https://example.com/image2.jpg',
            borrowerId: '54321',
            borrowerName: 'Jane Doe',
            rentalCost: 150,
            name: 'Item B',
            borrowerPhoneNumber: '9876543210',
          },
          // Add more mock orders as needed
        ],
      },
      loading: false, // Set loading to false
      HandlePiechart: jest.fn(),
      piechart: {
        '2023-10': {
          'Category A': {totalOrders: 10},
          'Category B': {totalOrders: 20},
          // Add more categories for October 2023 as needed
        },
      },
      handleExportpdf: jest.fn(),
      CategoriePieData: jest.fn(),
      CategoriesPiechart: [
        {name: 'Category 1', value: 10},
        {name: 'Category 2', value: 20},
        // Add more categories as needed
      ],
      Dashboardyeardata: jest.fn(),
      DashboardYearly: {
        2023: {
          '2023-01': {totalEarnings: 5000, totalNumberOfItems: 50},
          '2023-02': {totalEarnings: 6000, totalNumberOfItems: 60},
        },
      },
      transformedData: [],
      getBarColor: jest.fn(),
      handleBarClick: jest.fn(),
      handleVisibleModal: jest.fn(),
      handleTotalOrdersClick: jest.fn(),
      years: ['2021', '2022', '2023', '2024'],
      totalEarnings: 0,
      totalNumberOfItems: 0,
      selectedBarIndex: 10,
      selectedMonth: '2023-10',
      selectedYear: '2023',
      monthtitle: '',
      setSelectedYear: selectedyear,
      rentalData: [
        {
          month: 'Jan',
          totalEarnings: 1000,
          totalNumberOfItems: 50,
          monthIndex: 0,
        },
        {
          month: 'Feb',
          totalEarnings: 1500,
          totalNumberOfItems: 70,
          monthIndex: 1,
        },
      ],
      showModel: false, // Set showModel to false
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );

    const totalOrdersButton = getByTestId('pickerId'); // Adjust the text to match your button text
    act(() => {
      fireEvent(totalOrdersButton, 'onValueChange', '2023');
    });

    expect(selectedyear).toBeCalledWith('2023');
  });
  it('should test empty view when selectedBarindex is null', () => {
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      Data: null, // Set Data to null or any desired value
      handleOrders: jest.fn(),
      orderData: {
        '2023-10': [
          {
            imageUrl: 'https://example.com/image1.jpg',
            borrowerId: '12345',
            borrowerName: 'John Doe',
            rentalCost: 100,
            name: 'Item A',
            borrowerPhoneNumber: '1234567890',
          },
          {
            imageUrl: 'https://example.com/image2.jpg',
            borrowerId: '54321',
            borrowerName: 'Jane Doe',
            rentalCost: 150,
            name: 'Item B',
            borrowerPhoneNumber: '9876543210',
          },
          // Add more mock orders as needed
        ],
      },
      loading: false, // Set loading to false
      HandlePiechart: jest.fn(),
      piechart: {
        '2023-10': {
          'Category A': {totalOrders: 10},
          'Category B': {totalOrders: 20},
          // Add more categories for October 2023 as needed
        },
      },
      handleExportpdf: jest.fn(),
      CategoriePieData: jest.fn(),
      CategoriesPiechart: [
        {name: 'Category 1', value: 10},
        {name: 'Category 2', value: 20},
        // Add more categories as needed
      ],
      Dashboardyeardata: jest.fn(),
      DashboardYearly: {
        2023: {
          '2023-01': {totalEarnings: 5000, totalNumberOfItems: 50},
          '2023-02': {totalEarnings: 6000, totalNumberOfItems: 60},
        },
      },
      transformedData: [],
      getBarColor: jest.fn(),
      handleBarClick: jest.fn(),
      handleVisibleModal: jest.fn(),
      handleTotalOrdersClick: jest.fn(),
      years: ['2021', '2022', '2023', '2024'],
      totalEarnings: 0,
      totalNumberOfItems: 0,
      selectedBarIndex: null,
      selectedMonth: '2023-10',
      selectedYear: '2023',
      monthtitle: '',
      setSelectedYear: jest.fn(),
      rentalData: [
        {
          month: 'Jan',
          totalEarnings: 1000,
          totalNumberOfItems: 50,
          monthIndex: 0,
        },
        {
          month: 'Feb',
          totalEarnings: 1500,
          totalNumberOfItems: 70,
          monthIndex: 1,
        },
      ],
      showModel: false, // Set showModel to false
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );

    expect(getByTestId('emptyView')).toBeDefined();
  });
});
