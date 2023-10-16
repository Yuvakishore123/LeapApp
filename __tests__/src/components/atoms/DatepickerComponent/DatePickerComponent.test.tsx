import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';

import moment from 'moment';
import DatePickerComponent from 'components/atoms/DatePickerComponent/DatepickerComponent';

describe('DatePickerComponent', () => {
  test('renders without errors', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-05');
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const buttonStyle = {};
    const buttonTextColor = {};

    render(
      <DatePickerComponent
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        buttonStyle={buttonStyle}
        buttonTextColor={buttonTextColor}
      />,
    );
  });

  test('selects start date', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-05');
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const buttonStyle = {};
    const buttonTextColor = {};

    const {queryByText, getByTestId} = render(
      <DatePickerComponent
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        buttonStyle={buttonStyle}
        buttonTextColor={buttonTextColor}
      />,
    );

    const startButton = getByTestId('start-date-button');
    fireEvent.press(startButton);

    const selectStartDateText = queryByText('Select Start Date');

    expect(selectStartDateText).toBeNull();
    const modalOpen = getByTestId('date-picker-modal');
    fireEvent.press(modalOpen);
    expect(modalOpen).toBeDefined();
  });
  test('selects end date', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-30');
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const buttonStyle = {};
    const buttonTextColor = {};

    const {queryByText, getByTestId} = render(
      <DatePickerComponent
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        buttonStyle={buttonStyle}
        buttonTextColor={buttonTextColor}
      />,
    );

    if (endDate) {
      const endButton = getByTestId('end-date-button');
      fireEvent.press(endButton);
      const selectEndDateText = queryByText('Select End Date');

      expect(selectEndDateText).toBeNull();
    } else {
      const selectEndDateText = queryByText('Select End Date');
      expect(selectEndDateText).toBe('Select End Date');
    }
  });
  it('should render the selected end date when it is defined', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-05');
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const buttonStyle = {};
    const buttonTextColor = {};
    const selectedEndDate = new Date('2023-01-05');
    const expectedDate = moment(selectedEndDate).format('MMM D, YYYY'); // Convert selectedEndDate to expected string format
    const {getByTestId} = render(
      <DatePickerComponent
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        buttonStyle={buttonStyle}
        buttonTextColor={buttonTextColor}
      />,
    );
    const selectedDateText = getByTestId('selected-date');
    if (!selectedDateText) {
      expect(selectedDateText).toBe('Select End Date');
    } else {
      expect(selectedDateText.props.children).toBe(expectedDate);
    }
  });
  it('should open the date picker modal when the button is pressed', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-05');
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const buttonStyle = {};
    const buttonTextColor = {};

    const {queryByText, getByTestId} = render(
      <DatePickerComponent
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        buttonStyle={buttonStyle}
        buttonTextColor={buttonTextColor}
      />,
    );

    const datePickerModal = getByTestId('date-picker-modal');
    expect(datePickerModal).toBeTruthy();
    fireEvent.press(datePickerModal);
  });
  test('should select the start data Button', () => {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-01-05');
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const buttonStyle = {};
    const buttonTextColor = {};

    const {getByTestId, getByText} = render(
      <DatePickerComponent
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        buttonStyle={buttonStyle}
        buttonTextColor={buttonTextColor}
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
    const selectedDate = 20;
    const endDate = new Date('2023-01-05');
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const buttonStyle = {};
    const buttonTextColor = {};

    const {getByTestId, getByText} = render(
      <DatePickerComponent
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

    const clearDates = getByTestId('clear-dates');
    fireEvent.press(clearDates);
  });
});
