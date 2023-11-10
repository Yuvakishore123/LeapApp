import {StyleSheet} from 'react-native';
import Colors from 'constants/colors';
const style = StyleSheet.create({
  container: {
    width: '42%',
    height: 207,
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginLeft: '3.5%',
    marginRight: '5%',
    marginTop: 10,
    marginBottom: 10,
    shadowColor: Colors.containerColor,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 2,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTextContainer: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: Colors.gray,
    elevation: 20,
    width: '60%',
    padding: 10,
    marginVertical: 10,
    marginLeft: '19%',
    marginTop: '40%',
    borderRadius: 50,
  },
  errorMessage: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
  CategoriesText: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: Colors.black,
    marginTop: 15,
    marginLeft: 15,
  },
  Seetext: {
    fontSize: 16,

    fontFamily: 'Poppins-Medium',
    color: Colors.buttonColor,
    marginTop: 25,
    marginRight: 5,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
  },
  mainContainer: {
    height: '100%',
    width: '100%',
  },
  blacktheme: {
    backgroundColor: Colors.black,
  },
  whiteTheme: {
    backgroundColor: Colors.main,
  },
  blackText: {
    color: Colors.black,
  },
  whitetext: {
    color: Colors.main,
  },
  cardColor: {
    backgroundColor: Colors.Textinput,
  },
  Productstext: {
    color: Colors.black,

    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    marginLeft: 20,
    marginBottom: 5,
  },
  imageContainer: {
    backgroundColor: Colors.containerColor,
    width: '100%',
    height: 150,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  name: {
    fontSize: 12,

    fontFamily: 'Poppins-Medium',
    color: Colors.black,
    marginLeft: 10,
    marginTop: 5,
    width: 100,
    height: 20,
  },
  addButton: {
    borderColor: Colors.iconscolor,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    height: 18,
    width: 18,
  },
  price: {
    fontSize: 12,
    fontWeight: '900',
    color: Colors.buttonColor,
    marginLeft: 10,
    marginTop: 5,
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
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInputContainer: {
    height: 45,
    width: '90%',
    backgroundColor: Colors.white,
    marginLeft: 20,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.7,
    shadowRadius: 2,
    elevation: 4,
  },
  subname: {
    color: Colors.black,
    fontSize: 12,
    height: 100,
    marginLeft: 30,
    alignItems: 'center',
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  scroll: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  corosal: {
    height: '100%',
    width: '100%',
  },
  img: {
    height: 72,
    width: 72,
    borderRadius: 50,
    marginLeft: 15,
  },
  corosalView: {
    height: '100%',
    width: '100%',
  },
  corousalContainer: {
    marginTop: 30,
    width: '100%',
    height: 120,
    borderRadius: 20,
  },
  corousalSubname: {
    color: Colors.black,
    fontSize: 14,
    height: 100,
    marginLeft: 30,
    alignItems: 'center',
    marginTop: 10,
    fontFamily: 'Poppins-Regular',
  },
  corousalScroll: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  corousalImage: {
    height: 72,
    width: 72,
    borderRadius: 100,
    padding: 30,
    marginLeft: 15,
    opacity: 1,
  },

  card: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default style;
