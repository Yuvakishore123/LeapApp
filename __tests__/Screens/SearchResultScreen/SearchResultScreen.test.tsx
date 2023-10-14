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
import {useDispatch} from 'react-redux';
import useAddImages from 'screens/OwnerImage/useAddImages';
import useSearchresults from 'screens/SearchResultScreen/useSearchResults';
import FilterSelectSize from 'components/atoms/FilterSizes/FilterSizeSelect';
import SubCategoryDropdown from 'components/atoms/SubcategoryDropdown/SubcategoryDropdown';
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
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('screens/SearchResultScreen/useSearchResults', () => ({
  filterData: jest.fn(),
  minimumPrice: '',
  maximumPrice: '',
  setMinimumPrice: jest.fn(),
  setMaximumPrice: jest.fn(),
  filteredProducts: [],
  sizes: [],
  modalVisible: false,
  selectedSize: '',
  setFilteredProducts: jest.fn(),
  setSelectedSize: jest.fn(),
  setModalVisible: jest.fn(),
  handleFilterButtonPress: jest.fn(),
  imageLoaded: false,
  setImageLoaded: jest.fn(),
  SubcategoryData: jest.fn(),
  handleFilterapply: jest.fn(),
  selectedSubCategory: '',
  setSelectedSubCategory: jest.fn(),
  subcategoriesData: [],
  default: jest.fn(),
  __esModule: true,
}));
describe('SearchResultScreen', () => {
  const mockDispatch = jest.fn();
  let apiGetMock: jest.SpyInstance<Promise<any>, [url: string], any>;
  let getSpy: jest.SpyInstance<Promise<any>, [url: string], any>;

  beforeEach(() => {
    apiGetMock = jest.spyOn(ApiService, 'get');
    getSpy = apiGetMock.mockResolvedValue([]);
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSearchresults as jest.Mock).mockReturnValue({
      filterData: jest.fn(),
      minimumPrice: '',
      maximumPrice: '',
      setMinimumPrice: jest.fn(),
      setMaximumPrice: jest.fn(),
      filteredProducts: [],
      sizes: [],
      modalVisible: false,
      selectedSize: '',
      setFilteredProducts: jest.fn(),
      setSelectedSize: jest.fn(),
      setModalVisible: jest.fn(),
      handleFilterButtonPress: jest.fn(),
      imageLoaded: false,
      setImageLoaded: jest.fn(),
      SubcategoryData: jest.fn(),
      handleFilterapply: jest.fn(),
      selectedSubCategory: '',
      setSelectedSubCategory: jest.fn(),
      subcategoriesData: [],
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('render searchResultsScreen and FlatList with the correct number of items', () => {
    const searchResults = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        imageUrl: ['https://example.com/image1.jpg'],
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20,
        imageUrl: ['https://example.com/image2.jpg'],
      },
      {
        id: 3,
        name: 'Product 3',
        price: 30,
        imageUrl: ['https://example.com/image3.jpg'],
      },
    ];

    const {getByTestId, getAllByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults}}} />,
    );

    const flatList = getByTestId('flat-list');
    expect(flatList.props.data.length).toBe(searchResults.length);

    const renderedItems = getAllByTestId('item-touchable');
    expect(renderedItems.length).toBe(searchResults.length);
  });
  test('filter modal should open when TouchableOpacity is pressed', () => {
    const searchResults = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        imageUrl: ['https://example.com/image1.jpg'],
      },
      {
        id: 2,
        name: 'Product 2',
        price: 20,
        imageUrl: ['https://example.com/image2.jpg'],
      },
      {
        id: 3,
        name: 'Product 3',
        price: 30,
        imageUrl: ['https://example.com/image3.jpg'],
      },
    ];
    const {getByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults}}} />,
    );

    const touchableOpacity = getByTestId('filter-apply-button');

    fireEvent.press(touchableOpacity);
    expect(getByTestId('modal')).toBeDefined();
  });

  test('renders no results message when search results are empty', () => {
    const {getByText} = render(
      <SearchResultsScreen route={{params: {searchResults: []}}} />,
    );

    const noResultsText = getByText('Umm...No results found');
    expect(noResultsText).toBeTruthy();
  });
  test('navigates to UProductDetailsScreen when TouchableOpacity is pressed', () => {
    const searchResults = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        imageUrl: ['https://example.com/image1.jpg'],
      },
    ];
    const {getByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults: searchResults}}} />,
    );
    const mockData = {
      id: 1,
      name: 'Product 1',
      price: 10,
      imageUrl: ['https://example.com/image1.jpg'],
    };

    // Find the TouchableOpacity element
    const touchableOpacity = getByTestId('item-touchable');

    // Simulate a press event on the TouchableOpacity element
    fireEvent.press(touchableOpacity);
    expect(mockNav).toHaveBeenCalledWith('UProductDetails', {
      product: mockData,
    });
  });
  test('Close Modal when TouchableOpacity is pressed', () => {
    const searchResults = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        imageUrl: ['https://example.com/image1.jpg'],
      },
    ];
    const {getByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults: searchResults}}} />,
    );
    const touchableOpacity = getByTestId('filter-apply-button');
    act(() => {
      fireEvent.press(touchableOpacity);
    });
    const modal = getByTestId('modal');
    expect(modal).toBeDefined();
  });
  test('handle the Pricedropdown when TouchableOpacity is pressed', () => {
    const mockMin = jest.fn();
    const mockMax = jest.fn();
    const selectedsub = jest.fn();
    (useSearchresults as jest.Mock).mockReturnValue({
      filterData: jest.fn(),
      minimumPrice: '1000',
      maximumPrice: '2000',
      setMinimumPrice: mockMin,
      setMaximumPrice: mockMax,
      filteredProducts: [],
      sizes: [],
      modalVisible: true,
      selectedSize: '',
      setFilteredProducts: jest.fn(),
      setSelectedSize: jest.fn(),
      setModalVisible: jest.fn(),
      handleFilterButtonPress: jest.fn(),
      imageLoaded: false,
      setImageLoaded: jest.fn(),
      SubcategoryData: jest.fn(),
      handleFilterapply: jest.fn(),
      selectedSubCategory: 'shirt',
      setSelectedSubCategory: selectedsub,
      subcategoriesData: [],
    });
    const searchResults = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        imageUrl: ['https://example.com/image1.jpg'],
      },
    ];
    const {getByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults: searchResults}}} />,
    );
    const applybutton = getByTestId('filter-apply-button');
    act(() => {
      fireEvent.press(applybutton);
    });
    const pricedropdown = getByTestId('dropdown-button-₹1000 - ₹2000');

    const touchableOpacity = getByTestId('sub-category-dropdown');
    act(() => {
      fireEvent.press(pricedropdown);
      fireEvent.changeText(touchableOpacity, 'onChange', {value: 'shirt'});
    });
    expect(mockMin).toBeCalledWith('1000');
    expect(mockMax).toBeCalledWith('2000');
  });
  test('handle the subcategorydropdown when TouchableOpacity is pressed', () => {
    const mockMin = jest.fn();
    const mockMax = jest.fn();
    const visible = jest.fn();
    const selectedsub = jest.fn();
    (useSearchresults as jest.Mock).mockReturnValue({
      filterData: jest.fn(),
      minimumPrice: '1000',
      maximumPrice: '2000',
      setMinimumPrice: mockMin,
      setMaximumPrice: mockMax,
      filteredProducts: [
        {
          id: 1,
          name: 'FilterProduct 1',
          price: 10,
          imageUrl: ['https://example.com/image1.jpg'],
        },
      ],
      sizes: [],
      modalVisible: true,
      selectedSize: '',
      setFilteredProducts: jest.fn(),
      setSelectedSize: jest.fn(),
      setModalVisible: visible,
      handleFilterButtonPress: jest.fn(),
      imageLoaded: false,
      setImageLoaded: jest.fn(),
      SubcategoryData: jest.fn(),
      handleFilterapply: jest.fn(),
      selectedSubCategory: 'shirt',
      setSelectedSubCategory: selectedsub,
      subcategoriesData: [],
    });
    const searchResults = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        imageUrl: ['https://example.com/image1.jpg'],
      },
    ];
    const {getByTestId, getByText} = render(
      <SearchResultsScreen route={{params: {searchResults: searchResults}}} />,
    );
    const applybutton = getByTestId('filter-apply-button');
    fireEvent.press(applybutton);
    const closebutton = getByTestId('closeButton');
    act(() => {
      fireEvent.press(closebutton);
    });
    expect(getByText('FilterProduct 1')).toBeDefined();
    expect(visible).toBeCalledWith(false);
  });
  test('handle the FilterSize when TouchableOpacity is pressed', () => {
    const mockMin = jest.fn();
    const mockMax = jest.fn();
    const size = jest.fn();
    (useSearchresults as jest.Mock).mockReturnValue({
      filterData: jest.fn(),
      minimumPrice: '1000',
      maximumPrice: '2000',
      setMinimumPrice: mockMin,
      setMaximumPrice: mockMax,
      filteredProducts: [],
      sizes: ['S', 'XL', 'XXL'],
      modalVisible: true,
      selectedSize: 'XXL',
      setFilteredProducts: jest.fn(),
      setSelectedSize: size,
      setModalVisible: jest.fn(),
      handleFilterButtonPress: jest.fn(),
      imageLoaded: false,
      setImageLoaded: jest.fn(),
      SubcategoryData: jest.fn(),
      handleFilterapply: jest.fn(),
      selectedSubCategory: 'shirt',
      setSelectedSubCategory: jest.fn(),
      subcategoriesData: [],
    });
    const searchResults = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        imageUrl: ['https://example.com/image1.jpg'],
      },
    ];
    const {getByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults: searchResults}}} />,
    );
    const applybutton = getByTestId('filter-apply-button');
    act(() => {
      fireEvent.press(applybutton);
    });
    const sizebutton = getByTestId('button');
    act(() => {
      fireEvent.press(sizebutton);
    });
    const sizebtn = getByTestId('sizesId-XXL');
    act(() => {
      fireEvent.press(sizebtn);
    });
    expect(size).toBeCalledWith('XXL');
  });
  test('should navigate goback function', () => {
    const searchResults = [
      {
        id: 1,
        name: 'Product 1',
        price: 10,
        imageUrl: ['https://example.com/image1.jpg'],
      },
    ];
    const {getByTestId} = render(
      <SearchResultsScreen route={{params: {searchResults: searchResults}}} />,
    );
    const back = getByTestId('back-button');
    act(() => {
      fireEvent.press(back);
    });
    expect(mockgoBack).toBeCalled();
  });
});
