// firebase.js

const messaging = {
  requestPermission: jest.fn(),
  getToken: jest.fn(),
};

const firebase = {
  messaging: () => messaging,
};

export default firebase;
