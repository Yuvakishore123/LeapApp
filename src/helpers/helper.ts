import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import messaging from '@react-native-firebase/messaging';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Subcategory: {categoryId: number};
  SearchResultsScreen: {searchResults: null[]};
};
export const useThunkDispatch = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  return {dispatch};
};
export const useNavigationProp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return {navigation};
};
export const onClickNotification = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    const navigation = useNavigation();
    // const {MyOrder} = remoteMessage.data;
    console.log(remoteMessage.data);

    // Use your navigation library to navigate to the desired screen
    // Example using React Navigation:
    navigation.navigate('MyOrder');
  });
};
