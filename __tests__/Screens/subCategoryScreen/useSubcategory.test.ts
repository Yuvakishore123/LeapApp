import {renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {useSubcategory} from '../../../src/screens/Subcategory/useSubcategory';
import ApiService from 'network/network';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockedNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockedNavigate,
  }),
}));

describe('useSubcategory', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  //TestCase1
  test('should fetch subcategories and set loading to false', async () => {
    const mockedAxiosGet = jest.spyOn(ApiService, 'get');

    // Mock axios get request to return subcategoriesData
    const subcategoriesData = [
      {id: '1', name: 'Subcategory 1'},
      {id: '2', name: 'Subcategory 2'},
    ];
    mockedAxiosGet.mockResolvedValue(subcategoriesData);

    // Render the hook with a categoryId
    const {result} = renderHook(() => useSubcategory<string>('categoryId'));

    expect(result.current.loading).toBe(true);

    // Wait for the hook to fetch subcategories
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.subcategories).toEqual(subcategoriesData);
    });
  });
  //TestCase2
  test('should navigate to CategoryProducts on subcategory press', () => {
    jest.mock('@react-navigation/native', () => ({
      useNavigation: () => ({
        navigate: mockedNavigate,
      }),
    }));

    // Render the hook with a categoryId
    const {result} = renderHook(() => useSubcategory<string>('categoryId'), {
      wrapper: NavigationContainer, // Add NavigationContainer as the wrapper
    });

    // Call the handleSubcategoryPress function
    const subcategoryId = '1';
    result.current.handleSubcategoryPress(subcategoryId);

    expect(mockedNavigate).toHaveBeenCalledWith('CategoryProducts', {
      subcategoryId: subcategoryId,
    });
  });
});
