import {useState, useEffect} from 'react';
import {setRole} from '../../../redux/actions/Actions';
import {useDispatch, useSelector} from 'react-redux';
import {Animated} from 'react-native';

import {url} from '../../../constants/Apis';
import ApiService from '../../../network/Network';
import {logMessage} from 'helpers/Helper';
import {HTTP_STATUS_CODES} from 'constants/HttpStatusCode';
import {Request_SwitchError, Switchrole_Error} from 'constants/ErrorCodes';
import asyncStorageWrapper from 'constants/AsyncStorageWrapper';
const useSwitchButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const userType = useSelector((state: any) => state.Rolereducer.role);
  const [accountType, setAccountType] = useState('');
  // Animations setup
  const buttonAnimation = useState(new Animated.Value(0))[0];
  const optionsAnimation = useState(new Animated.Value(0))[0];
  // Update account type when user type changes
  useEffect(() => {
    setAccountType(userType === 'OWNER' ? 'Owner' : 'Borrower');
  }, [userType]);
  // Toggle options visibility and animate button/options
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
  // Handle selection of account type option
  const handleOptionPress = async (option: string) => {
    try {
      setShowOptions(false);
      // Make a request to switch account type
      const response = await ApiService.post(
        `${url}/user/switch?profile=${option}`,
        null,
      );

      if (response.status === HTTP_STATUS_CODES.OK) {
        // Update token and role on successful switch
        const newToken = response.headers.access_token;
        await asyncStorageWrapper.removeItem('token');
        await asyncStorageWrapper.setItem('token', newToken);
        dispatch(setRole(option));
        setAccountType(option === 'OWNER' ? 'Owner' : 'Borrower');
      } else {
        logMessage.error(Request_SwitchError);
      }
    } catch (error) {
      logMessage.error(Switchrole_Error);
    }
  };
  return {
    handleOptionPress,
    handlePress,
    accountType,
    setAccountType,
    setRole,
    setShowOptions,
    showOptions,
    optionsAnimation,
  };
};
export default useSwitchButton;
