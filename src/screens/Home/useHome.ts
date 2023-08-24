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
import {firebase} from '@react-native-firebase/messaging';
import {url} from '../../constants/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchWishlistProducts} from '../../redux/slice/wishlistSlice';
const useHome = () => {
  const {colorScheme} = useContext(ColorSchemeContext);
  const [refreshing, setRefreshing] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('Search');
  const [placeholderTextColor, setPlaceholderTextColor] = useState(
    colorScheme === 'dark' ? Colors.white : Colors.black,
  );
  const [pageNumber, setPageNumber] = useState(1);

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

  const onRefresh = async () => {
    setRefreshing(true);

    setRefreshing(false);
  };
  useEffect(() => {
    if (firebase?.apps.length === 0) {
      firebase.initializeApp({
        apiKey: 'AIzaSyCocxGzIbsJo6nAv62pM6CWdrP5JbkxbW0',
        authDomain: 'In-App Messaging.firebase.com',
        databaseURL:
          'https://in-app-messaging-feed0-default-rtdb.firebaseio.com/',
        projectId: 'in-app-messaging-feed0',
        storageBucket: 'in-app-messaging-feed0.appspot.com',
        messagingSenderId: '280824523367',
        appId: '1:280824523367:android:5d9cfd3fae3dc9e65b02c2',
      });
    }
    const storeFCMToken = async (Dtoken: string) => {
      try {
        await AsyncStorage.setItem('fcmToken', Dtoken);
        console.log('FCMtoken is stored', Dtoken);
      } catch (error) {
        console.log('Error storing FCM token:', error);
      }
    };
    const onTokenRefresh = async (DnewToken: string | null) => {
      try {
        const storedToken = await AsyncStorage.getItem('fcmToken');
        if (storedToken !== DnewToken) {
          await storeFCMToken(DnewToken);
          console.log('Refreshed FCM token:', DnewToken);
          await postRefreshedToken(DnewToken);
        }
      } catch (error) {
        console.log('Error handling FCM token refresh:', error);
      }
    };
    const postRefreshedToken = async (DnewToken: string | null) => {
      try {
        const response = await ApiService.post(
          `${url}/user/devicetoken?deviceToken=${DnewToken}`,
          DnewToken,
        );
        if (response) {
          console.log('FCM token stored in the backend.');
        } else {
          console.log('Failed to store FCM token in the backend.');
        }
      } catch (error) {
        console.log('Error storing FCM token in the backend:', error);
      }
    };
    const requestFCMPermission = async () => {
      try {
        await firebase.messaging().requestPermission();
        const Dtoken = await firebase.messaging().getToken();
        onTokenRefresh(Dtoken);
      } catch (error) {
        console.log('Error requesting FCM permission:', error);
      }
    };
    const backgroundMessageHandler = async (remoteMessage: string) => {
      console.log('FCM background message:', remoteMessage);
    };

    requestFCMPermission();
    firebase?.messaging().onTokenRefresh(onTokenRefresh);
    firebase?.messaging().setBackgroundMessageHandler(backgroundMessageHandler);
  }, []);

  const wishlistremove = async (productId: any) => {
    dispatch(wishListRemove(productId) as any);
  };

  const handleEndReached = async () => {
    setPageNumber(pageNumber + 1);
    setProductsdata([...productsData, ...allProducts]);
    dispatch(fetchUserProducts({pageNumber}) as any);
    await inAppMessaging().setMessagesDisplaySuppressed(true);
  };
  useEffect(() => {
    dispatch(fetchUserProducts({pageNumber}) as any);
    dispatch(getProfileData());
  }, [dispatch, pageNumber]);
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
  console.log('Loading', Loading);
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
