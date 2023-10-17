import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import OwnerEditProfile, {
  SkeletonLoader,
} from '../../../src/screens/Ownereditprofile/OwnerEditProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Provider} from 'react-redux';
import {store} from '../../../src/redux/store';
import {NavigationContainer} from '@react-navigation/native';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/redux/slice/editProfileSlice', () => ({
  updateProfile: jest.fn(),
}));
jest.mock(
  '../../../src/screens/Ownereditprofile/useOwnerEditProfileCustomHook',
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
  it('dispatches updateProfile action and opens modal', async () => {
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <OwnerEditProfile />
        </NavigationContainer>
      </Provider>,
    );

    // Assuming you have input fields with testIDs for firstName, lastName, email, and phoneNumber
    fireEvent.changeText(getByTestId('firstname'), 'John');
    fireEvent.changeText(getByTestId('lastName'), 'Doe');
    fireEvent.changeText(getByTestId('email'), 'john.doe@example.com');
    fireEvent.changeText(getByTestId('phoneNumber'), '1234567890');

    // Assuming you have a button with a testID for triggering handleUpdate
    fireEvent.press(getByTestId('update-button'));
  });
  it('should render skeleton loader correctly', () => {
    const {getByTestId} = render(<SkeletonLoader />);

    // Query for elements you expect to be rendered by the skeleton loader
    const input1 = getByTestId('input1');
    const input2 = getByTestId('input-2');
    const input3 = getByTestId('input-3');
    const input4 = getByTestId('input-4');

    // Now you can make assertions about these elements
    expect(input1).toBeDefined();
    expect(input2).toBeDefined();
    expect(input3).toBeDefined();
    expect(input4).toBeDefined();
  });
});
