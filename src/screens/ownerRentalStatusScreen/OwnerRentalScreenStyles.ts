import {StyleSheet} from 'react-native';
import Colors from 'constants/Colors';
const OwnerRentalstyles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.black,
  },
  MainTitleText: {
    alignItems: 'center',
    fontFamily: 'Poppins-Bold',
    color: Colors.black,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 24,
  },
  ScrollContainer: {
    height: '75%',
    width: '95%',
    marginTop: 10,
    backgroundColor: Colors.black,
    borderRadius: 15,
    marginLeft: 10,
  },
  noAddressContainer1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  titleTextContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginLeft: 60,
  },
  imageS1: {
    width: 300,
    height: 300,
    borderRadius: 130,
    marginLeft: -25,
  },
  textContainer1: {
    alignItems: 'center',
  },
  noAddressText1: {
    fontWeight: '500',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: 'white',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.Inputtext,
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: 10,
    height: 150,
    width: '90%',
    elevation: 4,
  },
  imageContainer: {
    width: '30%',
    height: '82%',
    marginTop: 10,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 3,
  },
  subContainer: {
    height: '100%',
    width: '85%',
  },
  cardTextContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '85%',
    marginLeft: 10,
    marginTop: 10,
  },
  productName: {
    fontSize: 9,
    marginLeft: 5,
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    marginTop: -45,
  },
  price: {
    fontSize: 9,
    marginLeft: 5,
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    // marginTop: 5,
  },
  Name: {
    fontSize: 9,
    marginLeft: 5,
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    // marginTop: 5,
  },
  Qty: {
    fontSize: 9,
    marginLeft: 5,
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    // marginTop: 5,
  },
  Status: {
    fontSize: 9,
    marginLeft: 5,
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    // marginTop: 5,
  },
  name: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    marginRight: 10,
  },
  priceText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: Colors.buttonColor,
    marginRight: 50,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 40,
    height: 20,
    marginLeft: 6,
    marginTop: 15,
  },
  sizeText: {
    fontSize: 12,
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 5,
  },
  detailsdescription: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Poppins-SemiBold',
  },
  Productimage: {
    width: 90,
    height: 90,
    borderRadius: 3,
    marginLeft: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '90%',
    height: 120,
    borderColor: '#8E8E8E',
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
  arrowIcon: {
    marginLeft: '15%',
    // justifyContent: 'space-between',
  },
  orderPlaced: {
    color: 'green', // You can customize this color
  },

  returned: {
    color: Colors.buttonColor, // You can customize this color
  },
});
export default OwnerRentalstyles;
