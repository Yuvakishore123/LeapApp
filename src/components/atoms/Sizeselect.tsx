import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import Colors from '../../constants/Colors';

import {ColorSchemeContext} from '../../../ColorSchemeContext';

// Data for the dropdown options
const data = [
  {label: 'XS', value: '1', accessibilityLabel: 'XS'},
  {label: 'S', value: '2', accessibilityLabel: 'S'},
  {label: 'L', value: '3', accessibilityLabel: 'L'},
  {label: 'XL', value: '4', accessibilityLabel: 'XL'},
  {label: 'XXL', value: '5', accessibilityLabel: 'XXL'},
];
// Functional component for Size Selection
const Sizeselection = ({onChange}: {onChange: (value: string) => void}) => {
  // State variables
  const [value, _setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const {getTextInputStyle, getPlaceholderTextColor} =
    useContext(ColorSchemeContext);

  return (
    <View>
      <View style={[styles.dropdownContainer, getTextInputStyle()]}>
        <Dropdown
          testID="dropdown"
          style={styles.dropdown}
          placeholderStyle={[
            styles.placeholderStyle,
            getPlaceholderTextColor(),
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            getPlaceholderTextColor(),
          ]}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          itemContainerStyle={styles.itemContainerStyle}
          selectedItemContainerStyle={styles.selectedItemContainerStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select size' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            onChange(item.label);
            setIsFocus(false);
          }}
        />
      </View>
    </View>
  );
};

export default Sizeselection;
const styles = StyleSheet.create({
  dropdownContainer: {
    height: 56,
    width: '493%',
    backgroundColor: '#FFFFFF',
    marginTop: 3,
    elevation: 4,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: 'gray',
    marginLeft: 15,
  },
  selectedTextStyle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  iconStyle: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'black',
  },
  itemTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
    padding: 10,
  },
  selectedItemTextStyle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  itemContainerStyle: {
    backgroundColor: Colors.white,
    borderRadius: 10,
  },
  selectedItemContainerStyle: {
    backgroundColor: '#3E54AC',
    borderRadius: 10,
  },
});
