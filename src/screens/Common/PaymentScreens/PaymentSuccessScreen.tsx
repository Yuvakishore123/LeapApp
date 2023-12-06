/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import usePayment from './usePayment';
import styles from './paymentstylesheet';
import Colors from '../../../constants/colors';
import {
  continueShopping,
  ordersText,
  payment,
  paymentSuccessfull,
  paymentSuccessfullMessage,
} from 'constants/languages/en';

const PaymentSuccessScreen = () => {
  const {navigation, getContainerStyle, getTextColor} = usePayment();
  return (
    <View style={[styles.container, getContainerStyle()]}>
      <Lottie
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1,
          zIndex: 1,
          height: '100%',
          width: '100%',
        }} // Set position to cover the entire screen
        source={require('../../../../assets/successcelebration.json')}
        autoPlay
        speed={0.5}
      />
      <View>
        <Text style={[styles.headerText, getTextColor()]}>{payment}</Text>
      </View>
      <View style={styles.successContainer}>
        <Lottie
          style={{marginTop: 70, height: 200}}
          source={require('../../../../assets/paysuccess2.json')}
          autoPlay
        />
        <Text style={[styles.successText2, getTextColor()]}>
          {paymentSuccessfull}{' '}
        </Text>
        <Text style={[styles.successText3, getTextColor()]}>
          {paymentSuccessfullMessage}{' '}
        </Text>
        <TouchableOpacity
          testID="Home-Button"
          style={styles.btnfield}
          onPress={() =>
            navigation.navigate('UserHomescreen', {screen: 'Homescreen'})
          }>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.btntext, getTextColor()]}>
              {continueShopping}{' '}
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              color="black"
              style={{
                top: 20,
                left: 60,
                height: 29,
                width: 204,
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                fontSize: 20,
                color: 'white',
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.obtnfield}
          onPress={() =>
            navigation.navigate('ProfileScreen', {screen: 'MyOrder'})
          }
          testID="YourOrder-Button">
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.obtntext}>{ordersText} </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              color="black"
              style={{
                top: 20,
                left: 110,
                height: 29,
                width: 204,
                fontWeight: 'bold',
                fontFamily: 'Poppins',
                fontSize: 20,
                color: Colors.buttonColor,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PaymentSuccessScreen;
