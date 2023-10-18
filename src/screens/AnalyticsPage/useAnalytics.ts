import {useState} from 'react';

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
import AsyncStorageWrapper from '../..//utils/asyncStorage';

const useAnalytics = () => {
  const [showModel, setShowModel] = useState(false);
  const [selectedYear, setSelectedYear] = useState('');
  const [Data, setData] = useState('');
  const [orderData, setOrderdata] = useState([]);
  const [piechart, setPiechart] = useState([]);
  const [CategoriesPiechart, setCategoriesData] = useState([]);
  const [loading, setisLoading] = useState(false);
  const [DashboardYearly, setDashboardYearlydata] = useState({});
  const {log} = logMessage();
  const handleAnalytics = async () => {
    setisLoading(true);
    try {
      const result = await ApiService.get(onclickDasboardUrl); // need to chaange to dispatch
      setData(result);
      setisLoading(false);
    } catch (error) {
      setisLoading(true);
    }
  };
  const handleOrders = async () => {
    const results = await ApiService.get(getdashboard); // need to chaange to dispatch
    setOrderdata(results);
  };
  const HandlePiechart = async () => {
    const resultData = await ApiService.get(pieChartUrl); // need to chaange to dispatch
    setPiechart(resultData);
  };

  const handleExportpdf = async () => {
    try {
      const token = await AsyncStorageWrapper.getItem('token');
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

        // Push notification
        HandleNotification();
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      log?.error('Error downloading file:', error);
    }
  };
  const HandleNotification = async () => {
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
        // largeIcon: require('../../../assets/Leaps-1.png'),

        progress: {
          max: 10,
          current: 10,
        },
      },
    });
  };

  const CategoriePieData = async () => {
    try {
      const results = await ApiService.get(categoriyPiechart); // need to chaange to dispatch

      setCategoriesData(results);
    } catch (error) {
      log.error('error in fetching Piechart data');
    }
  };

  const Dashboardyeardata = async () => {
    try {
      const yearlyData = await ApiService.get(Dashboardyearlydata); // need to chaange to dispatch

      setDashboardYearlydata(yearlyData);
    } catch (error) {
      log.error('error in fetching yearly analytics data ');
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
    HandleNotification,
    log,
    setShowModel,
    showModel,
    selectedYear,
    setSelectedYear,
  };
};

export default useAnalytics;
