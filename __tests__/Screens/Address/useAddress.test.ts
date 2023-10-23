import {renderHook} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import {act} from 'react-test-renderer';
import useAddress from 'screens/Owneraddaddress/useAddress';

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
  // Mock any other dependencies you might have (e.g., logMessage)
}));
jest.mock('../../../src/helpers/helper', () => ({
  logMessage: {
    error: jest.fn(),
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

  it('This should open modal', () => {
    const wishlist = renderHook(() => useAddress());
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useAddress());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('should dispatch removeAddress action and open modal', () => {
    const {result} = renderHook(() => useAddress());
    const deleteId = 123; // Sample delete ID

    act(() => {
      result.current.handleDeleteAddress(deleteId);
    });

    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(result.current.showModal).toBe(true);
  });
  it('should navigate to EditAddress with item data', () => {
    const {result} = renderHook(() => useAddress());

    // Assuming itemData is a sample data you want to pass
    const itemData = {
      addressLine1: '123 Main Street',
      addressLine2: '',
      addressType: 'Home',
      city: 'Cityville',
      country: 'USA',
      postalCode: '12345',
      state: 'CA',
      defaultType: false,
    };

    act(() => {
      result.current.handleEditItems(itemData);
    });

    expect(mockNav).toHaveBeenCalledWith('EditAddress', {address: itemData});
  });

  it('should navigate to Owneraddaddress', () => {
    const {result} = renderHook(() => useAddress());

    act(() => {
      result.current.handleOwnerAddAddress();
    });

    expect(mockNav).toHaveBeenCalledWith('Owneraddaddress');
  });
});
