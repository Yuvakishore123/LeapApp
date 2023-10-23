import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {useSelector, useDispatch, Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import useProductdetails from 'screens/UProductDetails/useProductdetails';
import UDetailScreen from 'screens/UProductDetails/UProductDetails';
import {store} from '../../../src/redux/store';

jest.mock('react-native-razorpay', () => require('react-native-razorpaymock'));
jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/dynamic-links', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/crashlytics', () =>
  require('@react-native-firebase'),
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
jest.mock('screens/UProductDetails/useProductdetails', () => ({
  rentalStartDate: new Date(),
  setRentalStartDate: jest.fn(),
  rentalEndDate: new Date(),
  setRentalEndDate: jest.fn(),
  quantity: 0,
  showModal: false,
  showwModal: jest.fn(),
  isMinusDisabled: false,
  isPlusDisabled: false,
  handleDecrement: jest.fn(),
  handleIncrement: jest.fn(),
  imageLoaded: false,
  setImageLoaded: jest.fn(),
  handleSubmit: jest.fn(),
  closeModal: jest.fn(),
  closeeModal: jest.fn(),
  scrollViewRef: null,
  setActiveIndex: jest.fn(),
  shareProduct: jest.fn(),
  activeIndex: 0,
  startScrollTimer: jest.fn(),
  handleScroll: jest.fn(),
  default: jest.fn(),
  __esModule: true,
}));
const mockNav = jest.fn();
const mockGoback = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNav,
      goBack: mockGoback,
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
describe('Productdetails Screen', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useProductdetails as jest.Mock).mockReturnValue({
      useProductdetails: jest.fn(() => ({
        rentalStartDate: new Date(),
        setRentalStartDate: jest.fn(),
        rentalEndDate: new Date(),
        setRentalEndDate: jest.fn(),
        quantity: 0,
        showModal: false,
        showwModal: jest.fn(),
        isMinusDisabled: false,
        isPlusDisabled: false,
        handleDecrement: jest.fn(),
        handleIncrement: jest.fn(),
        imageLoaded: false,
        setImageLoaded: jest.fn(),
        handleSubmit: jest.fn(),
        closeModal: jest.fn(),
        closeeModal: jest.fn(),
        scrollViewRef: null,
        setActiveIndex: jest.fn(),
        shareProduct: jest.fn(),
        activeIndex: 0,
        startScrollTimer: jest.fn(),
        handleScroll: jest.fn(),
      })),
    });
    (useSelector as jest.Mock).mockImplementation(selector =>
      selector({
        cartAdd: {data: []},
      }),
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render the useProductdetails Screen', () => {
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

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <UDetailScreen route={route} />
        </NavigationContainer>
        ,
      </Provider>,
    );
    expect(result).toBeDefined();
  });
  it('should render the scrollView of image', () => {
    const mockActiveIndex = jest.fn();
    const mockstartscroll = jest.fn();
    (useProductdetails as jest.Mock).mockReturnValue({
      scrollViewRef: {current: {scrollTo: jest.fn()}},
      setActiveIndex: mockActiveIndex,
      startScrollTimer: mockstartscroll,
    });
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
      <Provider store={store}>
        <NavigationContainer>
          <UDetailScreen route={route} />
        </NavigationContainer>
        ,
      </Provider>,
    );
    const disablebutton = getByTestId('scrollViewId');
    act(() => {
      fireEvent(disablebutton, 'onMomentumScrollEnd', {
        nativeEvent: {
          contentOffset: {x: 405}, // Simulating scroll position
        },
      });
    });

    // Check if setActiveIndex and startScrollTimer were called
    expect(mockActiveIndex).toHaveBeenCalledWith(1);
    expect(mockstartscroll).toHaveBeenCalled();
  });
  it('should navigate back when button is pressed', () => {
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
      <Provider store={store}>
        <NavigationContainer>
          <UDetailScreen route={route} />
        </NavigationContainer>
        ,
      </Provider>,
    );
    const disablebutton = getByTestId('backbutton');
    act(() => {
      fireEvent.press(disablebutton);
    });
    expect(mockGoback).toBeCalled();
  });
  it('should handle increment and disable when quantity is more', () => {
    const mockincrement = jest.fn();
    (useProductdetails as jest.Mock).mockReturnValue({
      useProductdetails: jest.fn(() => ({
        isPlusDisabled: true,
        handleIncrement: mockincrement,
      })),
    });

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
      <Provider store={store}>
        <NavigationContainer>
          <UDetailScreen route={route} />
        </NavigationContainer>
        ,
      </Provider>,
    );
    const disablebutton = getByTestId('plusbutton');
    act(() => {
      fireEvent.press(disablebutton);
    });
    expect(mockincrement).not.toBeCalled();
  });
  it('should handle styles of disabledButton, isPlusDisabled, disabledButton ', () => {
    (useProductdetails as jest.Mock).mockReturnValue({
      isPlusDisabled: true,
      isMinusDisabled: true,
      quantity: 10,
    });

    const route = {
      params: {
        product: {
          id: 1,
          name: 'Product 1',
          price: 10,
          imageUrl: ['https://example.com/image1.jpg'],
          Quantity: 10,
        },
      },
    };

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <UDetailScreen route={route} />
        </NavigationContainer>
        ,
      </Provider>,
    );
    const plusebutton = getByTestId('plusbutton');
    const disablebutton = getByTestId('disablebutton');
    act(() => {
      fireEvent.press(plusebutton);
      fireEvent.press(disablebutton);
    });
    expect(plusebutton.props.style).toEqual({
      backgroundColor: 'gray',
      borderRadius: 15,
      height: 30,
      opacity: 0.5,
      padding: 5,
      width: 30,
    });
    expect(disablebutton.props.style).toEqual({
      backgroundColor: 'gray',
      borderRadius: 15,
      height: 30,
      marginLeft: '45%',
      opacity: 0.5,
      padding: 5,
      width: 30,
    });
  });
});
