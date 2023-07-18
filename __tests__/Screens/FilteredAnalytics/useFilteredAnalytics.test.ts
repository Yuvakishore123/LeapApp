jest.mock('../../../src/network/network');
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

import {act, renderHook} from '@testing-library/react-native';
import FilteredAnalytics from '../../../src/screens/FilteredAnalytics/FilteredAnalytics';
import useFilteredAnalytics from '../../../src/screens/FilteredAnalytics/useFilteredAnalytics';

describe('useFilteredAnalytics ', () => {
  it('should work ', () => {
    const result = renderHook(() => useFilteredAnalytics());
    expect(result).toBeTruthy();
  });

  it('should call the handle function', () => {
    const result = renderHook(() => useFilteredAnalytics());
    act(() => {
      result.result.current.generateKey();
    });
    const key1 = result.result.current.generateKey();
    const key2 = result.result.current.generateKey();

    // Check that keys are not empty strings
    expect(key1).not.toBe('');
    expect(key2).not.toBe('');

    // Check that two consecutive calls return different keys
    expect(key1).not.toBe(key2);
  });
  it('should call the function', () => {
    const result = renderHook(() => useFilteredAnalytics());

    act(() => {
      result.result.current.handleEndDateChange('2020-01-01');
    });
    expect(result.result.current.endDate).toEqual('2020-01-01');
  });
});
describe('Filtered Analytics', () => {
  it('should return a filtered component', () => {
    const filteredScreen = renderHook(() => FilteredAnalytics());
    expect(filteredScreen).toBeTruthy();
  });
});
