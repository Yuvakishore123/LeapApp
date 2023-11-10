import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.main,

    width: '100%',
    height: '100%',

    borderRadius: 10,
  },
  backButton: {
    backgroundColor: Colors.black,
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
    shadowColor: Colors.black,
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
    shadowColor: Colors.black,
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
    color: Colors.iconscolor,
    fontFamily: 'poppins',
    marginTop: 5,
    marginLeft: 2,
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

  container: {
    height: '100%',
    backgroundColor: Colors.lavander,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    height: '100%',
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

    color: Colors.white,
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
    color: Colors.iconscolor,
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
