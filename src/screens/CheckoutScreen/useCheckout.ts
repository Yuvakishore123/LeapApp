import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCartProducts} from '../../redux/slice/cartSlice';

import {ADDORDER} from '../../redux/actions/actions';

import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';

import {StackNavigationProp} from '@react-navigation/stack';
import {ListAddress} from '../../redux/slice/listAddressSlice';
import analtyics from '@react-native-firebase/analytics';
type RootStackParamList = {
  CheckoutScreen: undefined;
  PaymentSuccessScreen: undefined;
  PaymentFailScreen: undefined;
};
const useChectout = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [rentalStartDate, setRentalStartDate] = useState(new Date());
  const [rentalEndDate, setRentalEndDate] = useState(new Date());
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isChecked, setIschecked] = useState(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [isCheckedArray, setIsCheckedArray] = useState<boolean[]>([]);
  const dispatch = useDispatch();

  const data = useSelector(
    (state: {listAddress: {data: any}}) => state.listAddress.data,
  );

  useEffect(() => {
    setRefreshing(true);
    dispatch(ListAddress() as any);
    setRefreshing(false);
  }, [dispatch]);
  const cartData = useSelector(
    (state: {CartProducts: {data: any}}) => state.CartProducts.data,
  ) || {
    cartItems: [],
  };
  useEffect(() => {
    dispatch(fetchCartProducts() as any);
  }, [dispatch]);

  const handleCheckboxChange = (index: any) => {
    setSelectedAddressIndex(index);
    // Check if data is an array before using map
    if (Array.isArray(data)) {
      const newIsCheckedArray = data.map((_, i) => i === index);
      setIsCheckedArray(newIsCheckedArray);
    }
    setIschecked(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchCartProducts() as any);
    setRefreshing(false);
  };

  const totalPrice = cartData.finalPrice;
  const handlePayment = () => {
    const options = {
      order_id: '',
      description: 'Payment for food items',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_TvqBgZuxwM7H00',
      amount: totalPrice * 100,
      name: 'Leap',
      prefill: {
        email: 'example@example.com',
        contact: '1234567890',
        name: 'John',
      },
      theme: {
        color: '#3E54AC',
        background: '#F6F6F6',
        'card[name]': {
          color: '#3E54AC',
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
        'card[number]': {
          color: '#3E54AC',
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
        'card[expiry]': {
          color: '#3E54AC',
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
        'card[cvc]': {
          color: '#3E54AC',
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
      },
    };
    RazorpayCheckout.open(options)
      .then((paymentData: any) => {
        navigation.navigate('PaymentSuccessScreen');
        dispatch(ADDORDER(paymentData.razorpay_payment_id) as any);
        const userId = cartData.userId; // Replace this with the actual user ID
        const orderId = paymentData.razorpay_payment_id;
        const orderAmount = totalPrice * 100; // Assuming totalPrice is defined somewhere
        logOrderPlacedEvent(userId, orderId, orderAmount);
      })
      .catch(_error => {
        Alert.alert('Try Again');
        navigation.navigate('PaymentFailScreen');
      });
  };
  const logOrderPlacedEvent = async (
    userId: string,
    orderId: any,
    orderAmount: number,
  ) => {
    try {
      await analtyics().logEvent('order_placed', {
        user_id: userId,
        order_id: orderId,
        order_amount: orderAmount,
      });
    } catch (error) {
      console.error('Error logging order placed event:', error);
    }
  };
  return {
    refreshing,
    setRefreshing,
    onRefresh,
    handlePayment,
    data,

    rentalStartDate,
    rentalEndDate,
    setRentalStartDate,
    setRentalEndDate,
    handleCheckboxChange,

    selectedAddressIndex,
    isCheckedArray,
    isChecked,
    setIsCheckedArray,
  };
};
export default useChectout;
