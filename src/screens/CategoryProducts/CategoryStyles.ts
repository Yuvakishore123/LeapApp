import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

const style = StyleSheet.create({
  container: {
    width: '83%',
    height: 200,
    borderRadius: 8,

    backgroundColor: Colors.white,
    marginLeft: 20,

    margin: 10,
  },
  dheader: {
    marginTop: 3,

    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
    marginLeft: -50,
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
    borderColor: '#3E54AC',
    borderWidth: 1,
    borderRadius: 4,

    alignItems: 'center',

    height: 18,
    width: 18,
    backgroundColor: '#fff',
  },
  price: {
    fontSize: 10,

    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonColor,
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
    width: 30,
    height: 30,
    borderRadius: 20,

    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    top: 5,
    marginLeft: 110,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 5,
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
  backBtn: {
    marginTop: 10,
    marginLeft: 25,
    color: 'black',
    backgroundColor: 'black',
    borderRadius: 100,
    width: '9%',
    height: 35,
    flexDirection: 'row',
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
  textConatiner: {marginLeft: 63, marginTop: 20, flexDirection: 'row'},

  textStyle: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    marginTop: 20,
    marginLeft: 30,
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
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
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
