import {useContext, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {fetchUserProducts} from '../../redux/slice/userProductSlice';
import {removeFromWishlist} from '../../redux/actions/actions';
import ApiService from '../../network/network';
import {url} from '../../constants/Apis';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Colors from '../../constants/colors';
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
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [Data, setData] = useState([]);
  const [oldData, setOldDate] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();

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
    dispatch(fetchUserProducts() as any);
  }, [dispatch]);
  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchUserProducts() as any);
    setRefreshing(false);
  };
  const removefromWishlist = async (productId: any) => {
    console.log('chiranjeevi', productId);
    try {
      const response = await ApiService.delete(
        `${url}/wishlist/remove?productId=${productId}`,
      );
      dispatch(removeFromWishlist(productId));
      openModal();
      console.log(response);
    } catch (error) {
      console.log(' error is here ', error);
    }
  };

  const WishlistProducts = useSelector(
    (state: {WishlistProducts: {data: null[]}}) => state.WishlistProducts.data,
  );
  const loading = useSelector(
    (state: {UserProducts: {isLoader: null[]}}) => state.UserProducts.isLoader,
  );
  console.log(JSON.stringify(WishlistProducts));
  return {
    WishlistProducts,
    onRefresh,
    refreshing,
    removefromWishlist,
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
  };
};
export default useHome;
