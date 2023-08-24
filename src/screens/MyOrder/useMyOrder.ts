import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {fetchOrderProducts} from '../../redux/slice/orderSlice';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import notifee, {AndroidImportance, AndroidColor} from '@notifee/react-native';
import RNFetchBlob from 'rn-fetch-blob';
import {url} from '../../constants/Apis';

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
    (state: {OrderProducts: {isLoader: Boolean}}) =>
      state.OrderProducts.isLoader,
  );
  const invoiceData = useSelector(
    (state: {OrderProducts: {data: []}}) => state.OrderProducts.data,
  );
  console.log('invoiceData', invoiceData);
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
    console.log('openModal Id ', order.id);
    setSelectedOrder(order);
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
  const handleOrderDetails = async (orderId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Monday ', orderId, token);
      const response = await axios.get(
        `${url}/order/generateInvoice/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        },
      );
      console.log('Response:', response);
      console.log('Response status:', response.status);
      console.log('Response content type:', response.headers['content-type']);
      const blob = response.data;
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).replace(
          /^data:.+;base64,/,
          '',
        );
        const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/invoice.pdf`;
        await RNFetchBlob.fs.writeFile(filePath, base64String, 'base64');
        console.log('Invoice downloaded successfully:', filePath);
        // Push notification
        const channelId = await notifee.createChannel({
          id: 'pdf_download_channel1',
          name: 'PDF Download Channel1',
          sound: 'default',
          importance: AndroidImportance.HIGH,
          lights: true,
          lightColor: AndroidColor.RED,
        });
        await notifee.displayNotification({
          title: 'Leaps',
          body: 'PDF file downloaded successfully.',
          android: {
            channelId,
            largeIcon: require('../../../assets/Leaps-1.png'),
            lights: [AndroidColor.RED, 300, 600],
            progress: {
              max: 10,
              current: 10,
            },
          },
        });
      };
      reader.onerror = error => {
        console.log('Error reading file:', error);
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
  };
};

export default useMyOrder;
