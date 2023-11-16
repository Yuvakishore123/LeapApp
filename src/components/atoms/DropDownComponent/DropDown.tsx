import React, {useContext, useState} from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
import Ownerstyles from '../../../screens/Additems/Additemsstyle';
import styles from './DropdownStyles';

type DropdownComponentProps = {
  onSelect: (selectedValue: string) => void;
  onChange: (selectedValue: string) => void;
  value: any;
  placeholder: string;
  data: any[];
};

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  onChange,
  value,
  placeholder,
  data,
}) => {
  // Access color scheme context for styling
  const {getTextInputStyle, getPlaceholderTextColor} =
    useContext(ColorSchemeContext);
  // State to track focus state of the dropdown
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={Ownerstyles.scrollView}>
      <View style={[styles.dropdownContainer, getTextInputStyle()]}>
        {/* Render the Dropdown component */}
        <Dropdown
          testID="dropdown-component"
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
          placeholder={!isFocus ? placeholder : '...'}
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
