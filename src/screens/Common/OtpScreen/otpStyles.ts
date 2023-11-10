import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';
const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.main,
    height: '100%',
    width: '100%',
  },
  container: {
    width: '100%',
  },
  titleText: {
    marginTop: '30%',
    fontSize: 30,

    color: Colors.white,
    marginLeft: 30,
    alignSelf: 'flex-start',
  },
  titleTextContainer: {
    width: '100%',
    height: 200,

    alignItems: 'center',
    justifyContent: 'center',
  },

  Textphonenumber: {
    color: Colors.black,
    fontSize: 16,
    marginTop: '8%',
    marginLeft: '10%',
    fontFamily: 'Poppins-Medium',
    fontWeight: '400',
  },
  TextOTP: {
    color: Colors.black,
    fontSize: 16,
    marginTop: '5%',
    marginLeft: '11%',
    fontFamily: 'Poppins-Medium',
  },

  textinputphone: {
    backgroundColor: Colors.white,
    marginTop: '3%',
    marginLeft: 33,
    width: '85%',
    borderRadius: 6,
    padding: 10,
  },
  textinputOTP: {
    backgroundColor: Colors.white,
    marginTop: '3%',
    marginLeft: 33,
    width: '85%',
    borderRadius: 6,
    padding: 10,
  },
  touchableTextOTP: {
    color: Colors.darkpurple,
    fontSize: 18,
    fontWeight: '400',
    marginLeft: '50%',
    marginTop: '-6.0%',
    justifyContent: 'center',
  },
  touchableTextcontinue: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
    justifyContent: 'center',
  },
  Text: {
    color: Colors.buttonColor,
    fontSize: 18,
    marginLeft: '42%',
    fontWeight: '400',
    justifyContent: 'center',
    marginTop: '10%',
  },
  touchablebtn: {
    height: 59,
    width: '85%',
    backgroundColor: Colors.buttonColor,
    margin: 35,
    marginTop: '10%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchablebtnContainer: {
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: 235,
    marginTop: '10%',
    marginRight: 90,
  },
});
export default Styles;
