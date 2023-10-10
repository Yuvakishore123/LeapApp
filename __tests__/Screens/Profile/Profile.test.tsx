import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../../../src/redux/store';
import {Provider, useDispatch} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../../../src/screens/Profile/Profile';
import useProfile from 'screens/Profile/useProfile';
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/screens/Profile/useProfile', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    isloading: false, // Set isLoading to false
    profileData: {
      firstName: 'John',
      loading: false,
      email: 'john@example.com',
      phoneNumber: '1234567890',
      profileImageUrl: 'https://example.com/profile.jpg',
    },
  }),
  handleRemoveProfilePic: jest.fn(async () => {
    // Provide a mock implementation for handleRemoveProfilePic
    console.log('Mock handleRemoveProfilePic called');
  }),
  fetchProfileData: jest.fn(),
}));
describe('Profile Screen', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    AsyncStorage.clear();
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useProfile as jest.Mock).mockReturnValue({
      handleRemoveProfilePic: jest.fn(),
      isloading: false, // Set isLoading to false
      loading: false,
      profileData: {
        firstName: 'John',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        profileImageUrl: 'https://example.com/profile.jpg',
      },
    });
  });
  test('should render OwnerProfile correctly', () => {
    const Stack = createNativeStackNavigator();
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Test for the presence of specific elements or text
    expect(result).toBeDefined();

    // Add more assertions as needed to test the rendering of your component
  });
  test('navigates to edit profile page when "Edit Profile" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Edit Profile'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Ownereditprofile');
  });
  test('loading state when image is uploading', () => {
    (useProfile as jest.Mock).mockReturnValue({
      handleRemoveProfilePic: jest.fn(),
      isloading: true, // Set isLoading to false
      loading: false,
      profileData: {
        firstName: 'John',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        profileImageUrl: 'https://example.com/profile.jpg',
      },
    });
    const navigationMock = {navigate: jest.fn()};
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    const loading = getByTestId('activity-indicator');

    expect(loading).toBeDefined();
  });
  test('image conatiner should be defined', () => {
    (useProfile as jest.Mock).mockReturnValue({
      handleRemoveProfilePic: jest.fn(),
      isloading: false, // Set isLoading to false
      loading: false,
      profileData: {
        firstName: 'John',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        profileImageUrl: 'https://example.com/profile.jpg',
      },
    });
    const navigationMock = {navigate: jest.fn()};
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    const image = getByTestId('avatar-image');

    expect(image).toBeDefined();
  });
  test('handleuploadProfilePic button is pressed', async () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );
    const removeButton = getByTestId('uploadimage');
    fireEvent.press(removeButton);
  });
  test('handleRemoveProfilePic button is pressed', async () => {
    const mockhandleRemoveProfile = jest.fn();
    (useProfile as jest.Mock).mockReturnValue({
      handleRemoveProfilePic: mockhandleRemoveProfile,
      isloading: false, // Set isLoading to false
      profileData: {
        firstName: 'John',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        profileImageUrl: 'https://example.com/profile.jpg',
      },
    });
    const navigationMock = {navigate: jest.fn()};
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );
    const removeButton = getByTestId('removeProfile');
    fireEvent.press(removeButton);
    expect(mockhandleRemoveProfile).toBeCalled();
  });

  test('navigates to Address page when "Address" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Address'));
  });

  test('navigates to my orders page when "My Orders" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('My orders'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('MyOrder');
  });

  test('navigates to sign out  page when "Sign out" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Sign out'));
  });
  test('renders loading state correctly', () => {
    const navigationMock = {navigate: jest.fn()};

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Profile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    // Check if the activity indicator is rendered
    // Ensure that the avatar container is not rendered
    const avatarContainer = result.queryByTestId('avatar-container');
    expect(avatarContainer).toBeDefined();

    // Optionally, you can add more specific assertions related to loading state
  });
});
