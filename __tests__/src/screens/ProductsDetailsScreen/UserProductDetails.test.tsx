import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useSelector as useSelectorOriginal, useDispatch} from 'react-redux';

import {NavigationContainer, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import UDetailScreen from 'screens/BorrowerScreens/UProductDetails/UProductDetails';
import useProductdetails from 'screens/BorrowerScreens/UProductDetails/useProductdetails';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  fetch: jest.fn().mockResolvedValue({isConnected: true}), // Ensure isConnected is defined in the mock.
}));
jest.mock('network/network');
const mockGoback = jest.fn();
jest.mock('react-native-skeleton-placeholder', () => {
  const mockSkeletonPlaceholder = jest.fn();
  return mockSkeletonPlaceholder;
});
jest.mock('react-native-razorpay', () => require('razorpay-mock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('react-native-firebase-mock'),
);
jest.mock('@react-native-firebase/dynamic-links', () =>
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
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('screens/BorrowerScreens/UProductDetails/useProductdetails', () => ({
  rentalStartDate: new Date(), // Mock rental start date
  setRentalStartDate: jest.fn(), // Mock setRentalStartDate function
  rentalEndDate: new Date(), // Mock rental end date
  setRentalEndDate: jest.fn(), // Mock setRentalEndDate function
  quantity: 0, // Mock quantity
  showModal: false, // Mock showModal state
  showwModal: jest.fn(), // Mock showwModal function
  isMinusDisabled: false, // Mock isMinusDisabled state
  isPlusDisabled: false, // Mock isPlusDisabled state
  handleDecrement: jest.fn(), // Mock handleDecrement function
  handleIncrement: jest.fn(), // Mock handleIncrement function
  imageLoaded: false, // Mock imageLoaded state
  setImageLoaded: jest.fn(), // Mock setImageLoaded function
  handleSubmit: jest.fn(), // Mock handleSubmit function
  closeModal: jest.fn(), // Mock closeModal function
  closeeModal: jest.fn(), // Mock closeeModal function
  scrollViewRef: null, // Mock scrollViewRef
  setActiveIndex: jest.fn(), // Mock setActiveIndex function
  shareProduct: jest.fn(), // Mock shareProduct function
  activeIndex: 0, // Mock activeIndex
  startScrollTimer: jest.fn(), // Mock startScrollTimer function
  handleScroll: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));
const Stack = createNativeStackNavigator();
const mockNav = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      goBack: mockGoback,
    }),
    useRoute: jest.fn(),
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
describe('useProductdetails Screen', () => {
  const mockDispatch = jest.fn();
  const useSelector = useSelectorOriginal as jest.Mock;
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useProductdetails as jest.Mock).mockReturnValue({
      useProductdetails: jest.fn(() => ({
        rentalStartDate: new Date(), // Mock rental start date
        setRentalStartDate: jest.fn(), // Mock setRentalStartDate function
        rentalEndDate: new Date(), // Mock rental end date
        setRentalEndDate: jest.fn(), // Mock setRentalEndDate function
        quantity: 0, // Mock quantity
        showModal: false, // Mock showModal state
        showwModal: jest.fn(), // Mock showwModal function
        isMinusDisabled: false, // Mock isMinusDisabled state
        isPlusDisabled: false, // Mock isPlusDisabled state
        handleDecrement: jest.fn(), // Mock handleDecrement function
        handleIncrement: jest.fn(), // Mock handleIncrement function
        imageLoaded: false, // Mock imageLoaded state
        setImageLoaded: jest.fn(), // Mock setImageLoaded function
        handleSubmit: jest.fn(), // Mock handleSubmit function
        closeModal: jest.fn(), // Mock closeModal function
        closeeModal: jest.fn(), // Mock closeeModal function
        scrollViewRef: null, // Mock scrollViewRef
        setActiveIndex: jest.fn(), // Mock setActiveIndex function
        shareProduct: jest.fn(), // Mock shareProduct function
        activeIndex: 0, // Mock activeIndex
        startScrollTimer: jest.fn(), // Mock startScrollTimer function
        handleScroll: jest.fn(),
      })),
    });
    useSelector.mockImplementation(selector =>
      selector({
        cartAdd: {data: []},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the useProductdetails Screen', () => {
    // Define a mock route with the necessary params
    const route = {
      params: {
        product: {}, // Provide a valid subcategoryId here
      },
    };

    const result = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UDetailScreen"
            component={UDetailScreen}
            initialParams={route}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    expect(result).toBeDefined();
  });
  it('should navigate back to hone screen', () => {
    const mockNavigation = jest.fn();
    (useProductdetails as jest.Mock).mockReturnValue({
      handlegoBack: mockNavigation,
    });
    // Define a mock route with the necessary params
    const route = {
      params: {
        product: {}, // Provide a valid subcategoryId here
      },
    };

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UDetailScreen"
            component={UDetailScreen}
            initialParams={route}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const backButton = getByTestId('Back-Button');
    expect(backButton).toBeDefined();
    fireEvent.press(backButton);
    expect(mockNavigation).toHaveBeenCalled();
  });
  it('should render the Card Component ', () => {
    const mockSetActiveIndex = jest.fn();
    const mockStartScrollTimer = jest.fn();
    const mockHandleScroll = jest.fn();
    (useProductdetails as jest.Mock).mockReturnValue({
      setActiveIndex: mockSetActiveIndex,
      startScrollTimer: mockStartScrollTimer,
      handleScroll: mockHandleScroll,
    });
    // Define a mock route with the necessary params
    const route = {
      params: {
        product: {
          id: 1,
          name: 'Product 1',
          price: 10,
          imageUrl: ['https://example.com/image1.jpg'],
        },
      },
    };

    const {getByTestId} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UDetailScreen"
            component={UDetailScreen}
            initialParams={route}
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );
    const cardComponent = getByTestId('Card-Component');
    expect(cardComponent).toBeDefined();
    fireEvent(cardComponent, 'onMomentumScrollEnd', {
      nativeEvent: {
        contentOffset: {x: 405}, // Simulating scroll position
      },
    });

    expect(mockSetActiveIndex).toBeCalled();
  });
  it('should display the Products ', () => {
    const mockNavigation = jest.fn();
    (useProductdetails as jest.Mock).mockReturnValue({
      handleGoBack: mockNavigation,
      imageLoaded: true,
    });

    // Define a mock route with the necessary params
    const route = {
      params: {
        product: {
          id: 1,
          imageUrl: ['url1', 'url2', 'url3'],
          name: 'Mock Product Name',
          price: 100,
          description: 'Mock Product Description',
          size: 'Mock Product Size',
        }, // Provide a valid subcategoryId here
      },
    };

    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UDetailScreen"
            component={UDetailScreen}
            initialParams={route.params} // Pass route.params as initialParams
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const NameComponent = getByTestId('Product-Name');
    const name = getByText('Mock Product Name');
    const ImageComponent = getByTestId('Image-url1');
    expect(NameComponent).toBeDefined();
    expect(ImageComponent).toBeDefined();
    expect(name).toBeTruthy();
  });
  it('should decrement the Products quantity ', () => {
    const mockDecrement = jest.fn();
    (useProductdetails as jest.Mock).mockReturnValue({
      imageLoaded: true,
      handleDecrement: mockDecrement,
      isMinusDisabled: false,
    });

    // Define a mock route with the necessary params
    const route = {
      params: {
        product: {
          id: 1,
          imageUrl: ['url1', 'url2', 'url3'],
          name: 'Mock Product Name',
          price: 100,
          description: 'Mock Product Description',
          size: 'Mock Product Size',
        }, // Provide a valid subcategoryId here
      },
    };

    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UDetailScreen"
            component={UDetailScreen}
            initialParams={route.params} // Pass route.params as initialParams
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const decrementButton = getByTestId('Decrement-Button');
    expect(decrementButton).toBeTruthy();
    fireEvent.press(decrementButton);
    expect(mockDecrement).toBeCalled();
  });
  it('should decrement button should be disabled ', () => {
    const mockDecrement = jest.fn();
    (useProductdetails as jest.Mock).mockReturnValue({
      imageLoaded: true,
      handleDecrement: mockDecrement,
      isMinusDisabled: true,
    });

    // Define a mock route with the necessary params
    const route = {
      params: {
        product: {
          id: 1,
          imageUrl: ['url1', 'url2', 'url3'],
          name: 'Mock Product Name',
          price: 100,
          description: 'Mock Product Description',
          size: 'Mock Product Size',
        }, // Provide a valid subcategoryId here
      },
    };

    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UDetailScreen"
            component={UDetailScreen}
            initialParams={route.params} // Pass route.params as initialParams
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const decrementButton = getByTestId('Decrement-Button');
    expect(decrementButton).toBeTruthy();
    fireEvent.press(decrementButton);
  });
  it('should Increment button should be disabled ', () => {
    const mockDecrement = jest.fn();
    (useProductdetails as jest.Mock).mockReturnValue({
      imageLoaded: true,
      handleDecrement: mockDecrement,
      isPlusDisabled: true,
      Quantity: 5,
    });

    // Define a mock route with the necessary params
    const route = {
      params: {
        product: {
          id: 1,
          imageUrl: ['url1', 'url2', 'url3'],
          name: 'Mock Product Name',
          price: 100,
          description: 'Mock Product Description',
          size: 'Mock Product Size',
          quantity: 5,
        }, // Provide a valid subcategoryId here
      },
    };

    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="UDetailScreen"
            component={UDetailScreen}
            initialParams={route.params} // Pass route.params as initialParams
          />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    const plusButton = getByTestId('Decrement-Button');
    expect(plusButton).toBeTruthy();
    fireEvent.press(plusButton);
    expect(plusButton.props.style).toStrictEqual({
      backgroundColor: '#9747FF',
      borderRadius: 15,
      height: 30,
      marginLeft: '45%',
      opacity: 1,
      padding: 5,
      width: 30,
    });
  });
});
