import {url} from '../../../constants/Apis';
import ApiService from '../../../network/network';
import {logMessage} from 'helpers/helper';
import AsyncStorageWrapper from '../../../utils/asyncStorage';
import {useState, useEffect} from 'react';
import {setRole} from '../../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import {Animated} from 'react-native';
const useSwitchButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();
  const userType = useSelector((state: any) => state.Rolereducer.role);
  const [accountType, setAccountType] = useState('');
  const {log} = logMessage();

  const buttonAnimation = useState(new Animated.Value(0))[0];
  const optionsAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    setAccountType(userType === 'OWNER' ? 'Owner' : 'Borrower');
  }, [userType]);

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

  const handleOptionPress = async (option: string) => {
    try {
      setShowOptions(false);

      const response = await ApiService.post(
        `${url}/user/switch?profile=${option}`,
        null,
      );

      const newToken = response.headers.access_token;
      await AsyncStorageWrapper.removeItem('token');
      await AsyncStorageWrapper.setItem('token', newToken);

      setAccountType(option === 'OWNER' ? 'Owner' : 'Borrower');
      dispatch(setRole(option));
    } catch (error) {
      log.error('error during switching profile', error);
    }
  };

  return {
    handleOptionPress,
    handlePress,
    accountType,
    showOptions,
    optionsAnimation,
  };
};
export default useSwitchButton;
