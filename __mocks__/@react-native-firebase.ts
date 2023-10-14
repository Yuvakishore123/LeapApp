const analytics = {
  logEvent: jest.fn(),
  setCurrentScreen: jest.fn(),
  // Add other mock methods if needed
};

const message = jest.fn(() => ({
  getToken: jest.fn(),
  onMessage: jest.fn(),
  messaging: jest.fn(),
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
const getToken = jest.fn();

export const messaging = () => ({
  getToken,
});

export default {
  analytics,
  messaging,
  message,
  InAppMessaging,
  dynamicLinks,
};
