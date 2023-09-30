import {
  act,
  fireEvent,
  render,
  renderHook,
} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';

import LoginScreen from 'screens/LoginScreen/LoginScreen';
import {store} from '../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useLoginscreen from 'screens/LoginScreen/useLoginscreen';

jest.mock('@react-native-community/netinfo', () =>
  require('react-native-netinfo'),
);

jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);

jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));
jest.mock('../../../src/redux/slice/loginSlice', () => ({
  postLogin: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/utils/asyncStorage', () => {
  return {
    setItem: jest.fn(),
    getItem: jest.fn(),
    // Add any other methods you need to mock here
  };
});
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
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
describe('Login Screen', () => {
  it('should render the Login Screen', () => {
    const login = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(login).toBeDefined();
  });
  test('input fields should be editable', () => {
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
  it('sign in button should be disabled when inputs are empty', async () => {
    const {findByTestId, getByPlaceholderText} = render(
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

    fireEvent.changeText(emailInput, '');
    fireEvent.changeText(passwordInput, '');

    const signInButton = await findByTestId('signin-button');
    const buttonStyle = signInButton.props.style;
    expect(buttonStyle.backgroundColor).toBe('#A7D8DE');
  });
  test('should navigate to the correct screen when the continue with otp is pressed', () => {
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
    fireEvent.press(Otpbutton);

    expect(mockNav).toHaveBeenCalledWith('OtpScreen');
  });
  test('should navigate to the correct screen when the Signup  Text is pressed', () => {
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
    fireEvent.press(Otpbutton);

    expect(mockNav).toHaveBeenCalledWith('SignupScreen');
  });
  test('sign in button should be enabled when inputs are valid', async () => {
    const {getByPlaceholderText, findByTestId} = render(
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

    const signInButton = await findByTestId('signin-button');
    expect(signInButton.props.disabled).toBeUndefined();
  });
  test('Email text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const emailInput = getByPlaceholderText('Email Address');
    fireEvent.changeText(emailInput, '');
    const emailError = getByTestId('email');
    fireEvent.changeText(emailInput, '');
    fireEvent(emailInput, 'onBlur', {target: {value: ''}});
    expect(emailError).toBeTruthy();
  });
  test('Password text input should show error when it is empty  ', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const passwordInput = getByPlaceholderText('Enter password');
    fireEvent.changeText(passwordInput, '');
    const emailError = getByTestId('password');
    fireEvent.changeText(passwordInput, '');
    fireEvent(passwordInput, 'onBlur', {target: {value: ''}});
    expect(emailError).toBeTruthy();
  });
  test('Should show the password on clicking eye symbol ', () => {
    const {getByTestId, getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const eyeSymbol = getByTestId('eye-button');
    act(() => {
      fireEvent.press(eyeSymbol);
    });
    const passwordInput = getByPlaceholderText('Enter password');

    expect(eyeSymbol).toBeTruthy();
    expect(passwordInput.props.secureTextEntry).toBe(false);
  });
});
describe('useLogin Screen', () => {
  it('This should open custom modal', () => {
    // Wrap your hook with the Redux Provider
    const {result} = renderHook(() => useLoginscreen(), {
      // Provide the Redux store as a value for the Provider
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.openModal();
    });

    expect(result.current.showModal).toBe(true);
  });
  it('This should close custom modal', () => {
    // Wrap your hook with the Redux Provider
    const {result} = renderHook(() => useLoginscreen(), {
      // Provide the Redux store as a value for the Provider
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.showModal).toBe(false);
  });
});
