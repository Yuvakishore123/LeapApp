import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ownerstyles from '../../screens/Additems/Additemsstyle';
import Colors from '../../constants/colors';

import Useadditems from '../../screens/Additems/useAdditems';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import Styles from '../../constants/themeColors';

type OutfitDropdownProps = {
  onSelectOutfit: (selectedOutfit: string) => void;
  onChange: (selectedOutfit: string) => void;
  value: any;
};

const DropdownComponent: React.FC<OutfitDropdownProps> = ({
  onChange,
  value,
}) => {
  const {subOutfitCategoriesData} = Useadditems();
  const {colorScheme} = useContext(ColorSchemeContext);

  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={Ownerstyles.scrollView}>
      <View
        style={[
          styles.dropdownContainer,
          colorScheme === 'dark' ? Styles.cardColor : Styles.main,
        ]}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={[
            styles.placeholderStyle,
            colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
          ]}
          selectedTextStyle={[
            styles.selectedTextStyle,
            colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
          ]}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={styles.itemTextStyle}
          selectedItemTextStyle={[
            styles.selectedItemTextStyle,
            colorScheme === 'dark' ? Styles.InputText : Styles.blackText,
          ]}
          itemContainerStyle={styles.itemContainerStyle}
          selectedItemContainerStyle={styles.selectedItemContainerStyle}
          iconStyle={styles.iconStyle}
          data={subOutfitCategoriesData}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select Outfit' : '...'}
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

    fontFamily: 'Poppins-Medium',
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
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
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