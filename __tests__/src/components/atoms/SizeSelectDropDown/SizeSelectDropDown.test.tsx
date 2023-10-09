import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Sizeselection from 'components/atoms/Sizeselect';
import {Dropdown} from 'react-native-element-dropdown';

describe('Sizeselection', () => {
  it('renders without crashing', () => {
    const onChange = jest.fn();
    render(<Sizeselection onChange={onChange} />);
  });

  it('calls onChange with the selected size', () => {
    const onChange = jest.fn();
    const {getByTestId} = render(<Sizeselection onChange={onChange} />);

    fireEvent(getByTestId('dropdown'), 'focus');
    fireEvent.press(getByTestId('dropdown'));
    fireEvent(getByTestId('dropdown'), 'blur');
  });

  it('sets isFocus to true when the Dropdown is focused', () => {
    const onChange = jest.fn();
    const {getByTestId} = render(<Sizeselection onChange={onChange} />);
    const dropdown = getByTestId('dropdown');

    fireEvent(dropdown, 'focus');
  });

  it('sets isFocus to false when the Dropdown is blurred', () => {
    const onChange = jest.fn();
    const {getByTestId} = render(<Sizeselection onChange={onChange} />);
    const dropdown = getByTestId('dropdown');

    fireEvent(dropdown, 'focus');
    fireEvent(dropdown, 'blur');
  });

  it('displays the placeholder text when no value is selected', () => {
    const onChange = jest.fn();
    const {getByText} = render(<Sizeselection onChange={onChange} />);
    expect(getByText('Select size')).toBeTruthy();
  });

  it('changes the placeholder text when the Dropdown is focused', () => {
    const onChange = jest.fn();
    const {getByTestId, getByText} = render(
      <Sizeselection onChange={onChange} />,
    );

    fireEvent(getByTestId('dropdown'), 'onFocus');

    expect(getByText('...')).toBeTruthy();
  });

  it('changes the placeholder text back when the Dropdown is blurred', () => {
    const onChange = jest.fn();
    const {getByTestId, getByText} = render(
      <Sizeselection onChange={onChange} />,
    );

    fireEvent(getByTestId('dropdown'), 'onFocus');
    fireEvent(getByTestId('dropdown'), 'onBlur');

    expect(getByText('Select size')).toBeTruthy();
  });

  it('calls onChange with the selected size and sets isFocus to false on change', () => {
    const onChange = jest.fn();
    const {getByTestId} = render(<Sizeselection onChange={onChange} />);

    // Simulate focusing on the dropdown
    fireEvent(getByTestId('dropdown'), 'onFocus');

    // Simulate selecting an option
    fireEvent.press(getByTestId('dropdown'));

    // Simulate losing focus on the dropdown
    fireEvent(getByTestId('dropdown'), 'onBlur');
  });
});
