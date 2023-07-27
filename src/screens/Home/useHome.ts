import {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {fetchUserProducts} from '../../redux/slice/userProductSlice';

import ApiService from '../../network/network';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from '../../constants/colors';
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
  const [pageNumber, setPageNumber] = useState(0);

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

  const searchProducts = async (query: any) => {
    try {
      const data = await ApiService.get(`/product/search?query=${query}`);
      navigation.navigate('SearchResultsScreen', {searchResults: data});
      setData(data);
      setOldDate(data);
      setSearchQuery('');
    } catch (error) {
      console.error(error);
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
    setIsLoading(true);
    dispatch(fetchUserProducts({pageNumber}) as any);
    setIsLoading(false);
    dispatch(getProfileData());
  }, [dispatch, pageNumber]);
  const onRefresh = async () => {
    setRefreshing(true);
    setRefreshing(false);
  };

  const wishlistremove = async (productId: any) => {
    dispatch(wishListRemove(productId) as any);
  };

  const handleEndReached = async () => {
    setPageNumber(pageNumber + 1);
    setProductsdata([...productsData, ...allProducts]);
    await inAppMessaging().setMessagesDisplaySuppressed(true);
  };

  const WishlistProducts = useSelector(
    (state: {WishlistProducts: {data: null[]}}) => state.WishlistProducts.data,
  );
  const loading = useSelector(
    (state: {UserProducts: {isLoader: null[]}}) => state.UserProducts.isLoader,
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
    handleEndReached,
    productsData,
    isLoading,
  };
};
export default useHome;
