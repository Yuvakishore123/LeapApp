/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {ReactNode, useContext} from 'react';
import {CheckBox} from 'react-native-elements';
import {useSelector} from 'react-redux';

import useCheckout from './useCheckout';

import HeadingText from '../../../components/atoms/HeadingText/HeadingTest';
import Colors from '../../../constants/colors';

import style from './CheckoutScreenStyle';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import {selectCartData} from 'src/redux/slice/cartSlice';

const CheckoutScreen = () => {
  const {
    selectedAddressIndex,
    handlePayment,
    handleCheckboxChange,
    refreshing,
    onRefresh,

    isChecked,
    data,
    handleAddAddress,
    isLoading,
  } = useCheckout();
  const {getTextInputStyle, getContainerStyle, getTextColor} =
    useContext(ColorSchemeContext);
  const cartData = useSelector(selectCartData);

  if (isLoading) {
    return (
      <View style={style.checkoutcontainer}>
        <Image
          testID="Loading-Image"
          source={require('../../../../assets/LoginImage.png')}
          style={style.checkoutimage}
        />
        <Text testID="Loading-Text" style={{color: Colors.iconscolor}}>
          The Items are Loading...
        </Text>
      </View>
    );
  }
  return (
    <>
      <View style={[style.Fullcontainer, getContainerStyle()]}>
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
                    name: string;
                    id: any;
                    size: string;
                    price: string;
                  };
                }) => (
                  <View
                    key={item.id}
                    testID={`cardContainer-${item.id}`}
                    style={[style.cardContainer, getTextInputStyle()]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: '100%',
                      }}>
                      <View style={style.imageContainer}>
                        <Image
                          source={{uri: item.imageUrl}}
                          style={style.image}
                        />
                      </View>
                      <View style={style.cardTextContainer}>
                        <View style={style.productContainer}>
                          <Text
                            testID={`ProductName-${item.id}`}
                            style={[style.productname, getTextColor()]}>
                            {item.product.name}
                          </Text>
                          <Text style={style.priceText}>
                            ₹{item.product.price}
                          </Text>
                        </View>
                        <View style={style.sizeContainer}>
                          <Text style={[style.sizeText, getTextColor()]}>
                            {' '}
                            Size-{item.product.size}
                          </Text>
                          <Text style={[style.name, getTextColor()]}>
                            Rent From
                          </Text>
                        </View>
                        <View style={style.SizeandDate}>
                          <View style={style.quantityContainer}>
                            <Text style={[style.quantityText, getTextColor()]}>
                              Quantity :
                            </Text>
                            <Text style={[style.quantityText, getTextColor()]}>
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
              <Text style={[style.addressText, getTextColor()]}>
                Select Address
              </Text>
              <TouchableOpacity
                testID="AddAddress-Button"
                onPress={handleAddAddress}
                style={[style.addressButton]}>
                <Text style={[style.addresschangeText]}>Add Address</Text>
              </TouchableOpacity>
            </View>
            {data?.map(
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
                  testID={`AddressContainer-${item.id}`}
                  style={[style.card, getTextInputStyle()]}>
                  <View style={[style.addressContainer]}>
                    <View>
                      <Text style={[style.addresstext, getTextColor()]}>
                        Address:
                      </Text>
                      <Text style={[style.city, getTextColor()]}>
                        <Text testID={`addressText-${item.id}`}>
                          {item.addressLine1},
                        </Text>
                        {item.addressLine2},{item.postalCode},{item.city},
                        {item.country},
                      </Text>
                    </View>
                    <View style={style.containerCheckbox}>
                      <Text style={[style.textCheckbox, getTextColor()]}>
                        Delivery Address
                      </Text>

                      <CheckBox
                        testID={`SelectAddress-${item.id}`}
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
          <Text style={[style.GrandtotalText, getTextColor()]}>
            Shipping Cost
          </Text>
          <Text style={[style.priceTotalText, getTextColor()]}>
            {' '}
            ₹ {cartData.shippingCost}
          </Text>
        </View>
        <View style={style.shippingContainer}>
          <Text style={[style.GrandtotalText, getTextColor()]}>Tax</Text>
          <Text style={[style.priceTotalText, getTextColor()]}>
            {' '}
            ₹ {cartData.tax}
          </Text>
        </View>
        <View style={[style.shippingContainer]}>
          <Text style={[style.GrandtotalText, getTextColor()]}>
            Grand Total
          </Text>
          <Text style={[style.priceTotalText, getTextColor()]}>
            {' '}
            ₹ {cartData.totalCost}
          </Text>
        </View>
        <View style={style.shippingContainer}>
          <Text style={[style.GrandtotalText, getTextColor()]}>
            final Price
          </Text>
          <Text style={[style.priceTotalText, getTextColor()]}>
            {' '}
            ₹ {cartData.finalPrice}
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            testID={'Place-Order'}
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
