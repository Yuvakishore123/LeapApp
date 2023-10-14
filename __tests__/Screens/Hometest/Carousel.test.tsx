// Assuming you have installed necessary testing libraries and setup your environment

import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import {Provider, useSelector} from 'react-redux'; // Import Provider for Redux
import Carousal from '../../../src/screens/Home/Carousal';
import configureStore from 'redux-mock-store'; // Import configureStore for Redux
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
// Mock Redux store
const mockStore = configureStore([]);

test('renders carousal with subcategories', () => {
  const initialState = {
    category: {
      data: [
        {
          id: 1,
          imageUrl: 'http://example.com/image1.jpg',
          categoryName: 'Category 1',
        },
        {
          id: 2,
          imageUrl: 'http://example.com/image2.jpg',
          categoryName: 'Category 2',
        },
        // Add more data if needed
      ],
    },
  };
  (useSelector as jest.Mock).mockReturnValue(initialState.category.data);
  const store = mockStore(initialState);

  const {getByText, getByTestId} = render(
    <Provider store={store}>
      <Carousal />
    </Provider>,
  );

  // Check if subcategories are rendered
  const category1Element = getByText('Category 1');
  const category2Element = getByText('Category 2');
  const NavId = getByTestId('navId-1');
  act(() => {
    fireEvent.press(NavId);
  });

  expect(category1Element).toBeTruthy();
  expect(category2Element).toBeTruthy();
  expect(mockNavigate).toBeCalledWith('Subcategory', {categoryId: 1});

  // You can also check if images are rendered based on the testID or style.
  const image1Element = getByTestId('subcategory-image-1');
  const image2Element = getByTestId('subcategory-image-2');

  expect(image1Element).toBeTruthy();
  expect(image2Element).toBeTruthy();
});

test('renders message when no subcategories found', () => {
  // Mock Redux state
  const initialState = {
    category: {
      data: [],
    },
  };
  const store = mockStore({category: {data: []}});
  (useSelector as jest.Mock).mockReturnValue(initialState.category.data);

  const {getByText} = render(
    <Provider store={store}>
      <Carousal />
    </Provider>,
  );

  // Check if "No subcategories found." message is rendered
  const messageElement = getByText('No subcategories found.');

  expect(messageElement).toBeTruthy();
});
