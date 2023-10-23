import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import Donut from 'components/atoms/DonutChart';
import colors from 'constants/colors';

import React from 'react';
import {Animated} from 'react-native';
import {useDispatch} from 'react-redux';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('DonutChart', () => {
  const mockDispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
  it('should render the Donut Chart', () => {
    jest.useFakeTimers();
    const result = render(<Donut refreshTrigger={undefined} />);
    expect(result).toBeDefined();
  });
  it('should render the Animated Circle in the Donut chart Donut Chart', () => {
    jest.useFakeTimers();
    const {getByTestId} = render(<Donut refreshTrigger={undefined} />);
    const AnimatedCircle = getByTestId('Animated-Circle');
    expect(AnimatedCircle).toBeDefined();
  });
  it('should render the shape  Circle in the Donut chart Donut Chart', () => {
    jest.useFakeTimers();
    const {getByTestId} = render(<Donut refreshTrigger={undefined} />);
    const AnimatedCircle = getByTestId('Circle');
    expect(AnimatedCircle).toBeDefined();
  });
  it('should Call circle ref to load the data', () => {
    jest.useFakeTimers();
    const refreshTrigger = jest.fn();
    const {getByTestId} = render(
      <Donut
        percentage={10}
        color={colors.white}
        delay={1000}
        max={200}
        refreshTrigger={refreshTrigger}
        textcolor={colors.white}
      />,
    );
    const AnimatedCircle = getByTestId('Circle-Ref');
    expect(AnimatedCircle).toBeDefined();
  });
  it('should call animation with toValue when animation function is called', () => {
    const animationSpy = jest.spyOn(Animated, 'timing');
    const refreshTrigger = jest.fn();
    const {getByTestId} = render(
      <Donut
        percentage={100}
        color={colors.white}
        delay={1000}
        max={200}
        refreshTrigger={refreshTrigger}
        textcolor={colors.white}
      />,
    );

    expect(animationSpy).toHaveBeenCalledWith(expect.any(Object), {
      toValue: 100, // Ensure this matches the initial value
      duration: 500,
      delay: 1000,
      useNativeDriver: true,
    });
  });

  it('should execute the animation function', () => {
    // Mock Animated.timing to check if it's called with the correct parameters
    const animatedSpy = jest.spyOn(Animated, 'timing').mockReturnValue({
      start: () => {},
      stop: function (): void {
        throw new Error('Function not implemented.');
      },
      reset: function (): void {
        throw new Error('Function not implemented.');
      },
    });

    // Render the Donut component
    const {getByTestId} = render(<Donut refreshTrigger={undefined} />);

    // Perform some action that triggers the animation
    // For example, you might simulate user interaction or component updates

    // Assert that Animated.timing was called with the expected parameters
    expect(animatedSpy).toHaveBeenCalledWith(expect.any(Object), {
      toValue: expect.any(Number), // Check if toValue is called with a number
      duration: expect.any(Number), // Check if duration is called with a number
      delay: expect.any(Number), // Check if delay is called with a number
      useNativeDriver: true,
    });
  });
  it('should handle animation not starting', () => {
    // Mock Animated.timing to prevent animation from starting
    jest.spyOn(Animated, 'timing').mockReturnValue({
      start: () => true,
      stop: function () {},
      reset: function () {},
    });

    // Mock Animated.Value to avoid side effects
    const animatedValueMock = new Animated.Value(100);
    jest.spyOn(Animated, 'Value').mockReturnValue(animatedValueMock);

    // Render the Donut component
    const {getByTestId} = render(
      <Donut
        percentage={100}
        color={colors.white}
        delay={1000}
        max={200}
        refreshTrigger={true}
        textcolor={colors.white}
      />,
    );

    // Trigger the animation by simulating an action (e.g., button click)
    act(() => {
      fireEvent.press(getByTestId('Animated-Circle')); // Replace with the actual trigger
    });
  });
});
