import {render, fireEvent} from '@testing-library/react-native';
import AnalyticsDatePicker from 'components/atoms/AnalyticsDatePicker';

import React from 'react';

test('should select the start data Button', () => {
  const startDate = new Date('2023-01-01');
  const endDate = new Date('2023-01-05');
  const onStartDateChange = jest.fn();
  const onEndDateChange = jest.fn();

  const {getByTestId, getByText} = render(
    <AnalyticsDatePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
    />,
  );
  const startdate = getByTestId('start-date-button');
  expect(startdate).toBeDefined();
  const startdateText = getByText('Jan 1, 2023');
  expect(startdateText).toBeDefined();
  const ModalButton = getByTestId('date-picker-modal');
  fireEvent.press(ModalButton);
});
test('should select the selectDate', () => {
  const startDate = null;

  const endDate = new Date('2023-01-05');
  const onStartDateChange = jest.fn();
  const onEndDateChange = jest.fn();
  const buttonStyle = {};
  const buttonTextColor = {};

  const {getByTestId, getByText} = render(
    <AnalyticsDatePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
      buttonStyle={buttonStyle}
      buttonTextColor={buttonTextColor}
    />,
  );
  const startdate = getByTestId('start-date-button');
  fireEvent.press(startdate);
  const updatedText = getByText('1');
  expect(updatedText).toBeDefined();
  expect(startdate).toBeDefined();
  const ModalButton = getByTestId('date-picker-modal');
  fireEvent.press(ModalButton);
  const startDateText = getByText('20');

  fireEvent.press(startDateText);

  const clearDates = getByTestId('clear-dates-button');
  fireEvent.press(clearDates);
});
test('should open toggle Picker ', () => {
  const startDate = new Date('2023-01-01');
  const endDate = null;
  const onStartDateChange = jest.fn();
  const onEndDateChange = jest.fn();
  const {getByTestId} = render(
    <AnalyticsDatePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
    />,
  );
  const togglePicker = getByTestId('end-date-button');
  expect(togglePicker).toBeDefined();
  fireEvent.press(togglePicker);

  // After pressing the toggle picker, the modal should be visible
  const visibleModal = getByTestId('done-button');
  fireEvent.press(visibleModal);
  expect(visibleModal).toBeDefined();
});
test('should clear the dates Picker ', () => {
  const startDate = new Date('2023-01-02');
  const endDate = new Date('2023-01-05');
  const onStartDateChange = jest.fn();
  const onEndDateChange = jest.fn();
  const {getByTestId} = render(
    <AnalyticsDatePicker
      startDate={startDate}
      endDate={endDate}
      onStartDateChange={onStartDateChange}
      onEndDateChange={onEndDateChange}
    />,
  );
  const togglePicker = getByTestId('end-date-button');
  expect(togglePicker).toBeDefined();
  fireEvent.press(togglePicker);

  // After pressing the toggle picker, the modal should be visible
  const visible = getByTestId('clear-dates');
  fireEvent.press(visible);
});
