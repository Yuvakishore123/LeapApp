import React from 'react';
import {
  act,
  fireEvent,
  render,
  renderHook,
} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from 'screens/Profile/Profile';
import useProfile from 'screens/Profile/useProfile';
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
    isLoading: false, // Set isLoading to false
    profileData: {
      firstName: 'John',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      profileImageUrl: 'https://example.com/profile.jpg',
    },
  }),
  handleRemoveProfilePic: jest.fn(),
}));
jest.mock('../../../src/screens/Profile/useProfile', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({isloading: true}),
  handleRemoveProfilePic: jest.fn(),
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
  test('fetchProfileData should fetch profile data', async () => {
    const mockToken = 'mockToken';
    const mockProfileData = {
      firstName: 'John',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      profileImageUrl: 'https://example.com/profile.jpg',
    };

    globalThis.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockProfileData),
    });

    AsyncStorage.getItem = jest.fn().mockResolvedValue(mockToken);

    // useNavigation.mockReturnValue({
    //   addListener: jest.fn(),
    // });

    const {result} = renderHook(() => useProfile());

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.fetchProfileData();
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.profilePic).toBe(mockProfileData.profileImageUrl);
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

    expect(navigationMock.navigate).toHaveBeenCalledWith('Owneraddresspage');
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
});
