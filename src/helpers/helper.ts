import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

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
