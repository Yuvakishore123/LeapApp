/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Lottie from 'lottie-react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Colors from 'constants/colors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import style from 'screens/BorrowerScreens/Home/homeStyles';
import Carousal from './Carousal';

import CustomModal from 'components/atoms/CustomModel/CustomModel';
import * as Animatable from 'react-native-animatable';
import ImageComponent from 'components/atoms/ImageComponent/ImageComponent';

import {useNavigationProp} from 'helpers/helper';
import {postProductToAPI} from '../../../../src/redux/actions/actions';
import useHome from './useHome';

const Homescreen = () => {
  const dispatch = useDispatch();

  const {
    wishlistremove,
    searchQuery,
    searchProducts,
    setSearchQuery,
    placeholderText,
    placeholderTextColor,
    loading,
    closeModal,
    showModal,
    name,
    handleEndReached,
    allProducts,
    imageLoaded,
    setImageLoaded,
    wishlistList,
    setWishlistList,
  } = useHome();
  const {navigation} = useNavigationProp();

  const {
    colorScheme,
    getContainerStyle,
    getTextColor,
    getPlaceholderTextColor,
    getTextInputStyle,
  } = useContext(ColorSchemeContext);

  const loadingComponent = () => {
    return (
      <View>
        <ActivityIndicator color={'white'} size={'large'} />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[
        {
          height: '100%',
          width: '100%',
          backgroundColor: Colors.main,
          overflow: 'scroll',
        },
        getContainerStyle(),
      ]}>
      {loading ? (
        <SkeletonPlaceholder
          highlightColor="#e0e0e0"
          backgroundColor={colorScheme === 'dark' ? '#373737' : '#f2f2f2'}>
          <View>
            <Text
              style={[
                {
                  marginLeft: 26,
                  marginTop: 10,
                  width: 70,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 15,
                },
                getTextColor(),
              ]}></Text>
            <View style={[style.searchInputContainer, getTextColor()]}>
              <TextInput
                placeholder="Search"
                placeholderTextColor={placeholderTextColor}
                style={{
                  borderRadius: 40,
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  width: '90%',
                  height: 45,
                  marginTop: 8,
                  paddingLeft: 10,
                }}
              />
            </View>
            <Text
              style={[
                {
                  marginLeft: 26,
                  marginTop: 30,
                  width: 300,
                  height: 25,
                  borderRadius: 50,
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 15,
                },
                getTextColor(),
              ]}></Text>
            <View style={style.categoriesContainer}>
              <Text style={[style.CategoriesText, getTextColor()]}></Text>
              <TouchableOpacity>
                <Text style={style.Seetext}></Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View>
                <TextInput style={style.img}></TextInput>
              </View>
              <View>
                <TextInput style={style.img}></TextInput>
              </View>
              <View>
                <TextInput style={style.img}></TextInput>
              </View>
              <View>
                <TextInput style={style.img}></TextInput>
              </View>
              <View>
                <TextInput style={style.img}></TextInput>
              </View>
            </View>
            <View style={[style.container, {marginTop: 70}]}>
              <TouchableOpacity>
                <View style={style.imageContainer}>
                  <TextInput style={style.image}></TextInput>
                  <TouchableOpacity style={style.wishlistButton}>
                    <MaterialIcons size={20} color={'red'} name="cards-heart" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
              <Text style={style.name}></Text>
              <Text style={style.price}></Text>
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : (
        <View style={[style.mainContainer, getContainerStyle()]}>
          <View style={{flexDirection: 'row'}}>
            <Animatable.Text
              animation={'slideInDown'}
              duration={1000}
              testID={'First-Name'}
              style={[
                {
                  marginLeft: 26,
                  marginTop: 10,
                  // fontWeight: '900',
                  fontFamily: 'Poppins-SemiBold',
                  fontSize: 15,
                },
                getTextColor(),
              ]}>
              Welcome {name?.firstName}
            </Animatable.Text>
            <Lottie
              source={require('../../../../assets/celebration.json')}
              autoPlay
              style={{height: 45, width: 50}}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginLeft: 20,
              }}></View>
          </View>
          <View style={[style.searchInputContainer, getTextInputStyle()]}>
            <Icon
              name="search1"
              size={20}
              style={{
                marginLeft: 20,
                color: colorScheme === 'dark' ? Colors.white : Colors.black,
              }}
            />
            <TextInput
              placeholder={placeholderText}
              testID="Search-text"
              placeholderTextColor={placeholderTextColor}
              style={[
                {
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  width: '100%',
                  height: 45,
                  marginTop: 8,
                  paddingLeft: 10,
                  color: 'black',
                },
                getPlaceholderTextColor(),
              ]}
              onChangeText={text => {
                setSearchQuery(text);
              }}
              onSubmitEditing={() => searchProducts(searchQuery)}
            />
          </View>
          <View style={style.categoriesContainer}>
            <Text style={[style.CategoriesText, getTextColor()]}>
              {' '}
              Categories for you
            </Text>
            <TouchableOpacity
              testID="Categories-Button"
              onPress={() => navigation.navigate('CategoryScreen')}>
              <Text style={style.Seetext}> See all</Text>
            </TouchableOpacity>
          </View>
          <Carousal />
          <Text style={[style.Productstext, getTextColor()]}>
            Products for you
          </Text>
          <SafeAreaView style={{height: '100%', flex: 1}}>
            <View style={{marginLeft: 5, height: '100%'}}>
              <FlatList
                data={allProducts}
                testID="FlatList"
                nestedScrollEnabled={true} //changes
                keyExtractor={(item: unknown) => (item as {id: string}).id}
                style={{height: '100%', width: '100%'}}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                ListFooterComponent={loadingComponent}
                renderItem={({item}: {item: any}) => {
                  return (
                    <>
                      <Animatable.View
                        animation={'bounceIn'}
                        duration={1500}
                        style={[style.container, getTextInputStyle()]}>
                        <TouchableOpacity
                          key={item.id}
                          testID={`cardContainer-${item.id}`}
                          onPress={() =>
                            navigation.navigate('UProductDetails', {
                              product: item,
                            })
                          }>
                          <View style={style.imageContainer}>
                            <ImageComponent
                              imageUrl={item.imageUrl[0]}
                              imageLoaded={imageLoaded}
                              setImageLoaded={setImageLoaded}
                            />
                            <TouchableOpacity
                              testID={`wishlist-Button-${item.id}`}
                              style={style.wishlistButton}
                              onPress={() => {
                                if (wishlistList?.includes(item.id)) {
                                  setWishlistList(
                                    wishlistList.filter(id => id !== item.id),
                                  );
                                  wishlistremove(item.id);
                                } else {
                                  setWishlistList([...wishlistList, item.id]);
                                  dispatch(postProductToAPI(item) as any);
                                }
                              }}>
                              {wishlistList?.includes(item.id) ? (
                                <Animatable.View
                                  animation={'bounceIn'}
                                  duration={1000}>
                                  <MaterialIcons
                                    size={20}
                                    testID={`wishlist-remove-${item.id}`}
                                    color={'red'}
                                    name="cards-heart"
                                  />
                                </Animatable.View>
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
                        <View style={style.cardTextContainer}>
                          <Text style={[style.name, getTextColor()]}>
                            {item.name}
                          </Text>

                          <View style={style.textContainer}>
                            <Text style={style.price}>{'₹' + item.price}</Text>
                          </View>
                        </View>
                      </Animatable.View>
                    </>
                  );
                }}
              />
            </View>
          </SafeAreaView>
        </View>
      )}

      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Item Removed from Wishlist!!"
      />
    </SafeAreaView>
  );
};

export default Homescreen;