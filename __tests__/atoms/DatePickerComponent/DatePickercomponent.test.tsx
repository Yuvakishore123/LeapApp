import React from 'react';
import {render, fireEvent, act} from '@testing-library/react-native';
import DatePickerComponent from '../../../src/components/atoms/DatePickerComponent/DatepickerComponent';
import moment from 'moment';

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
  test('handles onDate change', () => {
    const startDate = null;
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
    const startbutton = getByTestId('start-date-button');
    act(() => {
      fireEvent.press(startbutton);
    });
    const selecttext = getByText('20');
    expect(selecttext).toBeDefined();
    const modal = getByTestId('date-picker-modal');
    act(() => {
      fireEvent.press(selecttext);
      fireEvent.press(modal);
      fireEvent.press(getByTestId('clear-dates'));
    });
    expect(getByTestId('Done')).toBeDefined();
    expect(getByTestId('clear-dates')).toBeDefined();
  });
});
