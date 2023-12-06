import React, {useContext} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LottieAnimation from '../../../components/molecules/LottieAnimation/LottieAnimation';
import Styles from './otpStyles';
import Useotp from './useOtp';

import CustomModal from '../../../components/atoms/CustomModel/CustomModel';

import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import {
  enterOtp,
  enterPhonenumber,
  get,
  otp,
  phoneNumber,
  signin,
} from 'constants/languages/en';

const OTPScreen = (): React.JSX.Element => {
  const {
    phoneNo,
    otptext,
    handlephoneNumberChange,
    handlePasswordChange,
    GETOTP,
    handleLogin,
    closeModal,
    showModal,
    PlaceholderColor,
  } = Useotp();

  const {getContainerStyle, getTextColor, getTextInputStyle} =
    useContext(ColorSchemeContext);
  return (
    <ScrollView style={[Styles.mainContainer, getContainerStyle()]}>
      <View style={Styles.container}>
        <View style={[Styles.titleTextContainer]}>
          <LottieAnimation
            source={require('../../../../assets/verify.json')}
            style={Styles.image}
          />
        </View>
        <View>
          <Text style={[Styles.Textphonenumber, getTextColor()]}>
            {phoneNumber}{' '}
          </Text>
        </View>
        <View>
          <TextInput
            style={[Styles.textinputphone, getTextInputStyle(), getTextColor()]}
            placeholder={enterPhonenumber}
            placeholderTextColor={PlaceholderColor}
            value={phoneNo}
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={handlephoneNumberChange}
          />
        </View>
        <View>
          <Text style={[Styles.TextOTP, getTextColor()]}>{otp}</Text>
          <TextInput
            style={[Styles.textinputOTP, getTextInputStyle(), getTextColor()]}
            placeholder={enterOtp}
            placeholderTextColor={PlaceholderColor}
            value={otptext}
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
          />
        </View>
        <View style={Styles.touchablebtnContainer}>
          <TouchableOpacity onPress={GETOTP}>
            <Text style={[Styles.Text, getTextColor()]}>{get}</Text>
            <Text style={Styles.touchableTextOTP}>{otp}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.touchablebtn} onPress={handleLogin}>
            <Text style={Styles.touchableTextcontinue}>{signin}</Text>
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
