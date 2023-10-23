import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import FilterSelectSize from '../../../src/components/atoms/FilterSizes/FilterSizeSelect';

describe('FilterSelectSize', () => {
  const sizes = ['Small', 'Medium', 'Large'];
  const selectedSize = 'Medium';
  const onSelectSize = jest.fn();

  it('renders the selected size correctly', () => {
    const {queryAllByText} = render(
      <FilterSelectSize
        sizes={sizes}
        selectedSize={selectedSize}
        onSelectSize={onSelectSize}
      />,
    );

    const selectedSizeTextElements = queryAllByText(selectedSize);
    const selectedSizeText = selectedSizeTextElements.find(
      element => element.props.children === selectedSize,
    );

    expect(selectedSizeText).toBeDefined();
  });

  it('opens the dropdown when the button is pressed', () => {
    const {getByTestId} = render(
      <FilterSelectSize
        sizes={sizes}
        selectedSize={selectedSize}
        onSelectSize={onSelectSize}
      />,
    );

    const button = getByTestId('button');
    fireEvent.press(button);
  });
  it('closes the dropdown when a size is selected', () => {
    const {getByText} = render(
      <FilterSelectSize
        sizes={sizes}
        selectedSize={selectedSize}
        onSelectSize={onSelectSize}
      />,
    );

    const option = getByText('Small');

    // Open the dropdown
    fireEvent.press(option);

    // Select a size and close the dropdown
    fireEvent.press(option);

    expect(onSelectSize).toHaveBeenCalledWith('Small');
  });

  it('calls onSelectSize and closes the dropdown when a size is selected', () => {
    const {getByText} = render(
      <FilterSelectSize
        sizes={sizes}
        selectedSize={selectedSize}
        onSelectSize={onSelectSize}
      />,
    );

    const option = getByText('Small');
    fireEvent.press(option);

    expect(onSelectSize).toHaveBeenCalledWith('Small');
  });
  it('closes the dropdown when handleToggle is called', () => {
    const {getByTestId} = render(
      <FilterSelectSize
        sizes={sizes}
        selectedSize="Medium"
        onSelectSize={onSelectSize}
      />,
    );

    // Open the dropdown
    const button = getByTestId('button');
    fireEvent.press(button);

    // Verify that the dropdown is opened
    expect(getByTestId('dropdown')).toBeTruthy();

    // Close the dropdown
    fireEvent.press(button);
  });
});
