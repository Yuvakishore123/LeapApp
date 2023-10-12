/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';
import Colors from '../../../constants/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';
import useSwitchButton from './useSwitchbutton';

const SwitchAccountButton = () => {
  const {
    showOptions,
    handleOptionPress,
    handlePress,
    accountType,
    optionsAnimation,
  } = useSwitchButton();

  return (
    <View>
      {/* Switch Account Button */}
      <TouchableOpacity
        onPress={handlePress}
        testID="switch-account-button"
        style={[styles.button, {opacity: 0.9}]}
        accessibilityLabel={`Switch account type to ${
          accountType === 'BORROWER' ? 'OWNER' : 'BORROWER'
        }`}>
        <Text style={styles.label}>{accountType}</Text>
        <View style={{marginRight: 90}}>
          <IonIcon name="chevron-down" color={'#fff'} size={20} />
        </View>
      </TouchableOpacity>
      {/* Account Type Options */}
      {showOptions && (
        <Animated.View
          style={[
            styles.options,
            {opacity: optionsAnimation, transform: [{scale: optionsAnimation}]},
          ]}>
          <TouchableOpacity
            testID="account-type-borrower"
            onPress={() => handleOptionPress('BORROWER')}
            accessibilityLabel="BORROWER">
            <View
              style={
                accountType === 'BORROWER'
                  ? styles.buttonContainer
                  : styles.buttonUnselected
              }>
              <Text
                style={
                  accountType === 'BORROWER'
                    ? styles.optionSelected
                    : styles.option
                }>
                {'Borrower'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            testID="account-type-owner"
            onPress={() => handleOptionPress('OWNER')}
            accessibilityLabel="OWNER">
            <View
              style={
                accountType === 'OWNER'
                  ? styles.buttonContainer
                  : styles.buttonUnselected
              }>
              <Text
                style={
                  accountType === 'OWNER'
                    ? styles.optionSelected
                    : styles.option
                }>
                {'Owner'}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#363062',
    borderRadius: 40,
    height: 50,
    width: '50%',
    marginLeft: 100,
    marginTop: 10,
    justifyContent: 'center',
  },
  icon: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    marginTop: 3,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    marginLeft: 100,
    color: 'white',
  },
  options: {
    position: 'absolute',
    top: '100%',
    backgroundColor: 'rgba(5, 5, 5, 0.1)',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: 300,
    zIndex: 2,
    alignSelf: 'center',
    marginLeft: 45,
    marginTop: 8,
    alignItems: 'center',
    shadowColor: Colors.iconscolor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  option: {
    fontWeight: '700',
    fontSize: 16,
    paddingVertical: 5,
    color: Colors.white,
  },
  optionSelected: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 5,
    backgroundColorcolor: '#FFFFFF',
  },
  buttonContainer: {
    backgroundColor: '#363062',
    width: 270,
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonUnselected: {
    backgroundColor: '#B8B5FF',
    opacity: 0.7,
    marginTop: 3,
    marginBottom: 3,
    width: 270,
    borderRadius: 15,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SwitchAccountButton;
