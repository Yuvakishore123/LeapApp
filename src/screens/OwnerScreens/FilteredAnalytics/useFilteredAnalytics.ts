/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {
  FliterAnalyticslist,
  selectFilteredAnalyticsData,
} from '../../../redux/slice/fliterAnalyticsDataSlice';
import {logMessage} from 'helpers/helper';

const useFilteredAnalytics = () => {
  const [chartData, setChartData] = useState<
    {month: string; rentalCost: number}[]
  >([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  const {log} = logMessage();
  const response = useSelector(selectFilteredAnalyticsData);
  const [data, setData] = useState<{[key: string]: any[]}>({});

  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  // Function to fetch filtered analytics data based on date range
  const fetchData = async () => {
    try {
      setIsLoading(true);

      // Format start and end dates to ISO string
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();
      const item = {
        formattedStartDate: formattedStartDate,
        formattedEndDate: formattedEndDate,
      };

      // Dispatch action to filter analytics list
      dispatch(FliterAnalyticslist(item));
    } catch (error) {
      log.error('Error during fetching filtered analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle chart data based on the fetched response
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
      console.error('Error in handling chart data');
    }
  };

  // Function to handle the change in the end date and trigger data fetching
  const handleEndDateChange = (date: any) => {
    setEndDate(date);
    fetchData();
  };

  // Effect hook to fetch data when the component mounts or when start and end dates change
  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  // Effect hook to handle chart data and set response data when response changes
  useEffect(() => {
    handleChartData();
    setData(response);
  }, [response]);

  // Function to generate a unique key (used for rendering components with unique keys)
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
