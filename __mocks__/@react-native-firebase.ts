const analytics = {
  logEvent: jest.fn(),
  setCurrentScreen: jest.fn(),
  // Add other mock methods if needed
};

const messaging = jest.fn(() => ({
  getToken: jest.fn(),
  onMessage: jest.fn(),
  // Add other mock methods if needed
}));
const InAppMessaging = {
  // Define mock methods here
  inAppMessaging: jest.fn(),
  setMessagesDisplaySuppressed: jest.fn(),
  // ...
};

export default {
  analytics,
  messaging,
  InAppMessaging,
};
