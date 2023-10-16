import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import Category from 'screens/Category/Category';
import useCategory from 'screens/Category/useCategory';

jest.mock('@react-native-community/netinfo', () =>
  require('react-native-netinfo'),
);
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);

jest.mock('@react-native-async-storage/async-storage', () => ({
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
jest.mock('screens/Category/useCategory', () => ({
  data: [],
  loading: false,
  handleCategoryData: [],
  default: jest.fn(),
  __esModule: true,
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
jest.mock('@react-native-firebase/messaging', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    messaging: jest.fn(() => ({
      onTokenRefresh: jest.fn(),
      setBackgroundMessageHandler: jest.fn(),
    })),
  };
});
describe('Category  Screen', () => {
  const mockItems = [
    {
      id: 1,
      imageUrl: 'https://example.com/category-image-1.jpg',
      categoryName: 'Test Category 1',
    },
    {
      id: 2,
      imageUrl: 'https://example.com/category-image-2.jpg',
      categoryName: 'Test Category 2',
    },
    {
      id: 3,
      imageUrl: 'https://example.com/category-image-3.jpg',
      categoryName: 'Test Category 3',
    },
  ];
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useCategory as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      handleCategoryData: jest.fn(),
    });
    useSelector.mockImplementation(selector =>
      selector({
        category: {data: mockItems},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the category Screen', () => {
    const category = render(<Category />);
    expect(category).toBeDefined();
  });
  it('should render the Loading Component', () => {
    (useCategory as jest.Mock).mockReturnValue({
      data: mockItems,
      loading: true,
      handleCategoryData: jest.fn(),
    });
    const {getByTestId} = render(<Category />);
    const loadingComponent = getByTestId('loading-animation');
    expect(loadingComponent).toBeDefined();
  });
  it('should get the categories data', () => {
    const mockCategoriesData = jest.fn();
    (useCategory as jest.Mock).mockReturnValue({
      data: mockItems,
      loading: false,
      handleCategoryData: mockCategoriesData,
    });
    const {getByTestId} = render(<Category />);
    const categoryFlatlist = getByTestId('category-flatlist');
    expect(categoryFlatlist).toBeDefined();
    const cardContainer = getByTestId('category-1');
    expect(cardContainer).toBeDefined();
    fireEvent.press(cardContainer);
    expect(mockCategoriesData).toBeCalledWith(1);
  });
});
