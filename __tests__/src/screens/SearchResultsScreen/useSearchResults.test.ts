import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useSearchResults from '../../../../src/screens/SearchResultScreen/useSearchResults';

import ApiService from 'network/network';
import {categoriesData} from '../../../../src/constants/Apis';

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
describe('useCheckout', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        profileData: {data: {}},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const searchResults = [
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      imageUrl: ['https://example.com/image1.jpg'],
    },
    {
      id: 2,
      name: 'Product 2',
      price: 20,
      imageUrl: ['https://example.com/image2.jpg'],
    },
    {
      id: 3,
      name: 'Product 3',
      price: 30,
      imageUrl: ['https://example.com/image3.jpg'],
    },
  ];
  it('should get the data when filtered Data is clicked', async () => {
    ApiService.get.mockResolvedValue(searchResults);
    const {result} = renderHook(() => useSearchResults());
    await act(() => {
      result.current.filterData();
    });
    await waitFor(() => {
      expect(result.current.filteredProducts).toBe(searchResults);
    });
  });
  it('should get the data empty when nodata', () => {
    const mockErrorData: any[] = [];
    ApiService.get.mockRejectedValue(mockErrorData);
    const {result} = renderHook(() => useSearchResults());
    act(() => {
      result.current.filterData();
    });
    waitFor(() => {
      expect(result.current.filteredProducts).toBe(mockErrorData);
    });
  });
  it('should fetch subcategory data and set subcategoriesData', async () => {
    // Mock ApiService.get to return some sample data
    ApiService.get.mockResolvedValue([
      {id: 1, subcategoryName: 'Subcategory 1'},
      {id: 2, subcategoryName: 'Subcategory 2'},
    ]);

    // Render the hook
    const {result} = renderHook(() => useSearchResults());

    // Call the SubcategoryData function
    await act(async () => {
      result.current.SubcategoryData();
    });

    // Wait for the hook to update state
    await waitFor(() => {
      expect(result.current.subcategoriesData).toEqual([
        {value: 1, label: 'Subcategory 1'},
        {value: 2, label: 'Subcategory 2'},
      ]);
    });

    // Verify that ApiService.get was called with the correct arguments
    expect(ApiService.get).toHaveBeenCalledWith(categoriesData);
  });
  it('should call subcategory data', async () => {
    const {result} = renderHook(() => useSearchResults());
    expect(result.current.modalVisible).toBe(false);
    act(() => {
      result.current.handleFilterButtonPress();
    });
    expect(result.current.modalVisible).toBe(true);
    waitFor(() => {
      expect(result.current.SubcategoryData()).toBeCalled();
    });
  });
  it('should call fetch data', async () => {
    const {result} = renderHook(() => useSearchResults());
    expect(result.current.modalVisible).toBe(false);
    act(() => {
      result.current.handleFilterapply();
    });
    expect(result.current.modalVisible).toBe(true);
    waitFor(() => {
      expect(result.current.filterData()).toBeCalled();
    });
  });
});
