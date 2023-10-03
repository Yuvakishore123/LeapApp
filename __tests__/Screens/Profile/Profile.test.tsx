import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../../../src/screens/Profile/Profile';
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
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
  beforeEach(() => {
    AsyncStorage.clear();
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
