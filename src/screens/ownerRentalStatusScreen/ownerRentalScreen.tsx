/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import OwnerRentalstyles from './ownerRentalScreenStyles';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import OwnerRentalSwitch from '../../components/atoms/OwnerRentalSwitch';
import useOwnerorderproducts from './useOwnerorderproducts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
const OwnerRentalScreen = () => {
  const {getTextColor, getTextInputStyle} = useContext(ColorSchemeContext);
  const {ownerrentalproducts, isLoading} = useOwnerorderproducts();
  const navigation = useNavigation();
  const renderownerrentalItem = ({item}: {item: any; index: number}) => {
    return (
      <TouchableOpacity
        style={OwnerRentalstyles.card}
        onPress={() => navigation.navigate('OwnerRentalDetailsScreen')}>
        <View style={{flexDirection: 'column'}}>
          <Text style={[OwnerRentalstyles.productName, getTextColor()]}>
            Order Id: {item.id}
          </Text>
          <Text style={[OwnerRentalstyles.price, getTextColor()]}>
            Price: ₹ {item.price}/-
          </Text>
        </View>
        <View>
          <Icon
            name="arrow-forward-ios"
            size={20}
            style={[OwnerRentalstyles.arrowIcon, getTextColor()]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={OwnerRentalstyles.mainContainer}>
      <Text style={[OwnerRentalstyles.MainTitleText, getTextColor()]}>
        Rental Status
      </Text>
      <OwnerRentalSwitch />
      <View style={OwnerRentalstyles.ScrollContainer}>
        <FlatList
          data={ownerrentalproducts}
          renderItem={renderownerrentalItem}
          keyExtractor={item => item.id.toString()} // Assuming id is a unique identifier
        />
      </View>
    </View>
  );
};

export default OwnerRentalScreen;
