import {StyleSheet} from 'react-native';
import Colors from 'constants/colors';
const styles = StyleSheet.create({
  subContainer: {
    // backgroundColor: '#FFFFFF',
    height: '100%',
    width: '80%',
    marginLeft: 10,
  },
  textField: {
    // color: Colors.black,
    // fontWeight: '700',
    fontSize: 18,
    // backgroundColor: 'white',
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    alignItems: 'center',
    // marginBottom: 10,
    marginLeft: 30,
  },
  inputAddress: {
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    // backgroundColor: Colors.white,
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
    shadowColor: '#000',
    elevation: 5,
  },
  smalltextInputs: {
    height: 45,
    width: '58%',
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    marginRight: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: '#000',
    elevation: 5,
    fontSize: 18,
    color: 'rgba(5, 5, 5, 0.5)',
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
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    // fontWeight: '700',
    marginLeft: '3%',
    // marginTop: -10,
  },
  btntextAddress: {
    justifyContent: 'center',
    alignItems: 'center',
    // fontWeight: '900',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'white',
    // marginBottom: 20,
  },
  btnfieldupdateAddress: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '96%',
    height: 59,
    marginTop: 20,
    marginLeft: '19%',
    backgroundColor: '#9747FF',
    borderRadius: 100,
  },
});
export default styles;
