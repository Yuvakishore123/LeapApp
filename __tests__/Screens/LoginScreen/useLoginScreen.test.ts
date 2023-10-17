import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook, waitFor} from '@testing-library/react-native';
import asyncStorageWrapper from 'constants/asyncStorageWrapper';
import useLoginscreen from 'screens/LoginScreen/useLoginscreen';
import {postLogin} from '../../../src/redux/slice/loginSlice';
import {fetchUserProducts} from '../../../src/redux/slice/userProductSlice';
import { logMessage } from 'helpers/helper';
jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));
jest.mock('@react-native-firebase/analytics', () => {
  return () => ({
    logEvent: jest.fn().mockResolvedValue('mocked-token'),
  });
});
jest.mock('@react-native-firebase/dynamic-links', () =>
  require('@react-native-firebase'),
);
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('network/network');
jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    getToken: jest.fn().mockResolvedValue('mocked-token'),
  });
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
  it('handles storeFCMToken correctly', () => {
    const {result} = renderHook(() => useLoginscreen());
    const mockToken = 'mocked_token';

    act(() => {
      result.current.storeFCMToken(mockToken);
    });

    waitFor(() => {
      expect(asyncStorageWrapper.setItem).toBeCalledWith(mockToken);
    });
  });
  it('handles onRefreshToken correctly', () => {
    const {result} = renderHook(() => useLoginscreen());
    const mockToken = 'mocked_token';

    act(() => {
      result.current.onTokenRefresh(mockToken);
    });

    waitFor(() => {
      expect(asyncStorageWrapper.getItem).toBeCalledWith(mockToken);
      expect(result.current.storeFCMToken).toBeCalled();
    });
  });
  it('should handle login screen correctly', async () => {
    const {result} = renderHook(() => useLoginscreen());
    const pageSize = 20;
    await result.current.handleLoginScreen();
    waitFor(() => {
      expect(asyncStorageWrapper.setItem).toHaveBeenCalledWith('device_token');
    });

    const expectedCredentials = {
      email: 'mockedEmail', // Set your expected email here
      password: 'mockedPassword', // Set your expected password here
      deviceToken: 'mockedFcmToken',
    };
    waitFor(() => {
      expect(postLogin(expectedCredentials)).toHaveBeenCalledWith(
        expectedCredentials,
      );
      expect(fetchUserProducts({pageSize})).toHaveBeenCalledWith({
        pageSize: 'mockedPageSize',
      }); // Set your expected pageSize here
    });
  });
  it('handles handleErrorresponse correctly', () => {
    const {result} = renderHook(() => useLoginscreen());
    const Error = 401;

    act(() => {
      result.current.handleErrorResponse(Error);
    });

    waitFor(() => {
      expect(result.current.openModal).toBeCalled();
    });
  });
});
