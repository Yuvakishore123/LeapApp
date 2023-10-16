import {fireEvent, render} from '@testing-library/react-native';
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
        percentage={0}
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
    const {getByTestId} = render(<Donut refreshTrigger={undefined} />);

    expect(animationSpy).toHaveBeenCalledWith(expect.any(Object), {
      toValue: 0, // Ensure this matches the initial value
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    });
  });
});
