import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {useNavigation} from '@react-navigation/native';
import {sentryTransport, logger} from 'react-native-logs';
import * as Sentry from '@sentry/react-native';

// Define the types for the navigation stack
type RootStackParamList = {
  Login: undefined;
  Subcategory: {categoryId: number};
  SearchResultsScreen: {searchResults: null[]};
};

// Custom hook for dispatching Thunk actions
export const useThunkDispatch = () => {
  const dispatch = useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
  return {dispatch};
};

// Custom hook for accessing navigation prop
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
// Logger instance with the default configuration
export const logMessage = logger.createLogger(defaultConfig);
