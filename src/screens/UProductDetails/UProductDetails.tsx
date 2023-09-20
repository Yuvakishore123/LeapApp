/* eslint-disable react-native/no-inline-styles */

import React, {useContext} from 'react';
import {
  StatusBar,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from 'components/atoms/CustomModel/CustomModel';
import {Pagination} from 'react-native-snap-carousel';

import {ColorSchemeContext} from '../../../ColorSchemeContext';
import useProductdetails from './useProductdetails';

import * as Animatable from 'react-native-animatable';
import Styles from 'constants/themeColors';
import Colors from 'constants/colors';
import styles from './UProductDetailsStyle';
import DatePickerComponent from 'components/atoms/DatePickerComponent/DatepickerComponent';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
type Props = {
  route: {params: {product: any}};
  navigation: any;
};
export default function UDetailScreen({route, navigation}: Props) {
  const {product} = route.params;
  const {colorScheme} = useContext(ColorSchemeContext);
  const {
    rentalStartDate,
    setRentalStartDate,
    rentalEndDate,
    setRentalEndDate,
    quantity,
    showModal,
    showwModal,
    isMinusDisabled,
    isPlusDisabled,
    handleDecrement,
    handleIncrement,
    imageLoaded,
    setImageLoaded,
    handleSubmit,
    closeModal,
    closeeModal,
    scrollViewRef,
    setActiveIndex,
    shareProduct,
    activeIndex,
    startScrollTimer,
    handleScroll,
  } = useProductdetails(product);
  const Quantity = product.quantity;
  return (
    <ScrollView
      style={{
        width: '100%',
        backgroundColor: colorScheme === 'dark' ? Colors.black : Colors.white,
      }}>
      <View
        style={[
          styles.container,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <View style={styles.dheader}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.sharebutton}>
          <Share name="share" size={30} color="black" onPress={shareProduct} />
        </View>
        <View style={{height: 500, width: 405, backgroundColor: Colors.gray}}>
          <ScrollView
            nestedScrollEnabled
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onMomentumScrollEnd={event => {
              const contentOffset = event.nativeEvent.contentOffset;
              const nextIndex = Math.round(contentOffset.x / 405);
              setActiveIndex(nextIndex);
              startScrollTimer();
            }}
            onScroll={handleScroll}>
            {product?.imageUrl.map((item: any) => (
              <ImageBackground
                key={item}
                style={{
                  height: 500,
                  width: 405,
                  backgroundColor: Colors.gray,
                  display: imageLoaded ? 'flex' : 'none',
                }}
                source={{uri: item}}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)}>
                {!imageLoaded && (
                  <Image
                    source={require('../../../assets/imageload1.png')} // Replace with your placeholder image source
                    style={{height: 500, width: 405}}
                  />
                )}
              </ImageBackground>
            ))}
          </ScrollView>
          <Animatable.Text
            animation={'slideInUp'}
            duration={1000}
            style={styles.startext}>
            {product.name}
          </Animatable.Text>
          <Pagination
            dotsLength={product.imageUrl.length}
            activeDotIndex={activeIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.pagingActiveText}
            inactiveDotStyle={styles.pagingText}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View
          style={[
            styles.detailsContainer,
            colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
          ]}>
          <Text style={[styles.detailsPrice]}>₹{product.price}</Text>
          <Text
            style={[
              styles.detailsdescription,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {product.description}
          </Text>
          <View style={{marginTop: 10, marginBottom: 20, flexDirection: 'row'}}>
            <Text
              style={[
                styles.headingtext,
                {marginTop: 10},
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Rent
            </Text>
            <DatePickerComponent
              startDate={rentalStartDate}
              endDate={rentalEndDate}
              onStartDateChange={setRentalStartDate}
              onEndDateChange={setRentalEndDate}
              buttonStyle={styles.datePickerstyles}
              buttonTextColor={styles.datepickerTextcolor}
            />
          </View>
          <View
            style={[
              styles.size,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            ]}>
            <Text
              style={[
                styles.sizelabel,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              Size
            </Text>
            <View style={styles.descriptionContainer}>
              <Text
                style={[
                  styles.detailsSize,
                  colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
                ]}>
                {product.size}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.quantityContainer,
              colorScheme === 'dark' ? Styles.cardColor : Styles.main,
            ]}>
            <View>
              <Text
                style={[
                  styles.Quatitytext,
                  colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
                ]}>
                Quantity
              </Text>
            </View>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                isMinusDisabled && styles.disabledButton,
              ]}
              onPress={handleDecrement}
              disabled={quantity === 1 || isMinusDisabled}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text
              style={[
                styles.quantityText,
                colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
              ]}>
              {quantity}
            </Text>
            <TouchableOpacity
              style={[
                styles.plusquantityButton,
                isPlusDisabled && styles.disabledButton,
              ]}
              onPress={handleIncrement}
              disabled={quantity === Quantity || isPlusDisabled}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.touchablebtnContainer}>
            <TouchableOpacity
              style={styles.touchablebtn}
              onPress={handleSubmit}>
              <Text style={styles.detailsaddPrice}>
                ₹{product.price * quantity}
              </Text>
              <Text style={styles.touchableText}>Add to Bag</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <CustomModal
        showModal={showModal}
        onClose={closeModal}
        message="Item added successfully!"
      />
      <CustomModal
        showModal={showwModal}
        onClose={closeeModal}
        message="Product already added"
      />
      <Toast />
    </ScrollView>
  );
}
