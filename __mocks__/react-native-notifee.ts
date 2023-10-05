// __mocks__/notifee.js

const AndroidImportance = {
  High: 4,
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
  AndroidImportance,
  AndroidColor,
  // Add any other functions or properties you use from notifee
  createNotification: jest.fn(),
  cancelNotification: jest.fn(),
  // Add mock implementations for other notifee functions
};

export default notifee;
