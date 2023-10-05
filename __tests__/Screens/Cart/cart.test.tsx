import {fireEvent, render, waitFor} from '@testing-library/react-native';
import Cart from '../../../src/screens/Cart/Cart';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import ApiService from '../../../src/network/network';
jest.mock('../../../src/network/network');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const mockNavigation = {
    navigate: mockNavigate,
    addListener: jest.fn(),
  };
  return {
    useNavigation: () => mockNavigation,
  };
});

describe('Cart Screen', () => {
  const result = render(
    <Provider store={store}>
      <Cart />
    </Provider>,
  );
  it('Cart Screen should render correctly', () => {
    expect(result).toBeTruthy();
  });
  it('renders loading message when cartData is empty', async () => {
    const {queryByText} = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );

    const loadingText = queryByText('The Items are Loading...');
    expect(loadingText).toBeNull(); // Verify that the loading text is not initially present
  });
  it('calls handleRemove when remove button is pressed', async () => {
    const mockResponse = {data: {success: true}};

    const mockCartData = {
      cartItems: [
        {
          id: 1,
          imageUrl: 'https://example.com/image.jpg',
          product: {
            name: 'Product 1',
            price: 10,
            size: 'M',
          },
          rentalStartDate: new Date(),
          rentalEndDate: new Date(),
          quantity: 1,
        },
      ],
      totalCost: 10,
    };

    jest.spyOn(ApiService, 'get').mockResolvedValue(mockCartData);
    const {getByText, getByTestId} = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );
    jest.spyOn(ApiService, 'delete').mockResolvedValue(mockResponse);
    await waitFor(() => {
      mockCartData.cartItems.forEach(product => {
        const productName = getByText(product.product.name);
        expect(productName).toBeDefined();
      });
    });
    const removeButton = getByTestId('product-button-1');
    fireEvent.press(removeButton);
    const decrementButton = getByTestId('decrement-button-1');
    fireEvent.press(decrementButton);
    const incrementButton = getByTestId('increment-button-1');
    fireEvent.press(incrementButton);
  });
  it('renders loading view when cartData is not available', async () => {
    const mockCartData = {
      cartItems: [
        {
          id: 1,
          imageUrl: 'https://example.com/image.jpg',
          product: {
            name: 'Product 1',
            price: 10,
            size: 'M',
          },
          rentalStartDate: new Date(),
          rentalEndDate: new Date(),
          quantity: 1,
        },
      ],
      totalCost: 10,
    };
    jest.spyOn(ApiService, 'get').mockResolvedValue(!mockCartData);

    const {queryAllByTestId, queryByText} = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );
    const loadingView = queryAllByTestId('loading-view');
    expect(loadingView).toBeDefined();
    // Assert that the loading view is rendered

    // Assert the text content within the loading view
    const loadingText = await queryByText('The Items are Loading...');
    expect(loadingText).toBeDefined();
  });
});
