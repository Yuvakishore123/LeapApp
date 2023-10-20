import {act, renderHook} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSignup from '../../../src/screens/SignUp/useSignup';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('react-native-toast-message', () => {
  return {
    show: jest.fn(),
  };
});
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
const mockHandleError = jest.fn();
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});
describe('SignUpScreen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
    (useSelector as jest.Mock).mockImplementation(
      (selector: (arg0: {signup: {error: number}}) => any) =>
        selector({
          signup: {error: 401},
        }),
    );
  });
  it('This should open modal', () => {
    const signup = renderHook(() => useSignup());
    act(() => {
      signup.result.current.openModal();
    });
    expect(signup.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useSignup());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('This handleError should handle', () => {
    const {result} = renderHook(() => useSignup());
    act(() => {
      mockHandleError.mockClear();
      result.current.handleError();
    });
    expect(result.current.isError).toBe(401);

    expect(result.current.openModal).toBeDefined();
  });
  it('This call with showToast handleError should handle', () => {
    (useSelector as jest.Mock).mockImplementation(
      (selector: (arg0: {signup: {error: number}}) => any) =>
        selector({
          signup: {error: 500},
        }),
    );
    const {result} = renderHook(() => useSignup());
    act(() => {
      result.current.handleError();
    });

    expect(result.current.isError).toBe(500);
  });
  it('This call with showToast', () => {
    const {result} = renderHook(() => useSignup());
    act(() => {
      result.current.showToast();
    });
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'error during signup try again later',
    });
  });
  it('This handle handleSignUp', () => {
    const {result} = renderHook(() => useSignup());
    act(() => {
      result.current.handleSignup();
    });
    expect(mockDispatch).toBeCalledTimes(1);
  });
});
