/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useContext} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import Colors from '../../../constants/colors';

import styles from './filterstyles';

type FilterSelectSizeProps = {
  sizes: string[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
};
const FilterSelectSize = ({
  sizes,
  selectedSize,
  onSelectSize,
}: FilterSelectSizeProps) => {
  const [open, setOpen] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  const {getContainerStyle, getTextColor} = useContext(ColorSchemeContext);
  const handleToggle = () => {
    setOpen(!open);
    if (open) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };
  const openDropdown = () => {
    Animated.timing(dropdownHeight, {
      toValue: sizes.length * 40, // Adjust the height based on the number of sizes
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const closeDropdown = () => {
    Animated.timing(dropdownHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const handleSelectSize = (size: string) => {
    onSelectSize(size);
    setOpen(false);
    closeDropdown();
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        testID="button"
        style={[styles.button, getContainerStyle()]}
        onPress={handleToggle}>
        <View
          style={[
            styles.buttonContainer,
            // colorScheme === 'dark' ? Styles.whiteTheme : Styles.whiteTheme,
          ]}>
          <Text style={[styles.text, getTextColor()]}>{selectedSize}</Text>
          <Ionicons
            name={open ? 'chevron-up-outline' : 'chevron-down-outline'}
            size={20}
            color={Colors.white}
          />
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.dropdown,
          {height: dropdownHeight, zIndex: open ? 9999 : -1}, // Set a higher zIndex when open
        ]}
        testID="dropdown">
        {sizes.map(size => (
          <TouchableOpacity
            key={size}
            style={styles.option}
            onPress={() => handleSelectSize(size)}>
            <Text style={[styles.optionText]}>{size}</Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </View>
  );
};
export default FilterSelectSize;
