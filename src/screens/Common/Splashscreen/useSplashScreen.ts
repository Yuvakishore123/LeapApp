import {useContext} from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

type RootStackParamList = {
  Login: undefined;
};

export const useSplashScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {colorScheme, getContainerStyle, getTextColor} =
    useContext(ColorSchemeContext);

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return {
    colorScheme,
    handleLoginPress,
    getTextColor,
    getContainerStyle,
  };
};
