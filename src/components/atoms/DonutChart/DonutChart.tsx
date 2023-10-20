/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {View, Animated, TextInput, StyleSheet} from 'react-native';
import Svg, {G, Circle} from 'react-native-svg';
import useDonutLogic from './useDonut';
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
  const {halfCircle, circleCircumference, circleRef, inputRef} = useDonutLogic({
    refreshTrigger,
    percentage,
    radius,
    strokeWidth,
    duration,
    delay,
    max,
  });
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
