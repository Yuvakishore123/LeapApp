import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import Sizeselection from 'components/atoms/Sizeselect';
// Import AsyncStorage module

// Mock AsyncStorage module
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      addListener: jest.fn(),
    }),
  };
});

describe('SubCategoryDropdown', () => {
  test('renders correctly', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(<Sizeselection onChange={mockOnChange} />);
    const dropdownComponent = getByTestId('dropdown');
    expect(dropdownComponent).toBeDefined();
  });
  test('should handle onChange function in selectsize', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(<Sizeselection onChange={mockOnChange} />);

    const dropdownComponent = getByTestId('dropdown');
    act(() => {
      fireEvent(dropdownComponent, 'onChange', {value: '5'});
    });
    expect(mockOnChange).toBeCalled();
  });
  test('should handle onFocus function in Selectsize', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(<Sizeselection onChange={mockOnChange} />);

    const dropdownComponent = getByTestId('dropdown');
    act(() => {
      fireEvent(dropdownComponent, 'onFocus', {placeholder: 'Select size'});
    });
    expect(dropdownComponent).toBeDefined();
  });
});
