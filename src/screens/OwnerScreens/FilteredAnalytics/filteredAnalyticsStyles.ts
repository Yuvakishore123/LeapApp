import {StyleSheet} from 'react-native';
import Colors from '../../../constants/colors';

const styles = StyleSheet.create({
  exportContainer: {
    width: '80%',
    height: 40,
    backgroundColor: Colors.buttonColor,
    borderRadius: 10,
    justifyContent: 'center',
    marginLeft: '10%',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  filterView: {
    marginLeft: 20,
  },
  exportText: {
    color: Colors.white,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },

  titleStyle: {
    color: Colors.black,
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',

    marginLeft: 25,
    marginTop: 15,
  },

  headingtext: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 16,

    fontFamily: 'Poppins-Medium',
    color: Colors.black,
  },

  dashcard: {
    backgroundColor: Colors.buttonColor,
    borderRadius: 10,
    padding: 10,
    width: '85%',

    margin: 28,
    height: 140,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 4,
  },

  dashcardContainer: {
    width: '50%',
    height: 150,

    flexDirection: 'row',
  },

  dashboardimage: {
    width: '70%',
    height: 120,
    borderRadius: 8,
  },

  cardStyle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    width: '100%',
    color: Colors.white,
    marginLeft: '10%',
  },

  textContainer1: {
    alignItems: 'center',
  },
  noAddressText1: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    color: Colors.black,
  },
  noAddressText2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginTop: 3,
    marginBottom: 10,
    color: Colors.black,
  },
  overlay: {
    height: 163,
    width: '150%',

    backgroundColor: Colors.white,
    borderRadius: 15,
    justifyContent: 'center',
    elevation: 4,
    alignItems: 'center',
  },
  axisLabel: {
    marginLeft: 150,
  },
  axisLabel1: {
    color: 'black',

    fontSize: 10,
    height: 120,
    width: 30,
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
  },
  btnDirection: {flexDirection: 'row'},
  scrollDirection: {marginTop: 50},
  dateView: {marginTop: 20, marginBottom: 20, flexDirection: 'row'},
  chartView: {
    flexDirection: 'row',
    width: '10%',
    justifyContent: 'space-between',
  },
  xAxisS: {marginLeft: 20, marginBottom: 10, marginTop: 5},
  animationS: {height: 300, width: 400},
  textDirection: {flexDirection: 'column', marginLeft: 5},
  spinnerS: {color: Colors.white},
});
export default styles;
