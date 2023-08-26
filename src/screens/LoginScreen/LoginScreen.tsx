/* eslint-disable react-native/no-inline-styles */
// External libraries/packages
import React, {useContext} from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import Lottie from 'lottie-react-native';

// Custom components and modules
import useLoginscreen from './useLoginscreen';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import * as Animatable from 'react-native-animatable';
import {
  Donthavetext,
  Guest,
  continueAsaguest,
  continueText,
  otp,
  signin,
  signup,
} from '../../constants/languages/en';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Styles and assets
import styles from './loginStyle';
import Colors from '../../constants/colors';

const LoginScreen = () => {
  const {
    formik,
    closeModal,
    showModal,
    handleLoginScreen,
    placeholadercolor,
    handleLoginGuest,
    handleOtpScreen,
    handleSignUp,
    setPasswordVisible,
    passwordVisible,
  } = useLoginscreen();
  const {getContainerStyle, getTextInputStyle, getTextColor} =
    useContext(ColorSchemeContext);
  return (
    <View style={[styles.mainContainer, getContainerStyle()]}>
      <Lottie
        style={styles.image}
        source={require('../../../assets/loginlottie.json')}
        autoPlay
      />
      <View>
        <Text style={[styles.TitleText, getTextColor()]}>{signin}</Text>
      </View>
      <View>
        <TextInput
          style={[styles.textinput, getTextInputStyle(), getTextColor()]}
          placeholder="Email Address"
          placeholderTextColor={placeholadercolor()}
          value={formik.values.email}
          autoCapitalize="none"
          onChangeText={formik.handleChange('email')}
          onBlur={formik.handleBlur('email')}
        />
        {formik.touched.email && formik.errors.email && (
          <Animatable.View animation="shake" duration={500} easing="linear">
            <Text style={styles.errorText}>{formik.errors.email} </Text>
          </Animatable.View>
        )}
        <View>
          <TextInput
            style={[styles.textinput, getTextInputStyle(), getTextColor()]}
            placeholder="Enter password"
            placeholderTextColor={placeholadercolor()}
            value={formik.values.password}
            // secureTextEntry={true}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            secureTextEntry={!passwordVisible} // Use secureTextEntry based on passwordVisible state
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <MaterialIcons
              size={22}
              color="#888"
              name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
            />
          </TouchableOpacity>
          {formik.touched.password && formik.errors.password && (
            <Animatable.View animation="shake" duration={500} easing="linear">
              <Text style={styles.errorText}>{formik.errors.password}</Text>
            </Animatable.View>
          )}
        </View>
      </View>
      <View style={styles.touchablebtnContainer}>
        <TouchableOpacity
          testID="signin-button"
          disabled={!formik.isValid || !formik.dirty}
          style={[
            styles.touchablebtn,
            {
              backgroundColor: formik.isValid ? Colors.buttonColor : '#A7D8DE',
            },
          ]}
          onPress={handleLoginScreen}>
          <Text style={styles.touchableText}>{signin}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.otp}>
        <Text style={[styles.otptext, getTextColor()]}>{continueText}</Text>
        <TouchableOpacity onPress={handleOtpScreen} testID="Otpscreen-button">
          <Text style={styles.Otptext}>{otp}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sign}>
        <Text style={[styles.signuptext, getTextColor()]}>{Donthavetext}</Text>
        <TouchableOpacity onPress={handleSignUp} testID="Signup-Button">
          <Text style={styles.Signuptext}>{signup}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sign}>
        <Text style={[styles.Guesttext, getTextColor()]}>
          {continueAsaguest}
        </Text>
        <TouchableOpacity onPress={handleLoginGuest} testID="Signup-Button">
          <Text style={styles.Signuptext}>{Guest}</Text>
        </TouchableOpacity>
      </View>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Invalid Credentials!"
      />
    </View>
  );
};
export default LoginScreen;
