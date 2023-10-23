import {act, renderHook} from '@testing-library/react-native';
import {useSelector} from 'react-redux';
import useCart from '../../../src/screens/Cart/useCart';
import Toast from 'react-native-toast-message';

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
jest.mock('react-native-toast-message', () => {
  return {
    show: jest.fn(),
  };
});
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
    (useSelector as jest.Mock).mockImplementation(
      (
        selector: (arg0: {
          CartProducts: {data: {}};
          cartUpdate: {isLoader: null};
        }) => any,
      ) =>
        selector({
          CartProducts: {data: {}},
          cartUpdate: {isLoader: null},
        }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('This should open modal', () => {
    const wishlist = renderHook(() => useCart());
    act(() => {
      wishlist.result.current.openModal();
    });
    expect(wishlist.result.current.showModal).toBe(true);
  });
  it('This should close  modal', () => {
    const {result} = renderHook(() => useCart());
    expect(result.current.showModal).toBe(false);

    // Open the modal
    act(() => {
      result.current.closeModal();
    });

    // After opening the modal, showModal should be true
    expect(result.current.showModal).toBe(false);
  });
  it('should navigate to CheckoutScreen', () => {
    const {result} = renderHook(() => useCart());

    result.current.handleCheckout();

    expect(mockNav).toHaveBeenCalledWith('CheckoutScreen');
  });
  it('should dispatch removefromCart and fetchCartProducts actions and open modal', () => {
    const {result} = renderHook(() => useCart());

    const productId = 123; // Example product ID

    result.current.handleRemove(productId);

    expect(mockDispatch).toHaveBeenCalledTimes(4);
    act(() => {
      result.current.openModal();
    });

    expect(result.current.showModal).toBe(true);
  });
  it('should dispatch updateCart action with the correct data', async () => {
    const {result} = renderHook(() => useCart());

    const newQuantity = 5;
    const productId = '123';

    // Call the handleUpdate function
    await act(async () => {
      await result.current.handleUpdate(newQuantity, productId);
    });

    // Check if updateCart was called with the correct data
    expect(mockDispatch).toHaveBeenCalledTimes(3);

    // You can also check if setRefreshing was called if it's a state-setting function
    // expect(result.current.setRefreshing).toHaveBeenCalledWith(true);
  });
  it('should disable button when quantity reaches available quantity', () => {
    const {result} = renderHook(() => useCart());

    const item = {
      product: {
        id: 123,
        availableQuantities: 3, // Assuming available quantity is 3
      },
      quantity: 3, // Current quantity is equal to available quantity
    };

    act(async () => {
      await result.current.handleIncrement(item);
    });
    expect(result.current.isplusDisable).toBe(true);
  });
  it('should decrement quatity when quantity reaches available quantity', () => {
    const {result} = renderHook(() => useCart());

    const item = {
      product: {
        id: 123,
        availableQuantities: 3, // Assuming available quantity is 3
      },
      quantity: 2, // Current quantity is equal to available quantity
    };

    act(async () => {
      await result.current.handleDecrement(item);
    });
    expect(result.current.isplusDisable).toBe(false);
  });
  it('should show toast with error message for cart update', () => {
    const {result} = renderHook(() => useCart());

    result.current.showToast();

    // Ensure that Toast.show was called with the correct parameters
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error in updating cart',
    });
  });

  it('should show toast with error message for cart error', () => {
    const {result} = renderHook(() => useCart());

    result.current.CartToast();

    // Ensure that Toast.show was called with the correct parameters
    expect(Toast.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error in cart',
    });
  });
});
