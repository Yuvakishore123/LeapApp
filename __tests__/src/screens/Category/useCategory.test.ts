import {renderHook, act} from '@testing-library/react-native';

import {useDispatch} from 'react-redux';

import useCategory from '../../../../src/screens/Category/useCategory';

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

test('handleCategoryData navigates to Subcategory and dispatches getsubcategoryData', () => {
  const dispatchMock = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  const {result} = renderHook(() => useCategory());

  const categoryId = '123';
  act(() => {
    result.current.handleCategoryData(categoryId);
  });

  expect(mockNav).toHaveBeenCalledWith('Subcategory', {categoryId});
});
