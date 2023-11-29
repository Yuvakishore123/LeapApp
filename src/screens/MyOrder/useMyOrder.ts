import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {fetchOrderProducts} from '../../redux/slice/orderSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import notifee from '@notifee/react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {url} from 'constants/Apis';
import {logMessage} from 'helpers/helper';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';
import {OrderproductReducer} from '../../../src/redux/slice/OwnerorderproductSlice';

interface Order {
  id: string;
  orderItems: any[];
}
type RootStackParamList = {
  Profile: undefined;
};
interface RootState {
  OrderProducts: OrderProductsState;
}

interface OrderProductsState {
  data: Order[];
}

const useMyOrder = () => {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const orderData = useSelector((state: RootState) => state.OrderProducts.data);
  const OrderProducts = useSelector(
    (state: RootState) => state.OrderProducts.data,
  );
  const [showModal, setShowModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const loading = useSelector(
    (state: {OrderProducts: {isLoader: boolean}}) =>
      state.OrderProducts.isLoader,
  );
  const invoiceData = useSelector(OrderproductReducer);
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
    });
    await notifee.displayNotification({
      title: 'Leaps',
      body: 'PDF file downloaded successfully.',
      android: {
        channelId,
        largeIcon: require('../../../assets/Leaps-1.png'),
        progress: {
          max: 10,
          current: 10,
        },
      },
    });
  };
  const handleOrderDetails = async (orderId: string) => {
    try {
      const token = await asyncStorageWrapper.getItem('token');
      logMessage.error('Monday ', orderId, token);
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
        logMessage.error('Invoice downloaded successfully:', filePath);
        // Push notification
      };
      reader.onerror = error => {
        logMessage.error('Error reading file:', error);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      logMessage.error(
        'An error occurred while fetching invoice details:',
        error,
      );
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
    setRefreshing,
    openModal,
    closeModal,
    setShowModal,
    handleProfile,
    handleOrderDetails,
    invoiceData,
    loading,
    showNotification,
  };
};

export default useMyOrder;
