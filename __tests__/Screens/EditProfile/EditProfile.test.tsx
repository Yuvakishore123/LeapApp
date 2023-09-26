import React from 'react';
import {render} from '@testing-library/react-native';
import OwnerEditProfile from '../../../src/screens/Ownereditprofile/OwnerEditProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';
jest.mock(
  '../../../src/screens/Ownereditprofile/useOwnerProfile',
  () => () => ({
    firstName: 'John',
    setFirstName: jest.fn(),
    lastName: 'Doe',
    setLastName: jest.fn(),
    email: 'john.doe@example.com',
    showModal: false,
    closeModal: jest.fn(),
    setEmail: jest.fn(),
    phoneNumber: '1234567890',
    setPhoneNumber: jest.fn(),
    handleUpdate: jest.fn(),
    isLoading: false,
  }),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('OwnerEditProfile', () => {
  beforeEach(() => {
    // Clear AsyncStorage before each test
    AsyncStorage.clear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  it('should render the Edit Profile page correctly', () => {
    const {getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerEditProfile />
        </NavigationContainer>
      </Provider>,
    );
    expect(getByText('Edit profile')).toBeTruthy();
  });
});
