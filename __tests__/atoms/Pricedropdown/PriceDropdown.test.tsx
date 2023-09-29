/* eslint-disable jest/valid-expect */
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import PriceRangeDropdown from '../../../src/components/atoms/PriceRange/PriceDropdown';
// import styles from '../../../src/components/atoms/PriceRange/priceRangestyles';
describe('PriceRangeDropdown', () => {
  const onSelectPriceRangeMock = jest.fn();
  const minPrice = '0';
  const maxPrice = '1000';

  const options = [
    {label: '₹0 - ₹100', min: '0', max: '100'},
    {label: '₹100 - ₹1000', min: '100', max: '1000'},
    {label: '₹1000 - ₹2000', min: '1000', max: '2000'},
    {label: '₹2000 - ₹3000', min: '2000', max: '3000'},
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const {getByText} = render(
      <PriceRangeDropdown
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSelectPriceRange={onSelectPriceRangeMock}
      />,
    );

    // Verify that the default price range is displayed
    expect(getByText(`₹${minPrice} - ₹${maxPrice}`)).toBeTruthy();
  });
  it('opens and closes the dropdown on button press', () => {
    const {getByTestId, queryByTestId} = render(
      <PriceRangeDropdown
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSelectPriceRange={onSelectPriceRangeMock}
      />,
    );

    const button = getByTestId('dropdown-button');

    // Verify that the dropdown is initially closed
    expect(queryByTestId('dropdown-content'));

    // Open the dropdown
    fireEvent.press(button);

    // Verify that the dropdown is opened
    expect(queryByTestId('dropdown-content')).toBeTruthy();

    // Close the dropdown
    fireEvent.press(button);

    // Verify that the dropdown is closed
    expect(queryByTestId('dropdown-content'));
  });

  it('calls onSelectPriceRange with the selected price range', () => {
    const {getByTestId, getByText} = render(
      <PriceRangeDropdown
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSelectPriceRange={onSelectPriceRangeMock}
      />,
    );

    const button = getByTestId('dropdown-button');

    // Open the dropdown
    fireEvent.press(button);

    // Select an option
    const option = getByText(options[1].label);
    fireEvent.press(option);

    // Verify that the onSelectPriceRange function is called with the selected price range
    expect(onSelectPriceRangeMock).toHaveBeenCalledWith(
      options[1].min.toString(),
      options[1].max.toString(),
    );
  });
});
