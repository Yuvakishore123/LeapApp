// __mocks__/react-native-netinfo.js

export const NetInfo = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn(),
};

export default NetInfo;
