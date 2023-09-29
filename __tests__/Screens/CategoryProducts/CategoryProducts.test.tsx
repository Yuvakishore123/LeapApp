import {fireEvent, render, waitFor} from '@testing-library/react-native';
import CategoryProducts from '../../../src/screens/CategoryProducts/CategoryProducts';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import ApiService from 'network/network';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
describe('Category Products', () => {
  const subcategoryId = '1';
  const route = {params: {subcategoryId}};
  it('Should render Category Products Screen', () => {
    const result = render(
      <Provider store={store}>
        <CategoryProducts route={route} />
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
  it('should render products in the catgeory screen', async () => {
    const subcategories = [
      {
        id: 1,
        imageUrl: ['image1.jpg'],
        name: 'Product 1',
        price: 10,
      },
      {
        id: 2,
        imageUrl: ['image2.jpg'],
        name: 'Product 2',
        price: 20,
      },
    ];
    jest.spyOn(ApiService, 'get').mockResolvedValue(subcategories);

    const {getByTestId, getByText} = render(
      <Provider store={store}>
        <CategoryProducts route={route} />
      </Provider>,
    );
    const headingText = getByTestId('products-available');
    expect(headingText).toBeDefined();
    await waitFor(() => {
      subcategories.forEach(product => {
        const productName = getByText(product.name);
        expect(productName).toBeDefined();
      });
    });
    const productButton = getByTestId('product-button-1');
    fireEvent.press(productButton);
    const productButton2 = getByTestId('product-Button-1');
    fireEvent.press(productButton2);
    const wishlistButton = getByTestId('wishlist-1');
    fireEvent.press(wishlistButton);
    expect(mockNavigate).toHaveBeenCalledWith('UProductDetails', {
      product: subcategories[0],
    });
  });
});
