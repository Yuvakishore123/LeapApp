/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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

import Colors from '../../constants/Colors';
import Styles from '../../constants/ThemeColors';
import style from './wishlistStyles';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import Toast from 'react-native-toast-message';
import ImageComponent from 'components/atoms/ImageComponent';

type Props = {
  route: {name: string};
  navigation: any;
};
const Wishlist = ({navigation}: Props) => {
  const {
    WishlistProducts,
    wishlistremove,
    closeModal,
    allWishlistProducts,
    isLoading,
    showModal,
    openModal,
    colorScheme,
  } = useWishlist();

  const {refreshing, onRefresh} = useWishlist();

  if (isLoading || !WishlistProducts) {
    return (
      <View
        testID="loadingAnimation"
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
              testID="empty-animation"
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
                {allWishlistProducts?.map(item => {
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
                          testID="wishlist-touchable"
                          onPress={() =>
                            navigation.navigate('UProductDetails', {
                              product: item,
                            })
                          }>
                          <View
                            style={style.imageContainer}
                            testID="wishlist-image">
                            <ImageComponent imageUrl={item.imageUrl[0]} />
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
                            <Text style={style.price}>{'₹' + item.price}</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={style.wishlistButton}
                          testID="wishlist-button"
                          onPress={() => {
                            wishlistremove(item.id);
                            openModal();
                          }}>
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
