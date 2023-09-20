import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
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
  const [, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
  };
  const {status} = route.params;
  const errorMessage =
    status === null
      ? 'Please check your network connection '
      : `Oops! Something went wrong. ${status} error`;

  return (
    <View style={styles.container}>
      <View>
        <Lottie
          source={require('../../../assets/Internetlost.json')}
          autoPlay
          style={styles.LottieStyle}
        />
      </View>
      <Text style={styles.errorText}>{errorMessage}</Text>
      {status !== null && (
        <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ApiErrorScreen;
