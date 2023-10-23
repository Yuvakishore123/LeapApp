import {renderHook} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import React from 'react';
import useOwnerorderproducts from 'screens/ownerRentalStatusScreen/useOwnerorderproducts';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => mockDispatch),
}));

jest.mock('../../../src/helpers/helper', () => ({
  useThunkDispatch: () => ({dispatch: mockDispatch}),
}));
// jest.mock('react-test-renderer', () => ({
//   act: jest.fn(),
// }));
const mockNav = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      addListener: jest.fn(),
    }),
  };
});
describe('useAdditems', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(
      (
        selector: (arg0: {
          OwnerRentalproducts: {data: {}; isLoader: null};
        }) => any,
      ) =>
        selector({
          OwnerRentalproducts: {data: {}, isLoader: null},
        }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('handles useEffect hook correctly', () => {
    const useEffectSpy = jest.spyOn(React, 'useEffect');

    renderHook(() => useOwnerorderproducts());

    // Expect that the useEffect hook was called
    expect(useEffectSpy).toHaveBeenCalled();

    // Expect that the useEffect hook was called with a function
    expect(useEffectSpy.mock.calls[0][0]).toBeInstanceOf(Function);
  });
});
