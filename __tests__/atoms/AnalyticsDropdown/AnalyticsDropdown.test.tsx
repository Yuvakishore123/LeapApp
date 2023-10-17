import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import AnalyticsDropdown from '../../../src/components/atoms/AnalyticsDropdown/AnalyticsDropdown';

describe('AnalyticsDropdown', () => {
  test('renders without crashing', () => {
    const mockOnSelect = jest.fn(); // Create a mock function for onSelect prop
    const {getByTestId} = render(<AnalyticsDropdown onSelect={mockOnSelect} />);
    const mainContainer = getByTestId('mainContainer');
    expect(mainContainer).toBeDefined();
  });

  test('displays the initial selected value', () => {
    const mockOnSelect = jest.fn(); // Create a mock function for onSelect prop
    const {getByText} = render(<AnalyticsDropdown onSelect={mockOnSelect} />);
    const initialValue = getByText('Quantity');
    expect(initialValue).toBeDefined();
  });

  test('opens  the dropdown', () => {
    const mockOnSelect = jest.fn(); // Create a mock function for onSelect prop
    const {getByTestId, queryByText} = render(
      <AnalyticsDropdown onSelect={mockOnSelect} />,
    );

    const mainContainer = getByTestId('mainContainer');
    act(() => {
      fireEvent.press(mainContainer);
    });

    const quantityOption = getByTestId('quantity');
    const earningsOption = queryByText('Earnings');
    expect(quantityOption).toBeDefined();
    expect(earningsOption).toBeDefined();
    act(() => {
      fireEvent.press(quantityOption);
    });
    expect(mockOnSelect).toBeCalledWith('quantity');
  });

  test('selects an option', () => {
    const mockOnSelect = jest.fn(); // Create a mock function for onSelect prop
    const {getByText} = render(<AnalyticsDropdown onSelect={mockOnSelect} />);

    const mainContainer = getByText('Quantity');
    fireEvent.press(mainContainer);

    const earningsOption = getByText('Earnings');
    fireEvent.press(earningsOption);

    expect(mockOnSelect).toHaveBeenCalledWith('Earnings');
  });
});
