// __mocks__/notifee.js

// Mocking the methods and constants from the notifee module
const AndroidImportance = {
  Max: 5,
  HIGH: 'high',
  Default: 3,
  Low: 2,
  Min: 1,
  None: 0,
};
const AndroidColor = {
  RED: 'red',
  BLUE: 'blue',
  GREEN: 'green',
  // Add other color options as needed
};
const notifee = {
  createChannel: jest.fn(),
  createNotification: jest.fn(),
  displayNotification: jest.fn(),
  getInitialNotification: jest.fn(),
  onForegroundEvent: jest.fn(),
  onBackgroundEvent: jest.fn(),
  AndroidImportance,
  AndroidColor,
};

export default notifee;
