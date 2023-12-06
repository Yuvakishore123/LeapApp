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

import style from './wishlistStyles';
import CustomModal from '../../../components/atoms/CustomModel/CustomModel';
import Toast from 'react-native-toast-message';
import ImageComponent from 'components/atoms/ImageComponent/ImageComponent';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import {useNavigationProp} from 'helpers/helper';

const Wishlist = () => {
  const {
    WishlistProducts,
    wishlistremove,
    closeModal,
    showModal,
    refreshing,
    onRefresh,
    isLoading,
    imageLoaded,
    setImageLoaded,
  } = useWishlist();
  const {navigation} = useNavigationProp();
  const {getContainerStyle, getTextColor, getTextInputStyle} =
    useContext(ColorSchemeContext);

  const allWishlistProducts = useSelector(
    (state: {WishlistProducts: {data: any[]}}) => state.WishlistProducts.data,
  );

  if (isLoading) {
    return (
      <View
        style={[
          {
            flex: 1,
          },
          getContainerStyle(),
        ]}>
        <Lottie
          testID="loading-Component"
          source={require('../../../../assets/loading2.json')}
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
            My favorites ({WishlistProducts?.length})
          </Text>
        </View>
        {allWishlistProducts?.length === 0 ? (
          <>
            <View style={[style.lottieStyle, getContainerStyle()]}>
              <Lottie
                source={require('../../../../assets/wishlistanime.json')}
                autoPlay
                style={style.lottieImage}
              />
              <Text style={style.Emptytext} testID="wishlist-Loading">
                Your wishlist is empty
              </Text>
            </View>
          </>
        ) : (
          <View style={[style.maincontainer, getContainerStyle()]}>
            <View style={style.wishlistViewContaner}>
              <View style={style.whishlistView}>
                {WishlistProducts?.map(item => {
                  return (
                    <View style={style.wishlistConatinerwrap} key={item.id}>
                      <View
                        style={[style.container, getTextInputStyle()]}
                        testID={`wishlist-${item.id}`}>
                        <TouchableOpacity
                          testID={`wishlist-Button-${item.id}`}
                          onPress={() =>
                            navigation.navigate('UProductDetails', {
                              product: item,
                            })
                          }>
                          <View style={style.imageContainer}>
                            <ImageComponent
                              imageUrl={item?.imageUrl[0]}
                              imageLoaded={imageLoaded}
                              setImageLoaded={setImageLoaded}
                            />
                          </View>
                        </TouchableOpacity>
                        <View style={style.cardTextContainer}>
                          <View style={style.Cartcontents}>
                            <Text
                              testID={`ProductName-${item.id}`}
                              style={[style.name, getTextColor()]}>
                              {item.name}
                            </Text>
                          </View>
                          <View style={[style.textContainer, getTextColor()]}>
                            <Text style={style.price}>{'₹' + item.price}</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          style={style.wishlistButton}
                          testID={`Wishlist-remove-${item.id}`}
                          onPress={() => wishlistremove(item.id)}>
                          <Image
                            source={require('../../../../assets/fillheart.png')}
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
