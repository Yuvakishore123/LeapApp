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
    {
      availableQuantities: 3,
      brand: 'MockBrand 2',
      categoryIds: [1],
      color: 'MockColor 2',
      description: 'MockDescription2',
      disabled: true,
      disabledQuantities: 0,
      id: 1,
      imageUrl: ['https://example.com/mock-image.jpg'],
      material: 'MockMaterial',
      name: 'MockProduct 2',
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
    const {result} = renderHook(() => useCategoryProducts(1)); // Provide an initial subcategoryId
    const initialWishlist = [2, 3]; // An initial wishlist with items 2 and 3

    // Set the initial wishlist
    act(() => {
      result.current.setWishlistList(initialWishlist);
    });

    const itemIdToAdd = 1; // Item to add to the wishlist

    // Mock the subcategories data
    const subcategories = [
      {id: 1 /* other properties */},
      {id: 2 /* other properties */},
      {id: 3 /* other properties */},
    ];

    // Set the subcategories data
    act(() => {
      result.current.setSubcategories(mockedData);
    });

    // Call toggleWishlist to add the item
    act(() => {
      result.current.toggleWishlist(itemIdToAdd);
    });

    // Verify that the item has been added to the wishlist
    expect(result.current.wishlistList).toContain(itemIdToAdd);
    expect(dispatchMock).toHaveBeenCalled();
  });

  it('should remove an item from the wishlist', () => {
    const {result} = renderHook(() => useCategoryProducts(1)); // Provide an initial subcategoryId
    const initialWishlist = [1, 2, 3]; // An initial wishlist with items 1, 2, and 3

    // Set the initial wishlist
    act(() => {
      result.current.setWishlistList(initialWishlist);
    });

    act(() => {
      result.current.setSubcategories(mockedData);
    });

    const itemIdToRemove = 2; // Item to remove from the wishlist

    // Call toggleWishlist to remove the item
    act(() => {
      result.current.toggleWishlist(itemIdToRemove);
    });

    // Verify that the item has been removed from the wishlist
    expect(result.current.wishlistList).not.toContain(itemIdToRemove);
  });
});
