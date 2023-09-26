/* eslint-disable @typescript-eslint/no-unused-vars */
import {render} from '@testing-library/react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../../../src/network/network';
import SearchResultsScreen from '../../../src/screens/SearchResultScreen/SearchResultScreen';
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(() => ({goBack: jest.fn()})),
}));
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
  test('renders SearchResultsScreen without errors', () => {
    render(<SearchResultsScreen route={{params: {searchResults: []}}} />);
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

  test('renders no results message when search results are empty', () => {
    const {getByText} = render(
      <SearchResultsScreen route={{params: {searchResults: []}}} />,
    );

    const noResultsText = getByText('Umm...No results found');
    expect(noResultsText).toBeTruthy();
  });
});
