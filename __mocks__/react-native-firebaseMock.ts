const requestPermission = jest.fn();
const getToken = jest.fn().mockResolvedValue('mocked-token');
const onTokenRefresh = jest.fn();

const messaging = () => ({
  requestPermission,
  getToken,
  onTokenRefresh,
});

export default messaging;
