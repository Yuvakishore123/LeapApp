/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import BackButton from '../BackButton/BackButton';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import {useNavigation} from '@react-navigation/native';

type HeadingTextProps = {
  message: string; // The message to be displayed as the heading
  navigation: any; // Assuming navigation is available as a prop
};

const HeadingText = ({message}: HeadingTextProps) => {
  const {getTextColor} = useContext(ColorSchemeContext); // Using context to get color scheme
  const navigation = useNavigation(); // Getting navigation object from react-navigation
  return (
    <>
      {/* BackButton component for navigation */}
      <View style={{position: 'absolute', zIndex: 1}}>
        <BackButton navigation={navigation} />
      </View>
      {/* Heading text container */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 90,
          width: '100%',
        }}>
        <Text style={[styles.textStyle, getTextColor()]}>{message}</Text>
      </View>
    </>
  );
};

export default HeadingText;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: 'Poppins-Bold',
  },
});
