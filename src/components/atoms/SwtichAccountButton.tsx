/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {setRole} from '../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, Text, TouchableOpacity, View, Animated} from 'react-native';
import Colors from '../../constants/colors';
import IonIcon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../constants/Apis';
import ApiService from '../../network/network';
import {logMessage} from 'helpers/helper';

const SwitchAccountButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const userType = useSelector((state: any) => state.Rolereducer.role);
  const [accountType, setAccountType] = useState('');
  const {log} = logMessage();

  const buttonAnimation = useState(new Animated.Value(0))[0];
  const optionsAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setAccountType(userType === 'OWNER' ? 'Owner' : 'Borrower');
  }, [userType]);

  const handlePress = () => {
    setShowOptions(!showOptions);
    Animated.timing(buttonAnimation, {
      toValue: showOptions ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(optionsAnimation, {
      toValue: showOptions ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleOptionPress = async (option: string) => {
    try {
      setShowOptions(false);

      const response = await ApiService.post(
        `${url}/user/switch?profile=${option}`,
        null,
      );

      if (response.status === 200) {
        const newToken = response.headers.access_token;
        await AsyncStorage.removeItem('token');
        await AsyncStorage.setItem('token', newToken);

        dispatch(setRole(option));
        setAccountType(option === 'OWNER' ? 'Owner' : 'Borrower');
      } else {
      }
    } catch (error) {
      log.error('error during switching profile', error);
    }
  };

  return (
    <View>
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
