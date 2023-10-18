import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cart from 'screens/Cart/Cart';

import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import useCart from 'screens/Cart/useCart';

jest.mock('screens/Cart/useCart', () => ({
  handleCheckout: jest.fn(),
  handleRemove: jest.fn(),
  setRentalStartDate: jest.fn(),
  setRentalEndDate: jest.fn(),
  closeModal: jest.fn(),
  showModal: false,
  imageLoaded: false,
  setImageLoaded: jest.fn(),
  handleDecrement: jest.fn(),
  handleIncrement: jest.fn(),
  isplusDisable: false,
  isLoading: false,
  getContainerStyle: jest.fn(),
  getTextColor: jest.fn(),
  getTextInputStyle: jest.fn(),
  cartProductId: '2',
  cartData: [],
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('network/network');
jest.mock('@react-native-community/netinfo', () =>
  require('react-native-netinfo'),
);
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

const Stack = createNativeStackNavigator();
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
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@react-native-firebase/messaging', () => {
  return {
    __esModule: true,
    default: jest.fn(),
    messaging: jest.fn(() => ({
      onTokenRefresh: jest.fn(),
      setBackgroundMessageHandler: jest.fn(),
    })),
  };
});
describe('Cart Screen', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  const mockCartData = {
    cartItems: [
      {
        id: 1,
        imageUrl: 'https://example.com/product1.jpg',
        product: {
          availableQuantities: 10,
          brand: 'Brand A',
          color: 'Red',
          createdAt: '2023-09-27T09:51:08.657Z',
          createdBy: 1,
          deleted: false,
          description: 'Product 1 Description',
          disabled: false,
          disabledQuantities: 0,
          id: 101,
          material: 'Material X',
          name: 'Product 1',
          price: 29.99,
          quantity: 2,
          rentedQuantities: 0,
          size: 'Medium',
          updatedAt: '2023-09-27T09:51:08.657Z',
          updatedBy: 1,
        },
        quantity: 2,
        rentalEndDate: '2023-12-31T23:59:59.999Z',
        rentalStartDate: '2023-09-01T00:00:00.000Z',
      },
    ],
    finalPrice: 99.97,
    shippingCost: 10.0,
    tax: 9.98,
    totalCost: 119.95,
    userId: 12345,
  };
  const emptyData = {
    cartItems: [],
  };
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    useSelector.mockImplementation(selector =>
      selector({
        CartProducts: {data: []},
      }),
    );
    (useCart as jest.Mock).mockReturnValue({
      useCart: jest.fn(() => ({
        handleCheckout: jest.fn(),
        handleRemove: jest.fn(),
        setRentalStartDate: jest.fn(),
        setRentalEndDate: jest.fn(),
        closeModal: jest.fn(),
        showModal: false,
        imageLoaded: false,
        setImageLoaded: jest.fn(),
        handleDecrement: jest.fn(),
        handleIncrement: jest.fn(),
        isplusDisable: false,
        isLoading: false,
        getContainerStyle: jest.fn(),
        getTextColor: jest.fn(),
        getTextInputStyle: jest.fn(),
        cartProductId: '2',
        CartProducts: [],
      })),
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the Crt Screen', () => {
    const result = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    expect(result).toBeDefined();
  });
  it('should show products Name on  screen ', () => {
    (useCart as jest.Mock).mockReturnValue({
      isLoading: false,
      CartProducts: mockCartData,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    jest.useFakeTimers();
    const productName = getByTestId('product-name-1');
    expect(productName).toBeDefined();
  });
  it('should decrement when handle decrement is clicked', () => {
    const mockDecrement = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      isLoading: false,
      CartProducts: mockCartData,
      handleDecrement: mockDecrement,
    });
    jest.useFakeTimers();
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const decrementButton = getByTestId('decrement-button-1');
    expect(decrementButton).toBeDefined();
    fireEvent.press(decrementButton);
    expect(mockDecrement).toHaveBeenCalled();
    expect(mockDecrement).toHaveBeenCalledWith(mockCartData.cartItems[0]);
  });
  it('should incremenet when handle increment is clicked', () => {
    const mockincremenet = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      isLoading: false,
      CartProducts: mockCartData,
      handleIncrement: mockincremenet,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    jest.useFakeTimers();
    const incrementButton = getByTestId('increment-button-1');
    expect(incrementButton).toBeDefined();
    fireEvent.press(incrementButton);
    expect(mockincremenet).toHaveBeenCalled();
    expect(mockincremenet).toHaveBeenCalledWith(mockCartData.cartItems[0]);
  });
  it('should remove when handleRemove is clicked', () => {
    const mockremove = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      isLoading: false,
      CartProducts: mockCartData,
      handleRemove: mockremove,
    });
    jest.useFakeTimers();
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const removeButton = getByTestId('remove-1');
    expect(removeButton).toBeDefined();
    fireEvent.press(removeButton);
    expect(mockremove).toHaveBeenCalled();
    expect(mockremove).toHaveBeenCalledWith(
      mockCartData.cartItems[0].product.id,
    );
  });
  it('should show loading when Data is Empty', () => {
    const mockCart = {
      cartItem: [],
    };
    const mockremove = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      isLoading: false,
      CartProducts: mockCart,
      handleRemove: mockremove,
    });
    jest.useFakeTimers();
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const checkoutButton = getByTestId('checkoutButton');
    expect(checkoutButton).toBeDefined();
    fireEvent.press(checkoutButton);
  });
  it('should show loading when increment is Done', () => {
    const mockCart = {
      cartItem: [],
    };
    const mockIncrement = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      isLoading: true,
      CartProducts: mockCartData,
      cartProductId: 101,
      handleIncrement: mockIncrement,
    });
    jest.useFakeTimers();
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const incrementButton = getByTestId('increment-1');
    expect(incrementButton).toBeDefined();
    fireEvent.press(incrementButton);
    expect(mockIncrement).toHaveBeenCalledWith(mockCartData.cartItems[0]);
  });
  it('should show mock  image when image is not loaded', () => {
    const mockImageLoaded = jest.fn();
    const mockError = jest.fn();
    (useCart as jest.Mock).mockReturnValue({
      CartProducts: mockCartData,
      imageLoaded: true,
      setImageLoaded: mockImageLoaded,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const imageButton = getByTestId('Image-1');
    expect(imageButton).toBeDefined();
  });
  it('should get the empty screen', () => {
    useSelector.mockImplementation(selector =>
      selector({
        CartProducts: {data: {cartItems: []}},
      }),
    );
    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const imageButton = getByTestId('loading-view');
    expect(imageButton).toBeDefined();
  });
  it('should get the loading when data is not there screen', () => {
    useSelector.mockImplementation(selector =>
      selector({
        CartProducts: {data: {cartItems: []}},
      }),
    );
    (useCart as jest.Mock).mockReturnValue({
      isLoading: false,
      CartProducts: emptyData,
    });
    const {getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const imageButton = getByText('Hey,it feels so light!');
    expect(imageButton).toBeDefined();
  });
});
