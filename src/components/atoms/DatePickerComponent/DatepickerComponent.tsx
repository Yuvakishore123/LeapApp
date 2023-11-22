/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import moment from 'moment';
import {View, Text, TouchableOpacity, Modal} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../../constants/colors';
import styles from './datepickerStyles';

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
  // Local state for the selected start and end dates
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(endDate);

  // Flag to control the visibility of the date picker
  const [showPicker, setShowPicker] = useState<boolean>(false);

  // Handle date changes based on the date type (start or end)
  const onDateChange = (date: Date, type: string) => {
    // Refactor this function to handle start and end dates separately
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      onEndDateChange(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(date);
      onStartDateChange(date);
    }
  };

  // Clear both selected start and end dates
  const onClearDates = () => {
    //  Add logic to clear both start and end dates
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  // Toggle the visibility of the date picker
  const onTogglePicker = () => {
    //  Enhance the toggle logic, for example, add animation
    setShowPicker(!showPicker);
  };
  return (
    <View style={styles.mainContainer}>
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
      <Modal
        visible={showPicker}
        animationType="slide"
        testID="date-picker-modal">
        <View style={{flex: 1}}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            selectedDayColor={Colors.buttonColor}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onDateChange={onDateChange}
            minDate={startDate}
            testID="Calander-Picker"
          />
          <View style={styles.clearButtonview}>
            <TouchableOpacity
              testID="clear-dates"
              style={styles.calanderButtonStyle}
              onPress={onClearDates}>
              <Text style={styles.buttonText}>Clear Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity
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
