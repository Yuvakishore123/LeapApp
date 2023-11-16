import Colors from '../../../constants/Colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dropdownContainer: {
    height: 56,
    width: '110%',
    backgroundColor: '#FFFFFF',
    elevation: 4,
    // marginLeft: -3,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown: {
    height: '50%',
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  placeholderStyle: {
    fontSize: 16,
    // fontWeight: '400',
    fontFamily: 'Poppins-Medium',
    color: 'gray',
    marginLeft: 16,
  },
  selectedTextStyle: {
    fontSize: 18,
    // fontWeight: '400',
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
    // color: '#FFFFFF',
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
    fontWeight: '400',
    color: '#FFFFFF',
    // padding: 10,
  },
  itemContainerStyle: {
    backgroundColor: Colors.white,

    borderRadius: 10, // Add this line
  },
  selectedItemContainerStyle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
});
export default styles;
