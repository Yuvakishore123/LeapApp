import {useEffect, useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {ColorSchemeContext} from '../../../ColorSchemeContext';

import {fetchWishlistProducts} from '../../redux/slice/wishlistSlice';

import {wishListRemove} from '../../redux/slice/wishlistRemoveSlice';
const useWishlist = () => {
  const navigation = useNavigation();
  const {colorScheme} = useContext(ColorSchemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const wishlistremove = async (productId: any) => {
    dispatch(wishListRemove(productId) as any);
  };
  const WishlistProducts = useSelector(
    (state: {WishlistProducts: {data: null[]}}) => state.WishlistProducts.data,
  );
  console.log(JSON.stringify(WishlistProducts));
  console.log('wishlist succes');
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchWishlistProducts() as any);
    setRefreshing(false);
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      return dispatch(fetchWishlistProducts() as any);
    });
    return unsubscribe;
  }, [dispatch, navigation]);
  useEffect(() => {
    dispatch(fetchWishlistProducts() as any);
  }, [dispatch]);
  useEffect(() => {
    if (!showModal) {
      dispatch(fetchWishlistProducts() as any);
    }
  }, [dispatch, showModal]);
  return {
    WishlistProducts,
    wishlistremove,
    refreshing,
    onRefresh,
    closeModal,
    showModal,
    openModal,
    colorScheme,
  };
};
export default useWishlist;
