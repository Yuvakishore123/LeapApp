import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import DropdownComponent from 'components/atoms/GenderDropdown';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('../../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockAddListener = jest.fn();
const mockNavigate = jest.fn();
const mockIsFocused = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNavigate,
    }),
    useIsFocused: () => ({
      isFocused: mockIsFocused,
    }),
  };
});
jest.mock('network/network');
const dispatchMock = jest.fn(); // Create a mock function
const useSelector = useSelectorOriginal as jest.Mock;
beforeEach(() => {
  (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  useSelector.mockImplementation(selector =>
    selector({
      profileData: {
        data: {},
      },
      products: {
        data: [],
        isError: {},
        firstCallLoading: false,
      },
      WishlistProducts: {
        data: [],
        isError: {},
      },
      category: {
        data: {},
        loading: {},
      },
      CartProducts: {
        data: [],
        error: false,
        isLoader: {},
      },
      cartUpdate: {
        error: false,
        isLoader: {},
      },
      Rolereducer: {
        role: 'string',
      },
      UserProducts: {
        data: [],
      },
      GenderReducer: {
        genderData: 'string',
      },
    }),
  );
});
afterEach(() => {
  jest.clearAllMocks();
});
test('renders DropdownComponent without crashing', () => {
  render(
    <DropdownComponent
      onChange={() => {}}
      value=""
      onSelectGender={() => {}}
    />,
  );
});

test('displays correct placeholder text', () => {
  const {getByText} = render(
    <DropdownComponent
      onChange={() => {}}
      value=""
      onSelectGender={() => {}}
    />,
  );
  const placeholderElement = getByText('Select Gender');
  expect(placeholderElement).toBeTruthy();
});

test('calls onChange event handler when an item is selected', () => {
  const onChangeMock = jest.fn();
  const {getByTestId} = render(
    <DropdownComponent
      onChange={onChangeMock}
      value=""
      onSelectGender={() => {}}
    />,
  );
  const dropdownComponent = getByTestId('Gender-Dropdown');
  fireEvent(dropdownComponent, 'onChange', {value: 'option2'}); // Simulate selecting Option 2
  expect(onChangeMock).toHaveBeenCalledWith('option2');
});

test('calls onSelect event handler when an item is selected', () => {
  const onChangeMock = jest.fn();
  const {getByTestId} = render(
    <DropdownComponent
      onChange={onChangeMock}
      value=""
      onSelectGender={() => {}}
    />,
  );
  const dropdownComponent = getByTestId('Gender-Dropdown');
  fireEvent(dropdownComponent, 'onChange', {value: 'option3'});
  expect(onChangeMock).toHaveBeenCalledWith('option3');
});
test('displays correct placeholder text when not focused', () => {
  const {getByTestId, getByText} = render(
    <DropdownComponent
      onChange={() => {}}
      value=""
      onSelectGender={() => {}}
    />,
  );
  fireEvent(getByTestId('Gender-Dropdown'), 'onFocus');

  expect(getByText('...')).toBeTruthy();
});
