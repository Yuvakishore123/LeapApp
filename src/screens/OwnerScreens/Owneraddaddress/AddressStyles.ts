import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';
const OwnerAddressStyles = StyleSheet.create({
  header: {flexDirection: 'row', justifyContent: 'space-between'},
  maincontainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.main,
  },
  textField: {
    color: Colors.black,
    fontWeight: '700',
    fontSize: 18,
    marginTop: 5,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 30,
  },
  textFieldpincode: {
    color: Colors.white,
    // fontWeight: '400',
    fontSize: 18,
    marginLeft: 40,
    marginTop: 10,
    fontFamily: 'Poppins-Medium',
  },
  texttypeField: {
    color: Colors.white,
    fontWeight: '400',
    fontSize: 18,
    marginTop: 15,
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 30,
  },
  headerText: {
    marginTop: 25,
    marginLeft: 25,
    fontSize: 20,
    color: Colors.iconscolor,
    flexDirection: 'row',
    fontWeight: '600',
  },
  btnContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderWidth: 0.2,
    padding: 8,
    backgroundColor: Colors.iconscolor,
    borderRadius: 8,
  },
  btnText: {
    fontWeight: '700',
    fontFamily: 'Poppins',
    fontSize: 14,
    marginTop: 26,
    marginRight: 45,

    color: Colors.black,
  },
  card: {
    backgroundColor: Colors.white,
    width: '90%',
    height: 100,
    // borderWidth: 0.2,
    borderColor: Colors.borderColor,
    // backgroundColor: 'pink',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteBtn: {
    padding: 7,
    borderWidth: 0.2,
    marginRight: 20,
    backgroundColor: Colors.iconscolor,
    borderRadius: 10,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteBtnText: {
    // fontWeight: '700',
    // fontFamily: 'Poppins',
    marginTop: 20,
    marginRight: 40,
    opacity: 0.8,
  },

  btnfield: {
    alignItems: 'center',
    alignSelf: 'center',
    width: 60,
    height: 59,
    marginTop: 30,
    backgroundColor: Colors.iconscolor,
    borderRadius: 8,
  },
  btntext: {
    position: 'absolute',
    alignItems: 'center',
    left: 120,
    top: 15,
    height: 29,
    width: 104,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    fontSize: 18,
    color: Colors.white,
  },
  input: {
    marginLeft: 15,
    fontSize: 12,
    width: 200,
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },
  stateName: {
    marginLeft: 15,
    marginBottom: 10,

    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
  liststyle: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.main,
  },
  city: {
    marginLeft: 15,
    // marginTop: 10,
    color: Colors.black,
    fontSize: 14,
    // fontWeight: '500',
    marginBottom: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  addAddressHeader: {flexDirection: 'row'},
  backBtn: {
    marginTop: 17,

    backgroundColor: Colors.black,
    marginLeft: 23,
    borderRadius: 100,
    width: '21%',
    height: 35,
    padding: 9,
    flexDirection: 'row',
  },
  btnImage: {width: 24, height: 24, marginTop: 15},
  addAddressContainer: {
    justifyContent: 'center',
    width: '100%',
    backgroundColor: Colors.black,
  },

  headercontainer: {
    backgroundColor: Colors.main,
    height: '100%',
  },

  AdresstextContainer: {
    width: '100%',
    // backgroundColor: Colors.black,
    // marginLeft: 10,
  },
  inputAddress: {
    backgroundColor: Colors.white,
    marginLeft: 30,
    marginTop: 30,
    paddingHorizontal: 10,
    width: '100%',
    height: 56,
    fontSize: 18,
    color: Colors.blacklight,
    alignItems: 'center',
    fontWeight: '700',
    borderRadius: 5,

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: Colors.black,
    elevation: 5,
  },
  inputAddres: {
    backgroundColor: Colors.white,
    marginLeft: 30,
    marginTop: 30,
    paddingHorizontal: 10,
    width: '100%',
    height: 56,
    fontSize: 18,
    color: Colors.black,
    alignItems: 'center',
    fontWeight: '700',
    borderRadius: 5,

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: Colors.black,
    elevation: 5,
  },
  StreetInput: {
    backgroundColor: Colors.white,
    marginLeft: 30,
    marginTop: 5,
    paddingHorizontal: 10,
    width: '100%',
    height: 56,
    fontSize: 18,
    color: Colors.black,
    alignItems: 'center',
    // fontWeight: '700',
    borderRadius: 5,

    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: Colors.black,
    elevation: 5,
  },
  btnfieldAddress: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '85%',
    height: 59,
    marginTop: 20,
    backgroundColor: Colors.buttonColor,
    borderRadius: 100,
    marginBottom: 20,
  },
  errorText: {
    color: Colors.red,
    marginLeft: 25,
  },
  btnfieldupdateAddress: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '96%',
    height: 59,
    marginTop: 10,
    marginLeft: '19%',
    backgroundColor: Colors.buttonColor,
    borderRadius: 100,
  },
  btntextAddress: {
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '900',
    fontFamily: 'Poppins',
    fontSize: 20,
    color: 'white',
    // marginBottom: 20,
  },
  cityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 45,

    width: '80%',
    marginLeft: 70,
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
    width: '85%',
    marginLeft: 5,
    borderRadius: 5,
  },
  smalltextInputs: {
    height: 56,
    width: '58%',

    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    marginRight: 20,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    shadowColor: Colors.black,
    elevation: 5,
    fontSize: 18,
    color: Colors.blacklight,
    // fontWeight: '700',
    borderRadius: 5,
  },
  smalltextInput: {
    height: 56,
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
  btnaddText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    width: '90%',
    marginTop: 5,
    marginLeft: 10,
    color: Colors.white,
  },
  btnaddaddressContainer: {
    marginTop: 0,
    alignItems: 'center',
    marginLeft: '65%',
    // marginRight: 20,
    width: '30%',
    height: 30,
    backgroundColor: Colors.buttonColor,
    borderRadius: 10,
  },
  Titletext: {
    marginTop: 20,
    marginLeft: '9%',
    fontSize: 20,
    color: Colors.black,
    fontWeight: '900',
    alignItems: 'center',
    marginBottom: 20,
  },
  titleContainer: {
    color: Colors.iconscolor,
    marginLeft: '19%',
    fontSize: 20,
  },
  containerRadio: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginRight: 30,
    marginBottom: 10,
  },
  optionRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginRight: 20,
  },
  textRadio: {
    marginLeft: 5,
    color: Colors.black,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    // fontWeight: '700',
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 30,
    color: Colors.black,
  },
  textCheckbox: {
    color: Colors.black,
    fontSize: 19,
    fontFamily: 'poppins',
    fontWeight: '700',
    marginLeft: '3%',
    // marginTop: -10,
  },
  checkboxContainer: {
    borderColor: Colors.black,
    marginLeft: 30,
    margin: 0,
    padding: 0,
    // marginTop: -18,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  noAddressText: {
    color: Colors.iconscolor,
    fontSize: 18,
    textAlign: 'center',

    fontWeight: 'bold',
  },

  titleTextContainer: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  imageS: {
    borderRadius: 150,
    width: 300,
    height: 300,
    marginLeft: 40,
  },
  noAddressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  textContainerAddress: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 45,
    width: 250,
    marginTop: 50,
    marginLeft: 30,
    borderRadius: 5,
  },
  noAddressContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  titleTextContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  imageS1: {
    width: 250,
    height: 250,
    borderRadius: 130,
  },
  textContainer1: {
    alignItems: 'center',
  },
  noAddressText1: {
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: Colors.white,
  },
  line21: {
    fontSize: 16,
    color: '#8E8E8E',
  },
  outerContainer: {
    marginBottom: 26,
    // backgroundColor: Colors.white,
    width: '84%',
    // marginLeft: 20,
  },
  innerContainer: {marginBottom: 20},
});
export default OwnerAddressStyles;
