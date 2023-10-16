import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import SearchResultsScreen from 'screens/SearchResultScreen/SearchResultScreen';
import useSearchresults from 'screens/SearchResultScreen/useSearchResults';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('react-native-razorpay', () => require('razorpay-mock'));
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
const mockUseSearchresults = jest.fn();
jest.mock('screens/SearchResultScreen/useSearchResults', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    minimumPrice: 10,
    setMinimumPrice: jest.fn(),
    maximumPrice: 100,
    setMaximumPrice: jest.fn(),
    selectedSize: 'Large',
    setSelectedSize: jest.fn(),
    sizes: ['Small', 'Medium', 'Large'],
    modalVisible: false,
    setModalVisible: jest.fn(),
    handleFilterButtonPress: jest.fn(),
    filteredProducts: [],
    handleFilterapply: jest.fn(),
    setSelectedSubCategory: jest.fn(),
    subcategoriesData: [],
  };
});
const mockNav = jest.fn();
const mockgoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      goBack: mockgoBack,
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
describe('SearchResultsScreen Screen', () => {
  const dispatchMock = jest.fn(); // Create a mock function
  const useSelector = useSelectorOriginal as jest.Mock;
  const searchResults = [
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      imageUrl: ['https://example.com/image1.jpg'],
    },
  ];

  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useSearchresults as jest.Mock).mockReturnValue({
      minimumPrice: 10,
      setMinimumPrice: jest.fn(),
      maximumPrice: 100,
      setMaximumPrice: jest.fn(),
      selectedSize: 'Large',
      setSelectedSize: jest.fn(),
      sizes: ['Small', 'Medium', 'Large'],
      modalVisible: false,
      setModalVisible: jest.fn(),
      handleFilterButtonPress: jest.fn(),
      filteredProducts: searchResults,
      handleFilterapply: jest.fn(),
      setSelectedSubCategory: jest.fn(),
      subcategoriesData: [],
      SubCategoryData: jest.fn(),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the SearchResultsScreen Screen', () => {
    // Define a mock route with the necessary params
    const mockRoute = {
      params: {
        searchResults: [searchResults],
      },
    };
    const result = render(<SearchResultsScreen route={mockRoute} />);
    expect(result).toBeDefined();
  });
  it('should navigate back  when back is clicked', () => {
    // Define a mock route with the necessary params
    const mockRoute = {
      params: {
        searchResults: [searchResults],
      },
    };
    const {getByTestId} = render(<SearchResultsScreen route={mockRoute} />);
    const goBack = getByTestId('back-button');
    expect(goBack).toBeDefined();
    fireEvent.press(goBack);
    expect(mockgoBack).toBeCalled();
  });
  it('should open modal when clicked', () => {
    const mockFilterButton = jest.fn();
    const mockSubcategoriesData = [
      {id: 1, name: 'Subcategory 1'},
      {id: 2, name: 'Subcategory 2'},
      {id: 3, name: 'Subcategory 3'},
    ];
    (useSearchresults as jest.Mock).mockReturnValue({
      minimumPrice: 10,
      setMinimumPrice: jest.fn(),
      maximumPrice: 100,
      setMaximumPrice: jest.fn(),
      selectedSize: 'Large',
      setSelectedSize: jest.fn(),
      sizes: ['Small', 'Medium', 'Large'],
      modalVisible: false,
      setModalVisible: jest.fn(),
      handleFilterButtonPress: mockFilterButton,
      filteredProducts: searchResults,
      handleFilterapply: jest.fn(),
      setSelectedSubCategory: jest.fn(),
      subcategoriesData: [],
      SubCategoryData: jest.fn(),
    });

    const mockRoute = {
      params: {
        searchResults: [],
      },
    };
    const {getByTestId} = render(<SearchResultsScreen route={mockRoute} />);
    const FilterApply = getByTestId('filter-apply-button');
    expect(FilterApply).toBeDefined();
    fireEvent.press(FilterApply);
    expect(mockFilterButton).toBeCalled();
  });
  it('should select the size', () => {
    const mockSelectedButton = jest.fn();
    const mockSubcategoriesData = [
      {id: 1, name: 'Subcategory 1'},
      {id: 2, name: 'Subcategory 2'},
      {id: 3, name: 'Subcategory 3'},
    ];
    (useSearchresults as jest.Mock).mockReturnValue({
      minimumPrice: 10,
      setMinimumPrice: jest.fn(),
      maximumPrice: 100,
      setMaximumPrice: jest.fn(),
      selectedSize: 'Large',
      setSelectedSize: mockSelectedButton,
      sizes: ['Small', 'Medium', 'Large'],
      modalVisible: true,
      setModalVisible: jest.fn(),
      handleFilterButtonPress: jest.fn(),
      filteredProducts: searchResults,
      handleFilterapply: jest.fn(),
      setSelectedSubCategory: jest.fn(),
      subcategoriesData: [],
      SubCategoryData: jest.fn(),
    });

    const mockRoute = {
      params: {
        searchResults: [],
      },
    };
    const {getByTestId, getByText} = render(
      <SearchResultsScreen route={mockRoute} />,
    );
    const modalButton = getByTestId('modal');
    expect(modalButton).toBeDefined();
    fireEvent.press(modalButton);
    const FilterSize = getByTestId('select-Small');
    fireEvent.press(FilterSize);
    const filtersize = getByText('Small');

    expect(filtersize).toBeDefined();
    expect(mockSelectedButton).toBeCalled();
  });
  it('should select the Minimum and Maximum Prices', () => {
    const mockSetMinimumPrice = jest.fn();
    const mockMaximumPrices = jest.fn();
    const mockSubcategoriesData = [
      {id: 1, name: 'Subcategory 1'},
      {id: 2, name: 'Subcategory 2'},
      {id: 3, name: 'Subcategory 3'},
    ];
    (useSearchresults as jest.Mock).mockReturnValue({
      minimumPrice: 10,
      setMinimumPrice: mockSetMinimumPrice,
      maximumPrice: 100,
      setMaximumPrice: mockMaximumPrices,
      sizes: ['Small', 'Medium', 'Large'],
      modalVisible: true,
      setModalVisible: jest.fn(),
      handleFilterButtonPress: jest.fn(),
      filteredProducts: searchResults,
      handleFilterapply: jest.fn(),
      setSelectedSubCategory: jest.fn(),
      subcategoriesData: [],
      SubCategoryData: jest.fn(),
    });

    const mockRoute = {
      params: {
        searchResults: [],
      },
    };
    const {getByTestId, getByText} = render(
      <SearchResultsScreen route={mockRoute} />,
    );
    const modalButton = getByTestId('modal');
    expect(modalButton).toBeDefined();
    fireEvent.press(modalButton);
    const FilterPrices = getByTestId('option-select-₹2000 - ₹3000');
    fireEvent.press(FilterPrices);
    const filterprice = getByText('₹1000 - ₹2000');

    expect(filterprice).toBeDefined();
    expect(mockMaximumPrices).toHaveBeenCalledWith('3000');
    expect(mockSetMinimumPrice).toHaveBeenCalledWith('2000');
  });
  it('should select the subCategory ', () => {
    const mockSetMinimumPrice = jest.fn();
    const mockSubcategory = jest.fn();
    const mockCloseButton = jest.fn();
    const mockSubcategoriesData = [
      {id: 1, name: 'Subcategory 1'},
      {id: 2, name: 'Subcategory 2'},
      {id: 3, name: 'Subcategory 3'},
    ];
    (useSearchresults as jest.Mock).mockReturnValue({
      minimumPrice: 10,
      setMinimumPrice: mockSetMinimumPrice,
      maximumPrice: 100,

      sizes: ['Small', 'Medium', 'Large'],
      modalVisible: true,
      setModalVisible: mockCloseButton,
      handleFilterButtonPress: jest.fn(),
      filteredProducts: searchResults,
      handleFilterapply: jest.fn(),
      setSelectedSubCategory: mockSubcategory,
      subcategoriesData: mockSubcategoriesData,
      SubCategoryData: jest.fn(),
    });

    const mockRoute = {
      params: {
        searchResults: [],
      },
    };
    const {getByTestId, getByText} = render(
      <SearchResultsScreen route={mockRoute} />,
    );
    const modalButton = getByTestId('modal');
    expect(modalButton).toBeDefined();
    fireEvent.press(modalButton);
    const subCategory = getByTestId('sub-category-dropdown');
    fireEvent.press(subCategory);
    const closeButton = getByTestId('Close');
    fireEvent.press(closeButton);
    expect(mockCloseButton).toBeCalled();
  });
  it('should select the Product ', () => {
    const mockSetMinimumPrice = jest.fn();
    const mockSubcategory = jest.fn();
    const mockCloseButton = jest.fn();
    const mockSubcategoriesData = [
      {id: 1, name: 'Subcategory 1'},
      {id: 2, name: 'Subcategory 2'},
      {id: 3, name: 'Subcategory 3'},
    ];
    (useSearchresults as jest.Mock).mockReturnValue({
      minimumPrice: 10,
      setMinimumPrice: mockSetMinimumPrice,
      maximumPrice: 100,

      sizes: ['Small', 'Medium', 'Large'],
      modalVisible: true,
      setModalVisible: mockCloseButton,
      handleFilterButtonPress: jest.fn(),
      filteredProducts: searchResults,
      handleFilterapply: jest.fn(),
      setSelectedSubCategory: mockSubcategory,
      subcategoriesData: mockSubcategoriesData,
      SubCategoryData: jest.fn(),
    });

    const mockRoute = {
      params: {
        searchResults: [],
      },
    };
    const {getByTestId, getByText} = render(
      <SearchResultsScreen route={mockRoute} />,
    );
    const modalButton = getByTestId('modal');
    expect(modalButton).toBeDefined();
    fireEvent.press(modalButton);
    const cardContainer = getByTestId('item-touchable-1');
    fireEvent.press(cardContainer);
    expect(mockNav).toHaveBeenCalledWith('UProductDetails', {
      product: searchResults[0],
    });
    const ImageComponent = getByTestId('placeholder-image');
    expect(ImageComponent).toBeTruthy();
    const closeButton = getByTestId('Close');
    fireEvent.press(closeButton);
    expect(mockCloseButton).toBeCalled();
  });
  it('should get the Empty STate the Product ', () => {
    const mockSetMinimumPrice = jest.fn();
    const mockSubcategory = jest.fn();
    const mockCloseButton = jest.fn();
    const mockSubcategoriesData = [
      {id: 1, name: 'Subcategory 1'},
      {id: 2, name: 'Subcategory 2'},
      {id: 3, name: 'Subcategory 3'},
    ];
    (useSearchresults as jest.Mock).mockReturnValue({
      minimumPrice: 10,
      setMinimumPrice: mockSetMinimumPrice,
      maximumPrice: 100,

      sizes: ['Small', 'Medium', 'Large'],
      modalVisible: true,
      setModalVisible: mockCloseButton,
      handleFilterButtonPress: jest.fn(),
      filteredProducts: [],
      handleFilterapply: jest.fn(),
      setSelectedSubCategory: mockSubcategory,
      subcategoriesData: mockSubcategoriesData,
      SubCategoryData: jest.fn(),
    });

    const mockRoute = {
      params: {
        searchResults: [],
      },
    };
    const {getByText} = render(<SearchResultsScreen route={mockRoute} />);
    const loadingtext = getByText('Umm...No results found');
    expect(loadingtext).toBeTruthy();
  });
});
