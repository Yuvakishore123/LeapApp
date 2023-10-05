import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Wishlist from '../../../src/screens/Wishlist/Wishlist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));
describe('Wishlist Screen', () => {
  const mockWishlistProducts = [
    {
      id: 1,
      imageUrl: ['https://example.com/product1.jpg'],
      name: 'Product 1',
      price: 100,
    },
    // Add more products as needed
  ];
  beforeEach(() => {
    useSelector.mockImplementation(
      (
        selector: (arg0: {
          WishlistProducts: {
            data: {
              id: number;
              imageUrl: string[];
              name: string;
              price: number;
            }[];
          };
        }) => any,
      ) =>
        selector({
          WishlistProducts: {data: mockWishlistProducts},
        }),
    );
    AsyncStorage.clear();
  });
  test('should render the Wishlist page correctly', () => {
    const result = render(
      <NavigationContainer>
        <Wishlist
          route={{
            name: '',
          }}
          navigation={undefined}
        />
        ,
      </NavigationContainer>,
    );

    // Add your assertions to check if the Wishlist page renders correctly
    expect(result).toBeDefined();
    // ... add more assertions based on your component's structure
  });
  test('renders loading state correctly', () => {
    useSelector.mockImplementation(
      (selector: (arg0: {WishlistProducts: {isLoader: boolean}}) => any) =>
        selector({
          WishlistProducts: {isLoader: true},
        }),
    );
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
      </NavigationContainer>,
    );
    const loadingText = getByText('The Items are Loading...');
    const lottieAnimation = getByTestId('loadingAnimation'); // Assuming you have a testID on the Lottie animation element

    expect(loadingText).toBeTruthy();
    expect(lottieAnimation).toBeTruthy();
  });
  // it('calls onLoad when image loads successfully', () => {
  //   useSelector.mockImplementation(
  //     (selector: (arg0: {WishlistProducts: any}) => any) =>
  //       selector({
  //         WishlistProducts: {isLoader: false, data: mockWishlistProducts},
  //       }),
  //   );
  //   const {getByTestId} = render(
  //     <NavigationContainer>
  //       <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
  //     </NavigationContainer>,
  //   );
  //   const image = getByTestId('wishlist-image'); // Make sure to set a testID on your Image component

  //   fireEvent(image, 'onLoad');
  // });

  // it('calls onError when image fails to load', () => {
  //   const {getByTestId} = render(
  //     <NavigationContainer>
  //       <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
  //     </NavigationContainer>,
  //   );
  //   const image = getByTestId('wishlist-image');

  //   fireEvent(image, 'onError');
  // });
  it('renders the image', () => {
    const {getAllByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
      </NavigationContainer>,
    );
    const image = getAllByTestId('wishlist-image');

    expect(image).toBeTruthy();
  });
  test('calls wishlistremove when the button is pressed', () => {
    const {getByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
      </NavigationContainer>,
    );

    const wishlistButton = getByTestId('wishlist-button');
    fireEvent.press(wishlistButton);
  });
  test('renders empty state correctly', () => {
    useSelector.mockImplementation(
      (selector: (arg0: {WishlistProducts: any}) => any) =>
        selector({
          WishlistProducts: {isLoader: false, data: []},
        }),
    );
    const {getByText, getByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: jest.fn()}} route={{name: ''}} />,
      </NavigationContainer>,
    );
    const loadingText = getByText('Your wishlist is empty');
    const lottieAnimation = getByTestId('empty-animation'); // Assuming you have a testID on the Lottie animation element

    expect(loadingText).toBeTruthy();
    expect(lottieAnimation).toBeTruthy();
  });
  test('navigates to UProductDetailsScreen when TouchableOpacity is pressed', () => {
    const mockNavigate = jest.fn();
    const {getByTestId} = render(
      <NavigationContainer>
        <Wishlist navigation={{navigate: mockNavigate}} route={{name: ''}} />
      </NavigationContainer>,
    );

    // Find the TouchableOpacity element
    const touchableOpacity = getByTestId('wishlist-touchable');

    // Simulate a press event on the TouchableOpacity element
    fireEvent.press(touchableOpacity);

    // Check if navigation.navigate was called with the correct arguments
    expect(mockNavigate).toHaveBeenCalledWith('UProductDetails', {
      product: mockWishlistProducts[0],
    });
  });
});
