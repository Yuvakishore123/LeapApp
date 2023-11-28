import {StyleSheet} from 'react-native';
import Colors from 'constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorText: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 20,
    color: 'white',
  },
  LottieStyle: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  retryButton: {
    height: 35,
    width: '60%',
    marginTop: 20,
    borderRadius: 25,
    marginRight: 50,
    marginLeft: '15%',
    backgroundColor: Colors.buttonColor,
  },
  retryText: {
    color: Colors.white,
    fontSize: 20,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
  },
});
export default styles;
