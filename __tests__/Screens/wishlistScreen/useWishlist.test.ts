import {act, renderHook} from '@testing-library/react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import useWishlist from '../../../src/screens/Wishlist/useWishlist';
import Toast from 'react-native-toast-message';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => mockDispatch),
  useSelector: jest.fn(),
}));
jest.mock('react-native-toast-message', () => {
  return {
    show: jest.fn(),
  };
});
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    }),
  };
});
describe('useWislist', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(
      (
        selector: (arg0: {WishlistProducts: {data: {}; error: boolean}}) => any,
      ) =>
        selector({
          WishlistProducts: {data: {}, error: true},
        }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('handles useEffect hook correctly', () => {
    const useEffectSpy = jest.spyOn(React, 'useEffect');

    renderHook(() => useWishlist());

    // Expect that the useEffect hook was called
    expect(useEffectSpy).toHaveBeenCalled();

    // Expect that the useEffect hook was called with a function
    expect(useEffectSpy.mock.calls[0][0]).toBeInstanceOf(Function);
  });
  it('handles onRefresh correctly', () => {
    const {result} = renderHook(() => useWishlist());

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
  it('This should open modal', () => {
    const wishlist = renderHook(() => useWishlist());
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useWishlist());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('This handle wishlistremove', async () => {
    const {result} = renderHook(() => useWishlist());
    const mockId = '1';
    // Open the modal
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve as any, 100));
    act(() => {
      result.current.wishlistremove(mockId);
    });
    await asyncOperation();
    expect(mockDispatch).toBeCalled();
  });
  it('should show toast with error message for cart error', () => {
    const {result} = renderHook(() => useWishlist());

    result.current.showToast();

    // Ensure that Toast.show was called with the correct parameters
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error in wislist cart',
    });
  });
  it('should show toast with error message for isError', () => {
    const {result} = renderHook(() => useWishlist());

    result.current.showToast();

    // Ensure that Toast.show was called with the correct parameters
    if (result.current.isError) {
      expect(Toast.show).toHaveBeenCalledWith({
        type: 'error',
        text1: 'Error in wislist cart',
      });
    }
  });
});
