/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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
import Styles from '../../constants/themeColors';
import style from './wishlistStyles';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import Toast from 'react-native-toast-message';

type Props = {
  route: {name: string};
  navigation: any;
};
const Wishlist = ({navigation}: Props) => {
  const {
    WishlistProducts,
    wishlistremove,
    closeModal,
    showModal,
    openModal,
    colorScheme,
  } = useWishlist();

  const {refreshing, onRefresh, imageLoaded, setImageLoaded} = useWishlist();
  const allWishlistProducts = useSelector(
    (state: {WishlistProducts: {data: any[]}}) => state.WishlistProducts.data,
  );
  console.log('hey', allWishlistProducts);
  const isLoading = useSelector(
    (state: {WishlistProducts: {isLoader: boolean}}) =>
      state.WishlistProducts.isLoader,
  );
  console.log(isLoading);

  if (isLoading || !WishlistProducts) {
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
  // if (!WishlistProducts) {
  //   return (
  //     <View
  //       testID="loading-screen"
  //       style={{
  //         flex: 1,
  //         backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.main,
  //       }}>
  //       <Lottie
  //         source={require('../../../assets/loading2.json')}
  //         autoPlay
  //         style={style.Lottiestyle}
  //       />
  //       <Text style={style.Lottietext}>The Items are Loading...</Text>
  //     </View>
  //   );
  // }

  return (
    <View
      style={[
        style.maincontainer,
        colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
      ]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text
          style={[
            style.textStylewishlist,
            colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
          ]}>
          Wishlist
        </Text>
        <View
          style={[
            style.textConatiner,
            colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
          ]}>
          <Text
            style={[
              style.textStyle,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            My favorites ({allWishlistProducts.length})
          </Text>
        </View>
        {allWishlistProducts.length === 0 ? (
          <>
            <View
              style={[
                style.lottieStyle,
                colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
              ]}>
              <Lottie
                source={require('../../../assets/wishlistanime.json')}
                autoPlay
                style={style.lottieImage}
              />
              <Text style={style.Emptytext}>Your wishlist is empty</Text>
            </View>
          </>
        ) : (
          <View
            style={[
              style.maincontainer,
              colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
            ]}>
            <View style={style.wishlistViewContaner}>
              <View style={style.whishlistView}>
                {allWishlistProducts &&
                  allWishlistProducts.map(item => {
                    return (
                      <View style={style.wishlistConatinerwrap} key={item.id}>
                        <View
                          style={[
                            style.container,
                            colorScheme === 'dark'
                              ? Styles.cardColor
                              : Styles.main,
                          ]}>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate('UProductDetails', {
                                product: item,
                              })
                            }>
                            <View style={style.imageContainer}>
                              {!imageLoaded && (
                                <Image
                                  source={require('../../../assets/imageload1.png')} // Replace with your placeholder image source
                                  style={style.image}
                                />
                              )}
                              <Image
                                source={{uri: item.imageUrl[0]}}
                                style={[
                                  style.image,
                                  {display: imageLoaded ? 'flex' : 'none'},
                                ]}
                                onLoad={() => setImageLoaded(true)}
                                onError={() => setImageLoaded(false)}
                              />
                            </View>
                          </TouchableOpacity>
                          <View style={style.cardTextContainer}>
                            <View style={style.Cartcontents}>
                              <Text
                                style={[
                                  style.name,
                                  colorScheme === 'dark'
                                    ? Styles.whitetext
                                    : Styles.blackText,
                                ]}>
                                {item.name}
                              </Text>
                            </View>
                            <View
                              style={[
                                style.textContainer,
                                colorScheme === 'dark'
                                  ? Styles.whitetext
                                  : Styles.blackText,
                              ]}>
                              <Text style={style.price}>
                                {'₹' + item.price}
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={style.wishlistButton}
                            onPress={() => wishlistremove(item.id)}
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
      <Toast />
    </View>
  );
};

export default Wishlist;
