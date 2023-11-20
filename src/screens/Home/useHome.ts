import {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {
  UserProductsErrorReducer,
  UserProductsLoading,
  UserProductsreducer,
  fetchUserProducts,
} from '../../redux/slice/UserProductSlice';

import ApiService from 'network/Network';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from 'constants/Colors';
import {wishListRemove} from '../../redux/slice/WishlistRemoveSlice';
import {
  getProfileData,
  profiledatareducer,
} from '../../redux/slice/ProfileDataSlice';
import {
  logMessage,
  useNavigationProp,
  useThunkDispatch,
} from '../../helpers/Helper';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import {WishlistdataReducer} from '../../../src/redux/slice/WishlistSlice';

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
  const [wishlistList, setWishlistList] = useState<string[]>([]);

  const {dispatch} = useThunkDispatch();
  const {navigation} = useNavigationProp();
  const name = useSelector(profiledatareducer);
  const allProducts = useSelector(UserProductsreducer);
  const IsError = useSelector(UserProductsErrorReducer);
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
    await dispatch(wishListRemove(productId) as any);
    setError(''); // Clear any previous errors on success
  };

  const handleEndReached = async () => {
    setPageSize(pageSize + 10);
    if (Array.isArray(allProducts)) {
      setProductsdata([...productsData, ...allProducts]);
    } else {
      logMessage.error('allProducts is not an array:', allProducts);
    }
    dispatch(fetchUserProducts({pageSize}) as any);
    await inAppMessaging().setMessagesDisplaySuppressed(true);
  };
  useEffect(() => {
    dispatch(fetchUserProducts({pageSize}) as any);
    dispatch(getProfileData());
  }, [dispatch, pageSize]);
  const WishlistProducts = useSelector(WishlistdataReducer);
  const loading = useSelector(UserProductsLoading);
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
    setWishlistList,
    wishlistList,
    loading,
    openModal,
    setRefreshing,
    closeModal,
    showModal,
    Data,
    oldData,
    Error,
    pageSize,
    wishlistremove,
    allProducts,
    pageError,
    IsError,
    handleEndReached,
    productsData,
  };
};
export default useHome;
