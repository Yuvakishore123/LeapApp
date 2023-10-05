import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../../../src/screens/LoginScreen/LoginScreen';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {store} from '../../../src/redux/store';
import {Text, TouchableOpacity, View} from 'react-native';
import useLoginscreen from 'screens/LoginScreen/useLoginscreen';
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));
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
jest.mock('constants/asyncStorageWrapper', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve('mockedFCMToken')),
}));
jest.mock('@react-native-firebase', () => ({
  messaging: jest.fn(() => ({
    getToken: jest.fn(() => Promise.resolve('mockedToken')),
  })),
}));
describe('LoginScreen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  const TestComponent = () => {
    const {openModal, closeModal, showModal} = useLoginscreen();

    return (
      <View>
        <TouchableOpacity onPress={openModal} testID="open">
          Open Modal
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal} testID="close">
          Close Modal
        </TouchableOpacity>
        {showModal && <Text>Modal content</Text>}
      </View>
    );
  };
  test('should open the modal when openModal is called', () => {
    const {getByTestId, queryByText} = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );
    act(() => {
      fireEvent.press(getByTestId('open'));
    });
    expect(queryByText('Modal content')).toBeTruthy();
  });

  test('should close the modal when closeModal is called', () => {
    const {getByTestId, queryByText} = render(
      <Provider store={store}>
        <TestComponent />
      </Provider>,
    );
    act(() => {
      fireEvent.press(getByTestId('open'));
    });
    expect(queryByText('Modal content')).toBeTruthy();
    act(() => {
      fireEvent.press(getByTestId('close'));
    });
    expect(queryByText('Modal content')).toBeNull();
  });
  test('renders correctly', () => {
    const Stack = createNativeStackNavigator();
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Ensure that important elements are present on the screen
    expect(getByPlaceholderText('Email Address')).toBeDefined();
    expect(getByPlaceholderText('Enter password')).toBeDefined();
  });

  test('input fields can be typed into', () => {
    const Stack = createNativeStackNavigator();
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Email Address');
    const passwordInput = getByPlaceholderText('Enter password');

    act(() => {
      fireEvent.changeText(emailInput, 'test@example.com');
      fireEvent.changeText(passwordInput, 'password123');
    });

    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
  });

  test('toggle password visibility', () => {
    const Stack = createNativeStackNavigator();
    const {getByTestId, getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const passwordInput = getByPlaceholderText('Enter password');
    const eyeButton = getByTestId('eye-button');

    // Initially, password should be hidden (secureTextEntry)
    expect(passwordInput.props.secureTextEntry).toBe(true);

    // Simulate a press on the eye button
    fireEvent.press(eyeButton);

    // Now, password should be visible
    expect(passwordInput.props.secureTextEntry).toBe(false);

    // Pressing the eye button again should hide the password
    fireEvent.press(eyeButton);
    expect(passwordInput.props.secureTextEntry).toBe(true);
    // Add assertions to verify if password visibility changes
  });

  test('should navigate to the OtpScreen screen when the continue with otp is pressed', () => {
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const Otpbutton = getByTestId('Otpscreen-button');
    act(() => {
      fireEvent.press(Otpbutton);
    });

    expect(mockNav).toHaveBeenCalledWith('OtpScreen');
  });
  //TestCase 2
  test('should navigate to the signUpScreen screen when the Signup  Text is pressed', () => {
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    const Otpbutton = getByTestId('Signup-Button');
    act(() => {
      fireEvent.press(Otpbutton);
    });

    expect(mockNav).toHaveBeenCalledWith('SignupScreen');
  });
});
