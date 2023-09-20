import {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {fetchUserProducts} from '../../redux/slice/userProductSlice';

import ApiService from 'network/network';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from 'constants/colors';
import {wishListRemove} from '../../redux/slice/wishlistRemoveSlice';
import {getProfileData} from '../../redux/slice/profileDataSlice';
import {
  logMessage,
  useNavigationProp,
  useThunkDispatch,
} from '../../helpers/helper';
import inAppMessaging from '@react-native-firebase/in-app-messaging';

const useHome = () => {
  const {colorScheme} = useContext(ColorSchemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [placeholderText, _setPlaceholderText] = useState('Search');
  const [placeholderTextColor, _setPlaceholderTextColor] = useState(
    colorScheme === 'dark' ? Colors.white : Colors.black,
  );
  const [pageError, setError] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [productsData, setProductsdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [Data, setData] = useState([]);
  const [oldData, setOldDate] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const {dispatch} = useThunkDispatch();
  const {navigation} = useNavigationProp();
  const name = useSelector(
    (state: {profileData: {data: []}}) => state.profileData.data,
  );
  const allProducts = useSelector(
    (state: {UserProducts: {data: []}}) => state.UserProducts.data,
  );
  const IsError = useSelector(
    (state: {UserProducts: {isError: null}}) => state.UserProducts.isError,
  );
  const searchProducts = async (query: any) => {
    try {
      const data = await ApiService.get(`/product/search?query=${query}`);
      navigation.navigate('SearchResultsScreen', {searchResults: data});
      setData(data);
      setOldDate(data);
      setSearchQuery('');
    } catch (error) {
      setError('Something went wrong. Please try again.');
    }
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch, pageSize]);
  const onRefresh = async () => {
    setRefreshing(true);

    setRefreshing(false);
  };

  const wishlistremove = async (productId: any) => {
    try {
      await dispatch(wishListRemove(productId) as any);
      setError(''); // Clear any previous errors on success
    } catch (error) {
      setError('Something went wrong. Please try again.');
      logMessage.error(error);
    }
  };

  const handleEndReached = async () => {
    setPageSize(pageSize + 10);
    setProductsdata([...productsData, ...allProducts]);
    dispatch(fetchUserProducts({pageSize}) as any);
    await inAppMessaging().setMessagesDisplaySuppressed(true);
  };
  useEffect(() => {
    dispatch(fetchUserProducts({pageSize}) as any);
    dispatch(getProfileData());
  }, [dispatch, pageSize]);
  const WishlistProducts = useSelector(
    (state: {WishlistProducts: {data: null[]}}) => state.WishlistProducts.data,
  );
  const loading = useSelector(
    (state: {UserProducts: {firstCallLoading: boolean}}) =>
      state.UserProducts.firstCallLoading,
  );
  return {
    WishlistProducts,
    onRefresh,
    refreshing,
    name,
    searchQuery,
    searchResults,
    setSearchResults,
    searchProducts,
    setSearchQuery,
    placeholderText,
    placeholderTextColor,
    loading,
    openModal,
    closeModal,
    showModal,
    Data,
    oldData,
    wishlistremove,
    allProducts,
    pageError,
    IsError,
    handleEndReached,
    productsData,
  };
};
export default useHome;
