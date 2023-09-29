import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import BackButton from '../../../src/components/atoms/BackButton/BackButton';

describe('BackButton', () => {
  test('renders without crashing', () => {
    const mockNavigation = {goBack: jest.fn()}; // Create a mock navigation object
    const {getByTestId} = render(<BackButton navigation={mockNavigation} />);
    const backButton = getByTestId('back-button');
    expect(backButton).toBeDefined();
  });

  test('calls goBack when back button is pressed', () => {
    const mockNavigation = {goBack: jest.fn()}; // Create a mock navigation object
    const {getByTestId} = render(<BackButton navigation={mockNavigation} />);
    const backButton = getByTestId('back-button');

    fireEvent.press(backButton);

    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });
});
