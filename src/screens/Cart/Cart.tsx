/* eslint-disable react-native/no-inline-styles */

import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import Lottie from 'lottie-react-native';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Toast from 'react-native-toast-message';

import useCart from './useCart';
import CustomModal from '../../components/atoms/CustomModel/CustomModel';
import DatePickerComponent from '../../components/atoms/DatePickerComponent/DatepickerComponent';

import style from './CartItemStyles';
import Colors from '../../constants/colors';

const Cart = () => {
  const {
    handleCheckout,
    handleRemove,
    setRentalStartDate,
    setRentalEndDate,
    closeModal,
    showModal,
    imageLoaded,
    setImageLoaded,
    handleDecrement,
    handleIncrement,
    isplusDisable,
    isLoading,
    getContainerStyle,
    getTextColor,
    getTextInputStyle,
    cartProductId,
  } = useCart();

  const cartData = useSelector(
    (state: {CartProducts: {data: any}}) => state.CartProducts.data,
  ) || {
    cartItems: [],
  };

  if (!cartData) {
    return (
      <View testID="loading-view'" style={style.lottiecontainer}>
        <Lottie
          source={require('../../../assets/loading2.json')}
          autoPlay
          style={style.lottie}
        />
        <Text style={{color: Colors.iconscolor}}>The Items are Loading...</Text>
      </View>
    );
  }
  type items = {
    id: any;
    rentalEndDate: ReactNode;
    rentalStartDate: ReactNode;
    imageUrl: string;
    quantity: number;
    product: {
      name:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactPortal
        | null
        | undefined;
      id: any;
      size:
        | string
        | number
        | boolean
        | React.ReactElement<any, string | React.JSXElementConstructor<any>>
        | React.ReactPortal
        | null
        | undefined;
      price: string;
    };
  };
  return (
    <>
      <View style={[style.mainContainer, getContainerStyle()]}>
        <Text style={[style.MainTitleText, getTextColor()]}>Cart</Text>
        <View style={[style.titleContainer, getContainerStyle()]}>
          <Text style={[style.titleText, getTextColor()]}>
            Cart products ({cartData.cartItems.length}){' '}
          </Text>
        </View>
        <View>
          <ScrollView style={style.ScrollContainer}>
            {cartData?.cartItems.length === 0 ? (
              <View style={style.noAddressContainer1}>
                <View style={style.titleTextContainer1}>
                  <Lottie
                    style={style.imageS1}
                    autoPlay
                    source={require('../../../assets/emptycart.json')}
                  />
                </View>
                <View style={style.textContainer1}>
                  <Text style={[style.noAddressText1, getTextColor()]}>
                    Hey,it feels so light!
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                {cartData?.cartItems?.map((item: items) => (
                  <View
                    key={item.id}
                    style={[style.cardContainer, getTextInputStyle()]}>
                    <View style={style.imageContainer}>
                      {!imageLoaded && (
                        <Image
                          source={require('../../../assets/imageload1.png')} // Replace with your placeholder image source
                          style={style.image}
                        />
                      )}
                      <Image
                        source={{uri: item.imageUrl}}
                        style={[
                          style.image,
                          {display: imageLoaded ? 'flex' : 'none'},
                        ]}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(false)}
                      />
                    </View>
                    <View style={style.subContainer}>
                      <View style={style.cardTextContainer}>
                        <View style={{width: 100, height: 20}}>
                          <Text style={[style.productname, getTextColor()]}>
                            {item.product.name}
                          </Text>
                        </View>
                        <Text style={[style.name, getTextColor()]}>Rent </Text>
                        <Text style={style.priceText}>
                          {'₹' + item.product.price}
                        </Text>
                      </View>
                      <View style={[style.sizeContainer]}>
                        <Text style={[style.sizeText, getTextColor()]}>
                          Size
                        </Text>
                        <Text
                          style={[style.detailsdescription, getTextColor()]}>
                          {item.product.size}
                        </Text>
                        <DatePickerComponent
                          startDate={item.rentalStartDate?.toLocaleString()}
                          endDate={item.rentalEndDate?.toLocaleString()}
                          onStartDateChange={setRentalStartDate}
                          onEndDateChange={setRentalEndDate}
                          buttonStyle={style.datepickerStyle}
                          buttonTextColor={style.datepickerTextstyle}
                        />
                      </View>
                      <View style={style.removeAndQuantity}>
                        <TouchableOpacity
                          testID={`product-button-${item.id}`}
                          style={style.RemoveButton}
                          onPress={() => handleRemove(item.product.id)}>
                          <Text style={style.RemoveButtonText}>Remove</Text>
                        </TouchableOpacity>
                        <View style={style.quantityContainer}>
                          <TouchableOpacity
                            testID={`decrement-button-${item.id}`}
                            onPress={() => handleDecrement(item)}
                            style={style.quantityButton}>
                            <Icon name="minus" color={'white'} size={10} />
                          </TouchableOpacity>

                          <View>
                            {item.product.id === cartProductId && isLoading && (
                              <View style={{alignItems: 'center'}}>
                                <ActivityIndicator color={'white'} />
                              </View>
                            )}
                            {!isLoading && (
                              <View>
                                <Text
                                  style={[style.quantityTxt, getTextColor()]}>
                                  {item.quantity}
                                </Text>
                              </View>
                            )}
                          </View>
                          <TouchableOpacity
                            onPress={() => handleIncrement(item)}
                            testID={`increment-button-${item.id}`}
                            disabled={isplusDisable}
                            style={[
                              style.quantityButton,
                              isplusDisable && style.disabled,
                            ]}>
                            <Icon name="plus" color={'white'} size={10} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </ScrollView>
          <View style={style.GrandtotalContainer}>
            <Text style={[style.GrandtotalText, getTextColor()]}>
              Grand Total
            </Text>
            <View style={{width: 100, height: 25}}>
              <Text style={[style.priceTotalText, getTextColor()]}>
                ₹ {cartData.totalCost}
              </Text>
            </View>
          </View>
        </View>
        <View>
          {cartData.cartItems.length === 0 ? (
            <TouchableOpacity
              style={[style.PaymentButton, style.disabled]}
              disabled={true}>
              <Text style={style.PaymentButtonText}>Checkout</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                style={style.PaymentButton}
                onPress={handleCheckout}
                disabled={false}>
                <Text style={style.PaymentButtonText}>Checkout</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <CustomModal
          showModal={showModal}
          onClose={closeModal}
          message="Item Remove From cart!"
        />
        <Toast />
      </View>
    </>
  );
};

export default Cart;
