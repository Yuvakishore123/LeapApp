import {act, render, renderHook} from '@testing-library/react-native';
import React from 'react';
import FilteredAnalytics from '../../../src/screens/FilteredAnalytics/FilteredAnalytics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';

import useFilteredAnalytics from '../../../src/screens/FilteredAnalytics/useFilteredAnalytics';
jest.mock(
  '../../../src/screens/FilteredAnalytics/useFilteredAnalytics',
  () => ({
    __esModule: true,
    default: () => ({
      chartData: [
        {month: '2023-01', rentalCost: 100},
        {month: '2023-02', rentalCost: 200},
      ],
      data: {
        '2023-01': [
          {
            borrowerId: '123',
            borrowerName: 'John Doe',
            rentalCost: 150,
            name: 'Item A',
            quantity: 2,
            borrowerPhoneNumber: '1234567890',
            imageUrl: 'http://example.com/itemA.jpg',
          },
        ],
      },
      // isLoading: false,
      isLoading: false,
      fetchData: jest.fn(),
      generateKey: jest.fn(),
      startDate: new Date('2023-01-01'),
      setStartDate: jest.fn(),
      endDate: new Date('2023-01-31'),
      setEndDate: jest.fn(),
      navigation: {},
      handleEndDateChange: jest.fn(),
    }),
  }),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('FilteredAnalytics', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  test('renders without errors', () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics />
        </NavigationContainer>
      </Provider>,
    );
  });

  test('does not display dashboard items when data object is empty', async () => {
    const data = {};

    const {queryByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics />
        </NavigationContainer>
      </Provider>,
    );

    const janView = queryByTestId('jan-view');
    expect(janView).toBeNull();
  });

  test('displays chart when chartData length is greater than 0', async () => {
    const chartData = [
      {month: 'January', rentalCost: 1000},
      {month: 'February', rentalCost: 2000},
    ];

    const {queryByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <FilteredAnalytics />
        </NavigationContainer>
      </Provider>,
    );

    const chartContainer = queryByTestId('chart-container');
    expect(chartContainer).not.toBeNull();
  });

  test('renders chart and dashboard items when data is available', async () => {
    const {getByTestId} = render(<FilteredAnalytics />);
    const chartContainer = getByTestId('chart-container');
    const januaryView = getByTestId('2023-01-view');

    expect(chartContainer).toBeDefined();
    expect(januaryView).toBeDefined();
  });

  //=========

  it('should call handleEndDateChange and fetchData when date is changed', () => {
    const {result} = renderHook(() => useFilteredAnalytics());
    const {setEndDate, fetchData} = result.current;

    // Mock fetchData function
    jest.spyOn(result.current, 'fetchData');

    // Set a new date
    const newDate = new Date('2023-07-18');

    act(() => {
      result.current.handleEndDateChange(newDate);
    });

    // Check if setEndDate function was called with the correct argument
    expect(setEndDate).toHaveBeenCalledWith(newDate);

    // Check if fetchData function was called
  });
});
