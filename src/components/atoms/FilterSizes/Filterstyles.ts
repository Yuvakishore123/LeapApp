import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    width: '95%',
    zIndex: 1, // Add zIndex to make the dropdown appear above other components
  },
  button: {
    padding: 10,
    backgroundColor: Colors.buttonColor,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
    fontFamily: 'Poppins-SemiBold',
    marginRight: 260,
    fontSize: 15,
  },
  dropdown: {
    left: 0,
    right: 0,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 8,
    elevation: 4,
  },
  option: {
    padding: 8,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: Colors.black,
  },
});
export default styles;
