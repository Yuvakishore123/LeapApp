import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook} from '@testing-library/react-native';
import {useDispatch} from 'react-redux';
import useCategoryProducts from 'screens/CategoryProducts/useCategoryProducts';

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
jest.mock('../../../src/helpers/Helper', () => ({
  logMessage: {
    error: jest.fn(),
  },
}));
jest.mock('network/Network');
jest.mock('../../../src/redux/slice/EditProfileSlice', () => ({
  updateProfile: jest.fn(),
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
  (useDispatch as jest.Mock).mockReturnValue(dispatch);
  return dispatch;
};
describe('useOwnerEditprofile', () => {
  const mockDispatch = configureDispatch();
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
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should remove an item from the wishlist', () => {
    const {result} = renderHook(() => useCategoryProducts(1)); // Provide an initial subcategoryId
    const initialWishlist = [1, 2, 3]; // An initial wishlist with items 1, 2, and 3

    // Set the initial wishlist
    act(() => {
      result.current.setWishlistList(initialWishlist);
    });

    act(() => {
      result.current.setSubcategories(mockedData as any);
    });

    const itemIdToRemove = 2; // Item to remove from the wishlist

    // Call toggleWishlist to remove the item
    act(() => {
      result.current.toggleWishlist(itemIdToRemove);
    });

    // Verify that the item has been removed from the wishlist
    expect(result.current.wishlistList).not.toContain(itemIdToRemove);
  });
  it('should add an item to the wishlist', () => {
    const {result} = renderHook(() => useCategoryProducts(1)); // Provide an initial subcategoryId
    const initialWishlist = [2, 3]; // An initial wishlist with items 2 and 3

    // Set the initial wishlist
    act(() => {
      result.current.setWishlistList(initialWishlist);
    });

    const itemIdToAdd = 1; // Item to add to the wishlist
    act(() => {
      result.current.setSubcategories(mockedData as any);
    });

    // Call toggleWishlist to add the item
    act(() => {
      result.current.toggleWishlist(itemIdToAdd);
    });

    // Verify that the item has been added to the wishlist
    expect(result.current.wishlistList).toContain(itemIdToAdd);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
