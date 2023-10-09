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
  const [selectedStartDate, setSelectedStartDate] = useState<Date>(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date>(endDate);
  const [showPicker, setShowPicker] = useState<boolean>(false);

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

  const onClearDates = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
  };

  const onTogglePicker = () => {
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
