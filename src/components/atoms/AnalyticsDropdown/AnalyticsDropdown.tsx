/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './analyticStyle';
import Icons from 'react-native-vector-icons/MaterialIcons';

// Defining the type of props that AnalyticsDropdown component expects
type AnalyticsDropdownProps = {
  onSelect: (value: string) => void; // Expects a function that takes a string as an argument
};

const AnalyticsDropdown = ({onSelect}: AnalyticsDropdownProps) => {
  // State variables to manage selected value and dropdown visibility
  const [selectedValue, setSelectedValue] = useState('Quantity');
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle selection of an item in the dropdown
  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value); // Call the provided onSelect function with the selected value
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <View>
      <TouchableOpacity
        testID="mainContainer"
        style={styles.mainContainer}
        onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.buttonText}>{selectedValue}</Text>
        <Icons style={{marginLeft: 5}} size={20} name="keyboard-arrow-down" />
      </TouchableOpacity>

      {/* Render the dropdown if isOpen state is true */}
      {isOpen && (
        <View style={styles.dropdownConatiner}>
          <TouchableOpacity onPress={() => handleSelect('quantity')}>
            <Text
              style={[
                {color: selectedValue === 'quantity' ? 'blue' : 'black'},
                {marginBottom: 10},
              ]}>
              Quantity
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSelect('Earnings')}>
            <Text
              style={{color: selectedValue === 'Earnings' ? 'blue' : 'black'}}>
              Earnings
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
export default AnalyticsDropdown;
