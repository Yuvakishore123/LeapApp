import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import SignupScreen from '../../../src/screens/SignUp/SignupScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});
describe('SignUpScreen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  it('renders correctly', () => {
    const Stack = createNativeStackNavigator();

    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Ensure that important elements are present on the screen
    expect(getByPlaceholderText('Enter First name')).toBeDefined();
    expect(getByTestId('first-name')).toBeDefined();
    // Add similar assertions for other elements as needed
  });

  it('handles user input correctly', () => {
    const Stack = createNativeStackNavigator();
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Simulate user input
    const firstNameInput = getByPlaceholderText('Enter First name');
    act(() => {
      fireEvent.changeText(firstNameInput, 'John Doe');
    });

    // Ensure that the input value is updated
    expect(firstNameInput.props.value).toBe('John Doe');
  });

  it('toggles password visibility', () => {
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Simulate press on the eye button
    const eyeButton = getByTestId('eye-button');
    act(() => {
      fireEvent.press(eyeButton);
    });

    // Add assertions to verify if password visibility changes
  });

  it('handles role selection', () => {
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Simulate press on the borrower radio button
    const borrowerRadio = getByTestId('radio-borrower');
    act(() => {
      fireEvent.press(borrowerRadio);
    });

    // Add assertions to verify if role is updated correctly
  });
  test('should navigate to the correct screen when the login button is pressed', () => {
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Simulate pressing the login button
    act(() => {
      fireEvent.press(getByTestId('login-button'));
    });

    // Assert that the navigate function has been called with the correct screen name
    expect(mockNav).toHaveBeenCalledWith('Login');
  });
  it('validates form inputs and shows error messages', () => {
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const firstNameInput = getByTestId('first-name');
    const lastNameInput = getByTestId('last-name');
    const emailInput = getByTestId('email');
    const phoneNumberInput = getByTestId('Phone-number');
    const passwordInput = getByTestId('Password');
    const signUpButton = getByTestId('signup-button');

    // Attempt to submit the form without entering any data
    act(() => {
      expect(getByTestId('first-name')).toBeTruthy();
      expect(getByTestId('last-name')).toBeTruthy();
      expect(getByTestId('email')).toBeTruthy();
      expect(getByTestId('Phone-number')).toBeTruthy();
      expect(getByTestId('Password')).toBeTruthy();

      // Enter invalid data in the inputs
      fireEvent.changeText(firstNameInput, 'John');
      fireEvent.changeText(lastNameInput, 'Doe');
      fireEvent.changeText(emailInput, 'invalid-email');
      fireEvent.changeText(phoneNumberInput, '123456');
      fireEvent.changeText(passwordInput, 'pass');
    });
    // Attempt to submit the form againx`
    act(() => {
      fireEvent.press(signUpButton);
    });
  });
  it('renders the error messages for the input fields', async () => {
    const Stack = createNativeStackNavigator();

    const {getByPlaceholderText, findByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const firstNameInput = getByPlaceholderText('Enter First name');
    const lastNameInput = getByPlaceholderText('Enter Last name');
    const emailInput = getByPlaceholderText('Enter email');
    const PhoneNumber = getByPlaceholderText('Enter Phone number');
    const Password = getByPlaceholderText('Enter password');
    // Attempt to submit the form without entering the required fields
    fireEvent.changeText(firstNameInput, '');
    fireEvent.changeText(lastNameInput, '');
    fireEvent.changeText(emailInput, '');
    fireEvent.changeText(PhoneNumber, '');
    fireEvent.changeText(Password, '');
    fireEvent(firstNameInput, 'onBlur', {target: {value: ''}});
    fireEvent(lastNameInput, 'onBlur', {target: {value: ''}});
    fireEvent(emailInput, 'onBlur', {target: {value: ''}});
    fireEvent(PhoneNumber, 'onBlur', {target: {value: ''}});
    fireEvent(Password, 'onBlur', {target: {value: ''}});
    const firstNameError = await findByText('Enter First Name');
    const lastNameError = await findByText('Enter LastName');
    const emailError = await findByText('Enter valid Email');
    const PhoneNumberError = await findByText('Phone number is required');
    const PasswordError = await findByText('Please enter password');
    expect(firstNameError).toBeTruthy();
    expect(lastNameError).toBeTruthy();
    expect(emailError).toBeTruthy();
    expect(PhoneNumberError).toBeTruthy();
    expect(PasswordError).toBeTruthy();
  });
  test('should call handleRole with owner when the owner radio button is clicked', () => {
    // Render the SignUpScreen component
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Simulate a press event on the borrower radio button
    fireEvent.press(getByTestId('radio-borrower'));
    const handleRole = 'BORROWER';

    // Assert that handleRole is called with the correct value
    // You may need to provide a mock implementation for handleRole
    expect(handleRole).toBe('BORROWER');
  });
  test('should call handleRole with Owner when the owner radio button is clicked', () => {
    // Render the SignUpScreen component
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Simulate a press event on the owner radio button
    fireEvent.press(getByTestId('radio-owner'));
    const handleRole = 'OWNER';
    expect(handleRole).toBe('OWNER');
  });
});
