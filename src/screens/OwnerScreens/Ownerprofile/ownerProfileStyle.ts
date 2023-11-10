import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';
const style = StyleSheet.create({
  btnfield: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    marginTop: 0,
    marginLeft: 45,
    backgroundColor: Colors.iconscolor,
    borderRadius: 13,
  },
  btntext: {
    width: '30%',

    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginLeft: '37%',
    marginTop: -40,
    color: Colors.primary,
  },
  uploadButton: {
    width: 100,

    alignItems: 'center',
  },
  removeButton: {
    width: 100,

    alignItems: 'center',
  },
  uploadText: {
    color: Colors.buttonColor,
    fontFamily: 'Poppins-Medium',
  },
  uploadButtoncontainer: {
    flexDirection: 'row',
    height: 40,

    marginLeft: 65,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '65%',
  },
  profileImg: {
    height: 50,
    borderRadius: 50,
    borderColor: 'red',
    shadowColor: Colors.iconscolor,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    marginTop: 80,
  },
  imageContainer: {alignItems: 'center'},
  profileStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.main,
  },
  profileText: {
    marginLeft: 15,
    width: '100%',
    marginTop: 8,

    color: Colors.black,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  profileText1: {
    textAlign: 'left',
    marginLeft: 15,
    width: '87%',

    color: Colors.blacklight,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  profileFields: {
    height: 300,
    marginLeft: 23,
    marginTop: 40,
  },
  editprofileicon: {
    marginLeft: 30,

    color: Colors.blacklight,
  },
  addressicon: {
    marginLeft: 30,

    color: Colors.blacklight,
  },
  producticon: {
    marginLeft: 30,

    color: Colors.blacklight,
  },
  editprofile: {
    backgroundColor: Colors.white,
    color: 'white',
  },
  whiteBtn: {
    alignItems: 'center',
    textAlign: 'center',
    width: '92%',
    height: 56,

    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderRadius: 10,
    marginLeft: 3,
    marginBottom: 15,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    width: '87%',
    height: 96,
    marginTop: 20,
    marginLeft: 25,
    marginRight: 20,
    borderRadius: 10,
    elevation: 4,
  },
  btnPText: {
    marginLeft: 20,
    width: '57%',
    marginTop: 3,
    fontWeight: '700',
    fontFamily: 'Poppins-Regular',
    fontSize: 16,

    color: Colors.black,

    alignItems: 'center',
  },
  forwardios: {
    marginLeft: '5%',

    color: Colors.blacklight,
  },
  addressforwardios: {
    marginLeft: '68%',

    color: Colors.blacklight,
  },
  productforwardios: {
    marginLeft: '5%',

    color: Colors.blacklight,
  },
  AddressbtnPText: {
    position: 'absolute',
    marginLeft: 83,
    fontWeight: '700',
    fontFamily: 'Poppins',
    fontSize: 16,
    color: Colors.black,

    alignItems: 'center',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  icon: {
    backgroundColor: Colors.iconscolor,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  text: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 15,
    zIndex: 2,
  },
  outerView: {marginTop: 10},
  viewS: {
    width: 130,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default style;
