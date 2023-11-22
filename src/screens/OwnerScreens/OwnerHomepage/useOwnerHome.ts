import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  fetchProducts,
  selectProductsData,
} from '../../../redux/slice/productSlice';
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

  // Effect hook to update percentage values when rentedItems or totalEarnings change
  useEffect(() => {
    setRentedItemsPercentage(rentedItems);
    setTotalEarningsPercentage(totalEarnings);
  }, [rentedItems, totalEarnings]);

  // Effect hook to trigger a refresh when the screen is in focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshTrigger(prev => !prev);
    });
    return unsubscribe;
  }, [navigation]);

  // Custom hook to get the dispatch function from the Redux store
  const {dispatch} = useThunkDispatch();

  // Effect hook to fetch products data when the component mounts
  useEffect(() => {
    dispatch(fetchProducts() as any);
  }, [dispatch]);

  // Function to refresh the products data
  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchProducts() as any);
    setRefreshing(false);
  };

  // Custom hook to get analytics-related functions
  const {HandlePiechart} = useAnalytics();

  // Selector to get products data from the Redux store
  const name = useSelector(selectProductsData);
  const products = useSelector(selectProductsData);

  // Function to fetch dashboard data
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
  // Effect hook to fetch dashboard data when the component mounts
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Effect hook to refresh data when the screen is in focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefresh(!refresh);
    });
    return unsubscribe;
  }, [navigation, refresh]);

  // Function to navigate to the 'Additems' screen
  const handleAdditems = () => {
    navigation.navigate('Additems');
  };

  // Function to navigate to the 'MyRentals' screen
  const handleMyrentals = () => {
    navigation.navigate('MyRentals');
  };

  // Function to handle analytics and navigate to the 'DashboardDetails' screen
  const handleAnalatyics = () => {
    HandlePiechart();
    navigation.navigate('DashboardDetails');
  };

  // Function to fetch recently added items
  const fetchRecentlyAdded = async () => {
    const result = await ApiService.get(recentyAddedUrl);
    setRecentlyAdded(result);
    setisLoading(false);
  };
  // Effect hook to fetch recently added items when the component is focused
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
