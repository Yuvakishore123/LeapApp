/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import React from 'react';
import React from 'react';
// import CartItem from '../Cart/CartItem';
import useWishlist from './useWishlist';
import style from './wishlistStyles';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Colors';
import Lottie from 'lottie-react-native';
import Styles from '../../constants/themeColors';
type Props = {
  route: {name: string};
  navigation: any;
};
const Wishlist = ({navigation}: Props) => {
  const {
    WishlistProducts,
    removefromWishlist,
    colorScheme,
    // isLoading,
  } = useWishlist();

  const allWishlistProducts = useSelector(state => state.WishlistProducts.data);
  console.log('hey', allWishlistProducts);
  const isLoading = useSelector(state => state.WishlistProducts.isLoader);
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
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            marginTop: '50%',
            justifyContent: 'center',
          }}
        />
        <Text style={{color: Colors.white, marginLeft: '30%'}}>
          The Items are Loading...
        </Text>
      </View>
    );
  }
  if (!WishlistProducts) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.main,
        }}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={{
            height: 200,
            width: 200,
            alignSelf: 'center',
            marginTop: '50%',
            justifyContent: 'center',
          }}
        />
        <Text style={{color: Colors.white, marginLeft: '30%'}}>
          The Items are Loading...
        </Text>
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
                {
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  backgroundColor: Colors.main,
                },
                colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
              ]}>
              <Lottie
                source={require('../../../assets/wishlistanime.json')}
                autoPlay
                style={{
                  height: 200,
                  width: 200,
                  marginTop: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
              <Text
                style={{
                  marginBottom: 20,
                  color: Colors.iconscolor,
                  fontSize: 15,
                  fontWeight: '600',
                }}>
                Your wishlist is empty
              </Text>
            </View>
          </>
        ) : (
          <View
            style={[
              style.maincontainer,
              colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
            ]}>
            <View
              style={{
                // flex: 1,
                // flexDirection: 'row',
                // backgroundColor: '#ECF2FF',
                width: '100%',
                // flexWrap: 'wrap',
              }}>
              {/* Other code */}
              <View
                style={{
                  // marginTop: 20,
                  alignItems: 'center',
                  flexDirection: 'row',
                  // marginBottom: 100,
                  width: '100%',
                  flexWrap: 'wrap',
                  // justifyContent: 'space-between',
                }}>
                {allWishlistProducts &&
                  allWishlistProducts.map(
                    (
                      item: {
                        imageUrl: any[];
                        name:
                          | string
                          | number
                          | boolean
                          | React.ReactElement<
                              any,
                              string | React.JSXElementConstructor<any>
                            >
                          | React.ReactFragment
                          | React.ReactPortal
                          | null
                          | undefined;
                        price: string;
                        id: any;
                      },
                      index: React.Key | null | undefined,
                    ) => {
                      return (
                        <View
                          style={{
                            width: '50%',
                            // backgroundColor: Colors.green,
                            flexDirection: 'row',
                          }}
                          key={index}>
                          <View
                            style={[
                              style.container,
                              colorScheme === 'dark'
                                ? Styles.cardColor
                                : Styles.main,
                            ]}>
                            <TouchableOpacity
                              // style={{width: '100%', height: '20%'}}
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
                              onPress={() => removefromWishlist(item.id)}
                              <Image
                                source={require('../../../assets/fillheart.png')}
                                style={{width: 24, height: 24}}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    },
                  )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Wishlist;
