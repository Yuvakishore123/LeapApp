/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {FliterAnalyticslist} from '../../redux/slice/fliterAnalyticsDataSlice';
import {logMessage} from 'helpers/helper';

const useFilteredAnalytics = () => {
  const [chartData, setChartData] = useState<
    {month: string; rentalCost: number}[]
  >([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const {log} = logMessage();
  const response = useSelector(
    (state: {FliterAnalyticsData: {data: any}}) =>
      state.FliterAnalyticsData.data,
  );
  const [data, setData] = useState<{[key: string]: any[]}>({});

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();
      const item = {
        formattedStartDate: formattedStartDate,
        formattedEndDate: formattedEndDate,
      };
      dispatch(FliterAnalyticslist(item));
      setIsLoading(false);
    } catch (error) {
      log.error('error during fetching filtered analytics data ');
    } finally {
      setIsLoading(false);
    }
  };
  const handleChartData = () => {
    if (response !== null && response !== undefined) {
      const chartData = Object.entries(response).map(
        ([month, rentals]: [string, {rentalCost: number}[]]) => {
          let rentalCost = 0;
          if (Array.isArray(rentals)) {
            rentalCost = rentals.reduce(
              (total, rental) => total + rental.rentalCost,
              0,
            );
          }
          return {
            month,
            rentalCost,
          };
        },
      );
      setChartData(chartData);
    } else {
      console.error('error');
    }
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);
  useEffect(() => {
    handleChartData();
    setData(response);
  }, [response]);

  const generateKey = () => {
    return Math.random().toString(36);
  };

  return {
    chartData,
    data,
    isLoading,
    fetchData,
    generateKey,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    navigation,
    response,
    handleChartData,
    handleEndDateChange,
  };
};

export default useFilteredAnalytics;
