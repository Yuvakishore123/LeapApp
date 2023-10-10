import React from 'react';
import {render} from '@testing-library/react-native';
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
jest.mock('screens/OwnerHomepage/DashboardDetails', () => ({
  selectedBarIndex: '',
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('screens/AnalyticsPage/useAnalytics', () => ({
  handleAnalytics: jest.fn(),
  Data: '',
  handleOrders: jest.fn(),
  orderData: [],
  loading: false,
  HandlePiechart: jest.fn(),
  piechart: [],
  handleExportpdf: jest.fn(),
  CategoriePieData: jest.fn(),
  CategoriesPiechart: [],
  Dashboardyeardata: jest.fn(),
  DashboardYearly: {},
  default: jest.fn(),
  __esModule: true,
}));
describe('Analytics Page', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAnalytics as jest.Mock).mockReturnValue({
      handleAnalytics: jest.fn(),
      Data: '',
      handleOrders: jest.fn(),
      orderData: [],
      loading: false,
      HandlePiechart: jest.fn(),
      piechart: [],
      handleExportpdf: jest.fn(),
      CategoriePieData: jest.fn(),
      CategoriesPiechart: [],
      Dashboardyeardata: jest.fn(),
      DashboardYearly: {},
      selectedBarIndex: 'Jun',
      setSelectedBarIndex: 6,
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
  test('should handle  selectedBarIndex part correctly', () => {
    jest.mock('screens/OwnerHomepage/DashboardDetails', () => ({
      selectedBarIndex: 'Jun',
      setSelectedBarIndex: 6,
      default: jest.fn(),
      __esModule: true,
    }));
    const {getByTestId} = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );
    const barInformation = getByTestId('information-Sec');
    expect(barInformation).toBeDefined();
  });
});
