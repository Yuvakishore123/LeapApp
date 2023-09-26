import React from 'react';
import {render, renderHook, waitFor} from '@testing-library/react-native';
import Subcategory from '../../../src/screens/Subcategory/Subcategory';
import {NavigationContainer} from '@react-navigation/native';
import {useSubcategory} from 'screens/Subcategory/useSubcategory';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/screens/Subcategory/useSubcategory', () => ({
  useSubcategory: jest.fn(() => ({
    subcategories: [
      {
        id: '1',
        subcategoryName: 'Subcategory 1',
        imageUrl: 'https://example.com/image1.jpg',
      },
      {
        id: '2',
        subcategoryName: 'Subcategory 2',
        imageUrl: 'https://example.com/image2.jpg',
      },
    ],
    loading: false,
    handleSubcategoryPress: jest.fn(),
  })),
}));
describe('Subcategory Screen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  test('should fetch subcategories and set loading to false', async () => {
    const mockedGetItem = jest.spyOn(AsyncStorage, 'getItem');
    const mockedAxiosGet = jest.spyOn(axios, 'get');

    // Mock AsyncStorage getItem to return a token
    mockedGetItem.mockResolvedValue('token');

    // Mock axios get request to return subcategoriesData
    const subcategoriesData = [
      {id: '1', name: 'Subcategory 1'},
      {id: '2', name: 'Subcategory 2'},
    ];
    mockedAxiosGet.mockResolvedValue({data: subcategoriesData});

    // Render the hook with a categoryId
    const {result} = renderHook(() => useSubcategory<string>('categoryId'));

    expect(result.current.loading).toBe(true);

    // Wait for the hook to fetch subcategories
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.subcategories).toEqual(subcategoriesData);
    });
  });
  test('renders subcategory screen with subcategories', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Subcategory route={{params: {categoryId: '1'}}} />
      </NavigationContainer>,
    );

    expect(getByText('Subcategory 1')).toBeDefined();
    expect(getByText('Subcategory 2')).toBeDefined();
  });
});
