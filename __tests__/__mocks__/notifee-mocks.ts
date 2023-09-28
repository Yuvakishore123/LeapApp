// __mocks__/notifee.js

// Mocking the methods and constants from the notifee module
const AndroidImportance = {
  Max: 5,
  High: 4,
  Default: 3,
  Low: 2,
  Min: 1,
  None: 0,
};

const notifee = {
  createChannel: jest.fn(),
  createNotification: jest.fn(),
  displayNotification: jest.fn(),
  getInitialNotification: jest.fn(),
  onForegroundEvent: jest.fn(),
  onBackgroundEvent: jest.fn(),
  AndroidImportance,
  AndroidColor: {},
};

export default notifee;
