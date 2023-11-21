import {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {
  fetchUserProducts,
  selectUserFirstLoading,
  selectUserLoading,
  selectUserProductsData,
  selectUserProductsError,
} from '../../../redux/slice/userProductSlice';

import ApiService from 'network/network';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import Colors from 'constants/colors';
import {wishListRemove} from '../../../redux/slice/wishlistRemoveSlice';
import {
  getProfileData,
  selectprofileData,
} from '../../../redux/slice/profileDataSlice';
import {useNavigationProp, useThunkDispatch} from '../../../helpers/helper';
import {selectWishlistProductsData} from 'src/redux/slice/wishlistSlice';

const useHome = () => {
  const {colorScheme} = useContext(ColorSchemeContext);

  const [placeholderText, _setPlaceholderText] = useState('Search');
  const [placeholderTextColor, _setPlaceholderTextColor] = useState(
    colorScheme === 'dark' ? Colors.white : Colors.black,
  );
  const [imageLoaded, setImageLoaded] = useState(false);
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
  const name = useSelector(selectprofileData);
  const allProducts = useSelector(selectUserProductsData);
  const IsError = useSelector(selectUserProductsError);
  const WishlistProducts = useSelector(selectWishlistProductsData);
  const loading = useSelector(selectUserFirstLoading);
  const Loading = useSelector(selectUserLoading);

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

  const wishlistremove = async (productId: any) => {
    await dispatch(wishListRemove(productId) as any);
    setError(''); // Clear any previous errors on success
  };

  const handleEndReached = async () => {
    setPageSize(pageSize + 10);
    setProductsdata([...productsData, ...allProducts]);
    dispatch(fetchUserProducts({pageSize}) as any);
  };
  useEffect(() => {
    dispatch(fetchUserProducts({pageSize}) as any);
    dispatch(getProfileData());
  }, [dispatch, pageSize]);

  return {
    WishlistProducts,

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
    Loading,
    imageLoaded,
    setImageLoaded,
    navigation,
    wishlistList,
    setWishlistList,
  };
};
export default useHome;
