import React from 'react';
import {View, Text} from 'react-native';
import Lottie from 'lottie-react-native';
import {RouteProp} from '@react-navigation/native';
import styles from './apiErrorScreenStyles';
type RootStackParamList = {
  ApiErrorScreen: {status: number | null};
};

type ApiErrorScreenRouteProp = RouteProp<RootStackParamList, 'ApiErrorScreen'>;

interface ApiErrorScreenProps {
  route: ApiErrorScreenRouteProp;
}

const ApiErrorScreen: React.FC<ApiErrorScreenProps> = ({route}) => {
  const {status} = route.params;
  const errorMessage =
    status === null
      ? 'Please check your network connection '
      : `Oops! Something went wrong. ${status} error`;

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
