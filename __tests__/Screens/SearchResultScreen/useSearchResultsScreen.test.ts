/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  act,
  fireEvent,
  render,
  renderHook,
  waitFor,
} from '@testing-library/react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../../../src/network/network';
import SearchResultsScreen from '../../../src/screens/SearchResultScreen/SearchResultScreen';
import useSearchresults from 'screens/SearchResultScreen/useSearchResults';
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));
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
describe('SearchResultScreen', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  let apiGetMock: jest.SpyInstance<Promise<any>, [url: string], any>;
  let getSpy: jest.SpyInstance<Promise<any>, [url: string], any>;

  beforeEach(() => {
    apiGetMock = jest.spyOn(ApiService, 'get');
    getSpy = apiGetMock.mockResolvedValue([]);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle filterData ', async () => {
    const mockData = {
      id: 1,
      name: 'Product 1',
      price: 10,
      imageUrl: ['https://example.com/image1.jpg'],
    };
    // Mock ApiService.get to throw an error
    apiGetMock.mockResolvedValue(mockData);

    const {result} = renderHook(() => useSearchresults());

    // Wait for the asynchronous function to complete
    await act(async () => {
      await result.current.filterData();
    });
    waitFor(() => {
      // Assert that the setFilteredProducts function is called with an empty array
      expect(result.current.filteredProducts).toBe(mockData);
    });
  });
  test('should handle errors when filtering data', async () => {
    // Mock ApiService.get to throw an error
    apiGetMock.mockRejectedValue(new Error('Network Error'));

    const {result} = renderHook(() => useSearchresults());

    // Wait for the asynchronous function to complete
    await act(async () => {
      await result.current.filterData();
    });

    // Assert that the setFilteredProducts function is called with an empty array
    expect(result.current.filteredProducts).toEqual([]);
  });
  test('should handle Filterapply ', async () => {
    const mockData = {
      id: 1,
      name: 'Product 1',
      price: 10,
      imageUrl: ['https://example.com/image1.jpg'],
    };
    // Mock ApiService.get to throw an error
    apiGetMock.mockResolvedValue(mockData);

    const {result} = renderHook(() => useSearchresults());

    // Wait for the asynchronous function to complete
    await act(async () => {
      await result.current.handleFilterapply();
    });
    waitFor(() => {
      // Assert that the setFilteredProducts function is called with an empty array
      expect(result.current.modalVisible).toBe(false);
    });
  });
});
