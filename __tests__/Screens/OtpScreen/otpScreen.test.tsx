import React from 'react';
import {render} from '@testing-library/react-native';
import OTPScreen from '../../../src/screens/OtpScreen/OtpScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/screens/OtpScreen/useOtp', () => ({
  __esModule: true,
  default: () => ({
    phoneNo: '',
    otp: '',
    handlephoneNumberChange: jest.fn(),
    handlePasswordChange: jest.fn(),
    GETOTP: jest.fn(),
    handleLogin: jest.fn(),
    passwordError: '',
    closeModal: jest.fn(),
    showModal: false,
  }),
}));

describe('OTPScreen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  it('should render the OTPScreen correctly', () => {
    const {getByText, getByPlaceholderText, getAllByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OTPScreen />
        </NavigationContainer>
      </Provider>,
    );

    expect(getByText('Phone number')).toBeTruthy();
    expect(getByPlaceholderText('Enter phone number')).toBeTruthy();
    expect(getAllByText('Otp')).toBeTruthy(); // Use getAllByText instead
    expect(getByPlaceholderText('Enter Otp')).toBeTruthy();
    expect(getByText('Get')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });
});
