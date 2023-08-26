import {StyleSheet} from 'react-native';
import Colors from '../../constants/colors';
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.main,

    width: '100%',
    height: '100%',

    borderRadius: 10,
  },
  backButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 5,
    marginLeft: 10,
    marginBottom: 10,
    height: 100,
    width: '96%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  },
  arrowIcon: {
    // marginLeft: '90%',
    marginTop: 5,
  },
  modalContainer: {
    alignItems: 'center',

    borderRadius: 10,
    padding: 5,
    marginLeft: '5%',
    marginBottom: 10,
    marginTop: 20,
    height: '70%',
    width: '91%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButton: {
    backgroundColor: Colors.buttonColor,
    width: '20%',
    borderRadius: 13,
    marginTop: 20,
    marginLeft: '75%',
  },
  closeButtonText: {
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
    alignItems: 'center',
    marginLeft: 17,
  },
  cardTextContainer: {
    justifyContent: 'space-between',

    width: '100%',
    marginRight: 30,
  },
  orderInfoContainer: {
    justifyContent: 'space-between',

    width: '100%',
    marginLeft: 10,
  },
  name: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3E54AC',
    fontFamily: 'poppins',
    marginTop: 5,
    marginLeft: 2,
  },
  rentedname: {
    fontSize: 7,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'poppins',
  },
  productname: {
    fontSize: 14,

    color: Colors.buttonColor,
    fontFamily: 'Poppins-SemiBold',
  },
  QuantityText: {
    fontSize: 13,

    color: Colors.black,
    fontFamily: 'Poppins-Medium',
  },
  orderText: {
    fontSize: 13,

    color: Colors.green,
    fontFamily: 'Poppins-Medium',
  },
  plcedText: {
    fontSize: 12,
    width: '45%',
    height: 20,
    fontFamily: 'Poppins-Bold',
  },
  orderDate: {
    fontSize: 12,
    width: '25%',
    height: 20,

    color: Colors.black,
    fontFamily: 'Poppins-Bold',
  },
  orderid: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    marginRight: '60%',
  },
  totalOrderText: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: 'Poppins-Bold',
    marginRight: '60%',
    width: '50%',
  },
  ordername: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
  },
  productName: {
    fontSize: 14,
    color: Colors.black,
    fontFamily: 'Poppins-Bold',

    marginTop: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#3E54AC',
  },
  rentButton: {
    backgroundColor: '#3E54AC',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3E54AC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,

    backgroundColor: '#3E54AC',
    width: 40,
    height: 25,
    justifyContent: 'space-between',
  },
  DateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3E54AC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,

    width: 80,
    height: 20,
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  quantityButton: {
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 16,
    color: '#3E54AC',
    fontWeight: 'bold',
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3E54AC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sizeButton: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
    borderColor: '#3E54AC',
  },
  sizeText: {
    fontSize: 16,
    color: '#3E54AC',
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  errorContainer: {
    backgroundColor: '#FDD',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: '#F00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    height: '100%',
    backgroundColor: '#ECF2FF',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    height: '100%',
  },
  TextTotal: {
    fontWeight: 'semibold',
    height: 29,
    width: 130,
    top: 5,
    color: '#3E54AC',
  },
  TextGrand: {
    fontWeight: 'semibold',
    height: 29,
    width: 130,
    top: -20,
    left: 20,
    color: '#3E54AC',
    fontSize: 18,
  },
  RemoveButton: {
    height: 20,
    width: 40,
    backgroundColor: '#3E54AC',

    borderRadius: 3,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  UpdateButton: {
    height: 20,
    width: 40,
    backgroundColor: 'white',

    marginLeft: 30,
    borderRadius: 3,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  PaymentButton: {
    height: 60,
    width: 320,
    backgroundColor: '#3E54AC',

    marginTop: 5,

    borderRadius: 8,
    color: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  PaymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    justifyContent: 'center',
  },
  RemoveButtonText: {
    color: 'white',
    fontSize: 9,
    fontWeight: '500',
    justifyContent: 'center',
  },
  UpdateButtonText: {
    color: Colors.iconscolor,
    fontSize: 9,
    fontWeight: '900',
    justifyContent: 'center',
  },
  titleContainer: {
    width: '70%',
    height: 80,
    flexDirection: 'row',
    marginTop: 10,

    justifyContent: 'space-between',

    borderRadius: 5,
  },
  titleText: {
    fontSize: 24,

    color: 'white',
    fontFamily: 'Poppins-SemiBold',
  },

  image: {
    width: '40%',
    height: 134,
    backgroundColor: 'black',
    borderRadius: 5,
    marginTop: 8,
    marginLeft: 10,
    marginBottom: 5,
  },
  priceText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: 'green',
    marginRight: 35,
  },

  buttonTextDecrement: {
    fontSize: 12,
    fontWeight: 'bold',
    top: -3,
    left: 3,
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
    marginLeft: -20,
  },
  textContainer1: {
    alignItems: 'center',
  },
  noAddressText1: {
    fontWeight: '500',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: '#3E54AC',
  },

  viewStyle: {backgroundColor: Colors.main, width: '100%', height: '120%'},
  viewS: {
    flexDirection: 'row',
    width: '90%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  marginM: {marginTop: 10, marginLeft: 10},
});
export default styles;
