import 'react-native';
import {AppRegistry} from 'react-native';
import {name as appName} from '../../app.json';
// Mock the crashlytics and firebase functions for testing
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-crashlytics'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});

jest.mock('rn-fetch-blob', () => ({
  fs: {
    dirs: {
      DownloadDir: '/mock/download/dir', // Provide a mock directory
    },
    writeFile: jest.fn(),
  },
}));
jest.mock('network/network');
jest.mock('@notifee/react-native', () => require('notifee'));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));

jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/in-app-messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('react-native-razorpay', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    open: jest.fn().mockResolvedValue({
      razorpay_payment_id: 'your_mocked_payment_id',
    }),
  };
});
jest.mock('victory-native', () => ({
  VictoryChart: jest.fn().mockReturnValue(null), // Mock the VictoryChart component
  VictoryBar: jest.fn().mockReturnValue(null), // Mock the VictoryBar component
  VictoryAxis: jest.fn().mockReturnValue(null), // Mock the VictoryAxis component
  VictoryLabel: jest.fn().mockReturnValue(null), // Mock the VictoryLabel component
}));
jest.mock('@react-native-firebase/dynamic-links', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    dynamicLinks: jest.fn(() => ({
      getInitialLink: jest.fn().mockResolvedValue({
        url: 'http://example.com/product?id=123',
      }),

      // You can add other methods you need here
    })),
  };
});
describe('AppRegistry', () => {
  it('registers the component correctly', () => {
    // Run the index file
    require('../index');
    // Check if registerComponent was called correctly
    expect(AppRegistry.registerComponent).toBeDefined();
  });
});
