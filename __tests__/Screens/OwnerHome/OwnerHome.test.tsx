import React from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OwnerHome from 'screens/OwnerHomepage/OwnerHome';
import useOwnerHome from 'screens/OwnerHomepage/useOwnerHome';
import useAnalytics from 'screens/AnalyticsPage/useAnalytics';
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
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
jest.mock('screens/OwnerHomepage/useOwnerHome', () => ({
  products: [],
  name: {firstName: 'John'},
  isLoading: false,
  refreshing: false,
  onRefresh: jest.fn(),
  handleAnalatyics: jest.fn(),
  recentyAdded: [],
  refreshTrigger: false,
  rentedItemsPercentage: 50,
  totalEarningsPercentage: 70,
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('screens/AnalyticsPage/useAnalytics', () => ({
  handleOrders: jest.fn(),
  CategoriePieData: jest.fn(),
  Dashboardyeardata: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
describe('OwnerHome', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useOwnerHome as jest.Mock).mockReturnValue({
      products: [],
      name: {firstName: 'wesly'},
      isLoading: false,
      refreshing: false,
      onRefresh: jest.fn(),
      handleAnalatyics: jest.fn(),
      recentyAdded: [],
      refreshTrigger: false,
      rentedItemsPercentage: 50,
      totalEarningsPercentage: 70,
    });
    (useAnalytics as jest.Mock).mockReturnValue({
      handleOrders: jest.fn(),
      CategoriePieData: jest.fn(),
      Dashboardyeardata: jest.fn(),
      default: jest.fn(),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders correctly', () => {
    const Stack = createNativeStackNavigator();
    jest.useFakeTimers();
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="OwnerHome" component={OwnerHome} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeTruthy();
  });
  it('renders Recently Added section with correct data', async () => {
    (useOwnerHome as jest.Mock).mockReturnValue({
      products: [
        {
          id: '1',
          name: 'Product 1',
          imageUrl: ['https://example.com/image1.jpg'],
          price: 10,
        },
      ],
      name: {firstName: 'John'},
      isLoading: false,
      refreshing: false,
      onRefresh: jest.fn(),
      handleAnalatyics: jest.fn(),
      recentyAdded: [
        {
          id: '1',
          name: 'Product 2',
          imageUrl: ['https://example.com/image1.jpg'],
          price: 20,
        },
      ],
      refreshTrigger: false,
      rentedItemsPercentage: 50,
      totalEarningsPercentage: 70,
    });
    jest.useFakeTimers();
    const {getByText} = render(
      <OwnerHome
        route={{
          name: '',
        }}
        navigation={undefined}
      />,
    );

    // Check if the product name is rendered
    expect(getByText('Product 1')).toBeTruthy();

    // Check if the product price is rendered
    expect(getByText('₹ 10')).toBeTruthy();
  });
  it('should handle function when view more is clicked', async () => {
    const mockAnalytics = jest.fn();
    const mockhandleorders = jest.fn();
    const mockCategoriePieData = jest.fn();
    const mockDashboardyeardata = jest.fn();
    (useOwnerHome as jest.Mock).mockReturnValue({
      products: [
        {
          id: '1',
          name: 'Product 1',
          imageUrl: ['https://example.com/image1.jpg'],
          price: 10,
        },
      ],
      name: {firstName: 'John'},
      isLoading: false,
      refreshing: false,
      onRefresh: jest.fn(),
      handleAnalatyics: mockAnalytics,
      recentyAdded: [
        {
          id: '1',
          name: 'Product 2',
          imageUrl: ['https://example.com/image1.jpg'],
          price: 20,
        },
      ],
      refreshTrigger: false,
      rentedItemsPercentage: 50,
      totalEarningsPercentage: 70,
    });
    (useAnalytics as jest.Mock).mockReturnValue({
      handleOrders: mockhandleorders,
      CategoriePieData: mockCategoriePieData,
      Dashboardyeardata: mockDashboardyeardata,
      default: jest.fn(),
    });
    jest.useFakeTimers();
    const {getByTestId} = render(
      <OwnerHome
        route={{
          name: '',
        }}
        navigation={undefined}
      />,
    );

    const viewMorebutton = getByTestId('viewmoretest');
    act(() => {
      fireEvent.press(viewMorebutton);
    });
    expect(mockAnalytics).toBeCalled();
    expect(mockCategoriePieData).toBeCalled();
    expect(mockDashboardyeardata).toBeCalled();
    expect(mockhandleorders).toBeCalled();
  });

  it('renders Rental History section with correct data', async () => {
    (useOwnerHome as jest.Mock).mockReturnValue({
      products: [
        {
          id: '1',
          name: 'Product 1',
          imageUrl: ['https://example.com/image1.jpg'],
          price: 10,
        },
      ],
      name: {firstName: 'John'},
      isLoading: false,
      refreshing: false,
      onRefresh: jest.fn(),
      handleAnalatyics: jest.fn(),
      recentyAdded: [
        {
          id: '1',
          name: 'Product 2',
          imageUrl: ['https://example.com/image1.jpg'],
          price: 20,
        },
      ],
      refreshTrigger: false,
      rentedItemsPercentage: 50,
      totalEarningsPercentage: 70,
    });
    jest.useFakeTimers();
    const {getByText} = render(
      <OwnerHome
        route={{
          name: '',
        }}
        navigation={undefined}
      />,
    );

    // Check if the product name is rendered
    await waitFor(() => expect(getByText('Product 2')).toBeTruthy());

    // Check if the product price is rendered
    await waitFor(() => expect(getByText('₹ 20')).toBeTruthy());
  });
  it('should navigate to OProductDetails', async () => {
    const mockdata = [
      {
        id: '1',
        name: 'Product 1',
        imageUrl: ['https://example.com/image1.jpg'],
        price: 10,
      },
    ];
    const item = {
      id: '1',
      name: 'Product 1',
      imageUrl: ['https://example.com/image1.jpg'],
      price: 10,
    };
    (useOwnerHome as jest.Mock).mockReturnValue({
      products: mockdata,
      name: {firstName: 'John'},
      isLoading: false,
      refreshing: false,
      onRefresh: jest.fn(),
      handleAnalatyics: jest.fn(),
      recentyAdded: mockdata,
      refreshTrigger: false,
      rentedItemsPercentage: 50,
      totalEarningsPercentage: 70,
    });
    jest.useFakeTimers();
    const {getByTestId} = render(
      <OwnerHome
        route={{
          name: '',
        }}
        navigation={mockNavigation}
      />,
    );
    const nav = getByTestId('navigateProductDetailId');
    act(() => {
      fireEvent.press(nav);
    });
    expect(mockNavigation.navigate).toBeCalledWith('OproductDetails', {
      product: item,
    });
  });
  it('should navigate to OProductDetails for RentalHistory', async () => {
    const mockdata = [
      {
        id: '1',
        name: 'Product 1',
        imageUrl: ['https://example.com/image1.jpg'],
        price: 10,
      },
    ];
    const item = {
      id: '1',
      name: 'Product 1',
      imageUrl: ['https://example.com/image1.jpg'],
      price: 10,
    };
    (useOwnerHome as jest.Mock).mockReturnValue({
      products: mockdata,
      name: {firstName: 'John'},
      isLoading: false,
      refreshing: false,
      onRefresh: jest.fn(),
      handleAnalatyics: jest.fn(),
      recentyAdded: mockdata,
      refreshTrigger: false,
      rentedItemsPercentage: 50,
      totalEarningsPercentage: 70,
    });
    jest.useFakeTimers();
    const {getByTestId} = render(
      <OwnerHome
        route={{
          name: '',
        }}
        navigation={mockNavigation}
      />,
    );
    const nav = getByTestId('navigateOProductscreenId');
    act(() => {
      fireEvent.press(nav);
    });
    expect(mockNavigation.navigate).toBeCalledWith('OproductDetails', {
      product: item,
    });
  });
  it('renders loading  with correct data', async () => {
    jest.mock('screens/OwnerHomepage/useOwnerHome', () => {
      return () => ({
        products: [],
        name: {firstName: 'John'},
        isLoading: true,
        refreshing: false,
        onRefresh: jest.fn(),
        handleAnalatyics: jest.fn(),
        recentyAdded: [],
        refreshTrigger: false,
        rentedItemsPercentage: 50,
        totalEarningsPercentage: 70,
      });
    });
    jest.useFakeTimers();
    const {getByTestId} = render(
      <OwnerHome
        route={{
          name: '',
        }}
        navigation={undefined}
      />,
    );
    const loading = getByTestId('loading-state');
    expect(loading).toBeDefined();
  });
  it('render renderTounchableOpacity', () => {
    (useOwnerHome as jest.Mock).mockReturnValue({
      products: [],
      name: {firstName: 'John'},
      isLoading: true,
      refreshing: false,
      onRefresh: jest.fn(),
      handleAnalatyics: jest.fn(),
      recentyAdded: [],
      refreshTrigger: false,
      rentedItemsPercentage: 50,
      totalEarningsPercentage: 70,
    });
    jest.useFakeTimers();
    const {getByTestId} = render(
      <OwnerHome
        route={{
          name: '',
        }}
        navigation={undefined}
      />,
    );
    const loading = getByTestId('recentlyAddedContainer');
    expect(loading).toBeDefined();
  });
});
