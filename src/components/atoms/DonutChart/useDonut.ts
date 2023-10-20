/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

const useDonutLogic = ({
  refreshTrigger,
  percentage = 0,
  radius = 30,
  strokeWidth = 10,
  duration = 500,
  delay = 500,
  max = 1000,
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
  const [finalPercentage, setFinalPercentage] = useState(percentage);

  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  const circleRef = useRef();
  const inputRef = useRef();
  const animatedValue = useRef(new Animated.Value(0)).current;
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
  const animatedValueListener = (v: {value: number}) => {
    if (circleRef?.current) {
      const maxPerc = (100 * v.value) / max;
      const strokeDashoffset =
        circleCircumference - (circleCircumference * maxPerc) / 100;
      circleRef.current.setNativeProps({
        strokeDashoffset,
      });
    }
    inputRef.current.setNativeProps({
      text: `${Math.round(v.value)}`,
    });
  };

  useEffect(() => {
    setFinalPercentage(percentage);
    animation(finalPercentage);
    animatedValue.addListener(animatedValueListener);
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, finalPercentage, percentage, refreshTrigger]);
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
