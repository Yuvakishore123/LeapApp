import {renderHook, act, waitFor} from '@testing-library/react-native';

import {useDispatch} from 'react-redux';
import useFilterScreen from '../../../../src/screens/BorrowerScreens/FilterScreen/useFilterScreen';
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

describe('useFiltered Screen', () => {
  const mockdata = [
    {
      availableQuantities: 5,
      brand: 'Example Brand',
      categoryIds: [1, 2],
      color: 'Red',
      description: 'This is a sample product description.',
      disabled: false,
      disabledQuantities: 0,
      id: 1,
      imageUrl: ['https://example.com/product-image.jpg'],
      material: 'Cotton',
      name: 'Sample Product',
      price: 19.99,
      rentedQuantities: 2,
      size: 'Medium',
      subcategoryIds: [3, 4],
      totalQuantity: 10,
    },
  ];

  const dispatchMock = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dispatchMock);
  it('should get the data of filtered screen', () => {
    jest.spyOn(ApiService, 'get').mockResolvedValue(mockdata);
    const {result} = renderHook(() => useFilterScreen());
    act(() => {
      result.current.FilterData();
    });
    waitFor(() => {
      expect(result.current.filteredProducts).toBe(mockdata);
    });
  });
  it('should set data empty ', () => {
    const emptyData: any[] = [];

    const consoleErrorMock = 'eoorr during fetching data';
    jest.spyOn(ApiService, 'get').mockRejectedValueOnce(consoleErrorMock);
    const {result} = renderHook(() => useFilterScreen());
    act(() => {
      result.current.FilterData();
    });
    waitFor(() => {
      expect(result.current.filteredProducts).toEqual(emptyData);

      // Check if console.error was called with the expected error message
      expect(consoleErrorMock).toHaveBeenCalledWith(
        'Error fetching filtered products:',
        consoleErrorMock, // You can also check for specific error messages or types here
      );
    });
  });
});
