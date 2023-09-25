/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import crashlytics from '@react-native-firebase/crashlytics';
import {firebase} from '@react-native-firebase/analytics';
import firebaseConfig from '../LeapApp/src/utils/firebaseConfig';
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
if (!__DEV__) {
  crashlytics().setCrashlyticsCollectionEnabled(true);
}
AppRegistry.registerComponent(appName, () => App);
