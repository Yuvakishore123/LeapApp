import {url} from '../../../constants/Apis';
import ApiService from '../../../network/network';
import {logMessage} from 'helpers/helper';
import AsyncStorageWrapper from '../../../utils/asyncStorage';
import {useState, useEffect} from 'react';
import {setRole} from '../../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Animated} from 'react-native';
// Custom hook for managing the logic of a switch button to toggle between user profiles
const useSwitchButton = () => {
  // State to manage the visibility of profile switch options
  const [showOptions, setShowOptions] = useState(false);

  // Redux dispatch to update the user role in the global state
  const dispatch = useDispatch();

  // Redux selector to get the current user role from the global state
  const userType = useSelector((state: any) => state.Rolereducer.role);

  // State to track the account type (Owner/Borrower)
  const [accountType, setAccountType] = useState('');

  // Logging function from helper
  const {log} = logMessage();

  // Animated values for button and options animations
  const buttonAnimation = useState(new Animated.Value(0))[0];
  const optionsAnimation = useState(new Animated.Value(0))[0];

  // Effect to update the account type when the user role changes
  useEffect(() => {
    setAccountType(userType === 'OWNER' ? 'Owner' : 'Borrower');
  }, [userType]);

  // Function to handle the press of the switch button
  const handlePress = () => {
    setShowOptions(!showOptions);
    Animated.timing(buttonAnimation, {
      toValue: showOptions ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    Animated.timing(optionsAnimation, {
      toValue: showOptions ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Function to handle the press of a profile switch option
  const handleOptionPress = async (option: string) => {
    try {
      setShowOptions(false);
      // API call to switch user profile
      const response = await ApiService.post(
        `${url}/user/switch?profile=${option}`,
        null,
      );

      // Update the token in AsyncStorage with the new token from the response
      const newToken = response.headers.access_token;
      await AsyncStorageWrapper.removeItem('token');
      await AsyncStorageWrapper.setItem('token', newToken);

      // Update the account type and user role in the global state
      setAccountType(option === 'OWNER' ? 'Owner' : 'Borrower');
      dispatch(setRole(option));
    } catch (error) {
      // Log any errors that occur during the switching process
      log.error('error during switching profile', error);
    }
  };

  // Return the functions and state for external use
  return {
    handleOptionPress,
    handlePress,
    accountType,
    showOptions,
    optionsAnimation,
  };
};

// Export the custom hook for use in functional components
export default useSwitchButton;
