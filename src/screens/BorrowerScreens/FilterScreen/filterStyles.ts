import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: Colors.white,
    width: '90%',
    height: 60,
    marginTop: 10,
  },
  mainContainer: {
    backgroundColor: Colors.main,
    width: '100%',
    height: '100%',
  },
  subContainer: {marginLeft: 20},
  productsContainer: {
    width: '100%',
    height: 120,
    backgroundColor: Colors.white,
    // flexDirection: 'row',
  },
  productImage: {
    width: 200,
    height: '100%',
  },
});
export default styles;
