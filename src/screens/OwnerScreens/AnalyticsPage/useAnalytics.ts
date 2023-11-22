import {useState} from 'react';

import RNFetchBlob from 'rn-fetch-blob';
import notifee from '@notifee/react-native';

import {
  Dashboardyearlydata,
  categoriyPiechart,
  getdashboard,
  pieChartUrl,
  url,
} from '../../../constants/Apis';

import ApiService from '../../../network/network';
import axios from 'axios';
import {onclickDasboardUrl} from '../../../constants/apiRoutes';
import {logMessage} from 'helpers/helper';
import AsyncStorageWrapper from '../../../utils/asyncStorage';

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
  // Function to handle analytics data retrieval
  const handleAnalytics = async () => {
    setisLoading(true);
    try {
      const result = await ApiService.get(onclickDasboardUrl);
      setData(result);
      setisLoading(false);
    } catch (error) {
      setisLoading(true);
    }
  };

  // Function to handle orders data retrieval
  const handleOrders = async () => {
    const results = await ApiService.get(getdashboard);
    setOrderdata(results);
  };

  // Function to handle pie chart data retrieval
  const HandlePiechart = async () => {
    const resultData = await ApiService.get(pieChartUrl);
    setPiechart(resultData);
  };

  // Function to handle PDF export and push notification
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

        // Trigger push notification
        HandleNotification();
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      log?.error('Error downloading file:', error);
    }
  };

  // Function to handle push notification for PDF download
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
        progress: {
          max: 10,
          current: 10,
        },
      },
    });
  };

  // Function to fetch category pie chart data
  const CategoriePieData = async () => {
    try {
      const results = await ApiService.get(categoriyPiechart);
      setCategoriesData(results);
    } catch (error) {
      log.error('Error in fetching Piechart data');
    }
  };

  // Function to fetch yearly data for the dashboard
  const Dashboardyeardata = async () => {
    try {
      const yearlyData = await ApiService.get(Dashboardyearlydata);
      setDashboardYearlydata(yearlyData);
    } catch (error) {
      log.error('Error in fetching yearly analytics data');
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
