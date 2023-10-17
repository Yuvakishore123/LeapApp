import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import OwnerProfile from '../../../src/screens/Ownerprofile/OwnerProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UseOwnerprofile from 'screens/Ownerprofile/useOwnerProfile';
import useProfile from 'screens/Profile/useProfile';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../../src/screens/Ownerprofile/useOwnerProfile', () => ({
  __esModule: true,
  default: jest.fn(),
  loading: false, // Set isLoading to false
  profileData: {
    firstName: 'John',
    email: 'john@example.com',
    phoneNumber: '1234567890',
    profileImageUrl: 'https://example.com/profile.jpg',
  },
  fetchProfileData: jest.fn(),
}));
jest.mock('../../../src/screens/Profile/useProfile', () => ({
  __esModule: true,
  default: jest.fn(),
  isloading: false, // Set isLoading to false
  data: {
    firstName: 'John',
    email: 'john@example.com',
    phoneNumber: '1234567890',
    profileImageUrl: 'https://example.com/profile.jpg',
  },
  handleRemoveProfilePic: jest.fn(),
}));
describe('OwnerProfile', () => {
  const mockDispatch = jest.fn();
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (UseOwnerprofile as jest.Mock).mockReturnValue({
      loading: false, // Set isLoading to false
      profileData: {
        firstName: 'John',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        profileImageUrl: 'https://example.com/profile.jpg',
      },
    });
    (useProfile as jest.Mock).mockReturnValue({
      isloading: false, // Set isLoading to false
      data: {
        firstName: 'John',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        profileImageUrl: 'https://example.com/profile.jpg',
      },
      handleRemoveProfilePic: jest.fn(),
    });
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should render OwnerProfile correctly', () => {
    const Stack = createNativeStackNavigator();
    const result = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    // Test for the presence of specific elements or text
    expect(result).toBeDefined();

    // Add more assertions as needed to test the rendering of your component
  });
  test('should call handleLogout when Sign Out button is pressed', () => {
    const Stack = createNativeStackNavigator();
    const {getByText} = render(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
        </Stack.Navigator>
      </NavigationContainer>,
    );

    // Act
    const logoutbutton = getByText('Sign out');

    fireEvent.press(logoutbutton);
  });
  test('navigates to edit profile page when "Edit Profile" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <NavigationContainer>
        <OwnerProfile navigation={navigationMock} />
      </NavigationContainer>,
    );

    fireEvent.press(getByText('Edit Profile'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('OwnerEditProfile');
  });
  test('handleuploadProfilePic button is pressed', async () => {
    const navigationMock = {navigate: jest.fn()};

    const {getByTestId} = render(
      <NavigationContainer>
        <OwnerProfile navigation={navigationMock} />
      </NavigationContainer>,
    );
    const removeButton = getByTestId('uploadimage');
    fireEvent.press(removeButton);
  });

  test('navigates to Address page when "Address" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <NavigationContainer>
        <OwnerProfile navigation={navigationMock} />
      </NavigationContainer>,
    );

    fireEvent.press(getByText('Address'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('Owneraddresspage');
  });

  test('navigates to my orders page when "My products" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <NavigationContainer>
        <OwnerProfile navigation={navigationMock} />
      </NavigationContainer>,
    );

    fireEvent.press(getByText('My Products'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Owneredititems');
  });
  test('should handle loading state of image', () => {
    const navigationMock = {navigate: jest.fn()};
    (useProfile as jest.Mock).mockReturnValue({
      isloading: true, // Set isLoading to false
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <OwnerProfile navigation={navigationMock} />
      </NavigationContainer>,
    );
    const loadingimage = getByTestId('activity-indicator');

    expect(loadingimage).toBeDefined();
  });
  test('Remove button should be handled', () => {
    const navigationMock = {navigate: jest.fn()};
    const removefunc = jest.fn();
    (useProfile as jest.Mock).mockReturnValue({
      isloading: false, // Set isLoading to false
      data: {
        firstName: 'John',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        profileImageUrl: 'https://example.com/profile.jpg',
      },
      handleRemoveProfilePic: removefunc,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <OwnerProfile navigation={navigationMock} />
      </NavigationContainer>,
    );
    const removeButton = getByTestId('removeButton');
    act(() => {
      fireEvent.press(removeButton);
    });
    expect(removefunc).toBeCalled();
  });
  test('should render loading state in ownerprofile', () => {
    const navigationMock = {navigate: jest.fn()};
    const removefunc = jest.fn();
    (UseOwnerprofile as jest.Mock).mockReturnValue({
      loading: true, // Set isLoading to false
      data: {
        firstName: 'John',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        profileImageUrl: 'https://example.com/profile.jpg',
      },
      handleRemoveProfilePic: removefunc,
    });
    const {getByTestId} = render(
      <NavigationContainer>
        <OwnerProfile navigation={navigationMock} />
      </NavigationContainer>,
    );
    const loading = getByTestId('skeleton-loader');
    expect(loading).toBeDefined();
  });
});
