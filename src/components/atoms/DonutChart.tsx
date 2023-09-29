/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {View, Animated, TextInput, StyleSheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
const Donut = ({
  refreshTrigger,
  percentage = 0,
  radius = 30,
  strokeWidth = 10,
  duration = 500,
  color = 'tomato',
  delay = 500,
  max = 1000,
  textcolor,
}: {
  // Define prop types for the Donut component
  refreshTrigger: any;
  percentage?: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color?: string;
  delay?: number;
  max?: number;
  textcolor?: string;
}) => {
  // Create animated components
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedInput = Animated.createAnimatedComponent(TextInput);

  // State and Refs initialization
  const [finalPercentage, setFinalPercentage] = useState(percentage);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();

  // Constants for calculations
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
  // Function to handle animations
  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start(({finished}) => {
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

  // Effect to handle animations and updates on mount and prop changes
  useEffect(() => {
    setFinalPercentage(percentage);
    animation(finalPercentage);
    animatedValue.addListener(v => {
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
    });
    return () => {
      animatedValue.removeAllListeners();
    };
  }, [max, finalPercentage, percentage, refreshTrigger]);
  return (
    <View>
      <Svg
        testID="svg-circle"
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <AnimatedInput
        ref={inputRef}
        underlineColorAndroid="transparent"
        editable={false}
        defaultValue="0"
        style={[
          StyleSheet.absoluteFillObject,
          {fontSize: radius / 3, color: textcolor ?? color},
          {fontWeight: 'bold', textAlign: 'center'},
        ]}
      />
    </View>
  );
};
export default Donut;
