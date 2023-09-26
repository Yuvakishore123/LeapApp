/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import crashlytics from '@react-native-firebase/crashlytics';
import firebase from './src/utils/firebase';

if (!__DEV__) {
  crashlytics(firebase).setCrashlyticsCollectionEnabled(true);
}

AppRegistry.registerComponent(appName, () => App);
