import {useEffect, useState, useContext} from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

import {
  fetchWishlistProducts,
  selectWishlistProductsData,
  selectWishlistProductsError,
  selectWishlistProductsLoading,
} from '../../../redux/slice/wishlistSlice';

import {wishListRemove} from '../../../redux/slice/wishlistRemoveSlice';
import {useThunkDispatch} from '../../../helpers/helper';
import Toast from 'react-native-toast-message';
const useWishlist = () => {
  const navigation = useNavigation();
  const {colorScheme} = useContext(ColorSchemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {dispatch} = useThunkDispatch();
  // Open the wishlist modal and fetch wishlist products
  const openModal = () => {
    dispatch(fetchWishlistProducts());
    setShowModal(true);
  };

  // Close the wishlist modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Remove a product from the wishlist and refresh the wishlist
  const wishlistremove = async (productId: any) => {
    dispatch(wishListRemove(productId) as any);
    openModal();
  };

  // Select wishlist products, error status, and loading status from the Redux store
  const WishlistProducts = useSelector(selectWishlistProductsData);
  const isError = useSelector(selectWishlistProductsError);
  const isLoading = useSelector(selectWishlistProductsLoading);

  // Display a toast message for wishlist error
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Error in wishlist cart',
    });
  };

  // Refresh the wishlist by fetching wishlist products
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchWishlistProducts());
    setRefreshing(false);
  };

  // Fetch wishlist products when the screen gains focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      return dispatch(fetchWishlistProducts() as any);
    });
    return unsubscribe;
  }, [dispatch, navigation]);

  // Fetch wishlist products on component mount
  useEffect(() => {
    dispatch(fetchWishlistProducts());
  }, [dispatch]);

  // Fetch wishlist products when the modal is closed
  useEffect(() => {
    if (!showModal) {
      dispatch(fetchWishlistProducts());
    }
  }, [dispatch, showModal]);

  // Display a toast message if there is an error in the wishlist
  if (isError) {
    showToast();
  }

  return {
    WishlistProducts,
    wishlistremove,
    refreshing,
    onRefresh,
    imageLoaded,
    setImageLoaded,
    closeModal,
    showModal,
    openModal,
    colorScheme,
    showToast,
    isError,
    isLoading,
  };
};
export default useWishlist;
