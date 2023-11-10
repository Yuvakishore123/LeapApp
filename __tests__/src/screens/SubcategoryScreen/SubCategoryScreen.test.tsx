import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import {NavigationContainer} from '@react-navigation/native';
import Subcategory from 'screens/BorrowerScreens/Subcategory/Subcategory';
import {useDispatch} from 'react-redux';
import useSubcategory from 'screens/BorrowerScreens/Subcategory/useSubcategory';
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
      // Add other navigation properties and methods as needed
    }),
  };
});
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('screens/BorrowerScreens/Subcategory/useSubcategory', () => ({
  subcategories: null,
  loading: true, // Set loading as needed
  handleSubcategoryPress: jest.fn(), // Mock the handleSubcategoryPress function
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('network/network');

describe('Subcategory', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSubcategory as jest.Mock).mockReturnValue({
      subcategories: [{}],
      handleSubcategoryPress: jest.fn(),
      loading: false,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders subcategories', () => {
    const result = render(
      <NavigationContainer>
        <Subcategory route={{params: {categoryId: '123'}}} />
      </NavigationContainer>,
    );
    expect(result).toBeDefined();
  });

  test('renders loading animation when loading is true', async () => {
    (useSubcategory as jest.Mock).mockReturnValue({
      subcategories: [{}],
      handleSubcategoryPress: jest.fn(),
      loading: true,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Subcategory route={{params: {categoryId: '123'}}} loading={true} />
      </NavigationContainer>,
    );

    const loadingAnimation = getByTestId('loading-animation');
    expect(loadingAnimation).toBeTruthy();
  });
  it('renders subcategories Data', () => {
    const mockSubcategories = [
      {
        id: 1,
        imageUrl: 'https://example.com/image1.jpg',
        subcategoryName: 'Category 1',
      },
      {
        id: 2,
        imageUrl: 'https://example.com/image2.jpg',
        subcategoryName: 'Category 2',
      },
      // Add more items as needed
    ];
    const mockHandlePress = jest.fn();
    // Mock useSubcategory as an object
    (useSubcategory as jest.Mock).mockReturnValue({
      subcategories: mockSubcategories,
      handleSubcategoryPress: mockHandlePress,
      loading: false,
    });

    const {getByTestId} = render(
      <NavigationContainer>
        <Subcategory route={{params: {categoryId: '123'}}} />
      </NavigationContainer>,
    );
    const cardContianer = getByTestId('cardContainer-1');
    expect(cardContianer).toBeDefined();
    fireEvent.press(cardContianer);
    expect(mockHandlePress).toHaveBeenCalledWith(1);
  });
});
