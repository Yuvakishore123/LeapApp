import React from 'react';
import {render} from '@testing-library/react-native';
import PaymentFailScreen from '../../../src/screens/PaymentScreens/PaymentFailScreen';
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));
describe('PaymentFailScreen', () => {
  test('renders correctly', () => {
    const {getByText, getByTestId} = render(<PaymentFailScreen />);

    // Assert that the necessary components are rendered
    expect(getByTestId('fail-container')).toBeDefined();
    expect(getByText('Payment')).toBeDefined();
    expect(getByTestId('success-container')).toBeDefined();
    expect(getByText('Payment Failed!')).toBeDefined();
    expect(getByText('Something went wrong. Try Again.')).toBeDefined();
  });
});
