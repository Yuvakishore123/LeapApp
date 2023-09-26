const analytics = {
  logEvent: jest.fn(),
  setCurrentScreen: jest.fn(),
  // Add other mock methods if needed
};

const messaging = {
  getToken: jest.fn(),
  onMessage: jest.fn(),
  // Add other mock methods if needed
};
const InAppMessaging = {
  // Define mock methods here
  setMessagesDisplaySuppressed: jest.fn(),
  // ...
};

export default {
  analytics,
  messaging,
  InAppMessaging,
};
