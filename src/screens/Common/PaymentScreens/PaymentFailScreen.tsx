/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styles from './paymentstylesheet';
import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';

import usePayment from './usePayment';
const PaymentFailScreen = () => {
  const {getContainerStyle, getTextColor} = usePayment();
  return (
    <View
      style={[styles.failcontainer, getContainerStyle()]}
      testID="fail-container">
      <View>
        <Text style={[styles.failheaderText, getTextColor()]}>Payment</Text>
      </View>
      <View
        style={[styles.successContainer, getContainerStyle()]}
        testID="success-container">
        <Lottie
          source={require('../../../../assets/payfailed.json')}
          autoPlay
          style={[{height: 200, marginRight: '35%'}, getContainerStyle()]}
          testID="lottie-animation"
        />
        <Text style={[styles.successText, getTextColor()]}>
          Payment Failed!
        </Text>
        <Text style={[styles.successText1, getTextColor()]}>
          Something went wrong. Try Again.
        </Text>
      </View>
    </View>
  );
};
export default PaymentFailScreen;
