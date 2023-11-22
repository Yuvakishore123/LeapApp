import {useState, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

// Custom hook for managing the logic of a donut chart animation
const useDonutLogic = ({
  refreshTrigger, // Trigger to refresh the animation
  percentage = 0, // Initial percentage value
  radius = 30, // Radius of the donut
  strokeWidth = 10, // Width of the donut's stroke
  duration = 500, // Duration of the animation in milliseconds
  delay = 500, // Delay before starting the animation in milliseconds
  max = 1000, // Maximum value for calculation
}: {
  refreshTrigger: any;
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  delay?: number;
  max?: number;
}) => {
  // State to track the final percentage for the animation
  const [finalPercentage, setFinalPercentage] = useState(percentage);

  // Calculations for donut properties
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;

  // Refs for accessing the native properties of animated components
  const circleRef = useRef();
  const inputRef = useRef();
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Animation function to create a timed animation effect
  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start(({finished}: {finished: any}) => {
      if (!finished) {
        return;
      }
      if (Math.round(toValue) === Math.round(finalPercentage)) {
        return;
      }
      if (toValue === 0) {
        animation(finalPercentage);
      } else {
        animation(0);
      }
    });
  };

  // Listener function to update the visual representation during animation
  const animatedValueListener = (v: {value: number}) => {
    if (circleRef?.current) {
      const maxPerc = (100 * v.value) / max;
      const strokeDashoffset =
        circleCircumference - (circleCircumference * maxPerc) / 100;
      circleRef.current?.setNativeProps({
        strokeDashoffset,
      });
    }
    inputRef?.current?.setNativeProps({
      text: `${Math.round(v.value)}`,
    });
  };

  // Effect hook to handle initial setup and cleanup
  useEffect(() => {
    setFinalPercentage(percentage);
    animation(finalPercentage);
    animatedValue.addListener(animatedValueListener);
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, finalPercentage, percentage, refreshTrigger]);

  // Return the variables and functions for external use
  return {
    circleCircumference,
    halfCircle,
    circleRef,
    inputRef,
    animation,
    finalPercentage,
    animatedValue,
    setFinalPercentage,
    animatedValueListener,
  };
};

export default useDonutLogic;
