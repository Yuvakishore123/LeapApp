import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
const style = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',

    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 5,
    width: 400,
    height: 340,
    marginTop: 500,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    color: Colors.white,
    fontSize: 22,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
  },
});
export default style;
