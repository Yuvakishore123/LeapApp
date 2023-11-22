/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchCartProducts,
  selectCartData,
  selectCartError,
} from '../../../redux/slice/cartSlice';

import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {StackNavigationProp} from '@react-navigation/stack';
import {removefromCart} from '../../../redux/slice/cartRemoveSlice';
import {
  selectCartUpdateLoading,
  updateCart,
} from '../../../redux/slice/cartUpdateSlice';

type RootStackParamList = {
  CheckoutScreen: undefined;
  UserHomescreen: {screen: any};
  ProfileScreen: {screen: any};
  Homescreen: undefined;
};
const useCart = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rentalStartDate, setRentalStartDate] = useState(new Date());
  const [rentalEndDate, setRentalEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [isplusDisable, setisButtondisable] = useState(false); // Added loading state
  const [cartProductId, setCartProductId] = useState(0);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const dispatch = useDispatch();

  // Function to open the modal and fetch cart products
  const openModal = () => {
    dispatch(fetchCartProducts as any);
    setShowModal(true);
  };
  // Function to close the modal and fetch cart products
  const closeModal = () => {
    dispatch(fetchCartProducts() as any);
    setShowModal(false);
  };
  const isLoading = useSelector(selectCartUpdateLoading);
  const isError = useSelector(selectCartError);
  const CartProducts = useSelector(selectCartData);
  const cartError = useSelector(selectCartError);
  // Effect to refresh cart products when refreshing state changes
  useEffect(() => {
    if (refreshing) {
      dispatch(fetchCartProducts() as any);
      setRefreshing(false);
    }
  }, [refreshing]);

  // Effect to fetch cart products on component mount
  useEffect(() => {
    dispatch(fetchCartProducts() as any);
  }, []);

  // Function to handle updating the quantity of a cart item
  const handleUpdate = async (newQuantity: number, productId: string) => {
    const data = {
      productId: productId,
      quantity: newQuantity,
    };
    dispatch(updateCart(data) as any);
    setRefreshing(true);
  };
  // Function to navigate to the checkout screen
  const handleCheckout = async () => {
    navigation.navigate('CheckoutScreen');
  };

  // Function to handle removing a product from the cart
  const handleRemove = async (productId: number) => {
    dispatch(removefromCart(productId) as any);
    dispatch(fetchCartProducts as any);
    openModal();
  };
  // Function to handle incrementing the quantity of a cart item
  const handleIncrement = (item: any) => {
    const productId = item.product.id;
    setCartProductId(item.product.id);

    const productQuantity = item.product.availableQuantities;

    if (item.quantity === productQuantity) {
      setisButtondisable(true);
    } else {
      const Quantity = item.quantity + 1;

      handleUpdate(Quantity, productId);
    }
    setRefreshing(prevRefreshing => !prevRefreshing);
  };
  // Function to handle decrementing the quantity of a cart item
  const handleDecrement = (item: any) => {
    const productId = item.product.id;
    setCartProductId(item.product.id);
    const newQuantity = item.quantity - 1;

    handleUpdate(newQuantity, productId);
    setisButtondisable(false);
  };
  // Function to show a toast message for cart error
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error in updating cart',
    });
  };
  const CartToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error in cart',
    });
  };
  // Conditionally show toast messages for errors
  if (isError) {
    showToast();
  }
  if (cartError) {
    CartToast();
  }

  return {
    CartProducts,
    handleCheckout,
    handleRemove,
    refreshing,
    setRefreshing,
    handleUpdate,
    rentalStartDate,
    rentalEndDate,
    setRentalStartDate,
    setRentalEndDate,
    openModal,
    imageLoaded,
    setImageLoaded,
    closeModal,
    showModal,

    quantity,
    setQuantity,
    handleDecrement,
    handleIncrement,
    isplusDisable,
    isLoading,

    cartProductId,
    dispatch,
    setCartProductId,
    CartToast,
    showToast,
    isError,
  };
};
export default useCart;
