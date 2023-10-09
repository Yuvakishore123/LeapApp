import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import {boolean} from 'yup';
import Toast from 'react-native-toast-message';
import useHome from '../../../../src/screens/Home/useHome';
import {wishListRemove} from '../../../../src/redux/slice/wishlistRemoveSlice';
import ApiService from 'network/network';

jest.mock('@notifee/react-native', () => require('notifee-mocks'));
const mockNav = jest.fn();
jest.mock('network/network');
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
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () => {
  // Define a mock implementation for the inAppMessaging function
  return {
    __esModule: true, // Add this if your module uses esModuleInterop
    default: jest.fn().mockReturnValue({
      setMessagesDisplaySuppressed: jest.fn(),
    }),
  };
});
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/in-app-messaging', () =>
  require('react-native-firebase-mock'),
);

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
jest.mock('react-native-razorpay', () => {
  return {
    open: jest.fn().mockResolvedValue({
      razorpay_payment_id: 'your_mocked_payment_id',
    }),
  };
});
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
describe('useSignup', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        profileData: {data: []},
        UserProducts: {data: [], firstCallLoading: boolean},
        WishlistProducts: {data: []},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should open the modal when openmodal is clicked clicked', async () => {
    const {result} = renderHook(() => useHome());
    expect(result.current.showModal).toBe(false);
    await act(() => {
      result.current.openModal();
    });
    await waitFor(() => {
      expect(result.current.showModal).toBe(true);
    });
  });
  it('should close the modal when closeModal is clicked clicked', async () => {
    const {result} = renderHook(() => useHome());
    expect(result.current.showModal).toBe(false);
    await act(() => {
      result.current.closeModal();
    });
    await waitFor(() => {
      expect(result.current.showModal).toBe(false);
    });
  });
  it('should remove products from wishlist ', async () => {
    const mockId = '12';
    const {result} = renderHook(() => useHome());
    expect(result.current.pageError).toBe('');
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.wishlistremove(mockId);
    });
    await asyncOperation();
    expect(mockDispatch).toBeCalled();
    expect(result.current.pageError).toBe('');
  });
  it('should dispatch after data is completed  ', async () => {
    const {result} = renderHook(() => useHome());
    expect(result.current.pageError).toBe('');
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.handleEndReached();
    });
    await asyncOperation();
    expect(mockDispatch).toBeCalled();
  });
  it('should call ApiService and navigate on successful search', async () => {
    const {result} = renderHook(() => useHome());

    // Mock data to be returned from ApiService
    const mockData = [{id: 1, name: 'Product 1'}];

    // Mock ApiService.get to resolve with the mockData
    ApiService.get.mockResolvedValue(mockData);

    // Set up initial state
    act(() => {
      result.current.setSearchQuery('your_search_query'); // Set the search query
    });

    // Call the searchProducts function
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.searchProducts('gucci');
    });
    await asyncOperation();

    // Expect ApiService.get to have been called with the correct URL
    expect(ApiService.get).toHaveBeenCalledWith('/product/search?query=gucci');

    // Expect navigation.navigate to have been called with the correct arguments
    expect(mockNav).toHaveBeenCalledWith('SearchResultsScreen', {
      searchResults: mockData,
    });

    // Expect data, oldData, and searchQuery to be updated
    expect(result.current.Data).toEqual(mockData);
    expect(result.current.oldData).toEqual(mockData);
    expect(result.current.searchQuery).toBe('');
  });
  it('should catch the erroe during search results', async () => {
    const {result} = renderHook(() => useHome());

    // Mock data to be returned from ApiService
    const mockError = new Error('Search error');

    // Mock ApiService.get to reject with the mockError
    ApiService.get.mockRejectedValue(mockError);
    // Set up initial state
    act(() => {
      result.current.setSearchQuery('your_search_query'); // Set the search query
    });

    // Call the searchProducts function
    const asyncOperation = () =>
      new Promise(resolve => setTimeout(resolve, 100));

    await act(() => {
      result.current.searchProducts('gucci');
    });
    await asyncOperation();

    // Expect ApiService.get to have been called with the correct URL
    expect(ApiService.get).toHaveBeenCalledWith('/product/search?query=gucci');

    // Expect navigation.navigate to have been called with the correct arguments
    expect(result.current.pageError).toBe(
      'Something went wrong. Please try again.',
    );
  });
});
