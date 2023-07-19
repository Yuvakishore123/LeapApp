/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Lottie from 'lottie-react-native';

import useWishlist from './useWishlist';

import Colors from '../../constants/colors';
import style from './wishlistStyles';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

type Props = {
  route: {name: string};
  navigation: any;
};
const Wishlist = ({navigation}: Props) => {
  const {
    WishlistProducts,
    removefromWishlist,
    closeModal,
    showModal,
    openModal,
    colorScheme,
  } = useWishlist();
  const {getTextColor, getContainerStyle, getTextInputStyle} =
    useContext(ColorSchemeContext);
  const {refreshing, onRefresh} = useWishlist();
  const allWishlistProducts = useSelector(
    (state: {WishlistProducts: {data: any[]}}) => state.WishlistProducts.data,
  );
  console.log('hey', allWishlistProducts);
  const isLoading = useSelector(
    (state: {WishlistProducts: {isLoader: boolean}}) =>
      state.WishlistProducts.isLoader,
  );
  console.log(isLoading);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.main,
        }}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={style.Lottiestyle}
        />
        <Text style={style.Lottietext}>The Items are Loading...</Text>
      </View>
    );
  }
  if (!WishlistProducts) {
    return (
      <View
        testID="loading-screen"
        style={{
          flex: 1,
          backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.main,
        }}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={style.Lottiestyle}
        />
        <Text style={style.Lottietext}>The Items are Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[style.maincontainer, getContainerStyle()]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={[style.textStylewishlist, getTextColor()]}>Wishlist</Text>
        <View style={[style.textConatiner, getContainerStyle()]}>
          <Text style={[style.textStyle, getTextColor()]}>
            My favorites ({allWishlistProducts.length})
          </Text>
        </View>
        {allWishlistProducts.length === 0 ? (
          <View
            testID="loading-view"
            style={[style.lottieStyle, getContainerStyle()]}>
            <Lottie
              source={require('../../../assets/wishlistanime.json')}
              autoPlay
              style={style.lottieImage}
            />
            <Text style={style.Emptytext}>Your wishlist is empty</Text>
          </View>
        ) : (
          <View style={[style.maincontainer, getContainerStyle()]}>
            <View style={style.wishlistViewContaner}>
              <View style={style.whishlistView}>
                {allWishlistProducts &&
                  allWishlistProducts.map((item, index) => {
                    return (
                      <View style={style.wishlistConatinerwrap} key={item.id}>
                        <View style={[style.container, getTextInputStyle()]}>
                          <TouchableOpacity
                            testID={`productdetails-${item.id}`}
                            onPress={() =>
                              navigation.navigate('UProductDetails', {
                                product: item,
                              })
                            }>
                            <View style={style.imageContainer}>
                              <Image
                                source={{uri: item.imageUrl[0]}}
                                style={style.image}
                              />
                            </View>
                          </TouchableOpacity>
                          <View style={style.cardTextContainer}>
                            <View style={style.Cartcontents}>
                              <Text style={[style.name, getTextColor()]}>
                                {item.name}
                              </Text>
                            </View>
                            <View style={[style.textContainer, getTextColor()]}>
                              <Text style={style.price}>
                                {'₹' + item.price}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            testID={`heart-${item.id}`}
                            style={style.wishlistButton}
                            onPress={() => removefromWishlist(item.id)}
                            onPressIn={() => openModal()}>
                            <Image
                              source={require('../../../assets/fillheart.png')}
                              style={style.EmptyImage}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Item Removed!"
      />
    </View>
  );
};

export default Wishlist;
