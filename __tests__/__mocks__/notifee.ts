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
  createChannel: jest.fn(),
  createNotification: jest.fn(),
  displayNotification: jest.fn(),
  getInitialNotification: jest.fn(),
  onForegroundEvent: jest.fn(),
  onBackgroundEvent: jest.fn(),
  AndroidImportance,
  AndroidColor, // Make sure AndroidColor is included in the export
};

export default notifee;
