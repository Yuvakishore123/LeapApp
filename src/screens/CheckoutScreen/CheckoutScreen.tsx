/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import {CheckBox} from 'react-native-elements';
import {useSelector} from 'react-redux';

import useCheckout from './useCheckout';
import useCart from '../Cart/useCart';

import HeadingText from '../../components/atoms/HeadingText/HeadingTest';
import Colors from '../../constants/colors';
import Styles from '../../constants/themeColors';
import style from './CheckoutScreenStyle';

type Props = {
  route: {name: string};
  navigation: any;
};

const CheckoutScreen = ({navigation}: Props) => {
  const {
    selectedAddressIndex,
    handlePayment,
    handleCheckboxChange,
    refreshing,
    onRefresh,
    imageLoaded,
    setImageLoaded,
    isChecked,
    data,
  } = useCheckout();
  const {colorScheme} = useCart();
  const cartData = useSelector(
    (state: {CartProducts: {data: any}}) => state.CartProducts.data,
  ) || {
    cartItems: [],
  };

  if (!cartData) {
    return (
      <View style={style.checkoutcontainer}>
        <Image
          source={require('../../../assets/LoginImage.png')}
          style={style.checkoutimage}
        />
        <Text style={{color: Colors.iconscolor}}>The Items are Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <View
        style={[
          style.Fullcontainer,
          colorScheme === 'dark' ? Styles.blacktheme : Styles.whiteTheme,
        ]}>
        <HeadingText message="Checkout" navigation={undefined} />

        <ScrollView>
          <View>
            <ScrollView
              style={style.mainContainer}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {cartData?.cartItems?.map(
                (item: {
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
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactPortal
                      | null
                      | undefined;
                    id: any;
                    size:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactPortal
                      | null
                      | undefined;
                    price: string;
                  };
                }) => (
                  <View
                    testID="checkoutproducts"
                    key={item.id}
                    style={[
                      style.cardContainer,
                      colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                      }}>
                      <View style={style.imageContainer}>
                        {!imageLoaded && (
                          <Image
                            source={require('../../../assets/imageload1.png')}
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
                      <View style={style.cardTextContainer}>
                        <View style={style.productContainer}>
                          <Text
                            style={[
                              style.productname,
                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
                            ]}>
                            {item.product.name}
                          </Text>
                          <Text style={style.priceText}>
                            ₹{item.product.price}
                          </Text>
                        </View>
                        <View style={style.sizeContainer}>
                          <Text
                            style={[
                              style.sizeText,
                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
                            ]}>
                            {' '}
                            Size-{item.product.size}
                          </Text>
                          <Text
                            style={[
                              style.name,
                              colorScheme === 'dark'
                                ? Styles.whitetext
                                : Styles.blackText,
                            ]}>
                            Rent From
                          </Text>
                        </View>
                        <View style={style.SizeandDate}>
                          <View style={style.quantityContainer}>
                            <Text
                              style={[
                                style.quantityText,
                                colorScheme === 'dark'
                                  ? Styles.whitetext
                                  : Styles.blackText,
                              ]}>
                              Quantity :
                            </Text>
                            <Text
                              style={[
                                style.quantityText,
                                colorScheme === 'dark'
                                  ? Styles.whitetext
                                  : Styles.blackText,
                              ]}>
                              {item.quantity}
                            </Text>
                          </View>
                          <View style={{flexDirection: 'row', marginLeft: 10}}>
                            <View style={style.DateContainer}>
                              <Text style={style.DateTxt}>
                                {item.rentalStartDate?.toLocaleString()}
                              </Text>
                            </View>
                            <View style={style.DateContainer}>
                              <Text style={style.DateTxt}>
                                {item.rentalEndDate?.toLocaleString()}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ),
              )}
            </ScrollView>
            <View style={[style.addresscard]}>
              <Text
                style={[
                  style.addressText,
                  colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
                ]}>
                Select Address
              </Text>
              <View style={[style.addressButton]}>
                <Text
                  style={[style.addresschangeText]}
                  onPress={() => {
                    navigation.navigate('Owneraddresspage');
                  }}>
                  Add Address
                </Text>
              </View>
            </View>
            {Array.isArray(data) &&
              data?.map(
                (
                  item: {
                    id: any;
                    addressLine1: string;
                    addressLine2: string;
                    postalCode: string;
                    city: string;
                    country: string;
                  },
                  index: number,
                ) => (
                  <View
                    key={item.id}
                    style={[
                      style.card,
                      colorScheme === 'dark' ? Styles.cardColor : Styles.main,
                    ]}>
                    <View style={[style.addressContainer]}>
                      <View>
                        <Text
                          style={[
                            style.addresstext,
                            colorScheme === 'dark'
                              ? Styles.whitetext
                              : Styles.blackText,
                          ]}>
                          Address:
                        </Text>
                        <Text
                          style={[
                            style.city,
                            colorScheme === 'dark'
                              ? Styles.whitetext
                              : Styles.blackText,
                          ]}>
                          <Text>{item.addressLine1},</Text>
                          {item.addressLine2},{item.postalCode},{item.city},
                          {item.country},
                        </Text>
                      </View>
                      <View style={style.containerCheckbox}>
                        <Text
                          style={[
                            style.textCheckbox,
                            colorScheme === 'dark'
                              ? Styles.whitetext
                              : Styles.blackText,
                          ]}>
                          Delivery Address
                        </Text>

                        <CheckBox
                          checked={selectedAddressIndex === index}
                          onPress={() => handleCheckboxChange(index)}
                          checkedColor={Colors.buttonColor}
                          containerStyle={style.checkboxContainer}
                          size={24}
                        />
                      </View>
                    </View>
                  </View>
                ),
              )}
          </View>
        </ScrollView>
        <View style={[style.GrandtotalContainer]}>
          <Text
            style={[
              style.GrandtotalText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Shipping Cost
          </Text>
          <Text
            style={[
              style.priceTotalText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {' '}
            ₹ {cartData.shippingCost}
          </Text>
        </View>
        <View style={style.shippingContainer}>
          <Text
            style={[
              style.GrandtotalText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Tax
          </Text>
          <Text
            style={[
              style.priceTotalText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {' '}
            ₹ {cartData.tax}
          </Text>
        </View>
        <View style={[style.shippingContainer]}>
          <Text
            style={[
              style.GrandtotalText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            Grand Total
          </Text>
          <Text
            style={[
              style.priceTotalText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {' '}
            ₹ {cartData.totalCost}
          </Text>
        </View>
        <View style={style.shippingContainer}>
          <Text
            style={[
              style.GrandtotalText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            final Price
          </Text>
          <Text
            style={[
              style.priceTotalText,
              colorScheme === 'dark' ? Styles.whitetext : Styles.blackText,
            ]}>
            {' '}
            ₹ {cartData.finalPrice}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            style={[style.PaymentButton, isChecked && {opacity: 0.5}]}
            onPress={isChecked ? undefined : handlePayment}
            disabled={isChecked}>
            <Text style={style.priceTotal}> ₹ {cartData.finalPrice}</Text>
            <Text style={style.PaymentButtonText}>Place order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default CheckoutScreen;
