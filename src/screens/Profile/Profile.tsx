/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, {useContext} from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {TextInput} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import {Logout} from '../../redux/actions/actions';

import useProfile from './useProfile';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import SwitchAccountButton from '../../components/atoms/SwtichAccountButton';
import Togglebutton from '../../components/atoms/Colorscheme/Togglebutton';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';

import style from '../Ownerprofile/ownerProfileStyle';

type Props = {
  navigation: any;
};

const Profile = ({navigation}: Props) => {
  const {
    name,
    email,
    phonenumber,
    isLoading,
    pickImage,
    profilePic,
    showModall,
    closeModal,
    showModal1,
    closeModal1,
    isloading,
    handleRemoveProfilePic,
    refreshData,
    refreshState,
  } = useProfile();
  const {
    colorScheme,
    getContainerStyle,
    getTextInputStyle,

    getPlaceholderTextColor,
  } = useContext(ColorSchemeContext);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(Logout() as any);
  };
  const renderProfileImage = () => {
    if (isloading) {
      return (
        <View testID="activity-indicator">
          <ActivityIndicator size="large" color="gray" />
        </View>
      );
    } else if (profilePic) {
      return (
        <View testID="avatar-container">
          <Avatar.Image
            size={100}
            source={{uri: profilePic}}
            testID="avatar-image"
          />
        </View>
      );
    } else {
      return (
        <View testID="avatar-container">
          <Avatar.Image
            size={100}
            source={require('../../../assets/profile.jpg')}
            testID="avatar-image"
          />
        </View>
      );
    }
  };

  return (
    <View
      style={[style.profileStyle, getContainerStyle()]}
      testID="profile-container">
      <ScrollView
        style={{width: '100%', height: '100%'}}
        refreshControl={
          <RefreshControl refreshing={refreshState} onRefresh={refreshData} />
        }>
        <View style={style.buttonContainer}>
          <View style={{zIndex: 1}}>
            <SwitchAccountButton />
            <Togglebutton />
          </View>
          <View style={style.imageContainer}>
            <View
              style={{
                width: 130,
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {renderProfileImage()}
            </View>
          </View>
        </View>

        <View style={style.uploadButtoncontainer}>
          <TouchableOpacity style={style.uploadButton} onPress={pickImage}>
            <Text style={style.uploadText}>Upload</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.removeButton}
            onPress={() => {
              handleRemoveProfilePic();
            }}>
            <Text style={style.uploadText}>Remove</Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <SkeletonPlaceholder
            highlightColor="#e0e0e0"
            backgroundColor={colorScheme === 'dark' ? '#373737' : '#f2f2f2'}>
            <View>
              <TextInput style={style.card} placeholderTextColor="#999" />
            </View>
          </SkeletonPlaceholder>
        ) : (
          <View style={[style.card, getTextInputStyle()]}>
            <Text style={[style.profileText, getPlaceholderTextColor()]}>
              {name}
            </Text>
            <Text style={[style.profileText1, getPlaceholderTextColor()]}>
              {email}
            </Text>
            <Text style={[style.profileText1, getPlaceholderTextColor()]}>
              {phonenumber}
            </Text>
          </View>
        )}

        <View style={style.profileFields}>
          <TouchableOpacity
            style={[style.whiteBtn, getTextInputStyle()]}
            onPress={() => navigation.navigate('Ownereditprofile')}
            testID="edit-profile-button">
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
            onPress={() => navigation.navigate('MyOrder')}>
            <Icons
              name="basket-check"
              size={30}
              style={[style.producticon, getPlaceholderTextColor()]}
            />
            <Text style={[style.btnPText, getPlaceholderTextColor()]}>
              My orders
            </Text>
            <Icon
              name="arrow-forward-ios"
              size={20}
              style={[style.productforwardios, getPlaceholderTextColor()]}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={style.btntext}>Sign out </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{marginTop: 10}} />
      <CustomModal
        showModal={showModall}
        onClose={closeModal}
        message="Profile image uploaded successfully!"
      />
      <CustomModal
        showModal={showModal1}
        onClose={closeModal1}
        message="Profile image removed !"
      />
    </View>
  );
};

export default Profile;
