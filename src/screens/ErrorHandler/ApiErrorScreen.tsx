import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Lottie from 'lottie-react-native';

const ApiErrorScreen = ({route}) => {
  const {status} = route.params;
  return (
    <View style={style.container}>
      <View>
        <Lottie
          source={require('../../../assets/apiError.json')}
          autoPlay
          style={style.LottieStyle}
        />
      </View>
      <Text style={style.errorText}>
        Oops! Something went wrong. status : {status}
      </Text>
    </View>
  );
};

export default ApiErrorScreen;

const style = StyleSheet.create({
  Lottiestyle: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: '50%',
    justifyContent: 'center',
  },
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
  btnStyle: {
    padding: 5,
    marginTop: 15,
    backgroundColor: 'purple',
    borderRadius: 3,
  },
  btnText: {
    fontSize: 20,
    color: 'white',
  },
  LottieStyle: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
