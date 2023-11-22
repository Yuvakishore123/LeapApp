import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchCartProducts,
  selectCartData,
  selectCartLoading,
} from '../../../redux/slice/cartSlice';

import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';

import {StackNavigationProp} from '@react-navigation/stack';
import {
  ListAddress,
  selectListAddressData,
} from '../../../redux/slice/listAddressSlice';
import analtyics from '@react-native-firebase/analytics';
import colors from 'constants/colors';
import {ADDORDER} from '../../../../src/redux/reducers/Orderreducer';
type RootStackParamList = {
  CheckoutScreen: undefined;
  PaymentSuccessScreen: undefined;
  PaymentFailScreen: undefined;
  Owneraddresspage: undefined;
};
// Custom hook for managing checkout-related functionality
const useCheckout = () => {
  // Accessing navigation functions
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // State variables for refreshing, rental dates, checkbox states, and loading
  const [refreshing, setRefreshing] = useState(false);
  const [rentalStartDate, setRentalStartDate] = useState(new Date());
  const [rentalEndDate, setRentalEndDate] = useState(new Date());
  const [isChecked, setIsChecked] = useState(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [isCheckedArray, setIsCheckedArray] = useState<boolean[]>([]);
  const dispatch = useDispatch();

  // Selecting data from the Redux store
  const data = useSelector(selectListAddressData);
  const cartData = useSelector(selectCartData);
  const isLoading = useSelector(selectCartLoading);

  // Effect to fetch list of addresses and cart products
  useEffect(() => {
    setRefreshing(true);
    dispatch(ListAddress() as any);
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCartProducts() as any);
  }, [dispatch]);

  // Function to handle checkbox state change
  const handleCheckboxChange = (index: any) => {
    setSelectedAddressIndex(index);
    if (Array.isArray(data)) {
      const newIsCheckedArray = data.map((_, i) => i === index);
      setIsCheckedArray(newIsCheckedArray);
    }
    setIsChecked(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchCartProducts() as any);
    setRefreshing(false);
  };

  const totalPrice = cartData.finalPrice;
  // Function to handle payment through Razorpay
  const handlePayment = () => {
    const options = {
      order_id: '',
      description: 'Payment for renting items',
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
        color: colors.iconscolor,
        background: colors.main,
        'card[name]': {
          color: colors.iconscolor,
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
        'card[number]': {
          color: colors.iconscolor,
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
        'card[expiry]': {
          color: colors.iconscolor,
          'font-size': '16px',
          'font-weight': 'bold',
          'font-family': 'Arial, sans-serif',
        },
        'card[cvc]': {
          color: colors.iconscolor,
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
  // Function to navigate to the address addition page
  const handleAddAddress = () => {
    navigation.navigate('Owneraddresspage');
  };
  // *Function to log the order placed event for analytics
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
    handleAddAddress,
    isLoading,
  };
};
export default useCheckout;
