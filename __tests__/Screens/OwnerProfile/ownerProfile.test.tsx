import React from 'react';
import {fireEvent, render, renderHook} from '@testing-library/react-native';
import OwnerProfile from '../../../src/screens/Ownerprofile/OwnerProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {store} from '../../../src/redux/store';
import {Provider, useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useProfile from 'screens/Profile/useProfile';
import {profileUpload} from 'constants/Apis';
import ApiService from 'network/network';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));
describe('OwnerProfile', () => {
  beforeEach(() => {
    useSelector.mockImplementation(
      (
        selector: (arg0: {
          profileData: {data: {}; isLoader: null};
          Rolereducer: any;
        }) => any,
      ) =>
        selector({
          profileData: {data: {}, isLoader: null},
          Rolereducer: {role: null},
        }),
    );
    AsyncStorage.clear();
  });
  jest.mock('../../../src/screens/Ownerprofile/useOwnerProfile', () => ({
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
    fetchProfileData: jest.fn(),
  }));

  test('should render OwnerProfile correctly', () => {
    const Stack = createNativeStackNavigator();
    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Test for the presence of specific elements or text
    expect(result).toBeDefined();

    // Add more assertions as needed to test the rendering of your component
  });
  test('should call handleLogout when Sign Out button is pressed', () => {
    const Stack = createNativeStackNavigator();
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Act
    const logoutbutton = getByText('Sign out');

    fireEvent.press(logoutbutton);
  });
  it('should handle removing profile picture', async () => {
    const {result} = renderHook(() => useProfile(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    jest.spyOn(ApiService, 'post').mockResolvedValue({ok: true});
    result.current.setProfileImage = jest.fn(); // Mocking setProfileImage

    await result.current.handleRemoveProfilePic();

    expect(jest.spyOn(ApiService, 'post')).toHaveBeenCalledWith(
      `${profileUpload}=${null}`,
      {},
    );
    // Add more assertions as needed
  });
  test('navigates to edit profile page when "Edit Profile" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Edit Profile'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('OwnerEditProfile');
  });
  test('handleuploadProfilePic button is pressed', async () => {
    const navigationMock = {navigate: jest.fn()};

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={navigationMock} />
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
          <OwnerProfile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('Address'));
    expect(navigationMock.navigate).toHaveBeenCalledWith('Owneraddresspage');
  });

  test('navigates to my orders page when "My products" button is pressed', () => {
    const navigationMock = {navigate: jest.fn()};
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerProfile navigation={navigationMock} />
        </NavigationContainer>
      </Provider>,
    );

    fireEvent.press(getByText('My Products'));

    expect(navigationMock.navigate).toHaveBeenCalledWith('Owneredititems');
  });
});
