import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import PaymentSuccessScreen from '../../../src/screens/PaymentScreens/PaymentSuccessScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    reset: jest.fn(),
  }),
}));
describe('PaymentSuccessScreen', () => {
  test('renders success message', () => {
    // Render the PaymentSuccessScreen component
    const {getByText} = render(<PaymentSuccessScreen />);

    // Assert that the success message is rendered
    const successText = getByText('Payment successful!');
    expect(successText).toBeTruthy();
  });
  test('navigates to UserHomescreen on Continue Shopping button press', () => {
    // Mock the navigation object
    const navigationMock = {navigate: jest.fn()};

    // Render the PaymentSuccessScreen component with the mock navigation object
    const {getByText} = render(
      <PaymentSuccessScreen navigation={navigationMock} />,
    );

    // Simulate button press
    const continueShoppingButton = getByText('Continue Shopping');
    fireEvent.press(continueShoppingButton);
  });

  test('navigates to ProfileScreen on Your Orders button press', () => {
    // Mock the navigation object
    const navigationMock = {navigate: jest.fn()};

    // Render the PaymentSuccessScreen component with the mock navigation object
    const {getByText} = render(
      <PaymentSuccessScreen navigation={navigationMock} />,
    );

    // Simulate button press
    const yourOrdersButton = getByText('Your Orders');
    fireEvent.press(yourOrdersButton);
  });
});
