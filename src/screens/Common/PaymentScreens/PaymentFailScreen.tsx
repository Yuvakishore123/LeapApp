/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styles from './paymentstylesheet';
import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';

import usePayment from './usePayment';
import {
  payment,
  paymentFailed,
  paymentFailedMessage,
} from 'constants/languages/en';
const PaymentFailScreen = () => {
  const {getContainerStyle, getTextColor} = usePayment();
  return (
    <View
      style={[styles.failcontainer, getContainerStyle()]}
      testID="fail-container">
      <View>
        <Text style={[styles.failheaderText, getTextColor()]}>{payment}</Text>
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
          {paymentFailed}
        </Text>
        <Text style={[styles.successText1, getTextColor()]}>
          {paymentFailedMessage}
        </Text>
      </View>
    </View>
  );
};
export default PaymentFailScreen;
