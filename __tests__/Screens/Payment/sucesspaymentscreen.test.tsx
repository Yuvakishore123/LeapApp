import React from 'react';
import {
  act,
  fireEvent,
  render,
  renderHook,
} from '@testing-library/react-native';
import PaymentSuccessScreen from '../../../src/screens/PaymentScreens/PaymentSuccessScreen';
import usePayment from 'screens/PaymentScreens/usePayment';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
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
  it('should reset the navigation after 7 seconds', () => {
    // Mock the navigation instance
    const resetMock = jest.fn();
    (useNavigation as jest.Mock).mockReturnValue({reset: resetMock});

    // Render the hook
    renderHook(() => usePayment());

    // Advance the timer by 7 seconds
    act(() => {
      jest.advanceTimersByTime(7000);
    });

    // Ensure that reset was called with the correct arguments
    expect(resetMock).toHaveBeenCalledWith({
      index: 0,
      routes: [{name: 'CartScreen', params: {screen: 'Cart'}}],
    });
  });

  // Make sure to clean up timers after the test
  afterAll(() => {
    jest.useRealTimers();
  });
});
