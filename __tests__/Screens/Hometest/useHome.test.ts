import {act, renderHook} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import ApiService from 'network/network';
import useHome from 'screens/Home/useHome';

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

  it('should dispatch the correct actions and navigate to SearchResultsScreen', async () => {
    const {result} = renderHook(() => useHome());
    const mockquery = 'gucci';
    (ApiService.get as jest.Mock).mockResolvedValue(mockData);
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve as any, 100));
    act(() => {
      result.current.searchProducts(mockquery);
    });
    await asyncOperation();

    expect(result.current.Data).toBe(mockData);
    expect(result.current.oldData).toBe(mockData);
    expect(result.current.searchQuery).toBe('');

    expect(mockNav).toHaveBeenCalledWith('SearchResultsScreen', {
      searchResults: mockData,
    });
  });
  it('should catch the error during search results', async () => {
    const {result} = renderHook(() => useHome());

    const mockError = new Error('Search error');

    (ApiService.get as jest.Mock).mockRejectedValue(mockError);
    act(() => {
      result.current.setSearchQuery('your_search_query');
    });

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve as any, 100));

    await act(() => {
      result.current.searchProducts('gucci');
    });
    await asyncOperation();

    expect(ApiService.get).toHaveBeenCalledWith('/product/search?query=gucci');

    expect(result.current.pageError).toBe(
      'Something went wrong. Please try again.',
    );
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
  it('should dispatch the correct actions in the wishlistRemove', async () => {
    const {result} = renderHook(() => useHome());
    const mockId = '1';

    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve as any, 100));
    act(() => {
      result.current.wishlistremove(mockId);
    });
    await asyncOperation();

    expect(mockDispatch).toBeCalled();
  });
  it('should dispatch the correct actions in the handleReached', async () => {
    const {result} = renderHook(() => useHome());
    const pageSize = 10;
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve as any, 100));
    act(() => {
      result.current.handleEndReached();
    });
    await asyncOperation();
    expect(result.current.pageSize).toBe(pageSize + 10);
    expect(mockDispatch).toBeCalled();
  });
});
