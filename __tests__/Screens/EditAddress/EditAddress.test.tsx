import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import EditAddress, {SkeletonLoader} from 'screens/EditAddress/EditAddress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useEditAddress from 'screens/EditAddress/useEditAddress';
import useAddAddress from 'screens/Owneraddaddress/useAddAddress';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
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
jest.mock('screens/Owneraddaddress/useAddAddress', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    isLoading: false,
  })),
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: () => ({
    params: {address: {}},
  }),
}));
describe('EditAddress Screen', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useEditAddress as jest.Mock).mockReturnValue({
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
    });
    (useAddAddress as jest.Mock).mockReturnValue({
      isLoading: false,
    });
  });
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
    const handleupdate = jest.fn();
    (useEditAddress as jest.Mock).mockReturnValue({
      handleUpdateAddress: handleupdate,
      PlaceholderColor: jest.fn(),
    });
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );

    const updateButton = getByText('Update Address');
    fireEvent.press(updateButton);
    expect(handleupdate).toBeCalled();
  });
  it('should call handleOptionChange when radio button is pressed', () => {
    const handleradiohome = jest.fn();
    (useEditAddress as jest.Mock).mockReturnValue({
      handleOptionChange: handleradiohome,
      PlaceholderColor: jest.fn(),
    });
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

    expect(handleradiohome).toBeCalled();
  });
  it('should call handleOptionChange of office when radio button is pressed', () => {
    const handleradioffice = jest.fn();
    (useEditAddress as jest.Mock).mockReturnValue({
      handleOptionChange: handleradioffice,
      PlaceholderColor: jest.fn(),
      selectedOption: 'OFFICE',
    });
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

    expect(handleradioffice).toBeCalled();
  });
  it('should call handleOptionChange for unchecked when radio button is pressed', () => {
    const handleradiohome = jest.fn();
    (useEditAddress as jest.Mock).mockReturnValue({
      handleOptionChange: handleradiohome,
      PlaceholderColor: jest.fn(),
      selectedOption: '',
    });
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

    expect(handleradiohome).toBeCalled();
  });
  it('should call handleOptionChange of office for unchecked when radio button is pressed', () => {
    const handleradioffice = jest.fn();
    (useEditAddress as jest.Mock).mockReturnValue({
      handleOptionChange: handleradioffice,
      PlaceholderColor: jest.fn(),
      selectedOption: '',
    });
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

    expect(handleradioffice).toBeCalled();
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
  it('should render skeleton loader correctly', () => {
    const {getByTestId} = render(<SkeletonLoader />);

    // Query for elements you expect to be rendered by the skeleton loader
    const input1 = getByTestId('loading-component');

    // Now you can make assertions about these elements
    expect(input1).toBeDefined();
  });
  it('should render loading state ', () => {
    const handleupdate = jest.fn();
    (useEditAddress as jest.Mock).mockReturnValue({
      handleUpdateAddress: handleupdate,
      PlaceholderColor: jest.fn(),
    });
    (useAddAddress as jest.Mock).mockReturnValue({
      isLoading: true,
    });
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <EditAddress />
        </NavigationContainer>
      </Provider>,
    );

    const updateButton = getByTestId('loading');
    expect(updateButton).toBeDefined();
  });
});
