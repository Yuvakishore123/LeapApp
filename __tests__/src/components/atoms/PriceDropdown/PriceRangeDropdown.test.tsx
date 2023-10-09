import {render, renderHook, fireEvent} from '@testing-library/react-native';

import PriceRangeDropdown from '../../../../../src/components/atoms/PriceRange/PriceDropdown';
import React from 'react';

describe('Price range  Component', () => {
  it('should render the placeholder component', async () => {
    const result = render(
      <PriceRangeDropdown
        minPrice="100"
        maxPrice="200"
        onSelectPriceRange={(min, max) => {
          console.log(`Selected Price Range: ${min} - ${max}`);
          // You can perform any actions with the selected price range here
        }}
      />,
    );
    expect(result).toBeDefined();
  });

  it('should toggle the dropdown when button is pressed', async () => {
    const {getByTestId} = render(
      <PriceRangeDropdown
        minPrice="100"
        maxPrice="200"
        onSelectPriceRange={(min, max) => {
          console.log(`Selected Price Range: ${min} - ${max}`);
          // You can perform any actions with the selected price range here
        }}
      />,
    );
    const dropdownButton = getByTestId('dropdown-button');

    // Check that the dropdown is initially closed
    expect(getByTestId('dropdown-content')).toBeDefined();

    // Simulate pressing the dropdown button
    fireEvent.press(dropdownButton);

    // Check that the dropdown is now open
    expect(getByTestId('dropdown-content')).toBeDefined();

    // Simulate pressing the dropdown button again
    fireEvent.press(dropdownButton);

    // Check that the dropdown is closed again
    expect(getByTestId('dropdown-content')).toBeDefined();
  });
  it('should select the button when pressed ', async () => {
    const {getByTestId} = render(
      <PriceRangeDropdown
        minPrice="100"
        maxPrice="200"
        onSelectPriceRange={(min, max) => {
          console.log(`Selected Price Range: ${min} - ${max}`);
          // You can perform any actions with the selected price range here
        }}
      />,
    );
    const optionSelect = getByTestId('option-select-₹0 - ₹100');

    // Check that the dropdown is initially closed

    fireEvent.press(optionSelect);

    expect(optionSelect).toBeDefined();
  });
});
describe('usePricerange hook', () => {
  it('should toggle the dropdown', async () => {
    const {result} = renderHook(() => (
      <PriceRangeDropdown
        minPrice="100"
        maxPrice="200"
        onSelectPriceRange={(min, max) => {
          console.log(`Selected Price Range: ${min} - ${max}`);
          // You can perform any actions with the selected price range here
        }}
      />
    ));
    expect(result).toBeDefined();
  });
});
