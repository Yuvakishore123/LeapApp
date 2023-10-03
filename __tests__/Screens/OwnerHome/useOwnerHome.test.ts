import {act, renderHook} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import useOwnerHome from '../../../src/screens/OwnerHomepage/useOwnerHome';

jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
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
      addListener: jest.fn(),
    }),
    useIsFocused: jest.fn().mockReturnValue(true),
  };
});

const configureDispatch = () => {
  const dispatch = jest.fn();
  useDispatch.mockReturnValue(dispatch);
  return dispatch;
};

describe('Checkout Screen', () => {
  const mockDispatch = configureDispatch();
  let HandlePiechart: jest.Mock<any, any, any>;
  beforeEach(() => {
    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation(
      (
        selector: (arg0: {
          profileData: {data: {}};
          products: {data: {}};
        }) => any,
      ) =>
        selector({
          profileData: {data: {}},
          products: {data: {}},
        }),
    );
    HandlePiechart = jest.fn();
    AsyncStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('handles useEffect hook correctly', () => {
    const useEffectSpy = jest.spyOn(React, 'useEffect');

    renderHook(() => useOwnerHome());

    // Expect that the useEffect hook was called
    expect(useEffectSpy).toHaveBeenCalled();

    // Expect that the useEffect hook was called with a function
    expect(useEffectSpy.mock.calls[0][0]).toBeInstanceOf(Function);
  });
  it('handles onRefresh correctly', () => {
    const {result} = renderHook(() => useOwnerHome());

    act(() => {
      result.current.onRefresh();
    });

    expect(result.current.refreshing).toBe(false);

    expect(mockDispatch).toBeCalledTimes(2);

    act(() => {
      result.current.setRefreshing(true);
    });

    expect(result.current.refreshing).toBe(true);
  });
  it('handles handleAnalatyics correctly', () => {
    const {handleAnalatyics} = useOwnerHome();
    handleAnalatyics();

    expect(HandlePiechart).toHaveBeenCalled();
    expect(mockNav).toHaveBeenCalledWith('DashboardDetails');
  });
});
