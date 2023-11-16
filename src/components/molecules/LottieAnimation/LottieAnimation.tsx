import {View, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import styles from './LottieAnimationStyles';

interface LottieAnimationProps {
  source: any;
  style?: StyleProp<ViewStyle>;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({source, style}) => {
  return (
    <View>
      <View style={styles.loaderContainer} testID="lottie-component">
        <Lottie source={source} style={style} autoPlay />
      </View>
    </View>
  );
};

export default LottieAnimation;
