import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
const OwnerEditItemstyles = StyleSheet.create({
  buttenContainer: {
    flexDirection: 'column',
    height: 200,
    width: 145,
    justifyContent: 'center',
  },
  card: {
    height: 180,
    width: 160,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 40,
  },
  Container: {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    marginRight: 10,
    marginLeft: 10,
  },
  imageContainer: {
    height: 150,
    width: 145,
    borderRadius: 10,
    opacity: 2,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#3E54AC',
    fontWeight: 'bold',
    flexDirection: 'column',
    marginLeft: 8,
    marginTop: 8,
    marginRight: 8,
    marginBottom: 5,
  },
  closetxt: {
    color: Colors.buttonColor,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    marginLeft: 40,
    marginTop: 10,
  },
  mainContainer: {
    backgroundColor: Colors.main,
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
  Titletext: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.iconscolor,
    marginLeft: 20,
    marginTop: 10,
  },
  TotalContainer: {
    justifyContent: 'space-between',
    padding: 20,
    flexDirection: 'column',
  },
  textContainer: {
    flexDirection: 'column',
    backgroundColor: '#3E54AC1A',
    marginTop: 10,
    width: 145,
    borderRadius: 10,
  },
  cardImage: {
    height: 145,
    width: '100%',
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardImageContainer: {
    width: '88%',
    height: 145,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 5,
    justifyContent: 'center',
  },
  imagePriceContainer: {
    flexDirection: 'column',
    width: '45%',
  },
  priceContainer: {
    width: '89%',
    height: 60,
    // backgroundColor: 'rgba(5, 5, 5, 0.3)',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 5,
    marginLeft: 20,
    paddingLeft: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  nameContainer: {
    // backgroundColor: 'rgba(5, 5, 5, 0.3)',
    backgroundColor: '#FFFFFF',
    width: 100,
    padding: 8,
    borderRadius: 5,
    marginLeft: 20,
    paddingLeft: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  buttonContainer: {
    marginLeft: 60,
    // marginTop: -15,
    width: '60%',
  },
  button: {
    backgroundColor: Colors.buttonColor,
    width: 90,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    // marginLeft: '-0%',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.main,
  },
  backButtonCircle: {
    marginTop: -30,
    marginLeft: 25,
    color: 'black',
    backgroundColor: Colors.white,
    borderRadius: 100,
    width: '75%',
    height: 38,
    flexDirection: 'row',
  },
  backButtonText: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: '700',
    fontFamily: 'Poppins',
    marginTop: 65,
    marginLeft: -30,
  },
  ImageContainer: {
    height: '15%',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  image: {
    height: 200,
    width: 200,
    justifyContent: 'center',
    // marginTop: 20,
    marginLeft: 25,
  },
  Addimage: {
    height: 163,
    width: '109%',
    backgroundColor: Colors.white,
    elevation: 4,
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  // Price: {
  //   width: 255,
  //   height: 48,
  //   backgroundColor: Colors.white,
  //   elevation: 4,
  //   marginTop: 10,
  //   borderRadius: 15,
  // },
  Price: {
    fontSize: 16,
    // fontWeight: '400',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
    width: '109%',
    height: 56,
    backgroundColor: Colors.white,
    elevation: 4,
    marginTop: 24,
    borderRadius: 8,
  },
  touchableContainer: {
    height: 40,
    width: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.iconscolor,
  },
  Sizecontainer: {
    marginTop: 20,
    height: '7%',
    width: '22%',
  },
  removeText: {
    color: Colors.white,
    alignItems: 'center',
  },
  Sizetext: {
    fontSize: 18,
    color: Colors.iconscolor,
    fontWeight: '700',
  },
  addImagesText: {
    fontSize: 18,
    color: Colors.iconscolor,
    fontWeight: '700',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  removeContainer: {
    alignItems: 'center',
  },
  imagehorizontal: {
    width: 300,
  },
  Pricetext: {
    fontSize: 18,
    color: Colors.iconscolor,
    fontWeight: '700',
    marginTop: 30,
  },
  AddIcon: {
    alignItems: 'center',
    color: Colors.iconscolor,
    fontSize: 20,
    marginTop: 40,
    justifyContent: 'center',
  },
  imagesText: {
    fontSize: 20,
    color: Colors.black,
    alignItems: 'center',
    marginTop: 68,
    justifyContent: 'center',
    // fontWeight: '500',
    fontFamily: 'Poppins-SemiBold',
  },
});
export default OwnerEditItemstyles;
