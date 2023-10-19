// __mocks__/utils/firebase.js
const messaging = jest.fn(() => ({
  getToken: jest.fn(() => Promise.resolve('mockedToken')),
}));

const firebase = {
  apps: [],
  messaging,
};

export default firebase;
