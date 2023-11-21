import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.5,
    backgroundColor: Colors.gray,
  },
  detailsdescription: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
  },
  size: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    borderRadius: 50,
  },
  detailsPrice: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonColor,
  },
  detailsaddPrice: {
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '700',
    color: Colors.white,
  },
  detailsSize: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
    width: '100%',
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },
  paginationContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: '92%',
    left: 0,
    right: 0,
    position: 'absolute',
  },
  pagingText: {
    width: 10,
    height: 10,
    borderRadius: 4,
    marginHorizontal: 1,
    backgroundColor: Colors.gray,
  },
  pagingActiveText: {
    width: 10,
    height: 10,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: Colors.buttonColor,
  },

  quantityText: {
    fontSize: 14,
    marginHorizontal: 10,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
  },
  input: {
    height: 40,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    flex: 1,
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    backgroundColor: Colors.lightgray,
    borderRadius: 50,
    paddingHorizontal: 10,
    height: 50,
  },
  quantityButton: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 15,
    marginLeft: '45%',
    padding: 5,
    height: 30,
    width: 30,
  },
  plusquantityButton: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 15,
    padding: 5,
    height: 30,
    width: 30,
  },
  quantityButtonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: hp('120%'),
    width: wp('100%'),
  },

  dheader: {
    top: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
    marginLeft: 5,
  },
  sharebutton: {
    top: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
    marginLeft: '80%',
  },

  detailsContainer: {
    zIndex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    flex: 1,
    height: '100%',
  },

  headingtext: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'Poppins-Redular',
    color: Colors.black,
  },
  Quatitytext: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  descriptionContainer: {
    marginTop: 3,
    width: 40,
    borderRadius: 5,
    marginLeft: '60%',
    justifyContent: 'center',
  },

  startext: {
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
    marginLeft: 10,
    zIndex: 1,
    fontSize: 35,
    textShadowColor: Colors.shadowcolor, // Shadow color
    textShadowOffset: {width: 1, height: 1}, // Shadow offset
    textShadowRadius: 5, // Shadow blur radius
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '74%',
  },

  sizelabel: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Poppins-Regular',
  },

  touchableText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    marginLeft: '50%',
    justifyContent: 'center',
  },
  touchablebtn: {
    height: 59,
    width: '100%',
    backgroundColor: Colors.buttonColor,
    flexDirection: 'row',
    borderRadius: 50,
    color: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchablebtnContainer: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },

  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  datePickerstyles: {
    backgroundColor: Colors.buttonColor,
    width: 120,
    height: 40,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  datepickerTextcolor: {color: Colors.white},
  imageContainer: {
    height: hp('65%'),
    width: wp('100%'),
  },
});

export default styles;
