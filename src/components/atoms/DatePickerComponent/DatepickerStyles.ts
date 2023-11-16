import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
const styles = StyleSheet.create({
  buttoncontainer: {
    backgroundColor: Colors.buttonColor,
    width: 120,
    height: 40,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButtonview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginLeft: 40,
    marginTop: 350,
  },
  calanderButtonStyle: {
    backgroundColor: Colors.buttonColor,
    width: 140,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    width: 170,
    marginLeft: 4,
    justifyContent: 'space-between',
  },
  buttonText: {color: Colors.white, fontFamily: 'Poppins-Medium'},
  textColor: {fontSize: 10, color: Colors.black},
});
export default styles;
