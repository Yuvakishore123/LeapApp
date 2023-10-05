import {act, renderHook, waitFor} from '@testing-library/react-native';

import {useDispatch} from 'react-redux';

import useCategoryProducts from '../../../../src/screens/CategoryProducts/useCategoryProducts';
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

describe('handleCategoryData navigates to Subcategory and dispatches getsubcategoryData', () => {
  const mockId = 2;
  const mockedData = [
    {
      availableQuantities: 0,
      brand: 'MockBrand',
      categoryIds: [1],
      color: 'MockColor',
      description: 'MockDescription',
      disabled: true,
      disabledQuantities: 0,
      id: 1,
      imageUrl: ['https://example.com/mock-image.jpg'],
      material: 'MockMaterial',
      name: 'MockProduct',
      price: 10.99,
      rentedQuantities: 0,
      size: 'MockSize',
      subcategoryIds: [2],
      totalQuantity: 100,
    },
  ];

  const dispatchMock = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  it('should set subcategory data aftee api call', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockedData);
    const {result} = renderHook(() => useCategoryProducts(mockId));
    waitFor(() => {
      expect(result.current.subcategories).toBe(mockedData);
    });
  });

  it('should add an item to the wishlist', () => {
    const {result} = renderHook(() => useCategoryProducts(mockId));
    const itemId = 1;

    act(() => {
      result.current.toggleWishlist(itemId);
    });

    expect(result.current.wishlistList).toContain(itemId);
  });
  it('should remove an item from the wishlist', () => {
    const initialWishlist = [1, 2, 3];
    const {result} = renderHook(() => useCategoryProducts(1));

    // Specify the item to be removed
    const itemIdToRemove = 2;

    act(() => {
      result.current.toggleWishlist(itemIdToRemove);
    });

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
