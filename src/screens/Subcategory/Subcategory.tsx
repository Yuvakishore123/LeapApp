import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RouteProp} from '@react-navigation/native';

import styles from './subcategoryStyles';
import {useSubcategory} from './useSubcategory';
import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';

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
    useSubcategory<Subcategory>(categoryId);
  const {colorScheme, getTextColor, getTextInputStyle, getContainerStyle} =
    useContext(ColorSchemeContext);

  if (loading) {
    return (
      <View
        testID="loading-animation"
        style={[
          styles.lottieView,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={styles.lottieStyles}
        />
        <Text
          style={[
            styles.Lottietext,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          The Items are Loading...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={getContainerStyle()}>
      <HeadingText message="Subcategories" />
      <View>
        {subcategories &&
          subcategories.map(item => (
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
