/* eslint-disable react-native/no-inline-styles */

import React, {useContext} from 'react';
import {
  StatusBar,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Share from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomModal from 'components/atoms/CustomModel/CustomModel';
import {Pagination} from 'react-native-snap-carousel';

import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import useProductdetails from './useProductdetails';

import * as Animatable from 'react-native-animatable';
import {RouteProp} from '@react-navigation/native';

import styles from './UProductDetailsStyle';
import DatePickerComponent from 'components/atoms/DatePickerComponent/DatepickerComponent';
import Toast from 'react-native-toast-message';
type UDetailScreenRouteProp = RouteProp<
  {
    UDetailScreen: {product: any}; // Define your route name and parameter name here
  },
  'UDetailScreen'
>;
type Props = {
  route: UDetailScreenRouteProp; // Pass the route param as a prop
  navigation: any;
};
export default function UDetailScreen({route}: Props) {
  // Use useRoute with the route type

  const {product} = route.params;

  const {getContainerStyle, getTextColor, getTextInputStyle} =
    useContext(ColorSchemeContext);
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

    handleSubmit,
    closeModal,
    closeeModal,
    scrollViewRef,
    setActiveIndex,
    shareProduct,
    activeIndex,
    startScrollTimer,
    handleScroll,
    handlegoBack,
  } = useProductdetails(product);
  const Quantity = product?.quantity;

  return (
    <ScrollView
      style={[
        {
          width: '100%',
        },
        getContainerStyle(),
      ]}>
      <View style={[styles.container, getContainerStyle()]}>
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0)'} />
        <View style={styles.dheader}>
          <Icon
            testID="Back-Button"
            name="arrow-back-ios"
            size={28}
            color="black"
            onPress={handlegoBack}
          />
        </View>
        <View style={styles.sharebutton}>
          <Share
            testID="Share-button"
            name="share"
            size={30}
            color="black"
            onPress={shareProduct}
          />
        </View>

        <View>
          <ScrollView
            nestedScrollEnabled
            ref={scrollViewRef}
            testID="Card-Component"
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
            {product?.imageUrl?.map((item: any) => (
              <ImageBackground
                testID={`Image-${item}`}
                key={item}
                style={{
                  height: 500,
                  width: 405,
                  backgroundColor: '#3E54AC1A',
                }}
                source={{uri: item}}
              />
            ))}
          </ScrollView>
          <Animatable.Text
            testID={'Product-Name'}
            animation={'slideInUp'}
            duration={1000}
            style={styles.startext}>
            {product?.name}
          </Animatable.Text>
          <Pagination
            dotsLength={product?.imageUrl.length}
            activeDotIndex={activeIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.pagingActiveText}
            inactiveDotStyle={styles.pagingText}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View style={[styles.detailsContainer, getContainerStyle()]}>
          <Text style={[styles.detailsPrice]}>₹{product?.price}</Text>
          <Text style={[styles.detailsdescription, getTextColor()]}>
            {product?.description}
          </Text>
          <View style={{marginTop: 10, marginBottom: 20, flexDirection: 'row'}}>
            <Text style={[styles.headingtext, {marginTop: 10}, getTextColor()]}>
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
          <View style={[styles.size, getTextInputStyle()]}>
            <Text style={[styles.sizelabel, getTextColor()]}>Size</Text>
            <View style={styles.descriptionContainer}>
              <Text style={[styles.detailsSize, getTextColor()]}>
                {product?.size}
              </Text>
            </View>
          </View>
          <View style={[styles.quantityContainer, getTextInputStyle()]}>
            <View>
              <Text style={[styles.Quatitytext, getTextColor()]}>Quantity</Text>
            </View>
            <TouchableOpacity
              testID={'Decrement-Button'}
              style={[
                styles.quantityButton,
                isMinusDisabled && styles.disabledButton,
              ]}
              onPress={handleDecrement}
              disabled={quantity === 1 || isMinusDisabled}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={[styles.quantityText, getTextColor()]}>
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
                ₹{product?.price * quantity}
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
