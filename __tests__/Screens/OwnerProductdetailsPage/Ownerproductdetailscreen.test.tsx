import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import OproductDetails from '../../../src/screens/OwnerProductdetailsPage/OproductDetails';

describe('OproductDetails', () => {
  const mockProduct = {
    name: 'Gucci Black shirt',
    price: 200,
    description: 'black gucci shirt for men ',
    imageUrl: ['https://example.com/image.jpg'],
  };
  const mockRoute = {params: {product: mockProduct}};
  const mockNavigation = {goBack: jest.fn()};

  test('renders the product details correctly', () => {
    const {getByText} = render(
      <OproductDetails route={mockRoute} navigation={mockNavigation} />,
    );

    // Assert that product name is rendered
    expect(getByText('Gucci Black shirt')).toBeTruthy();

    // Assert that product price is rendered
    expect(getByText('₹ 200')).toBeTruthy();

    // Assert that product description is rendered
    expect(getByText('black gucci shirt for men ')).toBeTruthy();
  });
  it('navigates back when the back button is pressed', () => {
    const {getByTestId} = render(
      <OproductDetails route={mockRoute} navigation={mockNavigation} />,
    );

    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);
    fireEvent.press(backButton);

    waitFor(() => {
      expect(mockNavigation.goBack).toHaveBeenCalledTimes(2);
    });
  });
});
