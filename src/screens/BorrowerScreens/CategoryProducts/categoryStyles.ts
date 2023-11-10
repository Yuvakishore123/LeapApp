import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

const style = StyleSheet.create({
  container: {
    width: '83%',
    height: 200,
    borderRadius: 8,

    backgroundColor: Colors.white,
    marginLeft: 20,

    margin: 10,
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
    fontSize: 10,
    fontWeight: '600',
    color: Colors.black,
  },
  addButton: {
    borderColor: Colors.iconscolor,
    borderWidth: 1,
    borderRadius: 4,

    alignItems: 'center',

    height: 18,
    width: 18,
    backgroundColor: Colors.white,
  },
  price: {
    fontSize: 10,

    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonColor,
  },
  rentButton: {
    borderWidth: 1,
    borderRadius: 4,

    borderColor: Colors.iconscolor,

    width: 57,
    height: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 3,
  },
  wishlistButton: {
    width: 30,
    height: 30,
    borderRadius: 20,

    position: 'absolute',
    backgroundColor: Colors.Textinput,
    top: 5,
    marginLeft: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 5,
  },

  Cartcontents: {
    marginTop: 25,
  },
  cardTextContainer: {
    width: '100%',
    marginTop: 60,
    padding: 6,
    marginLeft: 5,
  },

  loadtextStyle: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    marginLeft: 45,
  },
  maincontainer: {
    height: '100%',
    width: '100%',

    backgroundColor: Colors.main,
  },

  viewS: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  outerView: {
    width: '100%',
  },
  lottieS: {height: 400, width: '100%', marginLeft: 15},
  direction: {flex: 1},
  size: {width: '50%'},
});

export default style;
