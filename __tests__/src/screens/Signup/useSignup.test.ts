import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useSignup from '../../../../src/screens/Common/SignUp/useSignup';
import {boolean} from 'yup';
import Toast from 'react-native-toast-message';

import {postSignup} from '../../../../src/redux/slice/signupSlice';

jest.mock('@notifee/react-native', () => require('notifee-mocks'));
const mockNav = jest.fn();
jest.mock('network/network');
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
    }),
  };
});

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../../src/utils/asyncStorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-native-razorpay', () => {
  return {
    open: jest.fn().mockResolvedValue({
      razorpay_payment_id: 'your_mocked_payment_id',
    }),
  };
});
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
describe('useSignup', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        signup: {error: null},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should open the modal when openmodal is clicked clicked', async () => {
    const {result} = renderHook(() => useSignup());
    expect(result.current.showModal).toBe(false);
    await act(() => {
      result.current.openModal();
    });
    await waitFor(() => {
      expect(result.current.showModal).toBe(true);
    });
  });
  it('should close the modal when closeModal is clicked clicked', async () => {
    const {result} = renderHook(() => useSignup());
    expect(result.current.showModal).toBe(false);
    await act(() => {
      result.current.closeModal();
    });
    await waitFor(() => {
      expect(result.current.showModal).toBe(false);
    });
  });
  it('should showToast when error occured', async () => {
    const {result} = renderHook(() => useSignup());
    const toastShowMock = jest.spyOn(Toast, 'show');

    await act(() => {
      result.current.showToast();
    });
    await waitFor(() => {
      expect(toastShowMock).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Error during signup, try again later',
      });
    });
  });
  it('should navigate to login screen', async () => {
    const {result} = renderHook(() => useSignup());

    await act(() => {
      result.current.handleLogin();
    });
    expect(mockNav).toBeCalledWith('Login');
  });
  it('should change role when clicked', async () => {
    const mockRole = 'Owner';
    const {result} = renderHook(() => useSignup());

    await act(() => {
      result.current.handleRole(mockRole);
    });
    expect(result.current.role).toBe(mockRole);
  });
  it('should submit the signup data when clicked', async () => {
    const {result} = renderHook(() => useSignup());
    const credentials = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
      role: 'user',
    };

    await act(() => {
      result.current.handleSignup();
    });
    expect(mockDispatch).toBeCalled();
  });
  it('should open mocal when error is occured', async () => {
    useSelector.mockImplementation(selector =>
      selector({
        signup: {error: 401},
      }),
    );
    const {result} = renderHook(() => useSignup());

    await act(() => {
      result.current.handleError();
    });
    expect(result.current.showModal).toBe(true);
  });
});
