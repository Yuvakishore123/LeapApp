import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Subcategory from '../../../src/screens/Subcategory/Subcategory';
import {NavigationContainer} from '@react-navigation/native';
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
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

describe('Subcategory', () => {
  it('renders subcategories', () => {
    const {getByText} = render(
      <NavigationContainer>
        <Subcategory route={{params: {categoryId: '123'}}} />
      </NavigationContainer>,
    );

    expect(getByText('Subcategory 1')).toBeDefined();
    expect(getByText('Subcategory 2')).toBeDefined();
  });

  it('calls handleSubcategoryPress when a subcategory is pressed', () => {
    const handleSubcategoryPress = jest.fn();
    const useSubcategoryMock = jest.spyOn(
      require('../../../src/screens/Subcategory/useSubcategory'),
      'useSubcategory',
    );
    useSubcategoryMock.mockReturnValue({
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
      handleSubcategoryPress: handleSubcategoryPress,
    });

    const {getByText} = render(
      <NavigationContainer>
        <Subcategory route={{params: {categoryId: '123'}}} />
      </NavigationContainer>,
    );

    fireEvent.press(getByText('Subcategory 1'));

    expect(handleSubcategoryPress).toHaveBeenCalledWith('1');
  });
  //Testcase 3
  test('renders loading animation when loading is true', async () => {
    const {queryByTestId} = render(
      <NavigationContainer>
        <Subcategory route={{params: {categoryId: '123'}}} loading={true} />
      </NavigationContainer>,
    );

    const loadingAnimation = queryByTestId('loading-animation');
    expect(loadingAnimation).toBeTruthy();
  });

  //Testcase 4
  test('does not render loading animation when loading is false', () => {
    const {queryByTestId} = render(
      <NavigationContainer>
        <Subcategory route={{params: {categoryId: '123'}}} loading={false} />
      </NavigationContainer>,
    );
    const loadingAnimation = queryByTestId('loading-animation');
    expect(loadingAnimation).toBeNull();
  });
});
