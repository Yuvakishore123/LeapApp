import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';

import {store} from '../../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from 'screens/SignUp/SignupScreen';
import {configureStore} from '@reduxjs/toolkit';
import signupSlice, {postSignup} from '../../../../src/redux/slice/signupSlice';
import thunk from 'redux-thunk';

jest.mock('@react-native-community/netinfo', () =>
  require('react-native-netinfo'),
);
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const Stack = createNativeStackNavigator();
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
jest.mock('@react-native-firebase/messaging', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    messaging: jest.fn(() => ({
      onTokenRefresh: jest.fn(),
      setBackgroundMessageHandler: jest.fn(),
    })),
  };
});
describe('SignUpScreen Screen', () => {
  const Signup = render(
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>,
  );
  it('should render the Signup Screen', () => {
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeDefined();
  });

  test('The Sign Up Page Should Have Email ', () => {
    const Email = Signup.getByTestId;
    expect(Email).toBeDefined();
  });
  test('Email text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const EmailInput = getByPlaceholderText('Enter email');
    fireEvent.changeText(EmailInput, '');
    const emailError = getByTestId('email');
    fireEvent.changeText(EmailInput, '');
    fireEvent(EmailInput, 'onBlur', {target: {value: ''}});
    expect(emailError).toBeTruthy();
  });
  test('The Sign Up Page Should Have FirstName ', () => {
    const FirstName = Signup.getByTestId;
    expect(FirstName).toBeDefined();
  });
  test('FirstName text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const firstNameInput = getByPlaceholderText('Enter First name');
    fireEvent.changeText(firstNameInput, '');
    const firstNameError = getByTestId('first-name');
    fireEvent.changeText(firstNameInput, '');
    fireEvent(firstNameInput, 'onBlur', {target: {value: ''}});
    expect(firstNameError).toBeTruthy();
  });

  test('The Sign Up Page Should Have LastName ', () => {
    const LastName = Signup.getByTestId;
    expect(LastName).toBeDefined();
  });
  test('LastName text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const lastNameInput = getByPlaceholderText('Enter Last name');
    fireEvent.changeText(lastNameInput, '');
    const lastNameError = getByTestId('last-name');
    fireEvent.changeText(lastNameInput, '');
    fireEvent(lastNameError, 'onBlur', {target: {value: ''}});
    expect(lastNameError).toBeTruthy();
  });
  test('The Sign Up Page Should Have Password ', () => {
    const Password = Signup.getByTestId;
    expect(Password).toBeDefined();
  });
  test('Password text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const Password = getByPlaceholderText('Enter password');
    fireEvent.changeText(Password, '');
    const passwordError = getByTestId('Password');
    fireEvent.changeText(Password, '');
    fireEvent(passwordError, 'onBlur', {target: {value: ''}});
    expect(passwordError).toBeTruthy();
  });
  test('The Sign Up Page Should Have PhoneNumber ', () => {
    const PhoneNumber = Signup.getByTestId;
    expect(PhoneNumber).toBeDefined();
  });
  test('Phonenumber text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const PhoneNumber = getByPlaceholderText('Enter Phone number');
    fireEvent.changeText(PhoneNumber, '');
    const phonenumberError = getByTestId('Phone-number');
    fireEvent.changeText(PhoneNumber, '');
    fireEvent(phonenumberError, 'onBlur', {target: {value: ''}});
    expect(phonenumberError).toBeTruthy();
  });
  test('Role needs to be changed to Borrower when clicking on radiobutton', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const Borrower = getByTestId('radio-borrower');
    fireEvent.press(Borrower);
    fireEvent(Borrower, 'select', {target: {value: 'checked'}});
  });
  test('Role needs to be changed when to Owner clicking on radiobutton', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const Borrower = getByTestId('radio-owner');
    fireEvent.press(Borrower);
    fireEvent(Borrower, 'select', {target: {value: 'checked'}});
  });
  test('Already user  button should navigate to Login page', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const login = getByTestId('login-button');
    act(() => {
      fireEvent.press(login);
    });
    expect(mockNav).toHaveBeenCalledWith('Login');
  });
  test('It shuld hide  the Password when pressed', () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Signup" component={SignUpScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const eyeButton = getByTestId('EyeButton');
    const passwordInput = getByTestId('Password'); // Replace with your actual password input testID
    expect(passwordInput.props.secureTextEntry).toBe(true);

    act(() => {
      fireEvent.press(eyeButton);
    });

    // After pressing the Eye button, the password should be hidden
    expect(passwordInput.props.secureTextEntry).toBe(false);
  });
});
