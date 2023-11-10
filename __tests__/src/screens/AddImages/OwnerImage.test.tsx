import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';

import {NavigationContainer} from '@react-navigation/native';

import {useDispatch} from 'react-redux';

import AddImages from 'screens/OwnerScreens/OwnerImage/AddImages';
import useAddImages from 'screens/OwnerScreens/OwnerImage/useAddImages';

declare const global: any;
jest.mock('rn-fetch-blob', () => require('rn-fetch-blob-mock'));
jest.mock('@notifee/react-native', () => require('notifee-mocks'));
jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('react-native-razorpay', () => require('razorpay-mock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('screens/OwnerScreens/OwnerImage/useAddImages', () => ({
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
    touched: {},
    errors: {},
    isValid: true,
    handleSubmit: jest.fn(),
  },
  isLoading: false,
  default: jest.fn(),
  __esModule: true,
}));

const mockAddListener = jest.fn();
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      addListener: mockAddListener,
      navigate: mockNavigate,
      // Add other navigation properties and methods as needed
    }),
  };
});

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
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('AddImages Screen', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
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
        touched: {},
        errors: {},
        isValid: true,
        handleSubmit: jest.fn(),
      },
      isLoading: false,
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the AddImages Screen', () => {
    // Define a mock route with the necessary params

    const AddImage = render(
      <NavigationContainer>
        <AddImages />
      </NavigationContainer>,
    );
    expect(AddImage).toBeDefined();
  });
  it('should handle the if the Price is added or not', () => {
    // Define a mock route with the necessary params

    const {getByPlaceholderText, getByTestId} = render(
      <NavigationContainer>
        <AddImages />
      </NavigationContainer>,
    );
    const priceText = getByPlaceholderText('Select price');
    fireEvent.changeText(priceText, '');
    const priceError = getByTestId('price');
    fireEvent.changeText(priceText, '');
    fireEvent(priceText, 'onBlur', {target: {value: ''}});
    expect(priceError).toBeTruthy();
  });
  it('should handle the if the quantity when  is added or not', () => {
    // Define a mock route with the necessary params

    const {getByPlaceholderText, getByTestId} = render(
      <NavigationContainer>
        <AddImages />
      </NavigationContainer>,
    );
    const quantityText = getByPlaceholderText('Select quantity');
    fireEvent.changeText(quantityText, '');
    const quantityError = getByTestId('quantity');
    fireEvent.changeText(quantityText, '');
    fireEvent(quantityText, 'onBlur', {target: {value: ''}});
    expect(quantityError).toBeTruthy();
  });
  it('should render data indicator when isLoading is true', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({urls: ['mocked-url-1', 'mocked-url-2']}),
    });
    // Mock isLoading as true to simulate loading state
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

    // You can use this `Data` object in your test cases to mock the data you need.

    // Mock isLoading as true to simulate loading state
    const {getByTestId} = render(<AddImages />);

    const Image = getByTestId('image-0');
    expect(Image).toBeTruthy();
  });
  it('should render loading indicator when isLoading is true', async () => {
    // Mock isLoading as true to simulate loading state
    (useAddImages as jest.Mock).mockReturnValue({
      formik: {
        touched: {price: true, quantity: true, size: true}, // Update with your desired values
        errors: {
          price: 'Price is required',
          quantity: 'Quantity is required',
          size: 'Size is required',
        }, // Update with your desired values
        isValid: false, // Update with your desired value
        handleSubmit: jest.fn(),
      },

      isLoading: true, // Set isLoading to true
    });

    // Render the component
    const {getByTestId, getByText} = render(<AddImages />);

    // Ensure that the loading indicator is displayed
    const loadingIndicator = getByTestId('loading-indicator');
    expect(loadingIndicator).toBeTruthy();

    // Simulate a button press
    const addButton = getByText('Add product');
    act(() => {
      fireEvent.press(addButton);
    });

    // Ensure that the loading indicator is still displayed
    expect(loadingIndicator).toBeTruthy();
  });
  it('should renderdata when isLoading is false', async () => {
    // Mock isLoading as true to simulate loading state
    (useAddImages as jest.Mock).mockReturnValue({
      formik: {
        touched: {price: true, quantity: true, size: true}, // Update with your desired values
        errors: {
          price: 'Price is required',
          quantity: 'Quantity is required',
          size: 'Size is required',
        }, // Update with your desired values
        isValid: false, // Update with your desired value
        handleSubmit: jest.fn(),
      },

      isLoading: false, // Set isLoading to true
    });

    // Render the component
    const {getByTestId} = render(<AddImages />);

    // Ensure that the loading indicator is displayed
    const addImages = getByTestId('AddImages-Button');
    expect(addImages).toBeTruthy();

    // Simulate a button press
  });
});
