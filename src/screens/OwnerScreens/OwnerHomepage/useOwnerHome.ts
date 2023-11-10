import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {fetchProducts} from '../../../redux/slice/productSlice';
import {useNavigation, useIsFocused} from '@react-navigation/native';

import {url} from '../../../constants/Apis';
import useAnalytics from '../AnalyticsPage/useAnalytics';
import ApiService from '../../../network/network';
import {StackNavigationProp} from '@react-navigation/stack';
import {recentyAddedUrl} from '../../../constants/apiRoutes';
import {logMessage, useThunkDispatch} from '../../../helpers/helper';

type RootStackParamList = {
  Additems: undefined;
  MyRentals: undefined;
  DashboardDetails: undefined;
};
const useOwnerHome = () => {
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(true);
  const [isloading, setisLoading] = useState(true);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [rentedItems, setRentedItems] = useState(0);
  const [recentyAdded, setRecentlyAdded] = useState([]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, setIsQuantity] = useState(true);
  const [isMinusDisabled, setIsMinusDisabled] = useState(true);
  const [isPlusDisabled, setIsPlusDisabled] = useState(false);

  const [outofStock, setOutofstock] = useState(false);
  const [Name, _setName] = useState('');
  const {log} = logMessage();

  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [rentedItemsPercentage, setRentedItemsPercentage] =
    useState(rentedItems);
  const [totalEarningsPercentage, setTotalEarningsPercentage] =
    useState(totalEarnings);
  const isFocused = useIsFocused();

  useEffect(() => {
    setRentedItemsPercentage(rentedItems);
    setTotalEarningsPercentage(totalEarnings);
  }, [rentedItems, totalEarnings]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshTrigger(prev => !prev);
    });
    return unsubscribe;
  }, [navigation]);

  const {dispatch} = useThunkDispatch();
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchProducts() as any);
    setRefreshing(false);
  };
  const {HandlePiechart} = useAnalytics();
  const name = useSelector(state => state.profileData.data);
  const fetchDashboardData = async () => {
    try {
      const response = await ApiService.get(`${url}/dashboard/owner-view`);

      setTotalEarnings(response.totalEarnings);
      setRentedItems(response.totalNumberOfItems);
    } catch (error) {
      log.error('Failed to fetch Dashboard Data');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefresh(!refresh);
    });
    return unsubscribe;
  }, [navigation, refresh]);
  const products = useSelector(
    (state: {products: {data: any[]}}) => state.products.data,
  );

  const handleAdditems = () => {
    navigation.navigate('Additems');
  };
  const handleMyrentals = () => {
    navigation.navigate('MyRentals');
  };
  const handleAnalatyics = () => {
    HandlePiechart();
    navigation.navigate('DashboardDetails');
  };

  const fetchRecentlyAdded = async () => {
    const result = await ApiService.get(recentyAddedUrl);
    setRecentlyAdded(result);
    setisLoading(false);
  };
  useEffect(() => {
    fetchRecentlyAdded();
  }, [isFocused]);

  return {
    products,
    handleAdditems,
    handleAnalatyics,
    handleMyrentals,

    setIsModalVisible,
    setIsMinusDisabled,
    setIsPlusDisabled,
    setIsQuantity,

    isModalVisible,
    isMinusDisabled,
    isPlusDisabled,

    name,
    isLoading,
    totalEarnings,
    rentedItems,
    refreshing,
    onRefresh,
    recentyAdded,

    outofStock,
    setOutofstock,
    refreshTrigger,
    rentedItemsPercentage,
    totalEarningsPercentage,
    Name,
    isloading,
    fetchRecentlyAdded,
  };
};
export default useOwnerHome;
