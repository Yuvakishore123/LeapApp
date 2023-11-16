import {StyleSheet} from 'react-native';
import Colors from './Colors';

const Styles = StyleSheet.create({
  blacktheme: {
    backgroundColor: Colors.black,
    color: Colors.main,
  },
  whiteTheme: {
    backgroundColor: Colors.main,
    color: Colors.black,
  },
  main: {
    backgroundColor: Colors.white,
  },
  blackText: {
    color: Colors.black,
  },
  whitetext: {
    color: Colors.main,
  },
  InputText: {
    color: Colors.Inputtext,
  },
  placeholder: {
    color: Colors.gray,
    // opacity: 0.5,
  },
  cardColor: {
    backgroundColor: Colors.Textinput,
  },
  Cardcolor2: {
    backgroundColor: Colors.Inputtext,
  },
  ButtonColor: {
    backgroundColor: Colors.buttonColor,
  },
  priceTect: {
    color: Colors.buttonColor,
  },
});

export default Styles;
