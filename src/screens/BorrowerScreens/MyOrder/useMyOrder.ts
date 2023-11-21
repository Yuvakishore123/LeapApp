import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {
  fetchOrderProducts,
  selectOrderProductsData,
  selectOrderProductsLoading,
} from '../../../redux/slice/orderSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import notifee from '@notifee/react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {url} from '../../../constants/Apis';
import AsyncStorageWrapper from '../../../utils/asyncStorage';

interface Order {
  id: string;
  orderItems: any[];
}
type RootStackParamList = {
  Profile: undefined;
};

const useMyOrder = () => {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const orderData = useSelector(selectOrderProductsData);
  const OrderProducts = useSelector(selectOrderProductsData);
  const loading = useSelector(selectOrderProductsLoading);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(fetchOrderProducts());
    setRefreshing(false);
  };
  const handleProfile = () => {
    navigation.navigate('Profile');
  };
  useEffect(() => {
    dispatch(fetchOrderProducts());
  }, [dispatch]);

  const openModal = async (order: Order) => {
    setSelectedOrder(order);
    handleOrderDetails(order.id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchOrderData = async () => {
      setIsLoading(true);
      await dispatch(fetchOrderProducts());
      setIsLoading(false);
    };
    fetchOrderData();
  }, [dispatch]);

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };
  const showNotification = async () => {
    const channelId = await notifee.createChannel({
      id: 'pdf_download_channel1',
      name: 'PDF Download Channel1',
      sound: 'default',

      lights: true,
    });
    await notifee.displayNotification({
      title: 'Leaps',
      body: 'PDF file downloaded successfully.',
      android: {
        channelId,
        largeIcon: require('../../../../assets/Leaps-1.png'),

        progress: {
          max: 10,
          current: 10,
        },
      },
    });
  };
  const handleOrderDetails = async (orderId: string) => {
    try {
      const token = await AsyncStorageWrapper.getItem('token');

      const response = await axios.get(
        `${url}/order/generateInvoice/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        },
      );

      const blob = response.data;
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).replace(
          /^data:.+;base64,/,
          '',
        );
        const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/invoice.pdf`;
        await RNFetchBlob.fs.writeFile(filePath, base64String, 'base64');
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('An error occurred while fetching invoice details:', error);
    }
  };

  return {
    orderData,
    OrderProducts,
    showModal,
    refreshing,
    selectedOrder,
    isModalOpen,
    isLoading,
    onRefresh,
    openModal,
    closeModal,
    setShowModal,
    handleProfile,
    handleOrderDetails,
    loading,
    showNotification,
  };
};

export default useMyOrder;
