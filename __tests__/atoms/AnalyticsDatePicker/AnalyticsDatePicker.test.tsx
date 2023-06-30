import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import AnalyticsDatePicker from '../../../src/components/atoms/AnalyticsDatePicker';

describe('AnalyticsDatePicker', () => {
  it('should call setSelectedEndDate and onEndDateChange when type is "END_DATE"', () => {
    const onEndDateChange = jest.fn();
    const {getByTestId} = render(
      <AnalyticsDatePicker
        startDate={new Date()}
        endDate={new Date()}
        onStartDateChange={() => {}}
        onEndDateChange={onEndDateChange}
      />,
    );

    const date = new Date('2023-06-29');
    const endDateButton = getByTestId('end-date-button'); // Updated to use the correct test ID
    fireEvent.press(endDateButton);
    fireEvent(date);

    expect(setSelectedEndDate).toHaveBeenCalledWith(date);
    expect(onEndDateChange).toHaveBeenCalledWith(date);
  });

  it('displays selected start date', () => {
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

  it('displays selected end date', () => {
    const endDate = new Date('2023-06-30');
    const {getByText} = render(
      <AnalyticsDatePicker
        startDate={null}
        endDate={endDate}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
      />,
    );

    expect(getByText('Jun 30, 2023')).toBeDefined();
  });

  it('displays "Select Start Date" when no start date is selected', () => {
    const {getByText} = render(
      <AnalyticsDatePicker
        startDate={null}
        endDate={null}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
      />,
    );

    expect(getByText('Select Start Date')).toBeDefined();
  });

  it('displays "Select End Date" when no end date is selected', () => {
    const {getByText} = render(
      <AnalyticsDatePicker
        startDate={null}
        endDate={null}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
      />,
    );

    expect(getByText('Select End Date')).toBeDefined();
  });

  it('toggles start date calendar picker on button click', () => {
    const {getByText, queryByTestId} = render(
      <AnalyticsDatePicker
        startDate={null}
        endDate={null}
        onStartDateChange={() => {}}
        onEndDateChange={() => {}}
      />,
    );

    fireEvent.press(getByText('Select Start Date'));
    expect(queryByTestId('start-date-picker')).toBeDefined();

    fireEvent.press(getByText('Select Start Date'));
    expect(queryByTestId('start-date-picker')).toBeNull();
  });

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
  it('should call onEndDateChange when selecting end date', () => {
    // Mock the onEndDateChange function
    const onEndDateChange = jest.fn();
    // Render the component
    const {getByTestId} = render(
      <AnalyticsDatePicker
        startDate={new Date()}
        endDate={new Date()}
        onStartDateChange={() => {}}
        onEndDateChange={onEndDateChange}
      />,
    );
    // Find the end date button
    const endDateButton = getByTestId('end-date-button');
    // Click on the end date button
    fireEvent.press(endDateButton);
    // Expect onEndDateChange to be called
    expect(onEndDateChange).toHaveBeenCalled();
  });
});
