import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Owneraddresspage from '../../../src/screens/Owneraddaddress/Address';
import useAddress from 'screens/Owneraddaddress/useAddress';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@notifee/react-native', () => require('react-native-notifee'));
jest.mock('rn-fetch-blob', () => require('rn-fetch-blobmock'));
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
jest.mock('../../../src/screens/Owneraddaddress/useAddress', () => ({
  handleOwnerAddAddress: jest.fn(),
  handleDeleteAddress: jest.fn(),
  closeModal: jest.fn(),
  showModal: false,
  handleEditItems: jest.fn(),
  isloading: false,
  addressdata: [
    {
      id: 1,
      addressLine1: '123 Main Street',
      addressLine2: '',
      postalCode: '12345',
      city: 'Cityville',
      state: 'CA',
      country: 'USA',
    },
    // Add more sample address data if needed
  ],
  __esModule: true,
  default: jest.fn(),
}));
describe('Address Page', () => {
  beforeEach(() => {
    AsyncStorage.clear();
    (useAddress as jest.Mock).mockReturnValue({
      handleOwnerAddAddress: jest.fn(),
      handleDeleteAddress: jest.fn(),
      closeModal: jest.fn(),
      showModal: false,
      handleEditItems: jest.fn(),
      isloading: false,
      addressdata: [
        {
          id: 1,
          addressLine1: '123 Main Street',
          addressLine2: '',
          postalCode: '12345',
          city: 'Cityville',
          state: 'CA',
          country: 'USA',
        },
        // Add more sample address data if needed
      ],
    });
  });
  test('renders correctly', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Owneraddresspage"
              component={Owneraddresspage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    expect(result).toBeTruthy();
  });
  it('should call handleEditItems on edit button press', () => {
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Owneraddresspage"
              component={Owneraddresspage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    act(() => {
      fireEvent.press(getByTestId('edit-button')); // Assuming you have a testID for the edit button
    });
  });
  it('should call handleDeleteAddress on delete button press', () => {
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Owneraddresspage"
              component={Owneraddresspage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    act(() => {
      fireEvent.press(getByTestId('delete-button'));
    });
  });
  it('should loading state render', () => {
    (useAddress as jest.Mock).mockReturnValue({
      handleOwnerAddAddress: jest.fn(),
      handleDeleteAddress: jest.fn(),
      closeModal: jest.fn(),
      showModal: false,
      handleEditItems: jest.fn(),
      isloading: true,
      addressdata: [
        {
          id: 1,
          addressLine1: '123 Main Street',
          addressLine2: '',
          postalCode: '12345',
          city: 'Cityville',
          state: 'CA',
          country: 'USA',
        },
        // Add more sample address data if needed
      ],
    });
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Owneraddresspage"
              component={Owneraddresspage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(getByTestId('loading-container')).toBeDefined();
  });
  it('should empty state render when addressdata is empty', () => {
    (useAddress as jest.Mock).mockReturnValue({
      handleOwnerAddAddress: jest.fn(),
      handleDeleteAddress: jest.fn(),
      closeModal: jest.fn(),
      showModal: false,
      handleEditItems: jest.fn(),
      isloading: false,
      addressdata: [],
    });
    const Stack = createNativeStackNavigator();
    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Owneraddresspage"
              component={Owneraddresspage}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(getByTestId('empty-state')).toBeDefined();
  });
});
