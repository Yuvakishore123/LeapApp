import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

const styles = StyleSheet.create({
  Fullcontainer: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.main,
  },

  mainContainer: {
    width: '100%',
    borderRadius: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    marginLeft: 23,
    marginTop: 15,
    height: 140,
    width: '90%',
    elevation: 4,
    marginBottom: 10,
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 30,
  },
  textCheckbox: {
    color: Colors.black,
    fontSize: 12,
    marginRight: 10,
    marginBottom: 20,
    fontFamily: 'Poppins-Medium',
    textDecorationLine: 'underline',
  },

  addressText: {
    color: Colors.black,
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Poppins-SemiBold',
  },
  addressButton: {
    height: 35,
    marginLeft: 20,
    width: 120,
    borderRadius: 4,
  },
  imageContainer: {
    width: '30%',
    height: '90%',
    marginTop: 5,
    marginLeft: 5,
  },
  checkboxContainer: {
    borderColor: 'black',
    marginLeft: 0,
    margin: 0,
    padding: 0,
    backgroundColor: 'white ',
    borderWidth: 0,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  cardTextContainer: {
    width: '60%',
  },
  productContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
    marginRight: 25,
  },
  productname: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'Poppins-SemiBold',
  },

  addresscard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginLeft: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  addresschangeText: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: Colors.buttonColor,
    marginTop: 7,
    marginLeft: 10,
    alignItems: 'center',
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SizeandDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  DateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 8,
    width: '40%',
    height: 20,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
  },

  quantityText: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 10,
    marginLeft: 8,
  },

  sizeText: {
    fontSize: 12,
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },

  container: {
    backgroundColor: '#ECF2FF',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  PaymentButton: {
    flexDirection: 'row',
    height: 60,
    width: '90%',
    backgroundColor: Colors.buttonColor,
    marginTop: 5,
    borderRadius: 100,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  PaymentButtonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 20,
    fontFamily: 'Poppins-Medium',
  },

  priceText: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonColor,
    marginLeft: 26,
  },

  addressContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  city: {
    marginLeft: 15,
    width: 130,
    height: 70,
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },

  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    width: '90%',
    height: 120,
    borderColor: '#8E8E8E',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 10,
    elevation: 4,
  },

  DateTxt: {
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.black,
    width: '86%',
    height: 12,
    fontSize: 9,
    marginLeft: 4,
    fontFamily: 'Poppins-Medium',
  },

  GrandtotalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: 25,
    marginTop: 20,
  },
  shippingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
    marginLeft: 25,
  },
  priceTotalText: {
    fontSize: 16,
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },
  priceTotal: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
  },
  GrandtotalText: {
    color: Colors.black,
    fontFamily: 'Poppins-Medium',
    marginLeft: 5,
    fontSize: 16,
  },

  checkoutcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: Colors.main,
  },
  checkoutimage: {
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addresstext: {
    width: 60,
    marginLeft: 10,
    height: 20,
    marginTop: 20,
    color: Colors.black,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
  },
});
export default styles;
