import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

const styles = StyleSheet.create({
  subContainer: {
    height: '100%',
    width: '80%',
    marginLeft: 10,
  },
  textField: {
    fontSize: 18,
    // backgroundColor: 'white',
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    alignItems: 'center',

    marginLeft: 30,
  },
  inputAddress: {
    marginLeft: 30,
    marginTop: 10,
    paddingHorizontal: 10,
    width: '100%',
    height: 45,
    fontSize: 18,
    alignItems: 'center',
    fontFamily: 'Poppins_medium',
    borderRadius: 5,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: Colors.black,
    elevation: 5,
  },
  smalltextInputs: {
    height: 45,
    width: '58%',

    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    marginRight: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: Colors.black,
    elevation: 5,
    fontSize: 18,
    color: Colors.black,
    // fontWeight: '700',
    borderRadius: 5,
  },
  texttypeField: {
    color: Colors.white,
    // fontWeight: '400',
    fontSize: 18,
    marginTop: 15,
    alignItems: 'center',
    fontFamily: 'Poppins-Medium',
    // marginBottom: 10,
    marginLeft: 30,
  },
  textCheckbox: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',

    marginLeft: '3%',
  },
  btntextAddress: {
    justifyContent: 'center',
    alignItems: 'center',

    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: Colors.white,
  },
  btnfieldupdateAddress: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '96%',
    height: 59,
    marginTop: 20,
    marginLeft: '19%',
    backgroundColor: Colors.buttonColor,
    borderRadius: 100,
  },
});
export default styles;
