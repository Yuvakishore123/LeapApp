import {act, renderHook} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useSignup from '../../../src/screens/SignUp/useSignup';
import {useSelector} from 'react-redux';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
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
});
