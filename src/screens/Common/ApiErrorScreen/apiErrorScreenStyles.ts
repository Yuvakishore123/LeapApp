import colors from 'constants/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  errorText: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 20,
    color: colors.white,
  },
  LottieStyle: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
export default styles;
