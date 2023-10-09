import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import Useotp from '../../../../src/screens/OtpScreen/useOtp';
import {boolean} from 'yup';

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
describe('useOtp', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        signup: {error: boolean},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should open the modal when openmodal is clicked clicked', async () => {
    const {result} = renderHook(() => Useotp());
    expect(result.current.showModal).toBe(false);
    await act(() => {
      result.current.openModal();
    });
    await waitFor(() => {
      expect(result.current.showModal).toBe(true);
    });
  });
  it('should close the modal when closeModal is clicked clicked', async () => {
    const {result} = renderHook(() => Useotp());
    expect(result.current.showModal).toBe(false);
    await act(() => {
      result.current.closeModal();
    });
    await waitFor(() => {
      expect(result.current.showModal).toBe(false);
    });
  });

  it('should dispatch and need to login ', async () => {
    const {result} = renderHook(() => Useotp());
    const credentials = {
      phoneNumber: '1234567890',
    };

    await act(() => {
      result.current.handleLogin();
    });
    expect(mockDispatch).toBeCalled();
    // expect(mockDispatch).toHaveBeenCalledWith(
    //   submitOTP(credentials.phoneNumber, Number(result.current.otp)),
    // );
  });

  it('should submit the signup data when clicked', async () => {
    const {result} = renderHook(() => Useotp());
    const credentials = {
      phoneNumber: '1234567890',
    };

    await act(() => {
      result.current.GETOTP();
    });
    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
      expect(result.current.showModal).toBe(true);
      //   expect(mockDispatch).toHaveBeenCalledWith(GetOtp(credentials));
    });
  });
  it('should set The selected phone number', async () => {
    const {result} = renderHook(() => Useotp());

    await act(() => {
      result.current.handlephoneNumberChange('8978661606');
    });
    await waitFor(() => {
      expect(result.current.phoneNo).toBe('8978661606');
    });
  });
  it('should set The selected otp', async () => {
    const {result} = renderHook(() => Useotp());

    await act(() => {
      result.current.handlePasswordChange('897866');
    });
    await waitFor(() => {
      expect(result.current.otp).toBe('897866');
    });
  });
});
