import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import SplashScreen from '../../../src/screens/Splashscreen/Splashscreen';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

describe('SplashScreen', () => {
  it('render the splashscreen', () => {
    const result = render(<SplashScreen />);
    expect(result).toBeTruthy();
  });
  it('should navigate to Login screen when Get Started button is pressed', () => {
    const {getByTestId} = render(<SplashScreen />);
    const getStartedButton = getByTestId('get-started-button');
    fireEvent.press(getStartedButton);
    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });
});
