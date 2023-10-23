import React, {useContext} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import LottieAnimation from '../../components/molecules/LottieAnimation/LottieAnimation';
import Styles from '../../screens/OtpScreen/otpStyles';
import Useotp from './useOtp';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

const OTPScreen = (): React.JSX.Element => {
  const {
    phoneNo,
    otp,
    handlephoneNumberChange,
    handlePasswordChange,
    GETOTP,
    handleLogin,
    closeModal,
    showModal,
  } = Useotp();
  const {getContainerStyle, getTextColor, getTextInputStyle, PlaceholderColor} =
    useContext(ColorSchemeContext);
  return (
    <ScrollView style={[Styles.mainContainer, getContainerStyle()]}>
      <View style={Styles.container}>
        <View style={[Styles.titleTextContainer]}>
          <LottieAnimation
            source={require('../../../assets/verify.json')}
            style={Styles.image}
          />
        </View>
        <View>
          <Text style={[Styles.Textphonenumber, getTextColor()]}>
            Phone number{' '}
          </Text>
        </View>
        <View>
          <TextInput
            style={[Styles.textinputphone, getTextInputStyle(), getTextColor()]}
            placeholder="Enter phone number"
            placeholderTextColor={PlaceholderColor()}
            value={phoneNo}
            autoCapitalize="none"
            keyboardType="numeric"
            onChangeText={handlephoneNumberChange}
          />
        </View>
        <View>
          <Text style={[Styles.TextOTP, getTextColor()]}>Otp</Text>
          <TextInput
            style={[Styles.textinputOTP, getTextInputStyle(), getTextColor()]}
            placeholder="Enter Otp"
            placeholderTextColor={PlaceholderColor()}
            value={otp}
            secureTextEntry={true}
            onChangeText={handlePasswordChange}
          />
        </View>
        <View style={Styles.touchablebtnContainer}>
          <TouchableOpacity onPress={GETOTP}>
            <Text style={[Styles.Text, getTextColor()]}>Get</Text>
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
