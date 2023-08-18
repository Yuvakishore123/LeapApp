/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
const OwnerRentalSwitch = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View>
      <View
        style={{
          width: '70%',
          height: 60,
          alignSelf: 'center',
          marginTop: 50,
          borderWidth: 0.5,
          borderRadius: 30,
          backgroundColor: colors.gray,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '95%',
            backgroundColor:
              selectedTab === 0 ? colors.buttonColor : colors.gray,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(0);
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
            Ordered
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '50%',
            height: '95%',
            backgroundColor:
              selectedTab === 1 ? colors.buttonColor : colors.gray,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            setSelectedTab(1);
          }}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: '700'}}>
            Returned
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default OwnerRentalSwitch;
