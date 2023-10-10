import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddImages from 'screens/OwnerImage/AddImages';
import useAddImages from 'screens/OwnerImage/useAddImages';
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('screens/OwnerImage/useAddImages', () => ({
  postData: jest.fn(),
  handleRemoveImage: jest.fn(),
  handleSizeTypeChange: jest.fn(),
  setSelectedsize: jest.fn(),
  handlePriceChange: jest.fn(),
  handleQuantityChange: jest.fn(),
  handleBlur: jest.fn(),
  imageUrls: ['image1.jpg', 'image2.jpg'],
  pickImages: jest.fn(),
  closeModal: jest.fn(),
  showModal: jest.fn(),
  formik: {
    touched: {},
    errors: {},
    isValid: true,
    handleSubmit: jest.fn(),
  },
  isLoading: false,
  default: jest.fn(),
  __esModule: true,
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: jest.fn(),
      navigate: mockNav,
      // Add other navigation properties and methods as needed
    }),
  };
});
describe('OwnerImages Screen', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useAddImages as jest.Mock).mockReturnValue({
      postData: jest.fn(),
      handleRemoveImage: jest.fn(),
      handleSizeTypeChange: jest.fn(),
      setSelectedsize: jest.fn(),
      handlePriceChange: jest.fn(),
      handleQuantityChange: jest.fn(),
      handleBlur: jest.fn(),
      imageUrls: ['image1.jpg', 'image2.jpg'], // Mocked image URLs
      pickImages: jest.fn(),
      closeModal: jest.fn(),
      showModal: jest.fn(),
      formik: {
        touched: {
          quantity: true,
          price: true,
        },
        errors: {quantity: 'Quantity is required', price: 'price is required'},
        isValid: true,
        handleSubmit: jest.fn(),
      },
      isLoading: false,
    });
  });
  it('renders correctly', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="AddImages" component={AddImages} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeTruthy();
  });
  it('should handle the if the Price is added or not', () => {
    const Stack = createNativeStackNavigator();

    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="AddImages" component={AddImages} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    const priceText = getByPlaceholderText('Select price');
    fireEvent.changeText(priceText, '');
    const priceError = getByTestId('pricerror');
    fireEvent.changeText(priceText, '');
    fireEvent(priceText, 'onBlur', {target: {value: ''}});
    expect(priceError).toBeTruthy();
  });
  it('should handle the if the quantity when  is added or not', () => {
    const {getByPlaceholderText, getByTestId} = render(
      <NavigationContainer>
        <AddImages />
      </NavigationContainer>,
    );
    const quantityText = getByPlaceholderText('Select quantity');
    fireEvent.changeText(quantityText, '');
    const quantityError = getByTestId('quantityerror');
    fireEvent.changeText(quantityText, '');
    fireEvent(quantityText, 'onBlur', {target: {value: ''}});
    expect(quantityError).toBeTruthy();
  });
  it('should render loading indicator when isLoading is true', async () => {
    // Mock isLoading as true to simulate loading state
    (useAddImages as jest.Mock).mockReturnValue({
      formik: {
        touched: {price: true, quantity: true, size: true},
        errors: {
          price: 'Price is required',
          quantity: 'Quantity is required',
          size: 'Size is required',
        },
        isValid: false,
        handleSubmit: jest.fn(),
      },

      isLoading: true,
    });
    const {getByTestId, getByText} = render(<AddImages />);

    const loadingIndicator = getByTestId('spinnerloading');
    expect(loadingIndicator).toBeTruthy();

    const addButton = getByText('Add product');
    act(() => {
      fireEvent.press(addButton);
    });
    expect(loadingIndicator).toBeTruthy();
  });
  it('should get handle the remove button in images', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({urls: ['mocked-url-1', 'mocked-url-2']}),
    });
    const {getByTestId} = render(<AddImages />);

    const removeButton = getByTestId('remove-button-0');
    expect(removeButton).toBeTruthy();
    act(() => {
      fireEvent.press(removeButton);
    });
  });
  it('should add the products ', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({urls: ['mocked-url-1', 'mocked-url-2']}),
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <AddImages />
      </NavigationContainer>,
    );

    const Image = getByTestId('image-0');
    expect(Image).toBeTruthy();
  });
});
