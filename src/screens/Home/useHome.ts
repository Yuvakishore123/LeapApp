import {useContext, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {fetchUserProducts} from '../../redux/slice/userProductSlice';

import ApiService from '../../network/network';
import {url} from '../../constants/Apis';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from '../../constants/colors';
import {wishListRemove} from '../../redux/slice/wishlistRemoveSlice';
import {getProfileData} from '../../redux/slice/profileDataSlice';

type RootStackParamList = {
  SearchResultsScreen: {searchResults: null[]};
};
const useHome = () => {
  const {colorScheme} = useContext(ColorSchemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('Search');
  const [placeholderTextColor, setPlaceholderTextColor] = useState(
    colorScheme === 'dark' ? Colors.white : Colors.black,
  );
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [Data, setData] = useState([]);
  const [oldData, setOldDate] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const name = useSelector(state => state.profileData.data);
  const allProducts = useSelector(
    (state: {UserProducts: {data: null[]}}) => state.UserProducts.data,
  );

  const searchProducts = async (query: any) => {
    try {
      const data = await ApiService.get(`${url}/product/search?query=${query}`);
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
    dispatch(fetchUserProducts({pageNumber, pageSize}) as any);
    dispatch(getProfileData() as any);
  }, [dispatch, pageNumber, pageSize]);
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchUserProducts({pageNumber, pageSize}) as any);
    setRefreshing(false);
  };

  const wishlistremove = async (productId: any) => {
    dispatch(wishListRemove(productId) as any);
  };
  const handlePages = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };
  const handleEndReached = () => {
    const nextPageNumber = pageNumber + 1;
    handlePaginationChange(nextPageNumber, pageSize);
  };

  const handlePaginationChange = (
    newPageNumber: number,
    newPageSize: number,
  ) => {
    setPageNumber(newPageNumber);
    setPageSize(newPageSize);
  };
  useEffect(() => {
    dispatch(fetchUserProducts({pageNumber, pageSize}));
  }, [dispatch, pageNumber, pageSize]);

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
    handlePages,
    allProducts,
    handleEndReached,
    handlePaginationChange,
    pageSize,
  };
};
export default useHome;
