import React from 'react';
import {render} from '@testing-library/react-native';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Owneredititems from 'screens/Owneredititems/Owneredititems';

jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('OwnerEditItems Screen', () => {
  it('renders OwnerEditItems screen', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneredititems" component={Owneredititems} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeTruthy();
  });
});
