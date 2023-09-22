import React from 'react';
import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';
import {RouteProp} from '@react-navigation/native';
import styles from './apiErrorScreenStyles';
import {StatusCodes} from '../../utils/statusCodes';
import AsyncStorageWrapper from '../../utils/asyncStorage';

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
    case StatusCodes.NETWORK_ERROR:
      errorMessage = 'Please check your network connection.';
      break;
    case StatusCodes.NOT_FOUND:
      errorMessage = 'Oops! Something went wrong.';
      break;
    case StatusCodes.INTERNAL_SERVER_ERROR:
      errorMessage = 'Server error. Please try again later.';
      break;
    case StatusCodes.FORBIDDEN:
      AsyncStorageWrapper.removeItem('token');
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
