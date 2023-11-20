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
import ApiService from '../../../src/network/Network';
import SearchResultsScreen from '../../../src/screens/SearchResultScreen/SearchResultScreen';
import useSearchresults from 'screens/SearchResultScreen/useSearchResults';
jest.mock('network/Network');
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
    expect(result.current.modalVisible).toBe(false);

    await act(async () => {
      await result.current.handleFilterapply();
    });
    expect(result.current.modalVisible).toBe(true);
  });
  test('should handle FliterButtonPress ', async () => {
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
    await act(() => {
      result.current.handleFilterButtonPress();
    });
    await waitFor(() => {
      expect(result.current.modalVisible).toBe(true);
    });
  });
  it('should fetch subcategory data correctly', async () => {
    const mockResponse = [
      {id: 1, subcategoryName: 'Category A'},
      {id: 2, subcategoryName: 'Category B'},
    ]; // Mocked response data
    const {result} = renderHook(() => useSearchresults());

    (ApiService.get as jest.Mock).mockResolvedValue(mockResponse);
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve as any, 100));

    await act(() => {
      result.current.SubcategoryData();
    });
    await asyncOperation();
    expect(result.current.subcategoriesData).toEqual([
      {value: 1, label: 'Category A'},
      {value: 2, label: 'Category B'},
    ]);
  });
});
