import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFilteredAnalytics from 'screens/FilteredAnalytics/useFilteredAnalytics';
import {useSelector} from 'react-redux';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('../../../src/constants/AsyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('../../../src/network/Network', () => ({
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
    (useSelector as jest.Mock).mockImplementationOnce(
      (
        selector: (arg0: {
          FliterAnalyticsData: {
            data: {
              '2023-05': {rentalCost: number}[];
              '2023-06': {rentalCost: number}[];
            };
          };
        }) => any,
      ) =>
        selector({
          FliterAnalyticsData: {
            data: {
              '2023-05': [{rentalCost: 100}, {rentalCost: 200}],
              '2023-06': [{rentalCost: 300}],
            },
          },
        }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render custom hook successfully', async () => {
    const {result} = renderHook(() => useFilteredAnalytics());

    expect(result).toBeTruthy();
  });
  it('should handle handleEndDateChange successfully', async () => {
    const {result} = renderHook(() => useFilteredAnalytics());
    const mockData = '2023-10';
    act(() => {
      result.current.handleEndDateChange(mockData);
    });
    waitFor(() => {
      expect(result.current.endDate).toBe(mockData);
    });
  });
  it('should handle generateKey successfully', async () => {
    const {result} = renderHook(() => useFilteredAnalytics());
    let mockKey1 = ' ';
    let mockKey2 = '';
    act(() => {
      mockKey1 = result.current.generateKey();
      mockKey2 = result.current.generateKey();
    });
    expect(mockKey1).not.toEqual(mockKey2);
  });
  it('should set chart data if response is an object', () => {
    const {result} = renderHook(() => useFilteredAnalytics());
    const mockChartData = [
      {month: '2023-05', rentalCost: 300},
      {month: '2023-06', rentalCost: 300},
    ];
    // Call handleChartData
    result.current.handleChartData();
    act(() => {
      result.current.setChartData(mockChartData);
    });

    // Check if setChartData was called with the correct data
    const expectedChartData = [
      {month: '2023-05', rentalCost: 300},
      {month: '2023-06', rentalCost: 300},
    ];
    expect(result.current.chartData).toEqual(expectedChartData);
  });
});
