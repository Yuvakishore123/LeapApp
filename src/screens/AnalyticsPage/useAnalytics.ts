/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {SetStateAction, useEffect, useState} from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import notifee from '@notifee/react-native';

import {
  Dashboardyearlydata,
  categoriyPiechart,
  getdashboard,
  pieChartUrl,
  url,
} from '../../constants/Apis';

import ApiService from '../../network/Network';
import axios from 'axios';
import Colors from '../../constants/Colors';
import {onclickDasboardUrl} from '../../constants/ApiRoutes';
import {logMessage} from 'helpers/Helper';
import asyncStorageWrapper from 'constants/AsyncStorageWrapper';
const useAnalytics = () => {
  const [Data, setData] = useState('');
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const [orderData, setOrderdata] = useState([]);
  const [piechart, setPiechart] = useState([]);
  const [CategoriesPiechart, setCategoriesData] = useState([]);
  const [loading, setisLoading] = useState(false);
  const [DashboardYearly, setDashboardYearlydata] = useState([]);
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
    const token = await asyncStorageWrapper.getItem('token');
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
    reader.onerror = error => {
      logMessage.error('Error reading file:', error);
    };
    reader.readAsDataURL(blob);
  };

  const CategoriePieData = async () => {
    const results = await ApiService.get(categoriyPiechart);
    setCategoriesData(results);
  };

  const Dashboardyeardata = async () => {
    try {
      const yearlyData = await ApiService.get(Dashboardyearlydata);
      setDashboardYearlydata(yearlyData);
    } catch (error) {
      logMessage.error('error in DashboardYearly');
    }
  };
  const [showModel, setShowModel] = useState(false);
  const [selectedBarIndex, setSelectedBarIndex] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(
    `${new Date().getFullYear()}-${(new Date().getMonth() + 1)
      .toString()
      .padStart(2, '0')}`,
  );
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalNumberOfItems, settotalNumberOfItems] = useState(0);

  const [monthtitle, setmonthtitle] = useState(
    monthNames[new Date().getMonth()],
  );
  const [selectedYear, setSelectedYear] = useState('');
  useEffect(() => {
    handleAnalytics();
    HandlePiechart();
    Dashboardyeardata();
    filterOrderData();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentMonthFormatted = `${currentDate.getFullYear()}-${(
      currentMonth + 1
    )
      .toString()
      .padStart(2, '0')}`;
    setSelectedMonth(currentMonthFormatted);
    const selectedBarIndex = rentalData.findIndex(
      data => data.month === monthNames[currentMonth],
    );
    setSelectedBarIndex(selectedBarIndex as any);
  }, []);
  const years = Object.keys(DashboardYearly);
  const handleTotalOrdersClick = () => {
    setShowModel(true);
  };
  const filterOrderData = () => {
    const filteredOrderData = [] as any;
    Object.keys(orderData).forEach(month => {
      if (month === selectedMonth) {
        filteredOrderData[month] = orderData[month as any];
      }
    });
    handleOrders();
  };
  const handleVisibleModal = () => {
    setShowModel(!showModel);
    filterOrderData();
  };

  const rentalData = monthNames.map(month => {
    const monthIndex = monthNames.indexOf(month);
    const formattedMonth = `${selectedYear}-${String(monthIndex + 1).padStart(
      2,
      '0',
    )}`;

    const monthData = DashboardYearly[selectedYear as any]?.[
      formattedMonth
    ] || {
      totalEarnings: 0,
      totalNumberOfItems: 0,
    };

    return {
      month: month,
      totalEarnings: monthData.totalEarnings,
      totalNumberOfItems: monthData.totalNumberOfItems,
      monthIndex: monthIndex,
    };
  });

  if (selectedYear && DashboardYearly[selectedYear as any]) {
    Object.entries(DashboardYearly[selectedYear as any]).forEach(
      ([month, data]) => {
        const monthIndex = parseInt(month.split('-')[1]) - 1;
        rentalData[monthIndex] = {
          month: month.split('-')[0],
          totalEarnings: data.totalEarnings,
          totalNumberOfItems: data.totalNumberOfItems,
          monthIndex: monthIndex,
        };
      },
    );
  }

  const handleBarClick = (
    event: any,
    barData: {datum: {month: any}; index: SetStateAction<null>},
  ) => {
    const selectedMonth = barData.datum.month;
    const selectedMonthIndex =
      monthNames.indexOf(monthNames[selectedMonth]) + 1;
    const selectedYearFormatted = selectedYear.toString();
    const formattedMonth = `${selectedYearFormatted}-${String(
      selectedMonthIndex,
    ).padStart(2, '0')}`;

    setSelectedMonth(formattedMonth);
    setSelectedBarIndex(barData.index);

    const selectedMonthData =
      DashboardYearly[selectedYearFormatted as any]?.[formattedMonth];

    if (selectedMonthData) {
      const {totalEarnings, totalNumberOfItems} = selectedMonthData;
      setTotalEarnings(totalEarnings);
      settotalNumberOfItems(totalNumberOfItems);
    }
    setmonthtitle(monthNames[selectedMonth]);

    filterOrderData();
  };

  const getBarColor = (datum: {index: any}) => {
    if (datum.index === selectedBarIndex) {
      return Colors.buttonColor; // Color for the selected bar
    }
    return '#eadaff'; // Color for other bars
  };

  const pieChartData = piechart?.[selectedMonth as any] ?? {};

  const chartColors = [
    '#594AB5',
    '#E28B5E',
    '#7CB9E8',
    '#B5E8A1',
    '#F1C5D4',
    '#F5D96C',
    '#B6A2D3',
    '#7F8FA6',
    '#E8DAEF',
    '#D2B4DE',
  ];
  const transformedData = Object.entries(pieChartData).map(
    ([subcategory, {totalOrders}], index) => ({
      name: subcategory,
      value: totalOrders,
      color: chartColors[index % chartColors.length],
    }),
  );

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
    setShowModel,
    DashboardYearly,
    transformedData,
    getBarColor,
    handleBarClick,
    handleVisibleModal,
    handleTotalOrdersClick,
    filterOrderData,
    setTotalEarnings,
    settotalNumberOfItems,
    years,
    totalEarnings,
    setSelectedMonth,
    totalNumberOfItems,
    selectedBarIndex,
    selectedMonth,
    selectedYear,
    monthtitle,
    setmonthtitle,
    setSelectedYear,
    setSelectedBarIndex,
    rentalData,
    showModel,
  };
};

export default useAnalytics;
