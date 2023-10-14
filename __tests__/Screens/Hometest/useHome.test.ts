import {act, renderHook, waitFor} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import ApiService from 'network/network';
import useHome from 'screens/Home/useHome';
import {wishListRemove} from '../../../src/redux/slice/wishlistRemoveSlice';
import {fetchUserProducts} from '../../../src/redux/slice/userProductSlice';
import inAppMessaging from '@react-native-firebase/in-app-messaging';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('@react-native-firebase/in-app-messaging', () => {
  return () => ({
    setMessagesDisplaySuppressed: jest.fn(),
  });
});
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
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
describe('useAdditems', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(
      (
        selector: (arg1: {
          UserProducts: {data: {}};
          profileData: {data: {}};
          WishlistProducts: {data: {}};
        }) => any,
      ) =>
        selector({
          UserProducts: {data: {}},
          profileData: {data: {}},
          WishlistProducts: {data: {}},
        }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should dispatch the correct actions and navigate to SearchResultsScreen', () => {
    const {result} = renderHook(() => useHome());
    const mockquery = 'gucci';
    act(() => {
      result.current.searchProducts(mockquery);
    });
    ApiService.get.mockResolvedValue(mockData);

    waitFor(() => {
      expect(result.current.Data).toHaveBeenCalledWith(mockData);
      expect(result.current.oldData).toHaveBeenCalledWith(mockData);
      expect(result.current.searchQuery).toHaveBeenCalledWith('');

      expect(mockNav).toHaveBeenCalledWith('SearchResultsScreen', {
        searchResults: mockData,
      });
    });
  });
  it('should reject dispatch for searchProducts', () => {
    const {result} = renderHook(() => useHome());
    const mockquery = 'gucci';
    act(() => {
      result.current.searchProducts(mockquery);
    });
    ApiService.get.mockRejectedValue(mockData);

    waitFor(() => {
      expect(result.current.Error).toBe(
        'Something went wrong. Please try again.',
      );
    });
  });
  it('This should open modal', () => {
    const wishlist = renderHook(() => useHome());
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useHome());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('handles onRefresh correctly', () => {
    const {result} = renderHook(() => useHome());

    act(() => {
      result.current.onRefresh();
    });

    expect(result.current.refreshing).toBe(false);

    expect(mockDispatch).toBeCalledTimes(3);

    act(() => {
      result.current.setRefreshing(true);
    });

    expect(result.current.refreshing).toBe(true);
  });
  it('should dispatch the correct actions in the wishlistRemove', () => {
    const {result} = renderHook(() => useHome());
    const mockId = '1';
    act(() => {
      result.current.wishlistremove(mockId);
    });
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(wishListRemove(mockId));
      expect(result.current.pageError).toHaveBeenCalledWith('');
    });
  });
  it('should dispatch the correct actions in the handleReached', () => {
    const {result} = renderHook(() => useHome());
    const pageSize = 10;
    const productData = [
      {
        id: '1',
        imageUrl: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
        ],
        name: 'white shirt',
        price: 1000,
      },
    ];
    act(() => {
      result.current.handleEndReached();
    });
    waitFor(() => {
      expect(result.current.pageSize).toHaveBeenCalledWith(
        result.current.pageSize + 10,
      );
      expect(result.current.productsData).toEqual([
        ...productData,
        ...mockData,
      ]);
      expect(mockDispatch).toHaveBeenCalledWith(fetchUserProducts({pageSize}));
      expect(
        inAppMessaging().setMessagesDisplaySuppressed,
      ).toHaveBeenCalledWith(true);
    });
  });
});
