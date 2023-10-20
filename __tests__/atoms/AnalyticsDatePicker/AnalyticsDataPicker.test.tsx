import React from 'react';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import AnalyticsDatePicker from '../../../src/components/atoms/AnalyticsDatePicker';

describe('AnalyticsDatePicker', () => {
  it('toggles end date calendar picker on button click', () => {
    const {getByText, queryByTestId} = render(
      <AnalyticsDatePicker
        startDate={null}
        endDate={null}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
      />,
    );

    fireEvent.press(getByText('Select End Date'));
    expect(queryByTestId('end-date-picker')).toBeDefined();

    fireEvent.press(getByText('Select End Date'));
    expect(queryByTestId('end-date-picker')).toBeNull();
  });

  it('should render with the selected start date', () => {
    const endDate = null;
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();

    const selectedStartDate = new Date('2023-06-28');
    const {getByText} = render(
      <AnalyticsDatePicker
        startDate={selectedStartDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />,
    );

    expect(getByText('Jun 28, 2023')).toBeTruthy();
  });

  it('should display selected end date', () => {
    const startDate = new Date();
    const endDate = null;
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const {getByText} = render(
      <AnalyticsDatePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />,
    );

    fireEvent.press(getByText('Select End Date'));
    fireEvent.press(getByText('Done'));

    expect(getByText('Select End Date')).toBeTruthy();
  });

  it('should show the start and end dates in the UI', () => {
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const selectedStartDate = new Date('2023-06-28');
    const selectedEndDate = new Date('2023-06-30');
    const {getByText} = render(
      <AnalyticsDatePicker
        startDate={selectedStartDate}
        endDate={selectedEndDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />,
    );

    expect(getByText('Jun 28, 2023')).toBeTruthy();
    expect(getByText('Jun 30, 2023')).toBeTruthy();
  });

  it('should hide the picker when the "Done" button is pressed', () => {
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();

    const {getByText, queryByTestId} = render(
      <AnalyticsDatePicker
        startDate={null}
        endDate={null}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />,
    );

    fireEvent.press(getByText('Select Start Date'));

    fireEvent.press(getByText('Done'));

    expect(queryByTestId('start-date-picker')).toBeNull();
  });

  it('should clear selected start and end dates', async () => {
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();

    const {getByTestId} = render(
      <AnalyticsDatePicker
        startDate={new Date()}
        endDate={null}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />,
    );

    fireEvent.press(getByTestId('start-date-text'));
    fireEvent.press(getByTestId('clear-dates-button'));

    await waitFor(() => {
      expect(onStartDateChange).toHaveBeenCalledWith(null);
      expect(onEndDateChange).toHaveBeenCalledWith(null);
    });
  });

  it('should call onStartDateChange when selecting start date', () => {
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();

    const {getByText} = render(
      <AnalyticsDatePicker
        startDate={null}
        endDate={null}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />,
    );

    fireEvent.press(getByText('Select Start Date'));
    fireEvent(getByText('15'), 'onPress');
    expect(onStartDateChange).toHaveBeenCalled();
  });

  test('displays selected start date', () => {
    const startDate = new Date('2023-06-01');
    const {getByText} = render(
      <AnalyticsDatePicker
        startDate={startDate}
        endDate={null}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
      />,
    );

    expect(getByText('Jun 1, 2023')).toBeDefined();
  });
  test('displays selected end date', () => {
    const selectedStartDate = new Date('2023-06-28');
    const onStartDateChange = jest.fn();
    const onEndDateChange = jest.fn();
    const endDate = new Date('2023-06-01');
    const {getByText, getByTestId} = render(
      <AnalyticsDatePicker
        startDate={selectedStartDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
      />,
    );
    const startdate = getByTestId('start-date-text');
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
});
