import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {useDispatch} from 'react-redux';
import FilteredAnalytics from 'screens/OwnerScreens/FilteredAnalytics/FilteredAnalytics';
import useFilteredAnalytics from 'screens/OwnerScreens/FilteredAnalytics/useFilteredAnalytics';

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

jest.mock(
  'screens/OwnerScreens/FilteredAnalytics/useFilteredAnalytics',
  () => ({
    chartData: [], // Set your mock chartData data here
    data: [], // Set your mock data here
    isLoading: false, // Set your mock isLoading value here
    fetchData: jest.fn(), // Mock the fetchData function
    generateKey: jest.fn(), // Mock the generateKey function
    startDate: new Date(), // Set your mock startDate here
    setStartDate: jest.fn(), // Mock the setStartDate function
    endDate: new Date(), // Set your mock endDate here
    setEndDate: jest.fn(), // Mock the setEndDate function
    navigation: {}, // Set your mock navigation object here
    handleEndDateChange: jest.fn(),

    default: jest.fn(),
    __esModule: true,
  }),
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
describe('FilteredAnalytics Screen', () => {
  const mockDispatch = jest.fn();
  const mockChartData = [
    {
      month: '2023-01',
      rentalCost: 1000,
    },
    {
      month: '2023-02',
      rentalCost: 1200,
    },
    {
      month: '2023-03',
      rentalCost: 800,
    },
    // Add more data points as needed
  ];
  const mockData = {
    January: [
      {
        borrowerId: 1,
        borrowerName: 'John Doe',
        rentalCost: 50,
        name: 'Item A',
        quantity: 2,
        borrowerPhoneNumber: '123-456-7890',
        imageUrl: 'https://example.com/itemA.jpg',
      },
      // Add more items for January as needed
    ],
    February: [
      {
        borrowerId: 2,
        borrowerName: 'Jane Smith',
        rentalCost: 60,
        name: 'Item B',
        quantity: 3,
        borrowerPhoneNumber: '987-654-3210',
        imageUrl: 'https://example.com/itemB.jpg',
      },
      // Add more items for February as needed
    ],
    // Add data for other months as needed
  };

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useFilteredAnalytics as jest.Mock).mockReturnValue({
      chartData: [], // Set your mock chartData data here
      data: [], // Set your mock data here
      isLoading: false, // Set your mock isLoading value here
      fetchData: jest.fn(), // Mock the fetchData function
      generateKey: jest.fn(), // Mock the generateKey function
      startDate: new Date(), // Set your mock startDate here
      setStartDate: jest.fn(), // Mock the setStartDate function
      endDate: new Date(), // Set your mock endDate here
      setEndDate: jest.fn(), // Mock the setEndDate function
      navigation: {}, // Set your mock navigation object here
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the FilteredAnalytics Screen', () => {
    const result = render(<FilteredAnalytics />);

    expect(result).toBeDefined();
  });
  it('should render the Loading Screen', () => {
    (useFilteredAnalytics as jest.Mock).mockReturnValue({
      isLoading: true, // Set your mock isLoading value here
    });
    const {getByText} = render(<FilteredAnalytics />);
    const LoadingContainer = getByText('Loading...');

    expect(LoadingContainer).toBeDefined();
  });
  it('should render the Data in the ', () => {
    (useFilteredAnalytics as jest.Mock).mockReturnValue({
      chartData: [],
      data: mockData,
      generateKey: jest.fn(),
    });
    const {getByTestId} = render(<FilteredAnalytics />);

    const ImageComponent = getByTestId(`Image-https://example.com/itemA.jpg`);
    expect(ImageComponent).toBeTruthy();
  });
  it('should render the chart based on selected dates ', () => {
    const mockfetchData = jest.fn();
    (useFilteredAnalytics as jest.Mock).mockReturnValue({
      isLoading: false, // Set your mock isLoading value here
      chartData: mockChartData,
      fetchData: mockfetchData,
    });
    const {getByTestId} = render(<FilteredAnalytics />);
    const monthText = getByTestId('Month-Text');
    expect(monthText).toBeDefined();
    const endButton = getByTestId('end-date-button');
    fireEvent.press(endButton);
    expect(endButton).toBeDefined();
  });
});
