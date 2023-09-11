import React, {useContext} from 'react';
import {View, Text, FlatList} from 'react-native';
import OwnerRentalstyles from './ownerRentalStyles';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

import {useSelector} from 'react-redux';
import BackButton from '../../components/atoms/BackButton/BackButton';
import {useNavigation} from '@react-navigation/native';

const OwnerRentalDetailsScreen = () => {
  const navigation = useNavigation();
  const {getTextColor} = useContext(ColorSchemeContext);
  const ownerrentalproducts = useSelector(
    (state: {OwnerRentalproducts: {data: any}}) =>
      state.OwnerRentalproducts.data,
  );
  const renderownerrentalItem = ({item}: {item: any; index: number}) => {
    return (
      <View style={OwnerRentalstyles.card}>
        <Text>name: {item.name}</Text>
      </View>
    );
  };

  return (
    <View style={OwnerRentalstyles.mainContainer}>
      <BackButton navigation={navigation} />
      <Text style={[OwnerRentalstyles.MainTitleText, getTextColor()]}>
        Order Id: {ownerrentalproducts.id}
      </Text>
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

export default OwnerRentalDetailsScreen;
