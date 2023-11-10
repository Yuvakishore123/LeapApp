/* eslint-disable react/self-closing-comp */
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useContext} from 'react';
import style from '../../OwnerScreens/Owneraddaddress/AddressStyles';
import useAddAddress from '../../OwnerScreens/Owneraddaddress/useAddAddress';
import {CheckBox} from 'react-native-elements';

import {RadioButton} from 'react-native-paper';
import useEditaddress from './useEditAddress';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import CustomModal from '../../../components/atoms/CustomModel/CustomModel';
import HeadingText from '../../../components/atoms/HeadingText/HeadingTest';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

import styles from './editAddressStyles';
import colors from 'constants/colors';

export const SkeletonLoader = () => {
  const {colorScheme} = useContext(ColorSchemeContext);
  return (
    <SkeletonPlaceholder
      highlightColor={colors.highlightcolor}
      backgroundColor={
        colorScheme === 'dark' ? colors.loadingcolor : colors.sliver
      }>
      <View testID="Loading-Container" style={style.subContainer}>
        <View>
          <TextInput style={style.inputAddress} />
          <TextInput style={style.inputAddress} />
          <TextInput style={style.inputAddress} />
          <TextInput style={style.inputAddress} />
          <TextInput style={style.inputAddress} />
          <TextInput style={style.inputAddress} />
        </View>
        <View style={style.btnfieldupdateAddress}>
          <Text style={styles.btntextAddress}></Text>
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};
const EditAddress = () => {
  const {
    handleUpdateAddress,
    handleOptionChange,
    selectedOption,
    isChecked,
    setAddressLine1,
    setAddressLine2,
    setPostalCode,
    handleCheckboxChange,
    closeModal,
    showModal,
    setStateName,

    city,
    addressLine1,
    addressLine2,
    postalCode,
    state,
    setCity,
    placeholderTextColor,
  } = useEditaddress();

  const {
    getContainerStyle,
    getTextColor,
    getTextInputStyle,
    getPlaceholderTextColor,
  } = useContext(ColorSchemeContext);
  const {isLoading} = useAddAddress();
  return (
    <ScrollView style={[style.headercontainer, getContainerStyle()]}>
      {isLoading ? (
        <>
          <SkeletonLoader />
        </>
      ) : (
        <>
          <HeadingText message="Edit address" navigation={undefined} />
          <View style={styles.subContainer}>
            <Text style={[styles.textField, getTextColor()]}>
              Flat no / Building
            </Text>
            <View>
              <TextInput
                value={addressLine1}
                testID="Flat"
                onChangeText={text => setAddressLine1(text)}
                style={[
                  styles.inputAddress,
                  getTextInputStyle(),
                  getPlaceholderTextColor(),
                ]}
              />
              <Text style={[styles.textField, getTextColor()]}>
                Street / Area{' '}
              </Text>
              <TextInput
                value={addressLine2}
                onChangeText={text => setAddressLine2(text)}
                testID="Street"
                style={[
                  styles.inputAddress,
                  getTextInputStyle(),
                  getPlaceholderTextColor(),
                ]}
              />
              <Text style={[styles.textField, getTextColor()]}>State</Text>
              <TextInput
                value={state}
                testID="State"
                style={[
                  styles.inputAddress,
                  getTextInputStyle(),
                  getPlaceholderTextColor(),
                ]}
                onChangeText={text => setStateName(text)}
              />
              <View style={style.textContainer}>
                <Text style={[styles.textField, getTextColor()]}>City</Text>
                <Text style={[style.textFieldpincode, getTextColor()]}>
                  Pincode
                </Text>
              </View>
              <View style={style.cityContainer}>
                <TextInput
                  value={city}
                  testID="City"
                  style={[
                    styles.smalltextInputs,
                    getTextInputStyle(),
                    getPlaceholderTextColor(),
                  ]}
                  onChangeText={text => {
                    setCity(text);
                  }}
                />
                <TextInput
                  style={[
                    styles.smalltextInputs,
                    getTextInputStyle(),
                    getPlaceholderTextColor(),
                  ]}
                  testID="Pincode"
                  value={postalCode}
                  onChangeText={setPostalCode}
                />
              </View>
              <Text style={[styles.texttypeField, getTextColor()]}>
                Type Of Address
              </Text>
              <View style={style.containerRadio}>
                <View style={[style.optionRadio]}>
                  <RadioButton
                    value="HOME"
                    testID="Radio-Home"
                    status={selectedOption === 'HOME' ? 'checked' : 'unchecked'}
                    onPress={() => handleOptionChange('HOME')}
                    color={placeholderTextColor}
                  />
                  <Text style={[style.textRadio, getTextColor()]}>Home</Text>
                </View>
                <View style={style.optionRadio}>
                  <RadioButton
                    testID="Radio-Office"
                    value="OFFICE"
                    status={
                      selectedOption === 'OFFICE' ? 'checked' : 'unchecked'
                    }
                    onPress={() => handleOptionChange('OFFICE')}
                    color={placeholderTextColor}
                  />
                  <Text style={[style.textRadio, getTextColor()]}>Office</Text>
                </View>
              </View>
              <View style={style.containerCheckbox}>
                <Text style={[styles.textCheckbox, getTextColor()]}>
                  Make Default Address
                </Text>
                <CheckBox
                  checked={isChecked}
                  onPress={handleCheckboxChange}
                  checkedColor="#3E54AC"
                  containerStyle={style.checkboxContainer}
                  size={24}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnfieldupdateAddress}
              onPress={handleUpdateAddress}>
              <Text style={[styles.btntextAddress]}>Update Address </Text>
            </TouchableOpacity>
            <CustomModal
              showModal={showModal}
              onClose={closeModal}
              message="Address Updated!"
            />
          </View>
        </>
      )}
    </ScrollView>
  );
};
export default EditAddress;
