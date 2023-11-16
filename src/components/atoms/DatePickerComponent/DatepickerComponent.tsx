/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../../constants/Colors';
import styles from './DatepickerStyles';

interface DatePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
  buttonStyle: any;
  buttonTextColor: any;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  buttonStyle,
  buttonTextColor,
}) => {
  // State hooks for selected start and end dates, and modal visibility
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(endDate);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  // Function to handle date change in the calendar picker
  const onDateChange = (date: Date, type: string) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      onEndDateChange(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(date);
      onStartDateChange(date);
    }
  };
  // Function to clear selected dates
  const onClearDates = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };
  // Function to toggle the visibility of the date picker modal
  const onTogglePicker = () => {
    setShowPicker(!showPicker);
  };

  return (
    <View style={styles.mainContainer} testID="mainContainer">
      {/* Button to select start date */}
      <TouchableOpacity
        style={buttonStyle}
        testID="start-date-button"
        onPress={() => onTogglePicker()}>
        <Text style={buttonTextColor}>
          {selectedStartDate
            ? moment(selectedStartDate).format('MMM D, YYYY')
            : 'Select Start Date'}
        </Text>
      </TouchableOpacity>
      {/* Button to select end date */}
      <TouchableOpacity
        style={[buttonStyle]}
        testID="end-date-button"
        onPress={() => onTogglePicker()}>
        <Text testID="selected-date" style={buttonTextColor}>
          {selectedEndDate
            ? moment(selectedEndDate).format('MMM D, YYYY')
            : 'Select End Date'}
        </Text>
      </TouchableOpacity>
      {/* Modal for the date picker */}
      <Modal
        visible={showPicker}
        animationType="slide"
        testID="date-picker-modal">
        <View style={{flex: 1}}>
          {/* Calendar picker component */}
          <CalendarPicker
            testID="calendar-picker-start-date"
            startFromMonday={true}
            allowRangeSelection={true}
            selectedDayColor={Colors.buttonColor}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onDateChange={onDateChange}
            minDate={startDate}
          />
          {/* Buttons for clearing and confirming dates */}
          <View style={styles.clearButtonview}>
            <TouchableOpacity
              testID="clear-dates"
              style={styles.calanderButtonStyle}
              onPress={onClearDates}>
              <Text style={styles.buttonText}>Clear Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity
              testID="Done"
              style={styles.calanderButtonStyle}
              onPress={onTogglePicker}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePickerComponent;
