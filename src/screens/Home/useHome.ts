import {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {fetchUserProducts} from '../../redux/slice/userProductSlice';

import ApiService from 'network/network';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from 'constants/colors';
import {wishListRemove} from '../../redux/slice/wishlistRemoveSlice';
import {getProfileData} from '../../redux/slice/profileDataSlice';
import {useNavigationProp, useThunkDispatch} from '../../helpers/helper';
import inAppMessaging from '@react-native-firebase/in-app-messaging';

const useHome = () => {
  const {colorScheme} = useContext(ColorSchemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('Search');
  const [placeholderTextColor, setPlaceholderTextColor] = useState(
    colorScheme === 'dark' ? Colors.white : Colors.black,
  );
  // const [pageNumber, setPageNumber] = useState(0);
  const [Error, setError] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [productsData, setProductsdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [Data, setData] = useState([]);
  const [oldData, setOldDate] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {dispatch} = useThunkDispatch();
  const {navigation} = useNavigationProp();
  const name = useSelector(state => state.profileData.data);
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
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPlaceholderText(prevText =>
  //       prevText === 'Search by Brands'
  //         ? 'Search Products'
  //         : 'Search by Brands',
  //     );
  //   }, 4000);

  //   return () => clearInterval(interval);
  // }, []);
  // useEffect(() => {
  //   setPlaceholderTextColor(
  //     colorScheme === 'dark' ? Colors.white : Colors.black,
  //   );
  // }, [colorScheme, placeholderText]);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    // setIsLoading(true);
    // dispatch(fetchUserProducts({pageSize}) as any)
    //   .then(() => {
    //     setIsLoading(false);
    //     setError(''); // Clear any previous errors on success
    //   })
    //   .catch(error => {
    //     setIsLoading(false);
    //     setError('Something went wrong. Please try again.');
    //     console.error(error);
    //   });
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
      console.error(error);
    }
  };

  const handleEndReached = async () => {
    // setPageNumber(pageNumber + 1);
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
  const Loading = useSelector(
    (state: {UserProducts: {loading: boolean}}) => state.UserProducts.loading,
  );
  console.log('Loading and first loading is ', Loading, loading);
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
    Error,
    IsError,
    handleEndReached,
    productsData,
    isLoading,
  };
};
export default useHome;
