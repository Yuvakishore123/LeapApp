/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Colors from '../../constants/colors';
import moment from 'moment';

const AnalyticsDatePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: {
  startDate: Date;
  endDate: any;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: any) => void;
}) => {
  // Define some initial variables and states
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
  const currentDay = String(currentDate.getDate()).padStart(2, '0');
  const initialDate = `${currentYear}-${currentMonth}-${currentDay}`;
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerClone, setShowPickerClone] = useState(false);
  const [, setPickerType] = useState('');
  // Function to handle date changes
  const onDateChange = (date: any, type: string) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
      onEndDateChange(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
      onStartDateChange(date);
    }
  };
  // Function to clear selected dates
  const onClearDates = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    //newcode
    onStartDateChange(null); // Call the onStartDateChange callback with null
    onEndDateChange(null); // Call the onEndDateChange callback with null
  };
  // Function to toggle date picker visibility
  const onTogglePicker = (type: string) => {
    setPickerType(type);
    if (type === 'END_DATE') {
      setShowPickerClone(true);
    } else {
      setShowPicker(true);
      setShowPickerClone(false);
    }
  };

  return (
    <View style={styles.outerVieww}>
      <TouchableOpacity
        style={styles.touchStyle}
        onPress={() => onTogglePicker('START_DATE')}>
        <Text
          style={{
            color: Colors.white,
          }}
          //newly added
          testID="start-date-text">
          {/* Display selected start date or placeholder */}
          {selectedStartDate
            ? moment(selectedStartDate).format('MMM D, YYYY')
            : 'Select Start Date'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.textToStyle}>To</Text>
      <TouchableOpacity
        style={styles.newStyle}
        onPress={() => onTogglePicker('END_DATE')}>
        <Text
          style={{
            color: Colors.white,
          }}
          testID="end-date-button" // Add testID here
        >
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
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onDateChange={onDateChange}
            selectedDayColor={Colors.buttonColor}
          />
          <View style={styles.outerView}>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={onClearDates}
              accessibilityLabel="Clear Dates"
              testID="clear-dates-button">
              <Text style={styles.textStyle}>Clear Dates</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => setShowPicker(false)}
              testID="done-button">
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showPickerClone} animationType="slide">
        <View style={{flex: 1}}>
          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            onDateChange={onDateChange}
            selectedDayColor={Colors.buttonColor}
            minDate={initialDate}
          />
          <View style={styles.outerView}>
            <TouchableOpacity style={styles.btnStyle} onPress={onClearDates}>
              <Text style={styles.textStyle}>Clear Dates</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => setShowPickerClone(false)}
              testID="done-button">
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default AnalyticsDatePicker;

const styles = StyleSheet.create({
  outerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 20,
    marginTop: 200,
  },
  btnStyle: {
    backgroundColor: Colors.buttonColor,
    width: 140,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
  },
  textToStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    color: Colors.black,
    marginTop: 10,
  },
  newStyle: {
    backgroundColor: Colors.buttonColor,
    width: '50%',
    height: 40,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerVieww: {
    flexDirection: 'row',
    width: '60%',
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  touchStyle: {
    backgroundColor: Colors.buttonColor,
    width: '50%',
    height: 40,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
