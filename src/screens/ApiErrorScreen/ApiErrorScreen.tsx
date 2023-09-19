import React from 'react';
import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';
import {RouteProp} from '@react-navigation/native';
import styles from './apiErrorScreenStyles';
import {StatusCodes} from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  ApiErrorScreen: {status: any};
};

type ApiErrorScreenRouteProp = RouteProp<RootStackParamList, 'ApiErrorScreen'>;

interface ApiErrorScreenProps {
  route: ApiErrorScreenRouteProp;
}

const ApiErrorScreen: React.FC<ApiErrorScreenProps> = ({route}) => {
  const {status} = route.params;
  let errorMessage;

  switch (status) {
    case null:
      errorMessage = 'Please check your network connection.';
      break;
    case 404:
      errorMessage = 'Oops! Something went wrong.';
      break;
    case 500:
      errorMessage = 'Server error. Please try again later.';
      break;
    case StatusCodes.FORBIDDEN:
      AsyncStorage.removeItem('token');
      break;
    default:
      errorMessage = 'An unknown error occurred.';
      break;
  }
  return (
    <View style={styles.container}>
      <View>
        <Lottie
          source={require('../../../assets/apiError.json')}
          autoPlay
          style={styles.LottieStyle}
        />
      </View>
      <Text style={styles.errorText}>{errorMessage}</Text>
    </View>
  );
};

export default ApiErrorScreen;
