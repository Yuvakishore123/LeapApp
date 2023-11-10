/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import OwnerRentalstyles from './ownerRentalScreenStyles';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import OwnerRentalSwitch from 'components/atoms/OwnerRentalSwitch';
import useOwnerorderproducts from './useOwnerorderproducts';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native-elements';
const OwnerRentalScreen = () => {
  const {getTextColor} = useContext(ColorSchemeContext);
  const {ownerrentalproducts} = useOwnerorderproducts();

  const renderownerrentalItem = ({item}: {item: any; index: number}) => {
    const statusStyle =
      item.status === 'Order placed'
        ? OwnerRentalstyles.orderPlaced
        : OwnerRentalstyles.returned;
    return (
      <TouchableOpacity style={OwnerRentalstyles.card}>
        <View>
          <Image
            source={{uri: item.imageUrl}}
            style={OwnerRentalstyles.Productimage}
            testID={`image-${item.id}`}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '85%',
            marginLeft: 5,
            marginTop: 34,
          }}>
          <Text
            testID={`OrderId-${item.id}`}
            style={[OwnerRentalstyles.productName, getTextColor()]}>
            Order Id: {item.id}
          </Text>
          <Text
            testID={`Price-${item.id}`}
            style={[OwnerRentalstyles.price, getTextColor()]}>
            Price: ₹{item.totalPrice}/-
          </Text>

          <Text
            testID={`Name-${item.id}`}
            style={[OwnerRentalstyles.Name, getTextColor()]}>
            Name: {item.name}
          </Text>
          <Text style={[OwnerRentalstyles.Qty, getTextColor()]}>
            Qty: {item.quantity}
          </Text>
          <Text style={[OwnerRentalstyles.Status, getTextColor(), statusStyle]}>
            {item.status}
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
          testID="Rental-data"
          data={ownerrentalproducts}
          renderItem={renderownerrentalItem}
          keyExtractor={item => item.id.toString()} // Assuming id is a unique identifier
        />
      </View>
    </View>
  );
};

export default OwnerRentalScreen;
