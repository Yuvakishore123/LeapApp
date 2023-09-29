import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
// Import AsyncStorage module
import SubCategoryDropdown from '../../../src/components/atoms/SubcategoryDropdown/SubcategoryDropdown';

// Mock AsyncStorage module
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('SubCategoryDropdown', () => {
  test('renders correctly', () => {
    const {getByTestId} = render(
      <SubCategoryDropdown value="" onChange={() => {}} />,
    );
    const dropdownComponent = getByTestId('sub-category-dropdown');
    expect(dropdownComponent).toBeTruthy();
  });

  test('displays placeholder when no value is selected', () => {
    const {getByText} = render(
      <SubCategoryDropdown value="" onChange={() => {}} />,
    );
    const placeholderText = getByText('Select Type');
    expect(placeholderText).toBeTruthy();
  });

  test('calls onChange handler when a new value is selected', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <SubCategoryDropdown value="" onChange={mockOnChange} />,
    );
    const dropdownComponent = getByTestId('sub-category-dropdown');
    fireEvent(dropdownComponent, 'onChange', {value: 'category2'});
    expect(mockOnChange).toHaveBeenCalledWith('category2');
  });
  test('displays selected value', () => {
    const {getByText} = render(
      <SubCategoryDropdown value="category1" onChange={() => {}} />,
    );
    const selectedValueText = getByText('Category 1');
    expect(selectedValueText).toBeTruthy();
  });
});
