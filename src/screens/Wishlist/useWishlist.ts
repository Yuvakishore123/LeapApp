import {useEffect, useState, useContext} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

import {
  WishlistDataReducer,
  WishlistError,
  WishlistLoading,
  fetchWishlistProducts,
  wishlistDataReducer,
} from '../../redux/slice/wishlistSlice';

import {wishListRemove} from '../../redux/slice/wishlistRemoveSlice';
import {useThunkDispatch} from '../../helpers/helper';
import Toast from 'react-native-toast-message';
const useWishlist = () => {
  const navigation = useNavigation();
  const {colorScheme} = useContext(ColorSchemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {dispatch} = useThunkDispatch();
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const wishlistremove = async (productId: any) => {
    dispatch(wishListRemove(productId) as any);
  };
  const WishlistProducts = useSelector(wishlistDataReducer);
  const allWishlistProducts = useSelector(WishlistDataReducer);
  const isLoading = useSelector(WishlistLoading);
  const isError = useSelector(WishlistError);
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error in wislist cart',
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchWishlistProducts());
    setRefreshing(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      return dispatch(fetchWishlistProducts() as any);
    });
    return unsubscribe;
  }, [dispatch, navigation]);
  useEffect(() => {
    dispatch(fetchWishlistProducts());
  }, [dispatch]);
  useEffect(() => {
    if (!showModal) {
      dispatch(fetchWishlistProducts());
    }
  }, [dispatch, showModal]);
  if (isError) {
    showToast();
  }
  return {
    WishlistProducts,
    wishlistremove,
    showToast,
    refreshing,
    setRefreshing,
    onRefresh,
    allWishlistProducts,
    isError,
    isLoading,
    closeModal,
    showModal,
    openModal,
    colorScheme,
  };
};
export default useWishlist;
