import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import notifee, {AndroidColor, AndroidImportance} from '@notifee/react-native';

import {
  Dashboardyearlydata,
  categoriyPiechart,
  getdashboard,
  pieChartUrl,
  url,
} from '../../constants/Apis';

import ApiService from '../../network/network';
import axios from 'axios';
import {onclickDasboardUrl} from '../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';
const useAnalytics = () => {
  const [Data, setData] = useState('');
  const [orderData, setOrderdata] = useState([]);
  const [piechart, setPiechart] = useState([]);
  const [CategoriesPiechart, setCategoriesData] = useState([]);
  const [loading, setisLoading] = useState(false);
  const [DashboardYearly, setDashboardYearlydata] = useState({});
  const handleAnalytics = async () => {
    setisLoading(true);
    try {
      const result = await ApiService.get(onclickDasboardUrl);
      setData(result);
      setisLoading(false);
    } catch (error) {
      logMessage.error('Error in handleAnaltyics', error);
      setisLoading(true);
    }
  };
  const handleOrders = async () => {
    const results = await ApiService.get(getdashboard);
    setOrderdata(results);
  };
  const HandlePiechart = async () => {
    const resultData = await ApiService.get(pieChartUrl);
    setPiechart(resultData);
  };

  const handleExportpdf = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${url}/pdf/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob',
      });
      const blob = response.data;
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).replace(
          /^data:.+;base64,/,
          '',
        );
        const filePath = `${RNFetchBlob.fs.dirs.DownloadDir}/report.pdf`;
        await RNFetchBlob.fs.writeFile(filePath, base64String, 'base64');
        logMessage.error('File downloaded successfully:', filePath);
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
        logMessage.error('Error reading file:', error);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      logMessage.error('Error downloading file:', error);
    }
  };

  const CategoriePieData = async () => {
    try {
      const results = await ApiService.get(categoriyPiechart);
      setCategoriesData(results);
    } catch (error) {
      logMessage.error(error);
    }
  };

  const Dashboardyeardata = async () => {
    try {
      const yearlyData = await ApiService.get(Dashboardyearlydata);
      setDashboardYearlydata(yearlyData);
    } catch (error) {
      logMessage.error('Error in Dashboardyearlydata', error);
    }
  };

  return {
    handleAnalytics,
    Data,
    handleOrders,
    orderData,
    loading,
    HandlePiechart,
    piechart,
    handleExportpdf,
    CategoriePieData,
    CategoriesPiechart,
    Dashboardyeardata,
    DashboardYearly,
  };
};

export default useAnalytics;
