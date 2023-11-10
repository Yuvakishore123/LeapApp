/* eslint-disable react-native/no-inline-styles */
import {Text, TextInput, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useContext} from 'react';
import style from './ownerEditProfileStyle';
import Colors from '../../../constants/colors';

import useOwnerProfile from './useOwnerProfile';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import HeadingText from '../../../components/atoms/HeadingText/HeadingTest';
import CustomModal from '../../../components/atoms/CustomModel/CustomModel';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

export function SkeletonLoader() {
  const {colorScheme} = useContext(ColorSchemeContext);
  return (
    <SkeletonPlaceholder
      highlightColor="#e0e0e0"
      backgroundColor={colorScheme === 'dark' ? '#373737' : '#f2f2f2'}>
      <View testID="skeleton-loader">
        <TextInput
          style={style.input}
          placeholderTextColor="#999"
          testID="input1"
        />
        <TextInput style={style.input} testID="input-2" />
        <TextInput style={style.input} testID="input-3" />
        <TextInput style={style.input} testID="input-4" />
      </View>
    </SkeletonPlaceholder>
  );
}

const OwnerEditProfile = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    showModal,
    closeModal,

    phoneNumber,

    handleUpdate,
    isLoading,
    setIsFormValid,
    isFormValid,
  } = useOwnerProfile();
  const {
    getContainerStyle,
    getTextColor,
    getTextInputStyle,
    getplaceholdercolor,
  } = useContext(ColorSchemeContext);

  useEffect(() => {
    setIsFormValid(firstName?.trim().length > 0 && lastName?.trim().length > 0);
  }, [firstName, lastName, setIsFormValid]);
  return (
    <View style={[style.container, getContainerStyle()]}>
      <View style={style.addAddressHeader}>
        <HeadingText message="Edit profile" navigation={undefined} />
      </View>
      <View>
        {isLoading ? (
          <View testID="loading-container">
            <SkeletonLoader />
          </View>
        ) : (
          <View>
            <Text style={[style.text, getTextColor()]}>First name</Text>
            <TextInput
              testID="firstname"
              style={[style.input, getTextInputStyle(), getTextColor()]}
              placeholderTextColor={Colors.white}
              value={firstName}
              onChangeText={text => setFirstName(text)}
            />
            <Text style={[style.text, getTextColor()]}>Last name</Text>
            <TextInput
              testID="lastName"
              style={[style.input, getTextInputStyle(), getTextColor()]}
              value={lastName}
              onChangeText={text => setLastName(text)}
            />
            <Text style={[style.text, getTextColor()]}>Email</Text>
            <TextInput
              testID="email"
              style={[
                style.emailinput,
                getTextInputStyle(),
                getplaceholdercolor(),
              ]}
              value={email}
              selectTextOnFocus={false}
              editable={false}
            />
            <Text style={[style.text, getTextColor()]}>Phone number</Text>
            <TextInput
              testID="phoneNumber"
              style={[
                style.emailinput,
                getTextInputStyle(),
                getplaceholdercolor(),
              ]}
              value={phoneNumber}
              editable={false}
            />
          </View>
        )}
      </View>
      <View style={style.buttons}>
        <View
          testID="button-Disable"
          style={[
            style.btnfield,
            {
              opacity: isFormValid ? 1 : 0.5,
            },
          ]}>
          {isLoading ? (
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item
                width={100}
                height={20}
                borderRadius={5}
              />
            </SkeletonPlaceholder>
          ) : (
            <TouchableOpacity
              testID="update-button"
              onPress={handleUpdate}
              disabled={!isFormValid}
              style={{flex: 1}}>
              <Text style={style.btntext}>Update</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Profile Updated!"
      />
    </View>
  );
};
export default OwnerEditProfile;
