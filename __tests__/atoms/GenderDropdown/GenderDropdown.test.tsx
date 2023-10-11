import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
// Import AsyncStorage module
import DropdownComponent from 'components/atoms/GenderDropdown';

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
    const {getByTestId} = render(
      <DropdownComponent
        value=""
        onChange={mockOnChange}
        onSelectGender={() => {}}
      />,
    );
    const dropdownComponent = getByTestId('GenderDropdown');
    expect(dropdownComponent).toBeDefined();
  });
  test('should handle onChange function in GenderDropdown', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <DropdownComponent
        value=""
        onChange={mockOnChange}
        onSelectGender={() => {}}
      />,
    );
    const dropdownComponent = getByTestId('GenderDropdown');
    act(() => {
      fireEvent(dropdownComponent, 'onChange', {value: 'Men'});
    });
    expect(mockOnChange).toBeCalledWith('Men');
  });
  test('should handle onFocus function in GenderDropdown', () => {
    const mockOnChange = jest.fn();
    const {getByTestId} = render(
      <DropdownComponent
        value=""
        onChange={mockOnChange}
        onSelectGender={() => {}}
      />,
    );
    const dropdownComponent = getByTestId('GenderDropdown');
    act(() => {
      fireEvent(dropdownComponent, 'onFocus', {placeholder: 'Selected Gender'});
    });
    expect(dropdownComponent).toBeDefined();
  });
});
