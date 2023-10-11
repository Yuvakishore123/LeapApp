import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import OwnerHome from 'screens/OwnerHomepage/OwnerHome';
import useOwnerHome from 'screens/OwnerHomepage/useOwnerHome';
import useAnalytics from 'screens/AnalyticsPage/useAnalytics';

jest.mock('rn-fetch-blob', () => require('rn-fetch-blob-mock'));
jest.mock('@notifee/react-native', () => require('notifee-mocks'));
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

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('screens/OwnerHomepage/useOwnerHome', () => ({
  products: [], // Mock products data
  name: 'Mocked Name',
  isLoading: false, // Mock loading state
  refreshing: false, // Mock refreshing state
  onRefresh: jest.fn(), // Mock refresh function
  handleAnalatyics: jest.fn(), // Mock analytics function
  recentyAdded: [], // Mock recently added items
  refreshTrigger: jest.fn(), // Mock refresh trigger function
  rentedItemsPercentage: 0, // Mock rented items percentage
  totalEarningsPercentage: 0,
  isloading: false,
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('screens/AnalyticsPage/useAnalytics', () => ({
  handleOrders: jest.fn(), // Mock handleOrders function
  CategoriePieData: jest.fn(), // Mock data for CategoriePieData
  Dashboardyeardata: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));

const Stack = createNativeStackNavigator();
const mockAddListener = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNavigate,
      // Add other navigation properties and methods as needed
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
describe('OwnerHome Screen', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useOwnerHome as jest.Mock).mockReturnValue({
      useOwnerHome: jest.fn(() => ({
        products: [], // Mock products data
        name: 'Mocked Name',
        isLoading: false, // Mock loading state
        refreshing: false, // Mock refreshing state
        onRefresh: jest.fn(), // Mock refresh function
        handleAnalatyics: jest.fn(), // Mock analytics function
        recentyAdded: [], // Mock recently added items
        refreshTrigger: jest.fn(), // Mock refresh trigger function
        rentedItemsPercentage: 0, // Mock rented items percentage
        totalEarningsPercentage: 0,
        isloading: false,
      })),
    });
    (useAnalytics as jest.Mock).mockReturnValue({
      useAnalytics: jest.fn(() => ({
        handleOrders: jest.fn(), // Mock handleOrders function
        CategoriePieData: jest.fn(), // Mock data for CategoriePieData
        Dashboardyeardata: jest.fn(),
      })),
    });
    useSelector.mockImplementation(selector =>
      selector({
        profileData: {data: {}},
        products: {data: {}},
      }),
    );
  });
  const mockProducts = [
    {
      id: '1',
      name: 'Product 1',
      imageUrl: ['https://example.com/image1.jpg'],
      price: 10,
    },
  ];
  const ProfileData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '1234567890',
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the OwnerHome Screen', () => {
    // Define a mock route with the necessary params

    const ownerHome = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OwnerHome" component={OwnerHome} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(ownerHome).toBeDefined();
  });
  it('should get data when Viewmore  Button is clicked', () => {
    const mockhandleOrders = jest.fn(); // Mock handleOrders function
    const mockCategoriePieData = jest.fn(); // Mock data for CategoriePieData
    const mockDashboardyeardata = jest.fn();
    const mockHandleAnalytics = jest.fn();

    (useAnalytics as jest.Mock).mockReturnValue({
      handleOrders: mockhandleOrders, // Mock handleOrders function
      CategoriePieData: mockCategoriePieData, // Mock data for CategoriePieData
      Dashboardyeardata: mockDashboardyeardata,
    });
    (useOwnerHome as jest.Mock).mockReturnValue({
      handleAnalatyics: mockHandleAnalytics, // Mock analytics function
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OwnerHome" component={OwnerHome} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const viewMoreButton = getByTestId('View-More');

    expect(viewMoreButton).toBeDefined();
    fireEvent.press(viewMoreButton);
    expect(mockHandleAnalytics).toBeCalled();
    expect(mockCategoriePieData).toBeCalled();
    expect(mockDashboardyeardata).toBeCalled();
    expect(mockhandleOrders).toBeCalled();
  });
  it('should render the rental history OwnerHome Screen', () => {
    // Define a mock route with the necessary params
    (useOwnerHome as jest.Mock).mockReturnValue({
      products: mockProducts, // Mock products data
      name: ProfileData,
      isLoading: false, // Mock loading state
      refreshing: false, // Mock refreshing state
      onRefresh: jest.fn(), // Mock refresh function
      handleAnalatyics: jest.fn(), // Mock analytics function
      recentyAdded: null, // Mock recently added items
      refreshTrigger: jest.fn(), // Mock refresh trigger function
      rentedItemsPercentage: 0, // Mock rented items percentage
      totalEarningsPercentage: 0,
      isloading: true,
    });

    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OwnerHome" component={OwnerHome} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const rentalHistorytext = getByTestId('Rental-History');

    expect(rentalHistorytext).toBeDefined();

    const rentalHistoryButton = getByTestId('Rental-History-1');
    expect(rentalHistoryButton).toBeDefined();
    const ItemName = getByText('Product 1');
    expect(ItemName).toBeDefined();
    fireEvent.press(rentalHistoryButton);
    expect(mockNavigate).toHaveBeenCalledWith('OproductDetails', {
      product: mockProducts[0],
    });
  });
  it('should render the recently Added Item OwnerHome Screen', () => {
    // Define a mock route with the necessary params
    (useOwnerHome as jest.Mock).mockReturnValue({
      products: [], // Mock products data
      name: ProfileData,
      isLoading: false, // Mock loading state
      refreshing: false, // Mock refreshing state
      onRefresh: jest.fn(), // Mock refresh function
      handleAnalatyics: jest.fn(), // Mock analytics function
      recentyAdded: mockProducts, // Mock recently added items
      refreshTrigger: jest.fn(), // Mock refresh trigger function
      rentedItemsPercentage: 0, // Mock rented items percentage
      totalEarningsPercentage: 0,
      isloading: false,
    });

    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OwnerHome" component={OwnerHome} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const recentlyAddedContainer = getByTestId('RecentlyAdded-1');
    expect(recentlyAddedContainer).toBeDefined();
    const ItemName = getByText('Product 1');
    expect(ItemName).toBeDefined();
    fireEvent.press(recentlyAddedContainer);
    expect(mockNavigate).toHaveBeenCalledWith('OproductDetails', {
      product: mockProducts[0],
    });
  });
  // it('should render the loading  Screen', () => {
  //   // Define a mock route with the necessary params
  //   (useOwnerHome as jest.Mock).mockReturnValue({
  //     products: mockProducts, // Mock products data
  //     name: ProfileData,
  //     refreshing: false, // Mock refreshing state
  //     onRefresh: jest.fn(), // Mock refresh function
  //     handleAnalatyics: jest.fn(), // Mock analytics function
  //     recentyAdded: mockProducts, // Mock recently added items
  //     refreshTrigger: jest.fn(), // Mock refresh trigger function
  //     rentedItemsPercentage: 0, // Mock rented items percentage
  //     totalEarningsPercentage: 0,
  //     isloading: true,
  //   });

  //   const {getByTestId} = render(
  //     <NavigationContainer>
  //       <Stack.Navigator>
  //         <Stack.Screen name="OwnerHome" component={OwnerHome} />
  //       </Stack.Navigator>
  //     </NavigationContainer>,
  //   );
  //   const loadingComponent = getByTestId('loading-container');
  //   expect(loadingComponent).toBeDefined();
  // });
});
