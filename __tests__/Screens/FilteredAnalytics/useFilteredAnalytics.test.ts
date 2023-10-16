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
