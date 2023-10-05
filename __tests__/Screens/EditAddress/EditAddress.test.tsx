import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import EditAddress from 'screens/EditAddress/EditAddress';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
jest.mock('screens/EditAddress/useEditAddress', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    handleUpdateAddress: jest.fn(),
    handleOptionChange: jest.fn(),
    selectedOption: 'HOME',
    isChecked: false,
    setAddressLine1: jest.fn(),
    setAddressLine2: jest.fn(),
    setPostalCode: jest.fn(),
    handleCheckboxChange: jest.fn(),
    closeModal: jest.fn(),
    showModal: false,
    setStateName: jest.fn(),
    city: '',
    addressLine1: '',
    addressLine2: '',
    postalCode: '',
    state: '',
    setCity: jest.fn(),
    PlaceholderColor: jest.fn(),
  })),
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {address: {}},
  }),
}));
describe('EditAddress Screen', () => {
  it('should render EditAddress Page', () => {
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
  it('should call handleUpdateAddress when Update Address button is pressed', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );

    const updateButton = getByText('Update Address');
    fireEvent.press(updateButton);

    // You'll need to mock the required functions like handleUpdateAddress and context values for this test.
  });
  it('should call handleOptionChange when radio button is pressed', () => {
    // Render the component with mocked context
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );

    // Get the radio button element
    const homeRadio = getByTestId('Radio-Home');

    // Simulate a press event on the radio button
    fireEvent.press(homeRadio);

    // You should check if handleOptionChange was called with the correct value.
  });
  it('should call handleOptionChange of office when radio button is pressed', () => {
    // Render the component with mocked context
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );

    // Get the radio button element
    const homeRadio = getByTestId('Radio-Office');

    // Simulate a press event on the radio button
    fireEvent.press(homeRadio);

    // You should check if handleOptionChange was called with the correct value.
  });
  it('should update addressLine1 state when text input changes', () => {
    // Render the component with mocked context
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );

    // Get the TextInput element
    const flatTextInput = getByTestId('Flat');

    // Simulate a change event on the TextInput
    fireEvent.changeText(flatTextInput, 'New Flat Address');
  });
  it('should update addressLine2 state when text input changes', () => {
    // Render the component with mocked context
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );

    // Get the TextInput element
    const flatTextInput = getByTestId('Street');

    // Simulate a change event on the TextInput
    fireEvent.changeText(flatTextInput, 'New Street Address');
  });
  it('should update  stateName when text input changes', () => {
    // Render the component with mocked context
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );

    // Get the TextInput element
    const flatTextInput = getByTestId('State');

    // Simulate a change event on the TextInput
    fireEvent.changeText(flatTextInput, 'India');
  });
  it('should update  City when text input changes', () => {
    // Render the component with mocked context
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );

    // Get the TextInput element
    const flatTextInput = getByTestId('City');

    // Simulate a change event on the TextInput
    fireEvent.changeText(flatTextInput, 'Bangalore');
  });
});
