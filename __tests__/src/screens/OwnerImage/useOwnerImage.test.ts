import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useSearchResults from '../../../../src/screens/BorrowerScreens/SearchResultScreen/useSearchResults';

import ApiService from 'network/network';
import {categoriesData} from '../../../../src/constants/Apis';
import useAddImages from 'screens/OwnerScreens/OwnerImage/useAddImages';

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
        ItemsReducer: {Name: {}},
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
    const {result} = renderHook(() => useAddImages());
    expect(result.current.showModal).toBe(false);
    await act(() => {
      result.current.openModal();
    });
    await waitFor(() => {
      expect(result.current.showModal).toBe(true);
    });
  });
});
