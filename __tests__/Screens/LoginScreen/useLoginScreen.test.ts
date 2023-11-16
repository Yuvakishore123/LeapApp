import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook} from '@testing-library/react-native';
import useLoginscreen from 'screens/LoginScreen/useLoginscreen';
jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));
jest.mock('@react-native-firebase/analytics', () => {
  return () => ({
    logEvent: jest.fn().mockResolvedValue('mocked-token'),
  });
});
jest.mock('@react-native-firebase/dynamic-links', () =>
  require('@react-native-firebase'),
);
jest.mock('../../../src/helpers/helper', () => ({
  logMessage: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('network/network');
jest.mock('@react-native-firebase/messaging', () => {
  const mockToken = 'mocked_token';

  return () => ({
    requestPermission: jest.fn(),
    getToken: jest.fn().mockResolvedValue(mockToken),
  });
});
jest.mock('../../../src/utils/firebase', () => {
  return {
    messaging: jest.fn(() => ({
      getToken: jest.fn(() => Promise.resolve('mockedToken')),
      onTokenRefresh: jest.fn(),
      setBackgroundMessageHandler: jest.fn(),
    })),
  };
});

jest.mock('@react-native-firebase/crashlytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

jest.mock('../../../src/redux/slice/editProfileSlice', () => ({
  updateProfile: jest.fn(),
}));
jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      addListener: jest.fn(),
    }),
    useIsFocused: jest.fn().mockReturnValue(true),
  };
});
describe('useLoginScreen', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render the custom Myorder hook', () => {
    const {result} = renderHook(() => useLoginscreen());
    expect(result).toBeDefined();
  });
  it('This should open modal', () => {
    const {result} = renderHook(() => useLoginscreen());
    act(() => {
      result.current.openModal();
    });
    expect(result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useLoginscreen());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });
    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('should handle login screen correctly', async () => {
    const {result} = renderHook(() => useLoginscreen());
    await result.current.handleLoginScreen();
    expect(mockDispatch).toBeCalled();
  });
  it('handles handleErrorresponse correctly', () => {
    const {result} = renderHook(() => useLoginscreen());
    const error = 401;

    act(() => {
      result.current.handleErrorResponse(error);
    });
    expect(result.current.showModal).toBe(true);
  });
});
