import {renderHook, act} from '@testing-library/react-native';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';
import useCart from '../../../../src/screens/Cart/useCart';

import {fetchCartProducts} from '../../../../src/redux/slice/cartSlice';
import * as ToastModule from 'react-native-toast-message'; // Import the module correctly

// Mock the module and the show function
jest.mock('react-native-toast-message', () => ({
  ...jest.requireActual('react-native-toast-message'), // Use the actual module to keep other functions intact
  show: jest.fn(), // Mock the show function
}));

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
describe('useCart', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        CartProducts: {error: 403},
        cartUpdate: {error: 404, isLoader: null},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockCartItem = {
    id: 1,
    imageUrl: 'https://example.com/product-image.jpg',
    product: {
      availableQuantities: 10,
      brand: 'Example Brand',
      color: 'Blue',
      createdAt: '2023-01-01',
      createdBy: 1,
      deleted: false,
      description: 'A sample product description',
      disabled: false,
      disabledQuantities: 0,
      id: 123,
      material: 'Cotton',
      name: 'Sample Product',
      price: 29.99,
      quantity: 5,
      rentedQuantities: 2,
      size: 'Medium',
      updatedAt: '2023-01-02',
      updatedBy: 2,
    },
    quantity: 2,
    rentalEndDate: '2023-01-15',
    rentalStartDate: '2023-01-10',
  };

  test('Should open the modal and Dispatch the cart details', () => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    const {result} = renderHook(() => useCart());
    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.openModal();
    });
    expect(result.current.showModal).toBe(true);

    expect(mockDispatch).toHaveBeenCalledWith(fetchCartProducts);
  });
  test('Should close the modal and Dispatch the cart details', () => {
    const {result} = renderHook(() => useCart());
    expect(result.current.showModal).toBe(false);

    act(() => {
      result.current.closeModal();
    });
    expect(result.current.showModal).toBe(false);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
  test('Should update the cart & Dispatch the cart details', async () => {
    const {result} = renderHook(() => useCart());
    const mockData = {
      quantity: 10,
      productId: '12',
    };
    expect(result.current.refreshing).toBe(false);

    act(() => {
      result.current.handleUpdate(mockData.quantity, mockData.productId);
    });

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
  it('should navigate to Edit Profile', () => {
    const {result} = renderHook(() => useCart());
    act(() => {
      result.current.handleCheckout();
    });
    expect(mockNav).toHaveBeenCalledWith('CheckoutScreen');
  });
  test('Should remove from the cart & Dispatch the cart details', async () => {
    const {result} = renderHook(() => useCart());
    const mockData = {
      productId: 12,
    };
    expect(result.current.refreshing).toBe(false);

    act(() => {
      result.current.handleRemove(mockData.productId);
    });

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(mockDispatch).toHaveBeenCalledWith(fetchCartProducts);
  });
  test('Should Increment and update the cart & Dispatch the cart details', async () => {
    const {result} = renderHook(() => useCart());

    act(() => {
      result.current.handleIncrement(mockCartItem);
    });

    expect(result.current.cartProductId).toBe(123); // Ensure setCartProductId was called with the correct ID
    expect(result.current.isplusDisable).toBe(false);
  });
  test('Should Increment and update the cart & Dispatch the cart details if quantity is equal', async () => {
    const {result} = renderHook(() => useCart());
    const mockItem = {
      id: 1,
      imageUrl: 'https://example.com/product-image.jpg',
      product: {
        availableQuantities: 10,
        brand: 'Example Brand',
        color: 'Blue',
        createdAt: '2023-01-01',
        createdBy: 1,
        deleted: false,
        description: 'A sample product description',
        disabled: false,
        disabledQuantities: 0,
        id: 123,
        material: 'Cotton',
        name: 'Sample Product',
        price: 29.99,
        quantity: 5,
        rentedQuantities: 2,
        size: 'Medium',
        updatedAt: '2023-01-02',
        updatedBy: 2,
      },
      quantity: 10,
      rentalEndDate: '2023-01-15',
      rentalStartDate: '2023-01-10',
    };

    act(() => {
      result.current.handleIncrement(mockItem);
    });

    expect(result.current.cartProductId).toBe(123); // Ensure setCartProductId was called with the correct ID
    expect(result.current.isplusDisable).toBe(true);
  });
  test('Should Decrement and update the cart & Dispatch the cart details', async () => {
    const {result} = renderHook(() => useCart());

    act(() => {
      result.current.handleDecrement(mockCartItem);
    });
    expect(result.current.cartProductId).toBe(123); // Ensure setCartProductId was called with the correct ID
    expect(result.current.isplusDisable).toBe(false);
  });
  it('should call CartToast with the correct parameters when cartError is true', () => {
    const cartError = true;

    const {result} = renderHook(() => useCart());

    act(() => {
      result.current.CartToast();
    });

    expect(ToastModule.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error in cart',
    });
  });
  it('should call Show error with the correct parameters when cartError is true', () => {
    useSelector.mockImplementation(selector =>
      selector({
        CartProducts: {error: 403},
        cartUpdate: {error: 404, isLoader: null},
      }),
    );

    const {result} = renderHook(() => useCart());

    act(() => {
      result.current.showToast();
    });

    expect(ToastModule.show).toHaveBeenCalledWith({
      type: 'error',
      text1: 'Error in updating cart',
    });
  });
});
