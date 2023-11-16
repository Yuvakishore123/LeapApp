import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
const style = StyleSheet.create({
  textStyle: {
    color: Colors.black,
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  maincontainer: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    backgroundColor: Colors.main,
  },
  Lottiestyle: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: '50%',
    justifyContent: 'center',
  },
  Lottietext: {
    color: Colors.white,
    marginLeft: '30%',
  },
  Emptytext: {
    marginBottom: 20,
    color: Colors.iconscolor,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    // fontWeight: '600',
  },
  whishlistView: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  wishlistViewContaner: {
    width: '100%',
  },
  wishlistConatinerwrap: {
    width: '50%',
    flexDirection: 'row',
  },
  textConatiner: {marginLeft: 20, marginTop: 10},
  container: {
    width: '83%',
    height: 200,
    borderRadius: 8,
    backgroundColor: Colors.Inputtext,
    marginLeft: 20,
    margin: 10,
  },
  textContainer: {},
  textStylewishlist: {
    color: Colors.black,
    fontSize: 24,
    marginLeft: '37%',
    marginTop: 10,
    fontFamily: 'Poppins-SemiBold',
  },
  imageContainer: {
    width: '100%',
    height: '30%',

    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  image: {
    width: '100%',
    height: 145,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: {
    fontSize: 12,

    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },
  addButton: {
    borderColor: '#3E54AC',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    height: 18,
    width: 18,
    backgroundColor: '#fff',
  },
  price: {
    fontSize: 12,
    color: Colors.buttonColor,
    fontFamily: 'Poppins-SemiBold',
  },
  rentButton: {
    borderWidth: 1,
    borderRadius: 4,

    borderColor: '#3E54AC',
    width: 57,
    height: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  wishlistButton: {
    width: 35,
    height: 35,

    borderRadius: 20,

    position: 'absolute',
    top: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rentText: {color: '#3E54AC', fontWeight: 'bold', fontSize: 10},

  searchInputContainer: {
    height: 50,
    width: 350,
    backgroundColor: 'white',
    marginTop: 15,
    marginLeft: 20,
    borderColor: '#3E54AC',
    borderWidth: 2,
    borderRadius: 12,

    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextContainer: {
    width: '100%',

    marginTop: 60,
    borderRadius: 5,
    padding: 6,
    marginLeft: 5,
  },
  Cartcontents: {
    marginTop: 25,
  },
  lottieStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: Colors.main,
  },
  lottieImage: {
    height: 200,
    width: 200,
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  EmptyImage: {
    width: 24,
    height: 24,
  },
});
export default style;
