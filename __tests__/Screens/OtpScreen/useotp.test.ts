import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook, waitFor} from '@testing-library/react-native';
import Useotp from 'screens/OtpScreen/useOtp';
jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/dynamic-links', () =>
  require('@react-native-firebase'),
);
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('network/Network');
jest.mock('@react-native-firebase/messaging', () =>
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

jest.mock('../../../src/redux/slice/EditProfileSlice', () => ({
  updateProfile: jest.fn(),
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
describe('useOwnerEditprofile', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render the custom Myorder hook', () => {
    const {result} = renderHook(() => Useotp());
    expect(result).toBeDefined();
  });
  it('This should open modal', () => {
    const {result} = renderHook(() => Useotp());
    act(() => {
      result.current.openModal();
    });
    expect(result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => Useotp());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });
    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('handles GETOTP correctly', () => {
    const {result} = renderHook(() => Useotp());

    act(() => {
      result.current.GETOTP();
    });

    expect(mockDispatch).toBeCalled();
  });
  it('handles handleLogin correctly', () => {
    const {result} = renderHook(() => Useotp());

    act(() => {
      result.current.handleLogin();
    });

    expect(mockDispatch).toBeCalled();
  });
  it('handles handlephoneNumberChange correctly', () => {
    const {result} = renderHook(() => Useotp());
    const value = '10292030211';

    act(() => {
      result.current.handlephoneNumberChange(value);
    });

    waitFor(() => {
      expect(result.current.phoneNo).toBe(value);
    });
  });
  it('handles handlePasswordChange correctly', () => {
    const {result} = renderHook(() => Useotp());
    const value = '1289';

    act(() => {
      result.current.handlePasswordChange(value);
    });

    waitFor(() => {
      expect(result.current.otp).toBe(value);
    });
  });
});
