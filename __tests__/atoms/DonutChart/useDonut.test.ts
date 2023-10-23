import {act, renderHook} from '@testing-library/react-native';
import useDonutLogic from '../../../src/components/atoms/DonutChart/useDonut'; // Assuming this is the correct path
import {Animated} from 'react-native';
const addListenerMock = jest.fn();
const removeAllListenersMock = jest.fn();
Animated.timing = jest.fn(() => ({
  start: (callback: (arg0: {finished: boolean}) => void) => {
    // Simulate animation completion
    callback({finished: true});
  },
  addListener: addListenerMock,
  removeAllListeners: removeAllListenersMock,
}));

describe('useDonutLogic', () => {
  beforeEach(() => {
    // Mock any dependencies if needed
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const {result} = renderHook(() =>
      useDonutLogic({
        refreshTrigger: null,
      }),
    );

    expect(result.current.finalPercentage).toBe(0);
    // Add more expectations as needed for other default values
  });
  it('should handle animation completion when toValue === finalPercentage', () => {
    const finalPercentage = 50; // Set the final percentage
    const toValue = finalPercentage; // toValue equals finalPercentage
    const {result} = renderHook(() =>
      useDonutLogic({
        refreshTrigger: null,
      }),
    );
    // Call the animation function
    result.current.animation(toValue);

    // Verify that Animated.timing is called with the correct parameters
    expect(Animated.timing).toHaveBeenCalledWith(expect.any(Object), {
      toValue: 0,
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    });

    // Verify that the recursive calls are not made
    expect(Animated.timing).toHaveBeenCalledTimes(3);
  });
  it('should handle animation completion when toValue equals 0', () => {
    const finalPercentage = 0; // Set the final percentage
    const toValue = finalPercentage; // toValue equals finalPercentage
    const {result} = renderHook(() =>
      useDonutLogic({
        refreshTrigger: null,
        percentage: 0,
      }),
    );
    // Call the animation function
    result.current.animation(toValue);

    // Verify that Animated.timing is called with the correct parameters
    expect(Animated.timing).toHaveBeenCalledWith(expect.any(Object), {
      toValue: 0,
      duration: 500,
      delay: 500,
      useNativeDriver: true,
    });

    // Verify that the recursive calls are not made
    expect(Animated.timing).toHaveBeenCalledTimes(2);
  });
  it('should handle animation completion when finished is true and toValue equals finalPercentage', () => {
    const finalPercentage = 50;
    const toValue = finalPercentage;
    const {result} = renderHook(() =>
      useDonutLogic({
        refreshTrigger: null,
        percentage: 0,
      }),
    );
    // Call the animation function
    result.current.animation(toValue);
    // Verify that Animated.timing is called with the correct parameters
    expect(Animated.timing).toHaveBeenCalledWith(expect.any(Object), {
      toValue,
      duration: expect.any(Number),
      delay: expect.any(Number),
      useNativeDriver: true,
    });

    // Simulate animation completion
    jest.runAllTimers();

    // Verify that the recursive calls are not made
    expect(Animated.timing).toHaveBeenCalledTimes(3);
  });
  it('should update circleRef and inputRef with correct props', () => {
    // Create refs for inputRef and circleRef
    jest.mock('react');

    // Render the hook with the mocked refs
    const {result} = renderHook(() =>
      useDonutLogic({
        refreshTrigger: true,
        percentage: 50,
        radius: 30,
        strokeWidth: 10,
        duration: 500,
        delay: 500,
        max: 1000,
      }),
    );

    // Trigger animated value change
    act(() => {
      const v = {value: 50};
      result.current.animatedValueListener(v);
    });

    expect(result.current.animatedValueListener).toHaveBeenCalledWith(50);
  });
});
