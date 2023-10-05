import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useDispatch} from 'react-redux';

import {useSubcategory} from '../../../../src/screens/Subcategory/useSubcategory';
import ApiService from 'network/network';

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

describe('UseSubCategory', () => {
  const categoryId = '123';
  const subcategoryId = '123';
  const mockSubcategoryData = [
    {
      description: 'string',
      id: 0,
      imageUrl: 'string',
      subCategoryCreatedAt: '2023-10-04T07:36:40.155Z',
      subCategoryCreatedBy: 0,
      subCategoryUpdatedAt: '2023-10-04T07:36:40.155Z',
      subCategoryUpdatedBy: 0,
      subcategoryName: 'string',
    },
  ];
  const dispatchMock = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  it('should navigate to category Products Screen', () => {
    const {result} = renderHook(() => useSubcategory(categoryId));

    act(() => {
      result.current.handleSubcategoryPress(categoryId);
    });

    expect(mockNav).toHaveBeenCalledWith('CategoryProducts', {subcategoryId});
  });
  it('should setData ', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockSubcategoryData);
    const {result} = renderHook(() => useSubcategory(categoryId));
    waitFor(() => {
      expect(result.current.subcategories).toBe(mockSubcategoryData);
    });
  });
});
