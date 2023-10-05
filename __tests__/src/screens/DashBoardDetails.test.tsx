import React from 'react';
import {render} from '@testing-library/react-native';

import {NavigationContainer} from '@react-navigation/native';
import DashboardDetails from 'screens/OwnerHomepage/DashboardDetails';

jest.mock('rn-fetch-blob', () => ({
  fetch: jest.fn(), // Mock the fetch method
}));
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('victory-native', () => ({
  VictoryChart: jest.fn().mockReturnValue(null), // Mock the VictoryChart component
  VictoryBar: jest.fn().mockReturnValue(null), // Mock the VictoryBar component
  VictoryAxis: jest.fn().mockReturnValue(null), // Mock the VictoryAxis component
  VictoryLabel: jest.fn().mockReturnValue(null), // Mock the VictoryLabel component
}));
jest.mock('@notifee/react-native', () => require('notifee'));
jest.mock('../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('DashBoard details', () => {
  it('render DashBoard details', () => {
    const result = render(
      <NavigationContainer>
        <DashboardDetails />
      </NavigationContainer>,
    );
    expect(result).toBeDefined();
  });
});
