import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Useowneredititems from 'screens/Owneredititems/Useowneredititems';
import {addGenderData} from '../../../src/redux/actions/actions';
import {useDispatch} from 'react-redux';
import ApiService from 'network/network';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(() => mockDispatch),
}));
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));

jest.mock('../../../src/constants/asyncStorageWrapper', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
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
describe('useCart', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('This should open modal', () => {
    const wishlist = renderHook(() => Useowneredititems());
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => Useowneredititems());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('should update gender state and dispatch action', () => {
    const dispatch = jest.fn();
    const selectedGender = 'Male';

    // Mock the useDispatch hook to return the dispatch function
    useDispatch.mockReturnValue(dispatch);

    // Render the hook
    const {result} = renderHook(() => Useowneredititems());

    // Call the handleGenderChange function
    act(() => {
      result.current.handleGenderChange(selectedGender);
    });

    waitFor(() => {
      expect(result.current.gender).toBe(selectedGender);
    });

    // Check if dispatch was called with the correct action (addGenderData)
    expect(dispatch).toHaveBeenCalledWith(addGenderData(selectedGender));
  });
  it('should fetch data and set state on successful API response', async () => {
    const mockResponse = [
      {
        id: 1,
        name: 'Item 1',
        price: 10,
        imageUrl: ['image_url_1'],
        disabledQuantities: [],
        availableQuantities: [1, 2, 3],
        disabled: false,
        totalQuantity: 5,
      },
    ];
    const {result} = renderHook(() => Useowneredititems());

    // Mock the ApiService.get function to return a resolved Promise with mockResponse
    ApiService.get.mockResolvedValue(mockResponse);

    // Call the fetchData function
    await result.current.fetchData();

    waitFor(() => {
      expect(result.current.data).toHaveBeenCalledWith([
        {
          id: 1,
          name: 'Item 1',
          price: 10,
          image: 'image_url_1',
          disabledQuantities: [],
          availableQuantities: [1, 2, 3],
          disabled: false,
          totalQuantity: 5,
        },
      ]);
      expect(result.current.isLoading).toHaveBeenCalledWith(false);
    });

    // Check if setIsLoading was called with false
  });
  it('should handle FetchData ', async () => {
    const mockId = 2;
    const mockResponse = [
      {
        id: 1,
        name: 'Item 1',
        price: 10,
        description: 'Item 1 description',
        totalQuantity: 5,
      },
    ];
    const {result} = renderHook(() => Useowneredititems());

    // Mock the ApiService.get function to return a resolved Promise with mockResponse
    ApiService.get.mockResolvedValue(mockResponse);

    // Call the fetchData function
    await result.current.FetchData(mockId);

    waitFor(() => {
      expect(result.current.Mapdata).toHaveBeenCalledWith([
        {
          id: 1,
          name: 'Item 1',
          price: 10,
          description: 'Item 1 description',
          totalQuantity: 5,
        },
      ]);
    });

    // Check if setIsLoading was called with false
  });
});
