// Import necessary modules and components
import React, {useContext, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

// Import custom hooks and constants
import useSearchresults from '../../../screens/SearchResultScreen/useSearchResults';
import Colors from '../../../constants/colors';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

const SubCategoryDropdown = ({
  value,
  onChange,
}: {
  value: any;
  onChange: (value: any) => void;
}) => {
  // Retrieve subcategories data using custom hook
  const {subcategoriesData} = useSearchresults();
  // State for handling focus of the dropdown
  const [isFocus, setIsFocus] = useState(false);

  // Retrieve styles from context using useContext
  const {getContainerStyle, getTextColor} = useContext(ColorSchemeContext);

  return (
    <View style={[styles.container, getContainerStyle()]}>
      {/* Dropdown component */}
      <Dropdown
        testID="sub-category-dropdown"
        style={[styles.dropdown, getContainerStyle()]}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={[styles.selectedText, getTextColor()]}
        inputSearchStyle={styles.inputSearch}
        itemTextStyle={styles.itemText}
        selectedItemTextStyle={[styles.selectedItemText]}
        itemContainerStyle={styles.itemContainer}
        selectedItemContainerStyle={styles.selectedItemContainer}
        iconColor={Colors.white}
        iconStyle={styles.icon}
        data={subcategoriesData}
        search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Type' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          onChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default SubCategoryDropdown;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    height: 50,
    backgroundColor: Colors.buttonColor,
    borderRadius: 30,
  },
  dropdown: {
    borderRadius: 30,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: Colors.buttonColor,
  },
  placeholder: {
    fontSize: 16,
    color: Colors.white,
    marginLeft: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  selectedText: {
    fontSize: 16,
    color: Colors.white,
    marginLeft: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  icon: {
    width: 20,
    height: 28,
    marginRight: 17,
  },
  inputSearch: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
  itemText: {
    fontSize: 16,
    color: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily: 'Poppins-Regular',
  },
  selectedItemText: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Poppins-Regular',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 2,
  },
  selectedItemContainer: {
    backgroundColor: '#000000',
    borderRadius: 8,
    marginVertical: 2,
  },
});
