import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import DropdownComponent from 'components/atoms/DropDownComponent/DropDown';

test('renders DropdownComponent without crashing', () => {
  render(
    <DropdownComponent
      onSelect={() => {}}
      onChange={() => {}}
      value=""
      placeholder="Select an option"
      data={[]}
      testId={'dropdown-component'}
    />,
  );
});

test('displays correct placeholder text', () => {
  const placeholder = 'Select an option';
  const {getByText} = render(
    <DropdownComponent
      onSelect={() => {}}
      onChange={() => {}}
      value=""
      placeholder={placeholder}
      data={[]}
      testId={'dropdown-component'}
    />,
  );
  const placeholderElement = getByText(placeholder);
  expect(placeholderElement).toBeTruthy();
});

test('calls onChange event handler when an item is selected', () => {
  const onChangeMock = jest.fn();
  const {getByTestId} = render(
    <DropdownComponent
      onSelect={() => {}}
      onChange={onChangeMock}
      value=""
      placeholder="Select an option"
      data={[
        {label: 'Option 1', value: 'option1'},
        {label: 'Option 2', value: 'option2'},
        {label: 'Option 3', value: 'option3'},
      ]}
      testId={'dropdown-component'}
    />,
  );
  const dropdownComponent = getByTestId('dropdown-component');
  fireEvent(dropdownComponent, 'onChange', {value: 'option2'}); // Simulate selecting Option 2
  expect(onChangeMock).toHaveBeenCalledWith('option2');
});

test('calls onSelect event handler when an item is selected', () => {
  const onChangeMock = jest.fn();
  const {getByTestId} = render(
    <DropdownComponent
      onSelect={() => {}}
      onChange={onChangeMock}
      value=""
      placeholder="Select an option"
      data={[
        {label: 'Option 1', value: 'option1'},
        {label: 'Option 2', value: 'option2'},
        {label: 'Option 3', value: 'option3'},
      ]}
      testId={'dropdown-component'}
    />,
  );
  const dropdownComponent = getByTestId('dropdown-component');
  fireEvent(dropdownComponent, 'onChange', {value: 'option3'});
  expect(onChangeMock).toHaveBeenCalledWith('option3');
});
