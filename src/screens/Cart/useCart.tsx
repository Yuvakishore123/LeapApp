/* eslint-disable react-hooks/exhaustive-deps */
import {useContext, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  cartProductsreducer,
  fetchCartProducts,
} from '../../redux/slice/CartSlice';

import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {ColorSchemeContext} from '../../../ColorSchemeContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {removefromCart} from '../../redux/slice/CartRemoveSlice';
import {
  cartupdateerrorReducer,
  cartupdateloadingReducer,
  updateCart,
} from '../../redux/slice/CartUpdateSlice';
import {logMessage} from 'helpers/Helper';
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
  const isLoading = useSelector(cartupdateloadingReducer);
  const isError = useSelector(cartupdateerrorReducer);

  const CartProducts = useSelector(cartProductsreducer) || {
    cartItems: [],
  };

  const cartError = useSelector(cartupdateerrorReducer);

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
    const data = {
      productId: productId,
      quantity: newQuantity,
    };
    dispatch(updateCart(data) as any);
    setRefreshing(true);
  };

  const handleCheckout = async () => {
    navigation.navigate('CheckoutScreen');
  };

  const handleRemove = async (productId: number) => {
    dispatch(removefromCart(productId) as any);
    dispatch(fetchCartProducts as any);
    openModal();
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
    cartError,
    CartToast,
    isError,
    showToast,
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
  };
};
export default useCart;
