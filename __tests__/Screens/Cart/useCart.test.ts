import {renderHook} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import useCart from '../../../src/screens/Cart/useCart';
import React from 'react';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => mockDispatch),
}));

// jest.mock('../../../src/helpers/helper', () => ({
//   useThunkDispatch: () => ({dispatch: mockDispatch}),
// }));
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
describe('useCart', () => {
  beforeEach(() => {
    useSelector.mockImplementation(
      (
        selector: (arg0: {
          CartProducts: {data: {}};
          cartUpdate: {isLoader: null};
        }) => any,
      ) =>
        selector({
          CartProducts: {data: {}},
          cartUpdate: {isLoader: null},
        }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('handles useEffect hook correctly', () => {
    const useEffectSpy = jest.spyOn(React, 'useEffect');

    renderHook(() => useCart());

    // Expect that the useEffect hook was called
    expect(useEffectSpy).toHaveBeenCalled();

    // Expect that the useEffect hook was called with a function
    expect(useEffectSpy.mock.calls[0][0]).toBeInstanceOf(Function);
  });
});
