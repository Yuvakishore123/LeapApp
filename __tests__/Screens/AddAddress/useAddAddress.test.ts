import {renderHook} from '@testing-library/react-native';
import ApiService from 'network/network';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {act} from 'react-test-renderer';
import useAddAddress from 'screens/Owneraddaddress/useAddAddress';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/network/network', () => ({
  get: jest.fn(),
}));
jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

const mockDispatch = jest.fn();

jest.mock('../../../src/helpers/helper', () => ({
  useThunkDispatch: () => ({dispatch: mockDispatch}),
  logMessage: {
    error: jest.fn(),
  },
}));
const mockNav = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      addListener: jest.fn(),
      goBack: jest.fn(),
    }),
    useIsFocused: jest.fn().mockReturnValue(true),
  };
});

describe('useAddress', () => {
  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(
      (selector: (arg0: {listAddress: {data: {}}}) => any) =>
        selector({
          listAddress: {data: {}},
        }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches address correctly', async () => {
    // Set up mock data for ApiService.get
    const mockResult = [
      {
        PostOffice: [
          {
            Country: 'CountryName',
            District: 'CityName',
            State: 'StateName',
          },
        ],
      },
    ];
    (ApiService.get as jest.Mock).mockResolvedValue(mockResult);

    // Render the custom hook
    const {result} = renderHook(() => useAddAddress());

    // Set postalCode (assuming you have a way to do this in your hook)
    act(() => {
      result.current.setpostalCode('123456');
    });

    // Call FetchAddress function
    await act(async () => {
      await result.current.FetchAddress();
    });

    // Check if state values are set correctly
    expect(result.current.country).toBe('CountryName');
    expect(result.current.city).toBe('CityName');
    expect(result.current.state).toBe('StateName');
    expect(result.current.isLoading).toBe(false);
    expect(ApiService.get).toHaveBeenCalledWith(
      'https://api.postalpincode.in/pincode/123456',
    );
    expect(Alert.alert).not.toHaveBeenCalled();
  });
  it('fetches address correctly with emmpty values', async () => {
    // Set up mock data for ApiService.get
    const mockResult = [
      {
        PostOffice: [],
      },
    ];
    (ApiService.get as jest.Mock).mockResolvedValue(mockResult);

    // Render the custom hook
    const {result} = renderHook(() => useAddAddress());

    // Set postalCode (assuming you have a way to do this in your hook)
    act(() => {
      result.current.setpostalCode('123456');
    });

    // Call FetchAddress function
    await act(async () => {
      await result.current.FetchAddress();
    });

    // Check if state values are set correctly
    expect(result.current.country).toBe('');
    expect(result.current.city).toBe('');
    expect(result.current.state).toBe('');
  });
  it('handles error correctly', async () => {
    // Mock ApiService.get to simulate an error
    (ApiService.get as jest.Mock).mockRejectedValue(
      new Error('Test error message'),
    );

    // Render the custom hook
    const {result} = renderHook(() => useAddAddress());

    // Set postalCode (assuming you have a way to do this in your hook)
    act(() => {
      result.current.setpostalCode('123456');
    });

    // Call FetchAddress function
    await act(async () => {
      await result.current.FetchAddress();
    });

    // Check if Alert.alert was called with the correct message
    expect(Alert.alert).toHaveBeenCalledWith('Enter valid Pincode');

    // Check if state values are set correctly
    expect(result.current.isLoading).toBe(false);
  });
  it('This should open modal', () => {
    const wishlist = renderHook(() => useAddAddress());
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useAddAddress());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('handles postal code change correctly', async () => {
    const {result} = renderHook(() => useAddAddress());

    // Simulate changing the postal code to '123456'
    act(() => {
      result.current.setpostalCode('123456');
    });

    // Call the handlePostalCodeChange function
    await act(async () => {
      await result.current.handlePostalCodeChange('123456');
    });

    // Check if postalCode state is updated correctly
    expect(result.current.postalCode).toBe('123456');

    // Check if isLoading state is set correctly
    expect(result.current.isLoading).toBe(false);

    // Ensure Alert.alert was not called
    expect(Alert.alert).not.toHaveBeenCalledWith('Enter valid pincode');
  });
  it('handles invalid postal code correctly', async () => {
    const {result} = renderHook(() => useAddAddress());

    // Simulate changing the postal code to '1234567' (invalid)
    act(() => {
      result.current.setpostalCode('1234567');
    });

    // Call the handlePostalCodeChange function
    await act(async () => {
      await result.current.handlePostalCodeChange('1234567');
    });

    // Check if Alert.alert was called with the correct message
    expect(Alert.alert).toHaveBeenCalledWith('Enter a valid pincode');

    // Ensure isLoading state is set correctly
    expect(result.current.isLoading).toBe(false);
  });
  it('handles save address correctly', () => {
    const {result} = renderHook(() => useAddAddress());

    // Assuming you have set your addressLine1, addressLine2, selectedOption, city, country, postalCode, state, and isChecked values.

    act(() => {
      result.current.handleSaveAddress();
    });
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(result.current.showModal).toBe(true);
  });
  it('handles handleCheckboxChange correctly', () => {
    const {result} = renderHook(() => useAddAddress());

    // Assuming you have set your addressLine1, addressLine2, selectedOption, city, country, postalCode, state, and isChecked values.

    act(() => {
      result.current.handleCheckboxChange();
    });
    expect(result.current.isChecked).toBe(true);
  });
});
