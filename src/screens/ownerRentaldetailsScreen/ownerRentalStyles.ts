import {StyleSheet} from 'react-native';
import Colors from 'constants/colors';

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
    marginLeft: '5%',
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

  card: {
    // height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    // backgroundColor: Colors.white,
    width: '90%',
    height: 100,
    // borderWidth: 0.2,
    borderColor: '#8E8E8E',
    // backgroundColor: 'pink',
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
});
export default OwnerRentalstyles;
