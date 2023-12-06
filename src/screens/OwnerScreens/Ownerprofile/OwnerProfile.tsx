/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Avatar} from 'react-native-paper';

import style from './ownerProfileStyle';
import ProfileData from '../../BorrowerScreens/Profile/useProfile';
import SwitchAccountButton from '../../../components/atoms/SwitchAccountButton/SwtichAccountButton';

import {ColorSchemeContext} from '../../../../ColorSchemeContext';

import UseOwnerprofile from './useOwnerProfile';
import Toast from 'react-native-toast-message';
import {useNavigationProp} from 'helpers/helper';
import {remove, upload} from 'constants/languages/en';

export const SkeletonLoader = () => {
  const {colorScheme} = useContext(ColorSchemeContext);

  return (
    <View testID="skeleton-loader">
      <SkeletonPlaceholder
        highlightColor="#e0e0e0"
        backgroundColor={colorScheme === 'dark' ? '#373737' : '#f2f2f2'}>
        <View
        //  testID="skeleton-loader"
        >
          <TextInput style={style.card} placeholderTextColor="#999" />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};
const OwnerProfile = () => {
  const {getContainerStyle, getTextInputStyle, getPlaceholderTextColor} =
    useContext(ColorSchemeContext);
  const {navigation} = useNavigationProp();
  const {isloading, pickImage, handleRemoveProfilePic} = ProfileData();
  const {handleLogout, data, loading} = UseOwnerprofile();

  const renderProfileImage = () => {
    if (isloading) {
      return (
        <View testID="activity-indicator">
          <ActivityIndicator size="large" color="gray" />
        </View>
      );
    } else if (data?.profileImageUrl) {
      return (
        <Avatar.Image
          testID="Image-container"
          size={100}
          source={{uri: data.profileImageUrl}}
        />
      );
    } else {
      return (
        <View testID="avatar-container">
          <Avatar.Image
            testID="profile-image"
            size={100}
            source={require('../../../../assets/profile.jpg')}
          />
        </View>
      );
    }
  };
  return (
    <View style={[style.profileStyle, getContainerStyle()]}>
      <ScrollView style={{width: '100%', height: '100%'}}>
        <View style={style.buttonContainer}>
          <SwitchAccountButton />
        </View>
        <View style={style.imageContainer}>
          <View style={style.viewS}>{renderProfileImage()}</View>
        </View>
        <View style={style.uploadButtoncontainer}>
          <TouchableOpacity style={style.uploadButton} onPress={pickImage}>
            <Text style={style.uploadText}>{upload}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.removeButton}
            onPress={() => {
              handleRemoveProfilePic();
            }}>
            <Text style={style.uploadText}>{remove}</Text>
          </TouchableOpacity>
        </View>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <View style={[style.card, getTextInputStyle()]}>
            <Text style={[style.profileText, getPlaceholderTextColor()]}>
              {data?.firstName}
            </Text>
            <Text style={[style.profileText1, getPlaceholderTextColor()]}>
              {data?.email}
            </Text>
            <Text style={[style.profileText1, getPlaceholderTextColor()]}>
              {data?.phoneNumber}
            </Text>
          </View>
        )}

        <View style={style.profileFields}>
          <TouchableOpacity
            style={[style.whiteBtn, getTextInputStyle()]}
            onPress={() => navigation.navigate('OwnerEditProfile')}>
            <Icons
              name="account"
              size={30}
              style={[style.editprofileicon, getPlaceholderTextColor()]}
            />
            <Text style={[style.btnPText, getPlaceholderTextColor()]}>
              Edit Profile
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={[style.forwardios, getPlaceholderTextColor()]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.whiteBtn, getTextInputStyle()]}
            onPress={() => navigation.navigate('Owneraddresspage')}>
            <Icon
              name="location-pin"
              size={30}
              style={[style.addressicon, getPlaceholderTextColor()]}
            />
            <Text style={[style.AddressbtnPText, getPlaceholderTextColor()]}>
              Address
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={[style.addressforwardios, getPlaceholderTextColor()]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.whiteBtn, getTextInputStyle()]}
            onPress={() => navigation.navigate('Owneredititems')}>
            <Icons
              name="basket-check"
              size={30}
              style={[style.producticon, getPlaceholderTextColor()]}
            />
            <Text style={[style.btnPText, getPlaceholderTextColor()]}>
              My Products
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={[style.productforwardios, getPlaceholderTextColor()]}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout} testID="logout-button">
            <Text style={style.btntext}>Sign out </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={style.outerView} />
      <Toast />
    </View>
  );
};

export default OwnerProfile;
