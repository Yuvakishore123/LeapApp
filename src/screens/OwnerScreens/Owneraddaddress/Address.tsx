/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';

import HeadingText from 'components/atoms/HeadingText/HeadingTest';
import CustomModal from 'components/atoms/CustomModel/CustomModel';

import useAddress from 'screens/OwnerScreens/Owneraddaddress/useAddress';

import Colors from 'constants/colors';

import style from './AddressStyles';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import colors from 'constants/colors';

const Address = () => {
  const {
    handleOwnerAddAddress,
    handleDeleteAddress,
    closeModal,
    showModal,
    handleEditItems,
    isloading,
    addressdata,
  } = useAddress();
  const {getTextColor, getContainerStyle, getTextInputStyle, colorScheme} =
    useContext(ColorSchemeContext);
  const renderAddressItem = ({item}: {item: any; index: number}) => {
    return (
      <View style={[style.card, getTextInputStyle()]}>
        <View>
          <Text style={[style.city, getTextColor()]}>Address:</Text>
          <View style={style.AdresstextContainer}>
            <Text style={[style.input, getTextColor()]}>
              {item.addressLine1}, {item.addressLine2}, {item.postalCode},{' '}
              {item.city}, {item.state}, {item.country}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            testID={`Edit-${item.id}`}
            onPress={() => handleEditItems(item)}>
            <MaterialIcons
              name="edit"
              size={25}
              color={colorScheme === 'dark' ? Colors.white : Colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity
            testID={`delete-${item.id}`}
            onPress={() => handleDeleteAddress(item.id)}>
            <MaterialIcons
              name="delete"
              size={25}
              color={colors.maroon}
              style={style.deleteBtnText}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={[style.maincontainer, getContainerStyle()]}>
      <HeadingText message="Address" navigation={undefined} />
      {isloading ? (
        <View>
          <Lottie
            testID="Loading-Component"
            source={require('../../../../assets/addressloadingstatetwo.json')}
            autoPlay
            style={{
              height: 250,
              width: 250,
              alignSelf: 'center',

              justifyContent: 'center',
            }}
          />
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={style.btnaddaddressContainer}
            onPress={handleOwnerAddAddress}>
            <Text style={style.btnaddText}>Add Address</Text>
          </TouchableOpacity>
          {addressdata && addressdata.length === 0 ? (
            <View style={style.noAddressContainer1}>
              <View style={style.titleTextContainer1}>
                <Lottie
                  testID="empty-container"
                  autoPlay
                  style={style.imageS1}
                  source={require('../../../../assets/location.json')}
                />
              </View>
              <View style={style.textContainer1}>
                <Text style={style.noAddressText1}>SAVE YOUR ADDRESS NOW</Text>
              </View>
            </View>
          ) : (
            <View style={{marginBottom: 10}}>
              <FlatList
                testID="FlastList-component"
                data={addressdata}
                renderItem={renderAddressItem}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
          <CustomModal
            showModal={showModal}
            onClose={closeModal}
            message="Address Deleted!"
          />
        </>
      )}
    </View>
  );
};
export default Address;
