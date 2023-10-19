import {firebase} from '@react-native-firebase/messaging';
const googleApiKey = process.env.GOOGLE_API_KEY;

if (firebase?.apps.length === 0) {
  firebase?.initializeApp({
    apiKey: googleApiKey,
    authDomain: 'In-App Messaging.firebase.com',
    databaseURL: 'https://in-app-messaging-feed0-default-rtdb.firebaseio.com/',
    projectId: 'in-app-messaging-feed0',
    storageBucket: 'in-app-messaging-feed0.appspot.com',
    messagingSenderId: '280824523367',
    appId: '1:280824523367:android:5d9cfd3fae3dc9e65b02c2',
  });
}
export default firebase;
