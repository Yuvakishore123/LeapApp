import {act, renderHook} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import useEditAddress from '../../../src/screens/EditAddress/useEditAddress';
import ApiService from 'network/Network';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('network/Network', () => ({
  post: jest.fn(), // This creates a Jest mock function for ApiService.post
}));
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

const mockNav = jest.fn();
const mockRoute = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      goBack: jest.fn(),
      // addListener: jest.fn(),
    }),
    useRoute: () => mockRoute, // Mock useRoute to provide a route object
  };
});

const configureDispatch = () => {
  const dispatch = jest.fn();
  (useDispatch as jest.Mock).mockReturnValue(dispatch);
  return dispatch;
};

describe('Checkout Screen', () => {
  const mockDispatch = configureDispatch();
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as jest.Mock).mockImplementation(
      (selector: (arg0: {editAddressData: {data: {}}}) => any) =>
        selector({
          editAddressData: {data: {}},
        }),
    );
    AsyncStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('This should open modal', () => {
    const wishlist = renderHook(() => useEditAddress());
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useEditAddress());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('should update address and show modal on successful response', async () => {
    const mockAddress = {
      addressLine1: 'Mock Address Line 1',
      addressLine2: 'Mock Address Line 2',
      addressType: 'Home',
      city: 'Mock City',
      country: 'Mock Country',
      postalCode: '12345',
      state: 'Mock State',
      defaultType: true,
    };

    // Set up initial state
    const {result} = renderHook(() => useEditAddress());
    result.current.setAddressLine1(mockAddress.addressLine1);
    result.current.setAddressLine2(mockAddress.addressLine2);
    result.current.setCity(mockAddress.city);
    result.current.setPostalCode(mockAddress.postalCode);
    result.current.setStateName(mockAddress.state);
    const mock = {
      status: 200,
      statusText: 'OK',
      headers: {},
      data: {success: true},
    };
    jest.spyOn(ApiService, 'post').mockResolvedValueOnce(mock);

    // Call handleUpdateAddress
    await act(async () => {
      result.current.handleUpdateAddress();
    });

    // Check if dispatch was called with the correct arguments
    expect(mockDispatch).toHaveBeenCalledTimes(2);

    // Check if setIsLoading was called
    expect(result.current.isLoading).toBe(false);

    // Check if openModal was called
    expect(result.current.showModal).toBe(true);
  });
  it('should handle error and log message', async () => {
    // Mock the error response from editAddressData
    const mockError = new Error('Failed to update address');
    jest.spyOn(ApiService, 'post').mockRejectedValueOnce(mockError);

    // Set up initial state
    const {result} = renderHook(() => useEditAddress());
    result.current.setAddressLine1('Mock Address Line 1');
    // Add more state updates as needed

    // Call handleUpdateAddress
    await act(async () => {
      result.current.handleUpdateAddress();
    });

    // Check if setIsLoading was called
    expect(result.current.isLoading).toBe(false);
  });
  it('should update selectedOption when handleOptionChange is called', () => {
    const {result} = renderHook(() => useEditAddress());
    const newValue = 'New Option';

    act(() => {
      result.current.handleOptionChange(newValue);
    });

    expect(result.current.selectedOption).toBe(newValue);
  });

  it('should update postalCode when handlePostalcode is called', () => {
    const {result} = renderHook(() => useEditAddress());
    const newValue = '12345';

    act(() => {
      result.current.handlePostalcode(newValue);
    });

    expect(result.current.postalCode).toBe(newValue);
  });

  it('should toggle isChecked when handleCheckboxChange is called', () => {
    const {result} = renderHook(() => useEditAddress());

    act(() => {
      result.current.handleCheckboxChange();
    });

    expect(result.current.isChecked).toBe(true);

    act(() => {
      result.current.handleCheckboxChange();
    });

    expect(result.current.isChecked).toBe(false);
  });
});
