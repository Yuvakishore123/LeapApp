import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import React from 'react';
import useOwnerHome from '../../../src/screens/OwnerHomepage/useOwnerHome';
import ApiService from 'network/network';

jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));
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
const mockData = [
  {
    id: '1',
    imageUrl: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
    name: 'white shirt',
    price: 1000,
  },
  {
    id: '2',
    imageUrl: [
      'https://example.com/image3.jpg',
      'https://example.com/image4.jpg',
    ],
    name: 'black shirt',
    price: 1500,
  },
  // ... (more products)
];
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
  (useDispatch as jest.Mock).mockReturnValue(dispatch);
  return dispatch;
};
describe('Checkout Screen', () => {
  const mockDispatch = configureDispatch();
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
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
    const {result} = renderHook(() => useOwnerHome());
    act(() => {
      result.current.handleAnalatyics();
    });
    waitFor(() => {
      expect(mockNav).toHaveBeenCalledWith('DashboardDetails');
    });
  });
  it('handles fetchRecentlyAdded correctly', async () => {
    const {result} = renderHook(() => useOwnerHome());
    (ApiService.get as jest.Mock).mockResolvedValue(mockData);
    act(() => {
      result.current.fetchRecentlyAdded();
    });
    waitFor(() => {
      expect(result.current.recentyAdded).toBe(mockData);
    });
  });
  it('handles fetchDashboardData correctly', () => {
    const data = {
      totalEarnings: 190203,
      totalrentedItems: 20,
    };
    const {result} = renderHook(() => useOwnerHome());
    (ApiService.get as jest.Mock).mockResolvedValue(data);
    act(() => {
      result.current.fetchDashboardData();
    });
    waitFor(() => {
      expect(result.current.setRentedItems).toBe(data.totalrentedItems);
    });
  });
});
