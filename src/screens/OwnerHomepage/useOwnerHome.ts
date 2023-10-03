import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {fetchProducts} from '../../redux/slice/productSlice';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {url} from '../../constants/Apis';
import useAnalytics from '../AnalyticsPage/useAnalytics';
import ApiService from '../../network/network';
import {StackNavigationProp} from '@react-navigation/stack';
import {recentyAddedUrl} from '../../constants/apiRoutes';
import {logMessage, useThunkDispatch} from '../../helpers/helper';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';

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
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [rentedItems, setRentedItems] = useState(0);
  const [recentyAdded, setRecentlyAdded] = useState([]);
  const [productQuantity, setProductQuantity] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [, setIsQuantity] = useState(true);
  const [isMinusDisabled, setIsMinusDisabled] = useState(true);
  const [isPlusDisabled, setIsPlusDisabled] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [outofStock, setOutofstock] = useState(false);
  const [Name, setName] = useState('');

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
  const name = useSelector(
    (state: {profileData: {data: []}}) => state.profileData.data,
  );
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = await asyncStorageWrapper.getItem('token');
      try {
        const response = await fetch(`${url}/dashboard/owner-view`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const dashboardData = await response.json();
          setTotalEarnings(dashboardData.totalEarnings);
          setRentedItems(dashboardData.totalNumberOfItems);
        } else {
          throw new Error('Failed to fetch Dashboard Data');
        }
      } catch (error) {
        logMessage.error('error in fetching of dashboard data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);
  useEffect(() => {
    const fetchProfileData = async () => {
      const token = await asyncStorageWrapper.getItem('token');
      try {
        const response = await fetch(`${url}/user/getUser`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setIsLoading(false);
        if (response.ok) {
          const profileData = await response.json();
          setName(profileData.firstName);
        } else {
          logMessage.error('data not fetched in Ownerhomescreen');
        }
      } catch (error) {
        console.error(error);
        setIsLoading(true);
      }
    };
    fetchProfileData();
  }, [refresh]);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefresh(!refresh);
    });
    return unsubscribe;
  }, [navigation, refresh]);
  const products = useSelector(
    (state: {products: {data: any[]}}) => state.products.data,
  );

  const handleAnalatyics = () => {
    HandlePiechart();
    navigation.navigate('DashboardDetails');
  };

  const fetchRecentlyAdded = async () => {
    const result = await ApiService.get(recentyAddedUrl);
    setRecentlyAdded(result);
  };
  useEffect(() => {
    fetchRecentlyAdded();
  }, [isFocused]);

  return {
    products,
    handleAnalatyics,
    setRefreshing,
    setIsModalVisible,
    setIsMinusDisabled,
    setIsPlusDisabled,
    setIsQuantity,
    isModalVisible,
    isMinusDisabled,
    isPlusDisabled,
    productQuantity,
    name,
    isLoading,
    totalEarnings,
    rentedItems,
    refreshing,
    onRefresh,
    recentyAdded,
    selectedProductId,
    outofStock,
    setOutofstock,
    refreshTrigger,
    rentedItemsPercentage,
    totalEarningsPercentage,
    Name,
  };
};
export default useOwnerHome;
