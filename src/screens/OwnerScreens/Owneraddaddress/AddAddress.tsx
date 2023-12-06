/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {RadioButton} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import HeadingText from 'components/atoms/HeadingText/HeadingTest';

import useAddAddress from './useAddAddress';

import style from './AddressStyles';
import colors from 'constants/colors';

import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import CustomModal from 'components/atoms/CustomModel/CustomModel';
import {cityText, flatText, pincode, saveText} from 'constants/languages/en';

const AddAddress = () => {
  const {
    addressLine2,

    addressLine1,
    handleSaveAddress,
    handleCheckboxChange,
    handleOptionChange,
    selectedOption,
    isChecked,
    city,
    state,
    handlePostalCodeChange,
    postalCode,
    country,

    isLoading,

    handleAddressLine1,
    handleAddressLine2,
    handleBlur,
    showModal,
    closeModal,
  } = useAddAddress();

  const {colorScheme, getContainerStyle, getTextColor, getTextInputStyle} =
    useContext(ColorSchemeContext);

  return (
    <ScrollView
      style={[
        {
          height: '100%',
        },
        getContainerStyle(),
      ]}>
      <View>
        <HeadingText message="Add Address" navigation={undefined} />
      </View>

      <View style={style.outerContainer}>
        <View style={style.innerContainer}>
          <TextInput
            testID={'Flat-No'}
            placeholder={flatText}
            value={addressLine1}
            onChangeText={handleAddressLine1}
            onBlur={() => handleBlur('addressLine1')}
            style={[style.inputAddres, getTextInputStyle(), getTextColor()]}
          />
        </View>
        <View style={style.innerContainer}>
          <TextInput
            placeholder="Street name"
            testID={'Street-name'}
            value={addressLine2}
            onChangeText={handleAddressLine2}
            onBlur={() => handleBlur('addressLine2')}
            style={[style.StreetInput, getTextInputStyle(), getTextColor()]}
          />
        </View>
        <View style={style.cityContainer}>
          <TextInput
            placeholder={pincode}
            style={[style.smalltextInput, getTextInputStyle(), getTextColor()]}
            value={postalCode}
            onChangeText={handlePostalCodeChange}
            onBlur={() => handleBlur('postalCode')}
          />

          <TextInput
            placeholder={cityText}
            testID="City"
            // placeholderTextColor={
            //   colorScheme === 'dark' ? colors.Textinput : colors.black
            // }
            value={city}
            editable={false}
            selectTextOnFocus={false}
            style={[style.smalltextInputs, getTextInputStyle(), getTextColor()]}
            // onChangeText={text => {
            //   setCity(text);
            // }}
          />
        </View>
        <TextInput
          placeholder="State"
          value={state}
          editable={false}
          // placeholderTextColor={
          //   colorScheme === 'dark' ? colors.Textinput : colors.black
          // }
          style={[style.inputAddress, getTextInputStyle(), getTextColor()]}
          // onChangeText={text => setStateName(text)}
        />
        <TextInput
          placeholder="Country"
          value={country}
          editable={false}
          selectTextOnFocus={false}
          style={[style.inputAddress, getTextInputStyle(), getTextColor()]}
        />
      </View>
      <Text style={[style.textField, getTextColor()]}>Type of address</Text>
      <View style={style.containerRadio}>
        <View style={style.optionRadio}>
          <RadioButton
            value="HOME"
            testID="Home-Button"
            status={selectedOption === 'HOME' ? 'checked' : 'unchecked'}
            onPress={() => handleOptionChange('HOME')}
            color={colorScheme === 'dark' ? colors.white : colors.black}
          />
          <Text style={[style.textRadio, getTextColor()]}>Home</Text>
        </View>
        <View style={style.optionRadio}>
          <RadioButton
            value="OFFICE"
            testID="Office-Button"
            status={selectedOption === 'OFFICE' ? 'checked' : 'unchecked'}
            onPress={() => handleOptionChange('OFFICE')}
            color={colorScheme === 'dark' ? colors.white : colors.black}
          />
          <Text style={[style.textRadio, getTextColor()]}>Office</Text>
        </View>
      </View>
      <Spinner visible={isLoading} />
      <View style={style.containerCheckbox}>
        <Text style={[style.textCheckbox, getTextColor()]}>
          Make as default address
        </Text>
        <CheckBox
          checked={isChecked}
          onPress={handleCheckboxChange}
          checkedColor={colorScheme === 'dark' ? colors.white : colors.black}
          containerStyle={style.checkboxContainer}
          size={24}
        />
      </View>
      <TouchableOpacity
        style={style.btnfieldAddress}
        onPress={handleSaveAddress}>
        <Text style={style.btntextAddress}>{saveText}</Text>
      </TouchableOpacity>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Address Added Successfully!"
      />
    </ScrollView>
  );
};

export default AddAddress;
