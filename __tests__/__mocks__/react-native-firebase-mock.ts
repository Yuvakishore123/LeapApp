// __mocks__/react-native-firebase-mocks.js

// Firebase Analytics Mock
const analytics = {
  logEvent: jest.fn(),
  setUserProperties: jest.fn(),
  // Add other methods as needed
};

// Firebase Messaging Mock
const messaging = {
  getToken: jest.fn(),
  onMessage: jest.fn(),
  // Add other methods as needed
};
const firebase = {
  messaging: () => messaging,
};
// __mocks__/react-native-firebase-crashlytics-mock.js

const crashlytics = {
  recordError: jest.fn(),
  // Add other methods as needed
};
const inAppMessaging = {
  // Define mock functions or methods for Firebase In-App Messaging
  // You can add mock implementations for specific methods as needed
  triggerEvent: jest.fn(),
  default: jest.fn(),
  // Add other methods as needed
};

const dynamicLinks = {
  buildShortLink: jest.fn(),
  onLink: jest.fn(),
  // Add other methods and properties as needed
};

export {
  analytics,
  messaging,
  firebase,
  crashlytics,
  inAppMessaging,
  dynamicLinks,
};
