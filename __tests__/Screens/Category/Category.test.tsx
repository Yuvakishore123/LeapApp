import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Category from 'screens/Category/Category';
import {useCategory} from 'screens/Category/useCategory';
import ApiService from 'network/network';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('Category Page', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  const mockData = [
    {
      id: '1',
      categoryName: 'Category 1',
      imageUrl: 'https://example.com/category1.jpg',
    },
    {
      id: '2',
      categoryName: 'Category 2',
      imageUrl: 'https://example.com/category2.jpg',
    },
  ];
  jest.mock('../../../src/screens/Category/useCategory', () => ({
    useCategory: () => ({
      data: [
        {
          id: '1',
          categoryName: 'Category 1',
          imageUrl: 'https://example.com/category1.jpg',
        },
        {
          id: '2',
          categoryName: 'Category 2',
          imageUrl: 'https://example.com/category2.jpg',
        },
      ],
      loading: false,
      handleCategoryData: jest.fn(),
    }),
  }));
  test('renders correctly', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Category" component={Category} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeTruthy();
  });
  it('should call handleCategoryData when a category item is pressed', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockData);
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Category" component={Category} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const categoryItem = getByTestId('category-1');
    const {handleCategoryData} = useCategory();

    // Simulate the press event on the category item.
    fireEvent.press(categoryItem);

    // Check if handleCategoryData was called with the correct argument.
    expect(handleCategoryData).toHaveBeenCalledWith('1');
  });
});
