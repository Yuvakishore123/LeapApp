/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './analyticStyle';
import Icons from 'react-native-vector-icons/MaterialIcons';

type AnalyticsDropdownProps = {
  onSelect: (value: string) => void;
};

const AnalyticsDropdown = ({onSelect}: AnalyticsDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState('Quantity');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
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
