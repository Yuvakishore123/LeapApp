import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: Colors.main,
    height: '100%',
    width: '100%',
  },
  mainContainer: {
    backgroundColor: Colors.main,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  Container: {
    width: '100%',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 30,

    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,

    marginLeft: 20,
  },
  textView: {height: 43, width: 286},
  titleTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  card: {
    backgroundColor: '#3E54AC26',
    width: 320,

    borderRadius: 15,
    margin: 15,
    marginLeft: 45,
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: '#52006A',
  },
  cardText: {
    color: Colors.black,
    fontSize: 16,

    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    marginLeft: 20,
  },
  cardText1: {
    color: '#3E54AC',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 20,
  },
  textinput: {
    backgroundColor: Colors.white,
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    marginLeft: 15,
    fontFamily: 'Poppins-Regular',

    borderColor: '#3E54AC',
    color: 'black',
  },
  touchableText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    justifyContent: 'center',
  },
  touchablebtn: {
    height: 59,
    width: 320,
    backgroundColor: '#9747FF',
    marginLeft: 30,
    marginTop: 20,
    borderRadius: 100,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchablebtnContainer: {
    justifyContent: 'center',

    marginTop: 15,
  },
  subTitileText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  Logintext: {
    marginTop: 10,
    alignItems: 'center',
    marginRight: 20,
    margin: 15,
  },
  sign: {
    color: '#3E54AC',
    fontSize: 14,
    opacity: 3,
  },
  dontText: {
    margin: 25,
    marginTop: 1,
    marginRight: 2,
    marginBottom: 10,
  },
  textfirst: {
    height: 40,
    width: 115,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 250,
    marginLeft: 50,
  },
  emailText: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    borderColor: '#3E54AC',
  },
  errorTxt: {
    fontSize: 12,
    color: 'red',
    marginLeft: 20,
  },
  buttonContainer: {
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  signText: {
    color: '#3E54AC',
    fontSize: 14,
    opacity: 3,
    flexDirection: 'row',
  },
  signuptext: {
    marginTop: 20,
    alignItems: 'center',
    color: Colors.black,
  },
  LoginText: {
    marginTop: 20,
    alignItems: 'center',
    color: '#9747FF',
    marginBottom: 10,
  },
  eyeButton: {
    position: 'absolute',
    top: 22,
    right: 40,
  },
});
export default styles;
