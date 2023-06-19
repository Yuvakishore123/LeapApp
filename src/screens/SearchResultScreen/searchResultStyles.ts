import {StyleSheet} from 'react-native';

import Colors from '../../constants/colors';
const style = StyleSheet.create({
  container: {
    width: '85%',
    height: 200,
    borderRadius: 8,
    backgroundColor: Colors.white,
    marginLeft: 15,
    margin: 10,
    // elevation: 4,
    shadowColor: Colors.Textinput,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addAddressText: {
    marginTop: 15,
    marginLeft: 80,
    fontSize: 20,
    color: Colors.black,
    // fontWeight: 'bold',
    fontFamily: 'Poppins-SemiBold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addAddressHeader: {
    flexDirection: 'row',
  },
  backBtn: {
    marginTop: 15,
    marginLeft: 20,
    width: 40,
    height: 40,
    flexDirection: 'row',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  filter: {
    marginTop: 20,
    marginLeft: 40,
    width: 40,
    height: 40,
    flexDirection: 'row',
    borderRadius: 100,
    alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: Colors.black,
  },
  textConatiner: {marginLeft: 25, marginTop: 20},
  textStyle: {
    color: '#3E54AC',
    fontSize: 18,
    fontFamily: 'poppins',
    fontWeight: 'bold',
  },
  imageContainer: {
    // backgroundColor: 'green',
    width: '100%',
    height: '30%',
    // borderRadius: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  image: {
    width: '100%',
    height: 145,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    // borderBottomRightRadius: 8,
    // borderBottomLeftRadius: 8,
  },
  name: {
    fontSize: 12,
    width: 120,
    height: 20,
    marginTop: 5,
    // fontWeight: '600',
    fontFamily: 'Poppins-Regular',
    color: Colors.black,
  },
  touchableContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 190,
    height: 50,
    borderRadius: 10,
    marginLeft: 50,
    backgroundColor: Colors.buttonColor,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.buttonColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: '50%',
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  sizeDropdown: {
    marginBottom: 16,
  },
  filterText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonColor,
    marginBottom: 8,
    marginLeft: 10,
  },
  headertext: {
    fontSize: 20,
    color: Colors.buttonColor,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 8,
    marginLeft: '40%',
  },
  priceText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonColor,
    marginLeft: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  touchablecontainer: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 20,
    // padding: 12,
    width: '45%',
    height: 40,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '45%',
  },
  closetouchablecontainer: {
    backgroundColor: Colors.gray,
    borderRadius: 30,
    // padding: 12,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '45%',
  },
  applyText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  closeText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
  FilterText: {color: Colors.black},
  price: {
    fontSize: 10,
    // fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    color: Colors.buttonColor,
    marginTop: 5,
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
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    // height: 40,
    width: '100%',
    // backgroundColor: Colors.white,
    marginTop: 60,
    // borderRadius: 5,
    padding: 6,
    marginLeft: 5,
  },
  titleTextContainer: {
    marginTop: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '90%',
    backgroundColor: Colors.main,
  },
  titleText: {
    marginTop: 40,
    fontSize: 20,
    // fontWeight: '500',
    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },
  imageS: {
    borderRadius: 200,
    width: 250,
    height: 250,
    marginLeft: -15,
    backgroundColor: Colors.main,
  },
  cardView: {
    width: '50%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  innerCard: {
    width: '100%',
  },
  noResultsView: {width: '100%', height: '100%'},
  innerView2: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewStyle1: {flexDirection: 'row', justifyContent: 'space-between'},
  outerStyle: {width: '100%', height: '100%'},
  btnStyle: {flexDirection: 'row'},
  marginStyle: {marginTop: 20},
});
export default style;
