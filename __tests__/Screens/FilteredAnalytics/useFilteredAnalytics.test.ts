import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFilteredAnalytics from 'screens/FilteredAnalytics/useFilteredAnalytics';

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
  const chartData = [
    {month: '2023-01-01', rentalCost: 1000},
    {month: '2023-02-01', rentalCost: 1200},
  ]; // Mock chartData as needed
  const data = {
    '2023-01': [
      {
        borrowerId: '123',
        borrowerName: 'John Doe',
        rentalCost: 500,
        name: 'Product 1',
        quantity: 2,
        borrowerPhoneNumber: '1234567890',
        imageUrl: 'https://example.com/image1.jpg',
      },
      // Add more items as needed for this month
    ],
    '2023-02': [
      {
        borrowerId: '456',
        borrowerName: 'Jane Doe',
        rentalCost: 700,
        name: 'Product 2',
        quantity: 1,
        borrowerPhoneNumber: '9876543210',
        imageUrl: 'https://example.com/image2.jpg',
      },
      // Add more items as needed for this month
    ],
  }; // Mock data as needed
  beforeEach(() => {
    AsyncStorage.clear();
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
      expect(result.current.fetchData).toHaveBeenCalled();
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
});
