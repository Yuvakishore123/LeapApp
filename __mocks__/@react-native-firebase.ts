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
  onTokenRefresh: jest.fn(),
  setMessagesDisplaySuppressed: jest.fn(),
  // ...
};
const buildShortLink = jest.fn();

const dynamicLinks = {
  buildShortLink,
};

export default {
  analytics,
  messaging,
  InAppMessaging,
  dynamicLinks,
};
