import {Dimensions, StyleSheet} from 'react-native';
import Colors from 'constants/colors';
const {height} = Dimensions.get('window');
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    flex: 1,
    marginBottom: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.main,
  },
  paginationstyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: height / 13,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginTop: 400,
    fontSize: 25,
    marginVertical: 20,
  },
  desc: {
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  touchableText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    justifyContent: 'center',
  },
  touchablebtn: {
    height: 59,
    width: 320,
    backgroundColor: '#9747FF',
    borderRadius: 100,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  activeS: {
    width: 15,
    height: 15,
    marginTop: 30,
    borderRadius: 7,
    marginRight: 10,
    marginLeft: 10,
  },
  dotS: {
    width: 15,
    height: 15,
    borderRadius: 7,
    marginTop: 30,
    backgroundColor: 'grey',
    borderColor: 'white',
    borderWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },

  paginationS: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});
export default style;
