// Redux imports
import {AnyAction} from 'redux';
import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';

// React Navigation hook
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
// Network connectivity check import

// Logging imports
import * as Sentry from '@sentry/react-native';
import {sentryTransport, logger} from 'react-native-logs';
// React Navigation import for StackNavigationProp
import {StackNavigationProp} from '@react-navigation/stack';

// Define the types for the navigation stack
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

// Custom hook for using ThunkDispatch in the app
export const useThunkDispatch = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  return {dispatch};
};

// Custom hook for using StackNavigationProp in the app
export const useNavigationProp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return {navigation};
};

// Default logging configuration
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

// Function to create a logger instance with the default configuration
export const logMessage = () => {
  const log = logger.createLogger(defaultConfig);
  return {log};
};

// Function to check network status and return a boolean indicating connectivity
export const networkStatus = async () => {
  const state = await NetInfo.fetch();
  return state?.isConnected;
};
