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
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedInput = Animated.createAnimatedComponent(TextInput);
  const [finalPercentage, setFinalPercentage] = useState(percentage);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  const inputRef = useRef();
  const halfCircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;
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
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            testID="Circle"
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
            testID={'Circle-Ref'}
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
        testID={'Animated-Circle'}
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
