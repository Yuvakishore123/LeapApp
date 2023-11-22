import React, {useEffect, useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';

import {LogBox} from 'react-native';

import {Provider} from 'react-redux';
import {store} from './src/redux/store';

import {ColorSchemeProvider} from './ColorSchemeContext';

import * as Sentry from '@sentry/react-native';

import {setNavigationReference} from '../LeapApp/src/network/network';

import {RootNavigation} from '../LeapApp/src/navigation/RootNavigation/RootNavigation';
import DeepLinking from 'helpers/Deeplinking/Deeplinking';

LogBox.ignoreAllLogs();
Sentry.init({
  dsn: 'https://1a526180b7ecdaa480950fe3b01322a4@o4505635340419072.ingest.sentry.io/4505724329918464',
  tracesSampleRate: 0.2,
  _experiments: {
    // The sampling rate for profiling is relative to TracesSampleRate.
    // In this case, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
  },
});

const App = () => {
  const navigationRef = useRef<NavigationContainerRef | null>(null);

  useEffect(() => {
    setNavigationReference(navigationRef.current);
  }, []);

  return (
    <ColorSchemeProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <DeepLinking />
          <RootNavigation />
        </NavigationContainer>
      </Provider>
    </ColorSchemeProvider>
  );
};

export default Sentry.wrap(App);
