/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import styles from '../OwnerHomepage/OwnerHomestyle';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Usemyrental from './Usemyrental';
import {useNavigation} from '@react-navigation/native';

export default function OwnerHome() {
  const {products} = Usemyrental();
  const navigation = useNavigation();
  if (!products) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        <Image
          source={require('../../../assets/LoginImage.png')}
          style={{
            height: 200,
            width: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <Text>The Items are Loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.mainContainer}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Icon
            style={{marginLeft: 20, marginTop: 41}}
            name="arrow-back-ios"
            testID="Back-Button"
            size={23}
            color="#3E54AC"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headertxt}>My Rentals</Text>
        </View>
        <View>
          <View style={{flex: 1, backgroundColor: '#ECF2FF', flexWrap: 'wrap'}}>
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
                flexDirection: 'row',
                marginBottom: 100,
                flexWrap: 'wrap',
                justifyContent: 'space-between',
              }}>
              {products?.map(item => (
                <TouchableOpacity
                  key={item.id}
                  testID={`Cart-container-${item.id}`}
                  style={styles.recentlyaddedcard}
                  onPress={() =>
                    navigation.navigate('OproductDetails', {product: item})
                  }>
                  <View style={styles.cardContainer}>
                    <Image
                      source={{uri: item.imageURL}}
                      style={styles.recentlyaddedimage}
                    />
                  </View>
                  <View style={styles.cardTextContainer}>
                    <Text style={styles.cardText}>{item.description}</Text>
                    <Text style={styles.cardText}>₹ {item.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
