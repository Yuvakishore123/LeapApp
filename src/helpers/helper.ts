import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';

import {useNavigation} from '@react-navigation/native';
import {sentryTransport, logger} from 'react-native-logs';
import * as Sentry from '@sentry/react-native';
import NetInfo from '@react-native-community/netinfo';

type RootStackParamList = {
  Login: undefined;
  Subcategory: {categoryId: number};
  SearchResultsScreen: {searchResults: null[]};
  UProductDetails: {product: []};
  CategoryScreen: undefined;
  FilteredAnalytics: undefined;
  Owneraddresspage: undefined;
  Owneredititems: undefined;
  OwnerEditProfile: undefined;
};
export const useThunkDispatch = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  return {dispatch};
};
export const useNavigationProp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return {navigation};
};
export const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  transport: sentryTransport,
  transportOptions: {
    SENTRY: Sentry,
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
    extensionColors: {
      root: 'magenta',
      home: 'green',
    },
    async: true,
    dateFormat: 'time',
    printLevel: true,
    printDate: true,
    enabled: true,
  },
};
export const logMessage = () => {
  const log = logger.createLogger(defaultConfig);
  return {log};
};
export const networkStatus = async () => {
  const state = await NetInfo.fetch();
  return state?.isConnected;
};
