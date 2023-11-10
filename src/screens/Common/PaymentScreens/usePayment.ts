import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useContext, useEffect} from 'react';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';
type RootStackParamList = {
  CartScreen: undefined;
  UserHomescreen: {screen: any};
  ProfileScreen: {screen: any};
};

const usePayment = () => {
  const {getContainerStyle, getTextColor} = useContext(ColorSchemeContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    const resetStack = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'CartScreen', params: {screen: 'Cart'}}],
      });
    }, 7000);
    return () => clearTimeout(resetStack);
  }, [navigation]);
  return {navigation, getContainerStyle, getTextColor};
};

export default usePayment;
