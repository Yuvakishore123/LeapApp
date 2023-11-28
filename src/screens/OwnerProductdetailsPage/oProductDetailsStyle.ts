import {StyleSheet} from 'react-native';
import Colors from 'constants/colors';
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },

  dheader: {
    marginTop: -30,
    top: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 1,
    marginLeft: 15,
  },
  detailsContainer: {
    height: '100%',
    width: '100%',
    marginTop: -50,
    paddingHorizontal: 20,
    backgroundColor: Colors.main,
    flex: 20,
  },

  productImagecon: {
    flexDirection: 'row',
  },
  headingtext: {
    marginTop: 30,
    fontSize: 20,

    fontFamily: 'Poppins-SemiBold',
    color: Colors.white,
  },
  image: {
    flex: 0.7,
    justifyContent: 'center',
  },
  startext: {
    marginTop: -100,
    color: Colors.white,
    fontFamily: 'Poppins-Bold',
    marginLeft: 10,
    zIndex: 1,
    fontSize: 35,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 5,
  },

  detailsdescription: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '400',
    color: Colors.buttonColor,
  },

  imgBack: {
    height: 500,
    width: 405,
    backgroundColor: 'green',
    marginLeft: -5,
  },
  titleText: {marginTop: 20},
});
export default styles;
