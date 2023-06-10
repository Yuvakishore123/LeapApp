import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Styles from '../../screens/OtpScreen/otpStyles';
import Useotp from './useOtp';
import useCart from '../Cart/useCart';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import style from '../../constants/themeColors';
import Colors from '../../constants/Colors';
import LottieAnimation from '../../components/molecules/LottieAnimation/LottieAnimation';

const OTPScreen = () => {
  const {
    phoneNo,
    otp,
    handlephoneNumberChange,
    handlePasswordChange,
    GETOTP,
    handleLogin,
    passwordError,
    closeModal,
    showModal,
  } = Useotp();
  const {colorScheme} = useCart();

  return (
    <ScrollView
      style={[
        Styles.mainContainer,
        colorScheme === 'dark' ? style.blacktheme : style.whiteTheme,
      ]}>
      <View style={Styles.container}>
        <View style={[Styles.titleTextContainer]}>
          <LottieAnimation
            source={require('../../../assets/verify.json')}
            style={Styles.image}
          />
        </View>
        <View>
          <Text
            style={[
              Styles.Textphonenumber,
              colorScheme === 'dark' ? style.whitetext : style.blackText,
            ]}>
            Phone number{' '}
          </Text>
        </View>
        <View>
          <TextInput
            style={[
              Styles.textinputphone,
              colorScheme === 'dark' ? style.cardColor : style.main,
              colorScheme === 'dark' ? style.whitetext : style.blackText,
            ]}
            placeholder="Enter phone number"
            placeholderTextColor={
              colorScheme === 'dark' ? Colors.Textinput : Colors.black
            }
            value={phoneNo}
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={handlephoneNumberChange}
          />
        </View>
        <View>
          <Text
            style={[
              Styles.TextOTP,
              colorScheme === 'dark' ? style.whitetext : style.blackText,
            ]}>
            Otp
          </Text>
          <TextInput
            style={[
              Styles.textinputOTP,
              colorScheme === 'dark' ? style.cardColor : style.main,
              colorScheme === 'dark' ? style.whitetext : style.blackText,
            ]}
            placeholder="Enter Otp"
            placeholderTextColor={
              colorScheme === 'dark' ? Colors.Textinput : Colors.black
            }
            value={otp}
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
          />
        </View>
        {passwordError.length > 0 && <Text>{passwordError}</Text>}
        <View style={Styles.touchablebtnContainer}>
          <TouchableOpacity onPress={GETOTP}>
            <Text
              style={[
                Styles.Text,
                colorScheme === 'dark' ? style.whitetext : style.blackText,
              ]}>
              Get
            </Text>
            <Text style={Styles.touchableTextOTP}>Otp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.touchablebtn} onPress={handleLogin}>
            <Text style={Styles.touchableTextcontinue}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <CustomModal
          showModal={showModal}
          onClose={closeModal}
          message="OTP Sent!!"
        />
      </View>
    </ScrollView>
  );
};

export default OTPScreen;
