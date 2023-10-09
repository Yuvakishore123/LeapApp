import React from 'react';
import {render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import DashboardDetails from 'screens/OwnerHomepage/DashboardDetails';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});
jest.mock('victory-native', () => ({
  VictoryChart: jest.fn().mockReturnValue(null), // Mock the VictoryChart component
  VictoryBar: jest.fn().mockReturnValue(null), // Mock the VictoryBar component
  VictoryAxis: jest.fn().mockReturnValue(null), // Mock the VictoryAxis component
  VictoryLabel: jest.fn().mockReturnValue(null), // Mock the VictoryLabel component
}));
jest.mock('@react-native-firebase/in-app-messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('Analytics Page', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  test('renders Analytics correctly', () => {
    const result = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );

    expect(result).toBeDefined();
  });
});
