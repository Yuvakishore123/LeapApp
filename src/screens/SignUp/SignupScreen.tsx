/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Lottie from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useSignup from './useSignup';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {
  alreadyExistingtext,
  borrower,
  login,
  owner,
  signup,
} from '../../constants/languages/En';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

import Styles from './Signupstyle';
import style from '../Owneraddaddress/AddressStyles';
import Toast from 'react-native-toast-message';

const SignUpScreen = () => {
  const {
    formik,
    handleRole,
    role,
    closeModal,
    handleLogin,
    showModal,
    handleSignup,
    PlaceholderColor,
    OwnerRole,
    BorrowerRole,
    setSignInPasswordVisible,
    signInPasswordVisible,
  } = useSignup();
  const {getContainerStyle, getTextInputStyle, getTextColor} =
    useContext(ColorSchemeContext);

  return (
    <ScrollView style={[Styles.scrollContainer, getContainerStyle()]}>
      <View style={[Styles.mainContainer, getContainerStyle()]}>
        <Lottie
          style={Styles.image}
          source={require('../../../assets/Signup_lotte.json')}
          autoPlay
        />
        <Text style={[Styles.titleText, getTextColor()]}>{signup}</Text>
        <View style={Styles.Container}>
          <View>
            <TextInput
              style={[Styles.textinput, getTextInputStyle(), getTextColor()]}
              placeholder="Enter First name"
              testID="first-name"
              placeholderTextColor={PlaceholderColor()}
              value={formik.values.firstName}
              autoCapitalize="words"
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <Text style={Styles.errorTxt}>{formik.errors.firstName}</Text>
            )}
          </View>
          <View>
            <TextInput
              style={[Styles.textinput, getTextInputStyle(), getTextColor()]}
              placeholder="Enter Last name"
              placeholderTextColor={PlaceholderColor()}
              testID="last-name"
              value={formik.values.lastName}
              autoCapitalize="words"
              onChangeText={formik.handleChange('lastName')}
              onBlur={formik.handleBlur('lastName')}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <Text style={Styles.errorTxt}>{formik.errors.lastName}</Text>
            )}
          </View>
          <View>
            <TextInput
              style={[Styles.textinput, getTextInputStyle(), getTextColor()]}
              placeholder="Enter email"
              placeholderTextColor={PlaceholderColor()}
              testID="email"
              value={formik.values.email}
              autoCapitalize="none"
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <Text style={Styles.errorTxt}>{formik.errors.email}</Text>
            )}
          </View>
          <View>
            <TextInput
              style={[Styles.textinput, getTextInputStyle(), getTextColor()]}
              placeholder="Enter Phone number"
              placeholderTextColor={PlaceholderColor()}
              testID="Phone-number"
              value={formik.values.phoneNumber}
              onChangeText={formik.handleChange('phoneNumber')}
              onBlur={formik.handleBlur('phoneNumber')}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
              <Text style={Styles.errorTxt}>{formik.errors.phoneNumber}</Text>
            )}
          </View>
          <View>
            <TextInput
              style={[Styles.textinput, getTextInputStyle(), getTextColor()]}
              placeholder="Enter password"
              placeholderTextColor={PlaceholderColor()}
              value={formik.values.password}
              testID="Password"
              // secureTextEntry={true}
              secureTextEntry={!signInPasswordVisible}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
            />
            <TouchableOpacity
              style={Styles.eyeButton}
              onPress={() => setSignInPasswordVisible(!signInPasswordVisible)}
              testID="eye-button">
              <MaterialIcons
                size={22}
                color="#888"
                name={signInPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
              />
            </TouchableOpacity>
            {formik.touched.password && formik.errors.password && (
              <Text style={Styles.errorTxt}>{formik.errors.password}</Text>
            )}
          </View>
          <Text style={[Styles.cardText, getTextColor()]}>{role}</Text>
          <View style={style.containerRadio}>
            <View style={style.optionRadio}>
              <RadioButton
                value="BORROWER"
                status={BorrowerRole()}
                testID="radio-borrower"
                onPress={() => handleRole('BORROWER')}
              />
              <Text style={[style.textRadio, getTextColor()]}>{borrower}</Text>
            </View>
            <View style={style.optionRadio}>
              <RadioButton
                value="OWNER"
                status={OwnerRole()}
                testID="radio-owner"
                onPress={() => handleRole('OWNER')}
              />
              <Text style={[style.textRadio, getTextColor()]}>{owner}</Text>
            </View>
          </View>
        </View>
        <View style={Styles.signText}>
          <TouchableOpacity
            disabled={!formik.isValid}
            testID="signup-button"
            style={[
              Styles.touchablebtn,
              {
                backgroundColor: formik.isValid ? '#9747FF' : '#A5C9CA',
              },
            ]}
            onPress={handleSignup}>
            <Text style={Styles.touchableText}>{signup}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={[Styles.touchablebtnContainer, {flexDirection: 'row'}]}>
            <Text style={[Styles.signuptext, getTextColor()]}>
              {alreadyExistingtext}
            </Text>
            <TouchableOpacity testID="login-button" onPress={handleLogin}>
              <Text style={Styles.LoginText}>{login}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Credentials already used"
      />
      <Toast />
    </ScrollView>
  );
};

export default SignUpScreen;
