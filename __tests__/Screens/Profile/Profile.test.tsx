import React from 'react';
import {render, renderHook} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from 'screens/Profile/Profile';
import useProfile from 'screens/Profile/useProfile';
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('Profile Screen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  test('should render OwnerProfile correctly', () => {
    const Stack = createNativeStackNavigator();
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Test for the presence of specific elements or text
    expect(result).toBeDefined();

    // Add more assertions as needed to test the rendering of your component
  });
  it('should initialize with correct initial state', () => {
    const {result} = renderHook(() => useProfile());

    expect(result.current.isloading).toBe(false);
    // Add more initial state checks as needed
  });
});
