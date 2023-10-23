import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../../../src/redux/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Owneraddaddress from '../../../src/screens/Owneraddaddress/AddAddress';

jest.mock('@react-native-firebase/analytics', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-firebase/messaging', () =>
  require('@react-native-firebase'),
);
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));
describe('AddAddress screen', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });
  it('renders correctly AddAddress Screen', () => {
    const Stack = createNativeStackNavigator();

    const result = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );
    expect(result).toBeTruthy();
  });

  it('should render the component correctly', () => {
    const Stack = createNativeStackNavigator();

    // Render the component
    const {getByPlaceholderText, getByText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Test the initial render and check if elements are present
    expect(getByPlaceholderText('Flat no / Building')).toBeTruthy();
    expect(getByPlaceholderText('Street name')).toBeTruthy();
    expect(getByPlaceholderText('Pincode')).toBeTruthy();
    expect(getByPlaceholderText('City')).toBeTruthy();
    expect(getByPlaceholderText('State')).toBeTruthy();
    expect(getByPlaceholderText('Country')).toBeTruthy();
    expect(getByText('Type of address')).toBeTruthy();
    // ... add similar checks for other elements
  });
  it('should handle input changes correctly', () => {
    const Stack = createNativeStackNavigator();

    // Render the component
    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    act(() => {
      fireEvent.changeText(
        getByPlaceholderText('Flat no / Building'),
        '123 Main St',
      );
      fireEvent.changeText(getByPlaceholderText('Street name'), 'Downtown');
      fireEvent.changeText(getByPlaceholderText('Pincode'), '123456');
    });
    expect(getByPlaceholderText('Flat no / Building').props.value).toBe(
      '123 Main St',
    );
    expect(getByPlaceholderText('Street name').props.value).toBe('Downtown');
    expect(getByPlaceholderText('Pincode').props.value).toBe('123456');
  });
  it('should show error message for addressLine1 and street name when it is touched and has an error', async () => {
    const Stack = createNativeStackNavigator();

    const {getByPlaceholderText, getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Simulate user input for addressLine1
    await act(() => {
      fireEvent.changeText(getByPlaceholderText('Flat no / Building'), '');
      fireEvent(getByPlaceholderText('Flat no / Building'), 'blur');
      fireEvent.changeText(getByPlaceholderText('Street name'), '');
      fireEvent(getByPlaceholderText('Street name'), 'blur');
    });
    // Check if error message is displayed
    expect(getByTestId('addressLine1error')).toBeTruthy();
    expect(getByTestId('streetname')).toBeTruthy();
  });
  it('should blur postalcode when it is touched', async () => {
    const Stack = createNativeStackNavigator();

    const {getByPlaceholderText} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    );

    // Simulate user input for addressLine1
    await act(() => {
      fireEvent.changeText(getByPlaceholderText('Pincode'), '');
      fireEvent(getByPlaceholderText('Pincode'), 'blur');
    });
  });
  test('should handle option change', () => {
    const Stack = createNativeStackNavigator();

    const {getByTestId} = render(
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Owneraddaddress" component={Owneraddaddress} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>,
    ); // Render the component
    act(() => {
      // Simulate a press on the 'HOME' radio button
      fireEvent.press(getByTestId('home-radio-button'));

      // Simulate a press on the 'OFFICE' radio button
      fireEvent.press(getByTestId('office-radio-button'));
    });

    expect(getByTestId('home-radio-button')).toBeDefined();
    expect(getByTestId('office-radio-button')).toBeDefined();
  });
});
