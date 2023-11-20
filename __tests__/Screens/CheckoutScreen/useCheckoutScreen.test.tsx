import {act, renderHook} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import useChectout from '../../../src/screens/CheckoutScreen/useCheckout';
import React from 'react';
import useCheckout from '../../../src/screens/CheckoutScreen/useCheckout';
import {ADDORDER} from '../../../src/redux/actions/Actions';
import RazorpayCheckout from 'react-native-razorpay';

jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
  // Mock any other dependencies you might have (e.g., logMessage)
}));

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@sentry/react-native', () => require('react-native-sentry'));
jest.mock('../../../src/redux/actions/Actions', () => ({
  ADDORDER: jest.fn(), // Mock the action creator here
}));
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
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      // addListener: jest.fn(),
    }),
  };
});

const configureDispatch = () => {
  const dispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dispatch);
  return dispatch;
};

describe('Checkout Screen', () => {
  const mockDispatch = configureDispatch();
  const mockCartData: cartData[] = [];
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(selector =>
      selector({
        cartData: {cartData: mockCartData},
        appliedCoupon: {appliedCouponData: 'mockCouponCode'},
        listAddress: {data: {}},
        CartProducts: {data: {}},
      }),
    );
    AsyncStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handles useEffect hook correctly', () => {
    const useEffectSpy = jest.spyOn(React, 'useEffect');

    renderHook(() => useChectout());

    // Expect that the useEffect hook was called
    expect(useEffectSpy).toHaveBeenCalled();

    // Expect that the useEffect hook was called with a function
    expect(useEffectSpy.mock.calls[0][0]).toBeInstanceOf(Function);
  });
  it('handles onRefresh correctly', () => {
    const {result} = renderHook(() => useChectout());

    act(() => {
      result.current.onRefresh();
    });

    expect(result.current.refreshing).toBe(true);

    expect(mockDispatch).toBeCalledTimes(3);

    act(() => {
      result.current.setRefreshing(true);
    });

    expect(result.current.refreshing).toBe(true);
  });
  it('handles handleCheckboxChange correctly', () => {
    const {result} = renderHook(() => useChectout());

    // Mock index
    const mockIndex = 0;

    // Call handleCheckboxChange
    act(() => {
      result.current.handleCheckboxChange(0);
    });

    // Check if state values have been updated correctly
    expect(result.current.selectedAddressIndex).toBe(mockIndex);
    act(() => {
      result.current.setIsCheckedArray([false]);
    });
    const newIsCheckedArray = [false, true]; // Assuming there are two items in the data array
    newIsCheckedArray[mockIndex] = false;

    expect(result.current.isCheckedArray).toEqual([false]);
    expect(result.current.isChecked).toBe(false);
  });
  it('handles payment correctly', async () => {
    const {result} = renderHook(() => useCheckout());
    (ADDORDER as jest.Mock).mockResolvedValue({
      razorpay_payment_id: 'mockPaymentId',
    });

    // Call handlePayment
    await result.current.handlePayment();

    // Check if navigation and dispatch functions have been called correctly
    expect(mockNav).toHaveBeenCalledWith('PaymentSuccessScreen');
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));

    // Assert further based on your application logic
  });
  it('should reject handles payment correctly', async () => {
    const {result} = renderHook(() => useCheckout());

    // Mock RazorpayCheckout.open to return a rejected promise
    jest
      .spyOn(RazorpayCheckout, 'open')
      .mockRejectedValue(new Error('Payment failed'));

    // Call handlePayment
    await act(async () => {
      await result.current.handlePayment(); // Ensure this is an asynchronous operation
    });

    expect(mockNav).toHaveBeenCalledWith('PaymentFailScreen');
  });
});
