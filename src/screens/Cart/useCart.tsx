/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchCartProducts} from '../../redux/slice/cartSlice';

import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {ColorSchemeContext} from '../../../ColorSchemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {removefromCart} from '../../redux/slice/cartRemoveSlice';
import {updateCart} from '../../redux/slice/cartUpdateSlice';
import {logMessage} from 'helpers/helper';
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
  const {
    colorScheme,
    getPlaceholderTextColor,
    getContainerStyle,
    getTextColor,
    getTextInputStyle,
  } = useContext(ColorSchemeContext);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(fetchCartProducts as any);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const isLoading = useSelector(
    (state: {cartUpdate: {isLoader: boolean}}) => state.cartUpdate.isLoader,
  );
  const isError = useSelector(
    (state: {cartUpdate: {error: any}}) => state.cartUpdate.error,
  );

  const CartProducts = useSelector(
    (state: {CartProducts: {data: any}}) => state.CartProducts.data,
  ) || {
    cartItems: [],
  };

  const cartError = useSelector(
    (state: {CartProducts: {error: any}}) => state.CartProducts.error,
  );

  useEffect(() => {
    if (refreshing) {
      dispatch(fetchCartProducts() as any);
      setRefreshing(false);
    }
  }, [refreshing]);
  useEffect(() => {
    if (!showModal) {
      dispatch(fetchCartProducts() as any);
    }
  }, [showModal]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchCartProducts() as any);
    });
    return unsubscribe;
  }, [navigation, refreshing]);

  const handleUpdate = async (newQuantity: number, productId: string) => {
    try {
      const data = {
        productId: productId,
        quantity: newQuantity,
      };
      dispatch(updateCart(data) as any);
      setRefreshing(true);
    } catch (error) {
      logMessage.error('error in handleupdate', error);
    }
  };

  const handleCheckout = async () => {
    navigation.navigate('CheckoutScreen');
  };

  const handleRemove = async (productId: number) => {
    try {
      dispatch(removefromCart(productId) as any);
      dispatch(fetchCartProducts as any);
      openModal();
    } catch (error) {
      logMessage.error('error in handleremove', error);
    }
  };

  const handleIncrement = (item: any) => {
    const productId = item.product.id;
    setCartProductId(item.product.id);
    const productQuantity = item.product.availableQuantities;
    if (item.quantity === productQuantity) {
      setisButtondisable(true);
    } else {
      const Quantity = item.quantity + 1;
      logMessage.error(Quantity);
      handleUpdate(Quantity, productId);
    }
    setRefreshing(prevRefreshing => !prevRefreshing);
  };

  const handleDecrement = (item: any) => {
    const productId = item.product.id;
    setCartProductId(item.product.id);
    const newQuantity = item.quantity - 1;
    handleUpdate(newQuantity, productId);
    setisButtondisable(false);
  };
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
  if (isError) {
    showToast();
  }
  logMessage.error('CartError', cartError);
  if (cartError) {
    CartToast();
  }

  return {
    CartProducts,
    handleCheckout,
    handleRemove,
    refreshing,
    setRefreshing,
    setisButtondisable,
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
    colorScheme,
    quantity,
    setQuantity,
    handleDecrement,
    handleIncrement,
    isplusDisable,
    isLoading,
    getPlaceholderTextColor,
    getContainerStyle,
    getTextColor,
    getTextInputStyle,
    cartProductId,
    isError,
  };
};
export default useCart;
