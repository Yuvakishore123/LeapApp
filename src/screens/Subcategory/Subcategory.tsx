import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RouteProp} from '@react-navigation/native';

import styles from './SubcategoryStyles';
import {useSubcategory} from './useSubcategory';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

interface Subcategory {
  id: string;
  subcategoryName: string;
  imageUrl: string;
}

export type RootStackParamList = {
  CategoryProducts: {categoryId: string};
};

const Subcategory = ({
  route,
}: {
  route: RouteProp<RootStackParamList, 'CategoryProducts'>;
}) => {
  const {categoryId} = route.params;

  const {subcategories, loading, handleSubcategoryPress} =
    useSubcategory(categoryId);
  const {getContainerStyle, getTextColor, getTextInputStyle} =
    useContext(ColorSchemeContext);

  if (loading) {
    return (
      <View
        style={[styles.lottieView, getContainerStyle()]}
        testID="loading-animation">
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={styles.lottieStyles}
        />
        <Text style={[styles.Lottietext, getTextColor()]}>
          The Items are Loading...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={getContainerStyle()}>
      <HeadingText message="Subcategories" navigation={undefined} />
      <View>
        {subcategories?.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleSubcategoryPress(item.id)}>
            <View style={[styles.categoryBox, getTextInputStyle()]}>
              <View style={styles.imageContainer}>
                <Image
                  source={{uri: item.imageUrl}}
                  style={styles.categoryImage}
                />
              </View>
              <View>
                <Text style={[styles.categoryText, getTextColor()]}>
                  {item.subcategoryName}
                </Text>
              </View>
              <View style={styles.iconS}>
                <Icon
                  name="arrow-forward-ios"
                  size={20}
                  style={styles.productforwardios}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default Subcategory;
