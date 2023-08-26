import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';

const loginStyle = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.main,
  },
  mainButton: {
    justifyContent: 'center',
    marginTop: 15,
    alignItems: 'center',
  },
  mainTouchable: {
    height: 48,
    width: '145%',
    backgroundColor: '#3E54AC',
    marginTop: 30,
    borderRadius: 14,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '50%',
  },
  image: {
    height: 150,
    width: '50%',
    marginTop: 40,
    marginLeft: 65,
  },
  textinput: {
    backgroundColor: Colors.white,
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 6,
    width: '90%',
    padding: 10,
  },
  touchablebtnContainer: {
    marginTop: 20,
    marginLeft: 5,
    height: 100,
    width: '100%',
  },
  touchablebtn: {
    height: 60,
    width: '90%',
    backgroundColor: '#9747FF',
    marginLeft: 15,

    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 18,

    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    marginLeft: 20,
  },
  otp: {
    marginLeft: '69%',
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  otptext: {
    alignSelf: 'center',
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
    justifyContent: 'center',
  },
  Otptext: {
    marginTop: 12,
    alignItems: 'center',
    fontSize: 14,
    color: Colors.buttonColor,
    fontFamily: 'Poppins-Regular',
    marginLeft: 5,
  },
  sign: {
    marginLeft: '45%',
    marginTop: 30,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  TitleText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 26,
    color: Colors.black,
    marginTop: 70,
    marginLeft: 20,
  },
  signuptext: {
    alignItems: 'center',
    color: Colors.black,

    fontFamily: 'Poppins-Regular',
  },
  Guesttext: {
    alignItems: 'center',
    color: Colors.black,
    marginLeft: 35,
    fontFamily: 'Poppins-Regular',
  },
  Signuptext: {
    alignItems: 'center',
    color: Colors.buttonColor,
    fontFamily: 'Poppins-Regular',
  },
  eyeButton: {
    position: 'absolute',
    top: 30,
    right: 40,
  },
});

export default loginStyle;
