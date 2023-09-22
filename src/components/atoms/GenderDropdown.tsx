// Importing necessary modules and components
import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

// Importing styles and hooks from other files
import Ownerstyles from '../../screens/Additems/Additemsstyle';
import Useadditems from '../../screens/Additems/useAdditems';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';
import Colors from '../../constants/colors';

// Defining the prop types for the GenderDropdown component
type GenderDropdownProps = {
  onSelectGender: (selectedGender: string) => void;
  onChange: (selectedGender: string) => void;
  value: any;
};
const DropdownComponent: React.FC<GenderDropdownProps> = ({
  onChange,
  value,
}) => {
  // Getting categories data and managing focus state using hooks
  const {categoriesData} = Useadditems();
  const [isFocus, setIsFocus] = useState(false);
  const {colorScheme} = useContext(ColorSchemeContext);

  return (
    <View style={Ownerstyles.scrollView}>
      <View
        style={[
          styles.dropdownContainer,
          colorScheme === 'dark' ? Styles.cardColor : Styles.main,
        ]}>
        {/* Dropdown component with various styles and configurations */}
        <Dropdown
          style={[styles.dropdown]}
          placeholderStyle={[styles.placeholderStyle]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
          ]}
          inputSearchStyle={[
            styles.inputSearchStyle,
            colorScheme === 'dark' ? Styles.cardColor : Styles.main,
          ]}
          iconStyle={styles.iconStyle}
          itemTextStyle={styles.itemTextStyle}
          selectedItemTextStyle={styles.selectedItemTextStyle}
          itemContainerStyle={[
            styles.itemContainerStyle,
            colorScheme === 'dark' ? Styles.cardColor : Styles.main,
          ]}
          selectedItemContainerStyle={[
            styles.selectedItemContainerStyle,
            colorScheme === 'dark' ? Styles.cardColor : Styles.main,
          ]}
          data={categoriesData}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Gender' : '...'}
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdownContainer: {
    height: 56,
    width: '110%',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    marginTop: 3,
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
    fontFamily: 'Poppins-Medium',
    color: 'gray',
    marginLeft: 15,
  },
  selectedTextStyle: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  selectedItemTextStyle: {},
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

  itemContainerStyle: {
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  selectedItemContainerStyle: {
    backgroundColor: '#3E54AC',
    borderRadius: 10,
  },
});
