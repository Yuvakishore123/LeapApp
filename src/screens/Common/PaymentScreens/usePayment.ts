// Import necessary modules and components
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useContext, useEffect} from 'react';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

// Define the navigation stack parameter list
type RootStackParamList = {
  CartScreen: undefined;
  UserHomescreen: {screen: any};
  ProfileScreen: {screen: any};
};

// Custom hook for handling payment-related functionality
const usePayment = () => {
  // Access color scheme context to get styles
  const {getContainerStyle, getTextColor} = useContext(ColorSchemeContext);

  // Access navigation methods and stack parameters
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // useEffect hook to reset the navigation stack after a delay
  useEffect(() => {
    // Set a timeout to reset the navigation stack after 7000 milliseconds (7 seconds)
    const resetStack = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'CartScreen', params: {screen: 'Cart'}}],
      });
    }, 7000);

    // Cleanup function to clear the timeout when the component is unmounted
    return () => clearTimeout(resetStack);
  }, [navigation]);

  // Return necessary variables and functions
  return {navigation, getContainerStyle, getTextColor};
};

// Export the custom hook for use in other components
export default usePayment;
