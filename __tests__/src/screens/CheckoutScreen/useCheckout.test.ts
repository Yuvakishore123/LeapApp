import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import useCheckout from '../../../../src/screens/CheckoutScreen/useCheckout';

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
describe('useCheckout', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        listAddress: {data: {}},
        CartProducts: {data: {}},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should refresh when on Refresh is clicked', () => {
    const {result} = renderHook(() => useCheckout());
    expect(result.current.refreshing).toBe(false);

    act(() => {
      result.current.onRefresh();
    });
    expect(mockDispatch).toBeCalledTimes(3);
    expect(result.current.refreshing).toBe(true);
    waitFor(() => {
      expect(result.current.refreshing).toBe(false);
    });
  });
  it('should select address when CheckBox is clicked', () => {
    const mockData = [
      {
        addressLine1: '123 Main Street',
        addressLine2: '',
        addressType: 'Home',
        city: 'Cityville',
        country: 'USA',
        postalCode: '12345',
        state: 'CA',
        defaultType: false,
      },
    ]; // Provide a valid array
    const mockSelector = state => ({listAddress: {data: mockData}});
    useSelector.mockImplementation(mockSelector);
    const {result} = renderHook(() => useCheckout());
    const mockIndex = 1; // Correct the type to match the function's argument type

    act(() => {
      result.current.handleCheckboxChange(mockIndex);
    });

    expect(result.current.selectedAddressIndex).toBe(1);

    waitFor(() => {
      expect(result.current.isCheckedArray).toEqual([false]); // Provide the expected value based on the mockData
    });
  });
  it('should handle successful payment', async () => {
    const {result} = renderHook(() => useCheckout());

    // Mock RazorpayCheckout.open to resolve with payment data
    jest.spyOn(require('react-native-razorpay'), 'open').mockResolvedValue({
      razorpay_payment_id: 'payment_id',
    });

    await act(async () => {
      result.current.handlePayment();
    });

    expect(mockNav).toHaveBeenCalledWith('PaymentSuccessScreen');
    // expect(mockDispatch).toHaveBeenCalledWith(
    //   expect.objectContaining({type: 'ADDORDER'}),
    // );
    // Add assertions for logOrderPlacedEvent, totalPrice, and other expected behaviors
  });
  it('should handle payment failure', async () => {
    const {result} = renderHook(() => useCheckout());

    // Mock RazorpayCheckout.open to reject with an error
    jest
      .spyOn(require('react-native-razorpay'), 'open')
      .mockRejectedValue(new Error('Payment failed'));

    await act(async () => {
      result.current.handlePayment();
    });

    expect(mockNav).toHaveBeenCalledWith('PaymentFailScreen');
    expect(mockDispatch).not.toHaveBeenCalledWith(
      expect.objectContaining({type: 'ADDORDER'}),
    );
    // expect(mockDispatch).toHaveBeenCalledWith(
    //   expect.objectContaining({type: 'ADDORDER_FAILURE'}),
    // );
    // Add assertions for Alert.alert and other expected behaviors
  });
});
