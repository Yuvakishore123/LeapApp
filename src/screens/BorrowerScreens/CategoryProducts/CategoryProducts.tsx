/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
import useCategoryProducts from './useCategoryProducts';
import HeadingText from '../../../components/atoms/HeadingText/HeadingTest';

import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import style from './categoryStyles';
import ImageComponent from 'components/atoms/ImageComponent/ImageComponent';

type RootStackParamList = {
  CategoryProducts: {subcategoryId: number};
  UProductDetails: {product: any};
  ProfileScreen: {screen: any};
};

const CategoryProducts = ({route}: any) => {
  const {subcategoryId} = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const {
    subcategories,
    wishlistList,
    toggleWishlist,
    imageLoaded,
    setImageLoaded,
  } = useCategoryProducts(subcategoryId);
  const {getTextColor, getTextInputStyle, getContainerStyle} =
    useContext(ColorSchemeContext);
  return (
    <ScrollView style={[style.maincontainer, getContainerStyle()]}>
      <HeadingText message={'Products'} navigation={undefined} />
      <View style={style.direction}>
        {subcategories && subcategories.length === 0 ? (
          <View>
            <Lottie
              style={style.lottieS}
              source={require('../../../../assets/productsEmpty.json')}
              autoPlay
            />
            <Text
              testID="products-available"
              style={[style.loadtextStyle, getTextColor()]}>
              Products are not Available Right Now
            </Text>
          </View>
        ) : (
          <View style={style.outerView}>
            <View style={style.viewS}>
              {subcategories?.map(
                (item: {
                  id: number;
                  imageUrl: string[];
                  name: string;
                  price: number;
                }) => (
                  <TouchableOpacity
                    style={style.size}
                    key={item.id.toString()}
                    testID={`product-button-${item.id}`}
                    onPress={() =>
                      navigation.navigate('UProductDetails', {
                        product: item,
                      })
                    }>
                    <View style={[style.container, getTextInputStyle()]}>
                      <TouchableOpacity
                        key={item.id}
                        testID={`product-Button-${item.id}`}
                        onPress={() =>
                          navigation.navigate('UProductDetails', {
                            product: item,
                          })
                        }>
                        <View style={style.imageContainer}>
                          <ImageComponent
                            imageLoaded={imageLoaded}
                            setImageLoaded={setImageLoaded}
                            imageUrl={item.imageUrl[0]}
                          />
                        </View>
                      </TouchableOpacity>
                      <View style={style.cardTextContainer}>
                        <View style={style.Cartcontents}>
                          <Text
                            testID={`product-name-${item.name}`}
                            style={[style.name, getTextColor()]}>
                            {item.name}
                          </Text>
                        </View>
                        <View style={style.textContainer}>
                          <Text style={style.price}>{'₹' + item.price}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={style.wishlistButton}
                        testID={`wishlist-${item.id}`}
                        onPress={() => toggleWishlist(item.id)}>
                        {wishlistList.includes(item.id) ? (
                          <MaterialIcons
                            size={20}
                            color={'red'}
                            name="cards-heart"
                          />
                        ) : (
                          <MaterialIcons
                            size={20}
                            color={'white'}
                            name="cards-heart"
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ),
              )}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CategoryProducts;