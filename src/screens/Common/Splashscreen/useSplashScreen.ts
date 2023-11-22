// Import necessary modules and components
import {useContext} from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

// Define the navigation stack parameter list
type RootStackParamList = {
  Login: undefined;
};

// Custom hook for handling functionality related to the splash screen
export const useSplashScreen = () => {
  // Access navigation methods and color scheme context
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {colorScheme, getContainerStyle, getTextColor} =
    useContext(ColorSchemeContext);

  // Function to handle the press event when navigating to the login screen
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  // Return necessary variables and functions
  return {
    colorScheme,
    handleLoginPress,
    getTextColor,
    getContainerStyle,
  };
};
